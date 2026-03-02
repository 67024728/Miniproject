"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/tablevocab.module.css";

export default function VocabTable({ data = [] }: { data: any[] }) {
  const router = useRouter();

  // --- 1. State สำหรับ Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const safeData = data || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  // --- 2. State สำหรับ Checkbox ---
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const currentPageIds = currentItems.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    } else {
      const currentPageIds = currentItems.map((item) => item.id);
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelectedInPage = currentItems.length > 0 && 
    currentItems.every((item) => selectedIds.includes(item.id));

  // --- 3. ฟังก์ชันการ "ทบทวน" ---
  const handleReview = () => {
    const selectedVocab = safeData.filter(item => selectedIds.includes(item.id));
    sessionStorage.setItem("reviewItems", JSON.stringify(selectedVocab));
    router.push("/flashcard");
  };

  // --- 4. ฟังก์ชันการ "ลบ" ---
  const handleDelete = () => {
    if (confirm(`ยืนยันการลบคำศัพท์ที่เลือก ${selectedIds.length} รายการ?`)) {
      const customVocab = JSON.parse(localStorage.getItem("customVocab") || "[]");
      const updatedCustom = customVocab.filter((item: any) => !selectedIds.includes(item.id));
      localStorage.setItem("customVocab", JSON.stringify(updatedCustom));

      const hiddenIds = JSON.parse(localStorage.getItem("hiddenIds") || "[]");
      const newHiddenIds = Array.from(new Set([...hiddenIds, ...selectedIds]));
      localStorage.setItem("hiddenIds", JSON.stringify(newHiddenIds));

      alert("ลบรายการที่เลือกเรียบร้อยแล้ว");
      window.location.reload();
    }
  };

  if (safeData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.nodata}>ไม่พบคำศัพท์</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Action Bar - ใช้ class จาก styles แทน inline style */}
      {selectedIds.length > 0 && (
        <div className={styles.actionBar}>
          <span>
            เลือกอยู่ <strong>{selectedIds.length}</strong> รายการ
          </span>
          <div className={styles.actionButtons}>
            <button onClick={handleReview} className={styles.reviewBtn}>
              <span className="material-symbols-outlined">quiz</span> ทบทวน
            </button>
            <button onClick={handleDelete} className={styles.deleteBtn}>
              <span className="material-symbols-outlined">delete</span> ลบออก
            </button>
          </div>
        </div>
      )}

      <table className={styles.vocabContainer}>
        <thead>
          <tr>
            <th className={styles.checkboxCell}>
              <input 
                type="checkbox" 
                onChange={handleSelectAll} 
                checked={isAllSelectedInPage} 
              />
            </th>
            <th>ลำดับ</th>
            <th>คำศัพท์</th>
            <th>POS</th>
            <th>คำอ่าน</th>
            <th>คำแปล</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr 
              key={item.id} 
              className={selectedIds.includes(item.id) ? styles.selectedRow : ""}
            >
              <td className={styles.checkboxCell}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(item.id)} 
                  onChange={() => handleSelectItem(item.id)} 
                />
              </td>
              <td>{indexOfFirstItem + index + 1}</td>
              <td className={styles.wordBold}>{item.word}</td>
              <td>{item.pos}</td>
              <td className={styles.phonetic}>{item.phonetic}</td>
              <td>{item.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }} 
            disabled={currentPage === 1} 
            className={styles.arrow}
          >
            <span className="material-symbols-outlined">arrow_back</span> ก่อนหน้า
          </button>
          <span className={styles.page}>หน้า {currentPage} / {totalPages}</span>
          <button 
            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }} 
            disabled={currentPage === totalPages} 
            className={styles.arrow}
          >
            ถัดไป <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
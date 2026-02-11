"use client";

import { useState } from "react";
import styles from "@/styles/tablevocab.module.css";

export default function VocabTable({ data }: { data: any[] }) {
  // --- 1. State สำหรับ Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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

  return (
    <div className={styles.container}>
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
            <tr key={item.id} className={selectedIds.includes(item.id) ? styles.selectedRow : ""}>
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
              {/* แก้ไขตรงนี้ให้ตรงกับ Database: item.phonetic และ item.meaning */}
              <td className={styles.phonetic}>{item.phonetic}</td>
              <td>{item.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- 3. ส่วนควบคุม Pagination --- */}
      <div className={styles.pagination}>
        <button 
          onClick={() => {
            setCurrentPage(p => Math.max(1, p - 1));
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 1}
        >
          ก่อนหน้า
        </button>
        
        <span>หน้า {currentPage} จาก {totalPages}</span>

        <button 
          onClick={() => {
            setCurrentPage(p => Math.min(totalPages, p + 1));
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === totalPages}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AlphabetFilter from "@/components/AlphabetFilter";
import VocabTable from "@/components/vocabtable";
import vocabData from "@/data/oxford3000.json";
import styles from "@/styles/vocabulary.module.css"

export default function VocabularyPage() {
  const [filter, setFilter] = useState("ALL");
  const [allVocab, setAllVocab] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. ดึงข้อมูลหลักจาก JSON (300 คำ)
    const baseVocab = vocabData;

    // 2. ดึงข้อมูลที่ผู้ใช้เพิ่มเองจาก LocalStorage
    const customVocab = JSON.parse(localStorage.getItem("customVocab") || "[]");

    // 3. รวมข้อมูลทั้งหมดเข้าด้วยกัน
    const combinedData = [...baseVocab, ...customVocab];

    // 4. ดึง ID ของคำศัพท์ที่ผู้ใช้กด "ลบ" (Blacklist) ออกจากหน้าจอ
    const hiddenIds = JSON.parse(localStorage.getItem("hiddenIds") || "[]");

    // 5. กรองข้อมูล: แสดงเฉพาะคำที่ไม่ได้อยู่ในรายการที่ถูกลบ
    const visibleVocab = combinedData.filter(item => !hiddenIds.includes(item.id));

    setAllVocab(visibleVocab);
    setIsLoaded(true);
  }, []);

  // ฟังก์ชันสำหรับการกรองตามตัวอักษร A-Z
  const filteredData = filter === "ALL" 
    ? allVocab 
    : allVocab.filter((item: any) => 
        item.word.toLowerCase().startsWith(filter.toLowerCase())
      );

  // ฟังก์ชันล้างข้อมูลเมื่อ Logout (ทำให้คำศัพท์ที่เพิ่มใหม่และที่กดลบหายไป)
  const handleLogout = () => {
    localStorage.removeItem("customVocab"); // ลบคำศัพท์ที่เพิ่มเอง
    localStorage.removeItem("hiddenIds");  // ล้างสถานะการลบคำศัพท์
    sessionStorage.removeItem("reviewItems"); // ล้างคำศัพท์ที่เลือกไปทบทวน
  };

  if (!isLoaded) {
    return <div className="container">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="container">
      <header>
        <h1 className={styles.vocab_title}>คำศัพท์ทั้งหมด</h1>
      </header>

      <nav>
        <Link href="/home">
          <button className="home-btn">
            <span className="material-symbols-outlined">home</span>
            กลับหน้าหลัก
          </button>
        </Link>

        {/* เมื่อคลิก ออกจากระบบ จะเรียกฟังก์ชัน handleLogout */}
        <Link href="/" onClick={handleLogout}>
          <button className="logout-btn">
            <span className="material-symbols-outlined">logout</span>
            ออกจากระบบ
          </button>
        </Link>
      </nav>

      <main className={styles.word}>
        <section className={styles.category}>
          {/* คอมโพเนนต์เลือกตัวอักษร */}
          <AlphabetFilter selected={filter} onSelect={setFilter} />
        </section>

        <section className={styles.table}>
          {/* ส่งข้อมูลที่ผ่านการกรองแล้วไปแสดงในตาราง */}
          <VocabTable data={filteredData} />
        </section>
      </main>
      
      <footer className={styles.footer}>
        แสดง {filteredData.length} คำ จากทั้งหมดที่พร้อมแสดง {allVocab.length} คำ
      </footer>
    </div>
  );
}
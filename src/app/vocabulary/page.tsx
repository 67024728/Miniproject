"use client";
import { useState } from "react";
import Link from "next/link";
import AlphabetFilter from "@/components/AlphabetFilter";
import VocabTable from "@/components/vocabtable";
import vocabData from "@/data/vocab300.json";
import styles from "@/styles/vocabulary.module.css"

export default function VocabularyPage() {
  const [filter, setFilter] = useState("ALL");
  
  const allVocab = vocabData;

  const filteredData = filter === "ALL" 
    ? allVocab 
    : allVocab.filter((item: any) => 
        item.word.toLowerCase().startsWith(filter.toLowerCase())
      );

  return (
    <div className="container">
      <header>
        <h1 className={styles.vocab_title}>คำศัพท์ทั้งหมด</h1>
      </header>

        <nav>
            <Link href="/">
            <button className="home-btn">
                <span className="material-symbols-outlined">home</span>
                กลับหน้าหลัก
            </button>
            </Link>
            
          <button className="logout-btn">
          <span className="material-symbols-outlined">logout</span>
          ออกจากระบบ
          </button>
        </nav>

      <main className={styles.word}>
        <section className={styles.category}>
          <AlphabetFilter selected={filter} onSelect={setFilter} />
        </section>

        <section className={styles.table}>
          <VocabTable data={filteredData} />
        </section>
      </main>
      
      <footer className={styles.footer}>
        แสดง {filteredData.length} จาก {allVocab.length} คำ
      </footer>
    </div>
  );
}
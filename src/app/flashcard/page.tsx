"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/flashcard.module.css";
import vocabData from "@/data/oxford3000.json"; 

export default function FlashcardPage() {
  const [shuffledVocab, setShuffledVocab] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isFlipped, setIsFlipped] = useState(false);   

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    // 1. ตรวจสอบว่ามีการเลือกคำศัพท์มาจากหน้าตารางหรือไม่
    const selectedItems = sessionStorage.getItem("reviewItems");
    
    if (selectedItems) {
      // ถ้ามี ให้ใช้เฉพาะคำที่เลือกมาทบทวน
      setShuffledVocab(JSON.parse(selectedItems));
    } else {
      // ถ้าไม่มี (เข้าหน้านี้โดยตรง) ให้ใช้ข้อมูลทั้งหมด (JSON + ที่เพิ่มใหม่ใน LocalStorage)
      const customVocab = JSON.parse(localStorage.getItem("customVocab") || "[]");
      const combinedData = [...vocabData, ...customVocab];
      setShuffledVocab(combinedData);
    }
  }, []);

  // ฟังก์ชันสลับคำ (Shuffle)
  const handleShuffle = () => {
    // ใช้ข้อมูลปัจจุบันใน State มา Shuffle
    const randomized = shuffleArray(shuffledVocab);
    setShuffledVocab(randomized);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const totalCards = shuffledVocab.length;
  const currentCard = shuffledVocab[currentIndex];
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  // ฟังก์ชันล้างข้อมูลเมื่อ Logout
  const handleLogout = () => {
    localStorage.removeItem("customVocab");
    sessionStorage.removeItem("reviewItems");
  };

  if (shuffledVocab.length === 0) {
    return <div className={styles.container}>ไม่พบคำศัพท์สำหรับการทบทวน...</div>;
  }

  return (
    <div className={styles.container}>
        <nav>
            <Link href="/home">
                <button className="home-btn">
                    <span className="material-symbols-outlined">home</span>
                    กลับหน้าหลัก
                </button>
            </Link>

          <button className={styles.shuffle_btn} onClick={handleShuffle}>
            <span className="material-symbols-outlined">shuffle</span>
          </button>

          <Link href="/" onClick={handleLogout}>
            <button className="logout-btn">
                <span className="material-symbols-outlined">logout</span>
                ออกจากระบบ
            </button>
          </Link>
        </nav>

      <div className={styles.progressWrapper}>
          <span className={styles.counter}>{currentIndex + 1} / {totalCards}</span>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
      </div>

      <main className={styles.main}>
        <div 
          className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={styles.cardFront}>
            <p className={styles.label}>คำศัพท์</p>
            <h1 className={styles.word}>{currentCard.word}</h1>
            <p className={styles.hintText}>คลิกเพื่อดูคำตอบ</p>
          </div>

          <div className={styles.cardBack}>
            <p className={styles.label}>คำแปล</p>
            <h1 className={styles.translation}>{currentCard.meaning}</h1>
            <p className={styles.reading}>{currentCard.phonetic}</p>
            <p className={styles.pos}>({currentCard.pos})</p>
            <p className={styles.hintText}>คลิกเพื่อกลับหน้าคำศัพท์</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.buttonGroup}>
          <button onClick={handlePrev} disabled={currentIndex === 0} className={styles.navBtn}>
            <span className="material-symbols-outlined">chevron_left</span> ก่อนหน้า
          </button>

          <button className={styles.flipBtn} onClick={() => setIsFlipped(!isFlipped)}>
            <span className="material-symbols-outlined">refresh</span> พลิกดูคำตอบ
          </button>

          <button onClick={handleNext} disabled={currentIndex === totalCards - 1} className={styles.navBtn}>
            ถัดไป <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
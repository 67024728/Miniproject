import React from 'react';
import Link from 'next/link';
import styles from "@/styles/home.module.css"

export default function Homepage() {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1>EASY VOCAB</h1>
        <p>วันนี้อยากทบทวนเรื่องอะไรดี?</p>
      </header>

      <nav>
        <Link href="/">
          <button className="logout-btn">
          <span className="material-symbols-outlined">logout</span>
          ออกจากระบบ
          </button>
        </Link>
      </nav>
      
      <main>
        <section className={styles.menu}>
          <Link href="/vocabulary">
            <article className={styles.menubtn_one}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>import_contacts</span>
              <h3>คำศัพท์ทั้งหมด</h3>
              <p>ดูและจัดการคำศัพท์</p>
            </article>
          </Link>

          <Link href="/add-vocab">
            <article className={styles.menubtn_two}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>add</span>
              <h3>เพิ่มคำศัพท์</h3>
              <p>เพิ่มคำศัพท์ใหม่</p>
            </article>
          </Link>

          <Link href="/flashcard">
            <article className={styles.menubtn_three}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>cached</span>
              <h3>ทบทวน</h3>
              <p>ทบทวนด้วย Flashcards</p>
            </article>
          </Link>
        </section>
        
        <section className={styles.advice}>
          <h2>เริ่มต้นใช้งาน</h2>
          <ul className={styles.box}>
            <li>คลิก "เพิ่มคำศัพท์" เพื่อเริ่มสร้างคำศัพท์ของคุณ</li>
            <li>ใช้ระบบ A-Z Filter ในหน้า "คำศัพท์ทั้งหมด" เพื่อค้นหาคำที่ต้องการ</li>
            <li>ทบทวนด้วย Flashcards 3D ที่สามารถพลิกดูคำตอบได้</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
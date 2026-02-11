"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/new.module.css"

export default function Addvocabpage() {
  return (
    <div className='container'>
        <header>
            <h1 className={styles.new_vocab}>เพิ่มคำศัพท์ใหม่</h1>
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

            <button className="delete-btn">
                <span className="material-symbols-outlined">delete</span>
                ล้างทั้งหมด
            </button>

            <button className="save-btn">
                <span className="material-symbols-outlined">save</span>
                บันทึก
            </button>
        </nav>

        <main>
            <section className={styles.box}>
                <p className={styles.advice}>คำแนะนำ: พิมพ์ข้อมูลในแถวสุดท้าย แถวใหม่จะถูกเพิ่มอัตโนมัติ | คำศัพท์และคำแปลเป็นข้อมูลที่จำเป็น (POS = Part of Speech)</p>
            </section>

            <section className={styles.vocabtable}>
            </section>
        </main>
    </div>
  );
}
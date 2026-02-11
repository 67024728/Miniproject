"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/flashcard.module.css"

export default function Addvocabpage() {
  return (
    <div className='container'>
        <nav>
            <Link href="/">
            <button className="home-btn">
                <span className="material-symbols-outlined">home</span>
                กลับหน้าหลัก
            </button>
            </Link>

            <button className="refresh-btn">
                <span className="material-symbols-outlined">refresh</span>
            </button>

            <button className="logout-btn">
            <span className="material-symbols-outlined">logout</span>
            ออกจากระบบ
            </button>
        </nav>

        <footer>
          <div></div>
        </footer>

    </div>
  );
}
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "@/styles/login.module.css";

export default function Loginpage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ในอนาคตควรใช้ NextAuth หรือเก็บ Token ใน Cookie
        alert("เข้าสู่ระบบสำเร็จ!");
        router.push('/home');
      } else {
        setError(data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>EASY VOCAB</h1>
        <div className={styles.sub_header}>
          <span className={styles.line}></span>
          <p className={styles.word}>📚 เรียนรู้คำศัพท์ง่าย ๆ</p>
          <span className={styles.line}></span>
        </div>
      </header>

      <main className={styles.login_card}>
        <h2 className={styles.form_title}>ลงชื่อเข้าใช้</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="email">อีเมล</label>
            <div className={styles.input_wrapper}>
              <span className={`material-symbols-outlined ${styles.input_icon}`}>mail</span>
              <input 
                type="email" 
                id="email"
                placeholder="your@email.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="password">รหัสผ่าน</label>
            <div className={styles.input_wrapper}>
              <span className={`material-symbols-outlined ${styles.input_icon}`}>lock</span>
              <input 
                type="password" 
                id="password" 
                placeholder="........" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.remember_me}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">จดจำฉันในระบบ</label>
            </div>
          </div>

          <button type="submit" className={styles.login_btn} disabled={loading}>
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className={styles.footer_text}>
          ยังไม่มีบัญชี? <Link href="/register">สร้างบัญชีใหม่</Link>
        </p>
      </main>
    </div>
  );
}
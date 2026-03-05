"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // ฟังก์ชันอัปเดตค่าใน State ตาม input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Validation เบื้องต้น
    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("สมัครสมาชิกสำเร็จ!");
        router.push('/'); // ส่งไปหน้า Login (หรือหน้าแรก)
      } else {
        setError(data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch (err) {
      setError("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
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

      <main className={styles.register_card}>
        <h2 className={styles.form_title}>สมัครสมาชิก</h2>
        
        {/* แสดง Error Message ถ้ามี */}
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* ชื่อผู้ใช้ */}
          <div className={styles.input_group}>
            <label htmlFor="username">ชื่อผู้ใช้</label>
            <div className={styles.input_wrapper}>
              <span className={`material-symbols-outlined ${styles.input_icon}`}>person</span>
              <input 
                type="text" 
                id="username" 
                placeholder="ชื่อของคุณ" 
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* อีเมล */}
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

          {/* รหัสผ่าน */}
          <div className={styles.input_group}>
            <label htmlFor="password">รหัสผ่าน</label>
            <div className={styles.input_wrapper}>
              <span className={`material-symbols-outlined ${styles.input_icon}`}>lock</span>
              <input 
                type="password" 
                id="password" 
                placeholder="อย่างน้อย 8 ตัวอักษร" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ยืนยันรหัสผ่าน */}
          <div className={styles.input_group}>
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <div className={styles.input_wrapper}>
              <span className={`material-symbols-outlined ${styles.input_icon}`}>enhanced_encryption</span>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="........" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.register_btn} 
            disabled={loading}
          >
            {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </button>

          <p className={styles.footer_text}>
            มีบัญชีอยู่แล้ว? <Link href="/">เข้าสู่ระบบที่นี่</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/new.module.css";

export default function Addvocabpage() {
  // 1. เริ่มต้นด้วย Array ที่มี 1 แถวว่าง
  const [rows, setRows] = useState([
    { word: "", pos: "", phonetic: "", meaning: "" }
  ]);

  // 2. ฟังก์ชันจัดการการพิมพ์ข้อมูล
  const handleChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };

    // ตรวจสอบว่าถ้าพิมพ์ที่ "แถวสุดท้าย" ให้เพิ่มแถวใหม่ต่อท้ายอัตโนมัติ
    if (index === rows.length - 1 && value.trim() !== "") {
      newRows.push({ word: "", pos: "", phonetic: "", meaning: "" });
    }

    setRows(newRows);
  };

  // 3. ฟังก์ชันบันทึกข้อมูล
  const handleSave = () => {
    // กรองเอาเฉพาะแถวที่มีข้อมูล (อย่างน้อยต้องมี Word และ Meaning)
    const validData = rows.filter(row => row.word.trim() !== "" && row.meaning.trim() !== "");

    if (validData.length === 0) {
      alert("กรุณากรอกข้อมูลคำศัพท์และคำแปลอย่างน้อย 1 แถว");
      return;
    }

    // เพิ่ม ID ให้กับข้อมูลใหม่แต่ละตัว
    const dataToSave = validData.map(item => ({
      ...item,
      id: Date.now() + Math.random() // ป้องกัน ID ซ้ำกรณีบันทึกพร้อมกันหลายแถว
    }));

    const existingData = JSON.parse(localStorage.getItem("customVocab") || "[]");
    const updatedData = [...existingData, ...dataToSave];
    
    localStorage.setItem("customVocab", JSON.stringify(updatedData));
    
    // ล้างค่ากลับเป็นแถวเดียวเริ่มต้น
    setRows([{ word: "", pos: "", phonetic: "", meaning: "" }]);
    alert(`บันทึกสำเร็จทั้งหมด ${dataToSave.length} คำศัพท์!`);
  };

  const handleClear = () => {
    setRows([{ word: "", pos: "", phonetic: "", meaning: "" }]);
  };

  return (
    <div className='container'>
        <header>
            <h1 className={styles.new_vocab}>เพิ่มคำศัพท์ใหม่</h1>
        </header>

        <nav>
            <Link href="/home">
                <button className="home-btn"><span className="material-symbols-outlined">home</span> กลับหน้าหลัก</button>
            </Link>
            <Link href="/" onClick={() => localStorage.removeItem("customVocab")}>
                <button className="logout-btn"><span className="material-symbols-outlined">logout</span> ออกจากระบบ</button>
            </Link>
        </nav>

        <main>
            <section className={styles.box}>
                <p className={styles.advice}>💡 คำแนะนำ: พิมพ์ข้อมูลในแถวสุดท้าย แถวใหม่จะถูกเพิ่มอัตโนมัติ | คำศัพท์และคำแปลเป็นข้อมูลที่จำเป็น</p>
                <button className="delete-btn" onClick={handleClear}>
                    <span className="material-symbols-outlined">delete</span> ล้างทั้งหมด
                </button>
                <button className="save-btn" onClick={handleSave}>
                    <span className="material-symbols-outlined">save</span> บันทึก
                </button>
            </section>

            <section>
                <table className={styles.vocabletable}>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>คำศัพท์<span className={styles.required_mark}>*</span></th>
                            <th>POS</th>
                            <th>คำอ่าน</th>
                            <th>คำแปล<span className={styles.required_mark}>*</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={row.word} 
                                        onChange={(e) => handleChange(index, "word", e.target.value)} 
                                        placeholder="เช่น apple" 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={row.pos} 
                                        onChange={(e) => handleChange(index, "pos", e.target.value)} 
                                        placeholder="n., v." 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={row.phonetic} 
                                        onChange={(e) => handleChange(index, "phonetic", e.target.value)} 
                                        placeholder="/æp.əl/" 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={row.meaning} 
                                        onChange={(e) => handleChange(index, "meaning", e.target.value)} 
                                        placeholder="แอปเปิ้ล" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    </div>
  );
}
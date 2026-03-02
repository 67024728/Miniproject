import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // เรียกใช้จากไฟล์ที่เราสร้างข้อ 2
import bcrypt from "bcryptjs"; // อย่าลืมลง npm install bcryptjs

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // 1. ตรวจสอบว่ามี user หรือ email นี้หรือยัง
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้ไปแล้ว" }, { status: 400 });
    }

    // 2. Hash รหัสผ่าน (เพื่อความปลอดภัยตามที่คุณคอมเมนต์ไว้ใน schema)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. บันทึกลง Database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. ค้นหาผู้ใช้จาก Email ใน Prisma (MongoDB)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "ไม่พบอีเมลนี้ในระบบ" }, { status: 401 });
    }

    // 2. ตรวจสอบรหัสผ่านที่รับมา กับรหัสผ่านที่ Hash ไว้ใน DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    // 3. ถ้าผ่านหมด (ในระบบจริงควรสร้าง Session หรือ JWT ที่นี่)
    return NextResponse.json({ 
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email }
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const admin = await prisma.admins.findUnique({
      where: { email },
    });

    if (!admin) {
      return { error: "Invalid email or password." };
    }

    // Verify bcrypt password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return { error: "Invalid email or password." };
    }

    // Create session
    await createSession(admin.id, admin.email, admin.full_name);
    
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function handleLogout() {
  await logout();
  redirect("/secure_portal_99/login");
}

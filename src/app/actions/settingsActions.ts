"use server";

import prisma from "@/lib/prisma";
import { getSession, createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function updateAdminSettings(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const full_name = formData.get("full_name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const profile_picture = formData.get("profile_picture") as File | null;

  if (!full_name || !email) {
    return { error: "Name and email are required" };
  }

  try {
    const dataToUpdate: any = { full_name, email };

    // Handle password update if provided
    if (password && password.trim() !== "") {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // Handle profile picture upload
    if (profile_picture && profile_picture.size > 0) {
      const bytes = await profile_picture.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const fileName = `${uuidv4()}-${profile_picture.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/admin");
      
      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      
      dataToUpdate.profile_picture = fileName;
    }

    // Update in DB
    const updatedAdmin = await prisma.admins.update({
      where: { id: session.adminId },
      data: dataToUpdate,
    });

    // Refresh session with new data
    await createSession(updatedAdmin.id, updatedAdmin.email, updatedAdmin.full_name, updatedAdmin.profile_picture);

    revalidatePath("/secure_portal_99");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { error: "Failed to update settings" };
  }
}

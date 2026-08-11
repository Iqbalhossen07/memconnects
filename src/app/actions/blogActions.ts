"use server";

import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

export async function addBlog(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as any;
    const content = formData.get("content") as string;
    const imageFile = formData.get("featured_image") as File;

    let imagePath = "";

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
      try {
        await fs.mkdir(uploadDir, { recursive: true });
      } catch (err) {}
      
      const ext = path.extname(imageFile.name);
      const fileName = `${uuidv4()}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      
      await fs.writeFile(filePath, buffer);
      imagePath = `uploads/blogs/${fileName}`;
    }

    await prisma.blogs.create({
      data: {
        title,
        category,
        status,
        content,
        featured_image: imagePath,
      },
    });

    revalidatePath("/secure_portal_99/blogs");
    revalidatePath("/");
    revalidatePath("/blogs");
    
    return { success: true };
  } catch (error: any) {
    console.error("Add blog error:", error);
    return { error: "Failed to add blog. Please try again." };
  }
}

export async function updateBlog(id: number, prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as any;
    const content = formData.get("content") as string;
    const imageFile = formData.get("featured_image") as File;

    const dataToUpdate: any = {
      title,
      category,
      status,
      content,
    };

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
      try {
        await fs.mkdir(uploadDir, { recursive: true });
      } catch (err) {}
      
      const ext = path.extname(imageFile.name);
      const fileName = `${uuidv4()}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      
      await fs.writeFile(filePath, buffer);
      dataToUpdate.featured_image = `uploads/blogs/${fileName}`;
    }

    await prisma.blogs.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/secure_portal_99/blogs");
    revalidatePath("/");
    revalidatePath("/blogs");
    
    return { success: true };
  } catch (error: any) {
    console.error("Update blog error:", error);
    return { error: "Failed to update blog. Please try again." };
  }
}

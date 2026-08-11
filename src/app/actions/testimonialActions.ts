"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTestimonial(prevState: any, formData: FormData) {
  try {
    const student_name = formData.get("student_name") as string;
    const review_text = formData.get("review_text") as string;

    await prisma.testimonials.create({
      data: {
        student_name,
        review_text,
      },
    });

    revalidatePath("/secure_portal_99/testimonials");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Add testimonial error:", error);
    return { error: "Failed to add testimonial. Please try again." };
  }
}

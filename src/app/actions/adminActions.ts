"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteApplication(id: number) {
  await prisma.applications.delete({
    where: { id },
  });
  revalidatePath("/secure_portal_99/applications");
}

export async function updateApplicationStatus(id: number, status: string) {
  await prisma.applications.update({
    where: { id },
    data: { status },
  });
  revalidatePath(`/secure_portal_99/applications/${id}`);
  revalidatePath("/secure_portal_99/applications");
}

export async function deleteBlog(id: number) {
  await prisma.blogs.delete({
    where: { id },
  });
  revalidatePath("/secure_portal_99/blogs");
  revalidatePath("/");
  revalidatePath("/blogs");
}

export async function deleteTestimonial(id: number) {
  await prisma.testimonials.delete({
    where: { id },
  });
  revalidatePath("/secure_portal_99/testimonials");
  revalidatePath("/");
}

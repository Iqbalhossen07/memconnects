"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  try {
    const messages = await prisma.contact_messages.findMany({
      orderBy: { submission_date: "desc" },
    });
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function getUnreadMessagesCount() {
  try {
    const count = await prisma.contact_messages.count({
      where: { is_read: false },
    });
    return count;
  } catch (error) {
    return 0;
  }
}

export async function markMessageAsRead(id: number) {
  try {
    await prisma.contact_messages.update({
      where: { id },
      data: { is_read: true },
    });
    revalidatePath("/secure_portal_99/messages");
    return { success: true };
  } catch (error) {
    console.error("Error marking message as read:", error);
    return { success: false, message: "Failed to mark as read." };
  }
}

export async function deleteMessage(id: number) {
  try {
    await prisma.contact_messages.delete({
      where: { id },
    });
    revalidatePath("/secure_portal_99/messages");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, message: "Failed to delete message." };
  }
}

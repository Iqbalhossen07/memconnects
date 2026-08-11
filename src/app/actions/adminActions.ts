"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export async function deleteApplication(id: number) {
  await prisma.applications.delete({
    where: { id },
  });
  revalidatePath("/secure_portal_99/applications");
}

export async function updateApplicationStatus(id: number, status: string) {
  const app = await prisma.applications.update({
    where: { id },
    data: { status },
  });

  // Send status update email to student
  if (app.email) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      let statusMessage = "";
      if (status === "In Progress") {
        statusMessage = "Your application is currently being reviewed by our expert advisory team. We are processing your documents and will update you soon.";
      } else if (status === "Approved") {
        statusMessage = "Congratulations! Your application has been approved. Our team will contact you shortly with further instructions.";
      } else if (status === "Rejected") {
        statusMessage = "We regret to inform you that your application has not been successful at this time. Please contact our advisory team for feedback.";
      } else {
        statusMessage = "The status of your application has been updated to Pending.";
      }

      const mailOptions = {
        from: `"Mem Connects" <${process.env.SMTP_USER}>`,
        to: app.email,
        subject: `Application Status Update - Mem Connects`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #6D5795; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Status Update</h1>
            </div>
            <div style="padding: 40px 30px; background-color: #ffffff;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear <strong>${app.name || ''} ${app.family_name || ''}</strong>,</p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                There has been an update to your application status for the <strong>${app.Programme || 'requested'}</strong> programme.
              </p>
              
              <div style="background-color: #FDF8F3; border-left: 4px solid #F2852C; padding: 15px 20px; margin: 25px 0;">
                <h3 style="color: #9a3412; margin-top: 0; font-size: 16px;">Current Status: <span style="color: #6D5795;">${status}</span></h3>
                <p style="color: #c2410c; margin-bottom: 0; font-size: 14px; line-height: 1.5;">${statusMessage}</p>
              </div>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">If you have any questions, please feel free to reply to this email.</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                Warm regards,<br/>
                <strong>Mem Connects Team</strong>
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending status update email", error);
    }
  }

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

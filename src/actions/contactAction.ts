"use server";

import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

export async function submitContactForm(formData: FormData) {
  // Anti-bot honeypot check
  const websiteUrl = formData.get("website_url");
  if (websiteUrl) {
    return { success: false, message: "Bot detected!" };
  }

  const name = formData.get("contact_name") as string;
  const email = formData.get("contact_email") as string;
  const subject = formData.get("contact_subject") as string;
  const latestDegree = formData.get("latest_degree") as string;
  const cgpa = formData.get("cgpa") as string;
  const interestedProgram = formData.get("interested_program") as string;
  const message = formData.get("contact_message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "Required fields are missing." };
  }

  try {
    // Save to Database
    await prisma.contact_messages.create({
      data: {
        sender_name: name,
        sender_email: email,
        subject: subject,
        latest_degree: latestDegree || null,
        cgpa: cgpa || null,
        interested_program: interestedProgram || null,
        message: message,
      }
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_USER, // sending to the same email
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Latest Degree:</strong> ${latestDegree}</p>
        <p><strong>CGPA:</strong> ${cgpa}</p>
        <p><strong>Interested Program:</strong> ${interestedProgram}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send the message. Please try again later." };
  }
}

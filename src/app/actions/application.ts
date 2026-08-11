"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

// Helper to save uploaded file
async function saveFile(file: File | null, folder: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // Ignore if directory exists
  }
  
  const ext = path.extname(file.name);
  const fileName = `${uuidv4()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  
  await fs.writeFile(filePath, buffer);
  
  return `uploads/${folder}/${fileName}`;
}

export async function submitApplication(prevState: any, formData: FormData) {
  try {
    // Process File Uploads
    const passport_all_used_copy = await saveFile(formData.get("passport_all_used_copy") as File, "passports");
    const all_official_certificates_marksheets = await saveFile(formData.get("all_official_certificates_marksheets") as File, "certificates");
    const cv_two_references = await saveFile(formData.get("cv_two_references") as File, "cv_references");
    const passport_photo = await saveFile(formData.get("passport_photo") as File, "photos");
    const others_document = await saveFile(formData.get("others_document") as File, "others");

    // Helper to parse dates securely
    const parseDate = (val: string | null) => val ? new Date(val) : null;

    // Build data object
    const data = {
      name: formData.get("name")?.toString(),
      family_name: formData.get("family_name")?.toString(),
      email: formData.get("email")?.toString(),
      phone: formData.get("phone")?.toString(),
      date_Of_Birth: parseDate(formData.get("date_Of_Birth")?.toString() || null),
      nationality: formData.get("nationality")?.toString(),
      country_Of_Birth: formData.get("country_Of_Birth")?.toString(),
      native_Language: formData.get("native_Language")?.toString(),
      
      name_appears_in_passport: formData.get("name_appears_in_passport")?.toString(),
      passport_Number: formData.get("passport_Number")?.toString(),
      passport_issue_location: formData.get("passport_issue_location")?.toString(),
      issue_date: parseDate(formData.get("issue_date")?.toString() || null),
      expiry_date: parseDate(formData.get("expiry_date")?.toString() || null),
      
      address_with_postal_Code: formData.get("address_with_postal_Code")?.toString(),
      
      emergency_contact_Name: formData.get("emergency_contact_Name")?.toString(),
      emergency_contact_Telephone: formData.get("emergency_contact_Telephone")?.toString(),
      emergency_contact_Email: formData.get("emergency_contact_Email")?.toString(),
      emergency_contact_Relationship: formData.get("emergency_contact_Relationship")?.toString(),
      
      UK_in_the_past_ten_years: formData.get("UK_in_the_past_ten_years")?.toString(),
      Date_of_Arrival: parseDate(formData.get("Date_of_Arrival")?.toString() || null),
      Date_of_Departure: parseDate(formData.get("Date_of_Departure")?.toString() || null),
      Visa_Start_date: parseDate(formData.get("Visa_Start_date")?.toString() || null),
      Visa_Expiry_date: parseDate(formData.get("Visa_Expiry_date")?.toString() || null),
      Purpose_of_visit: formData.get("Purpose_of_visit")?.toString(),
      Visa_type: formData.get("Visa_type")?.toString(),
      visa_to_stay_in_the_UK: formData.get("visa_to_stay_in_the_UK")?.toString(),
      Refusal_type: formData.get("Refusal_type")?.toString(),
      Date_of_Refusal: parseDate(formData.get("Date_of_Refusal")?.toString() || null),
      Details: formData.get("Details")?.toString(),
      Country: formData.get("Country")?.toString(),
      
      // Masters
      masters_Institution: formData.get("masters_Institution")?.toString(),
      masters_Course: formData.get("masters_Course")?.toString(),
      masters_Level_of_Study: formData.get("masters_Level_of_Study")?.toString(),
      masters_Results: formData.get("masters_Results")?.toString(),
      masters_Start_date: parseDate(formData.get("masters_Start_date")?.toString() || null),
      masters_End_Date: parseDate(formData.get("masters_End_Date")?.toString() || null),
      
      // Undergrad
      under_Institution: formData.get("under_Institution")?.toString(),
      under_Course: formData.get("under_Course")?.toString(),
      under_Level_of_Study: formData.get("under_Level_of_Study")?.toString(),
      under_Result: formData.get("under_Result")?.toString(),
      under_Start_date: parseDate(formData.get("under_Start_date")?.toString() || null),
      under_End_Date: parseDate(formData.get("under_End_Date")?.toString() || null),
      
      // HSC
      HSC_Institution: formData.get("HSC_Institution")?.toString(),
      HSC_Course: formData.get("HSC_Course")?.toString(),
      HSC_Level_of_Study: formData.get("HSC_Level_of_Study")?.toString(),
      HSC_Result: formData.get("HSC_Result")?.toString(),
      HSC_Start_date: parseDate(formData.get("HSC_Start_date")?.toString() || null),
      HSC_End_Date: parseDate(formData.get("HSC_End_Date")?.toString() || null),
      
      // SSC
      SSC_Institution: formData.get("SSC_Institution")?.toString(),
      SSC_Course: formData.get("SSC_Course")?.toString(),
      SSC_Level_of_Study: formData.get("SSC_Level_of_Study")?.toString(),
      SSC_Result: formData.get("SSC_Result")?.toString(),
      SSC_Start_date: parseDate(formData.get("SSC_Start_date")?.toString() || null),
      SSC_End_Date: parseDate(formData.get("SSC_End_Date")?.toString() || null),
      
      // Interests
      Academic_interests_Level_of_study: formData.get("Academic_interests_Level_of_study")?.toString(),
      Discipline: formData.get("Discipline")?.toString(),
      Programme: formData.get("Programme")?.toString(),
      interests_Start_date: parseDate(formData.get("interests_Start_date")?.toString() || null),
      Location: formData.get("Location")?.toString(),
      
      // English Test
      Duo_lingo: formData.get("Duo_lingo")?.toString(),
      GMAT: formData.get("GMAT")?.toString(),
      IELTS: formData.get("IELTS")?.toString(),
      IELTS_UKVI: formData.get("IELTS_UKVI")?.toString(),
      PTE: formData.get("PTE")?.toString(),
      TOFEL: formData.get("TOFEL")?.toString(),
      Date_of_test: parseDate(formData.get("Date_of_test")?.toString() || null),
      Overall_Score: formData.get("Overall_Score")?.toString(),
      Reading: formData.get("Reading")?.toString(),
      Writing: formData.get("Writing")?.toString(),
      Listening: formData.get("Listening")?.toString(),
      Speaking: formData.get("Speaking")?.toString(),
      
      // Employment
      Job_title: formData.get("Job_title")?.toString(),
      Name_of_organization: formData.get("Name_of_organization")?.toString(),
      Address_of_organization: formData.get("Address_of_organization")?.toString(),
      work_Phone_number: formData.get("work_Phone_number")?.toString(),
      From_date: parseDate(formData.get("From_date")?.toString() || null),
      To_date: parseDate(formData.get("To_date")?.toString() || null),
      Student_currently_works: formData.get("Student_currently_works")?.toString(),
      
      // Documents
      passport_all_used_copy,
      all_official_certificates_marksheets,
      cv_two_references,
      passport_photo,
      others_document,
      
      status: "Pending"
    };

    await prisma.applications.create({
      data: data
    });

    // Send Email Notification
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

      // 1. Admin Email Template
      const adminMailOptions = {
        from: `"${data.name || 'Applicant'} ${data.family_name || ''}" <${process.env.SMTP_USER}>`,
        replyTo: data.email,
        to: process.env.SMTP_USER,
        subject: `New Application Received: ${data.name || ''} ${data.family_name || ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #F2852C; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0;">New Application Received</h2>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <p style="color: #374151; font-size: 16px;">A new student application has been submitted through the portal.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563; width: 35%;">Applicant Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.name || ''} ${data.family_name || ''}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Email Address</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.email || 'N/A'}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Phone Number</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Nationality</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.nationality || 'N/A'}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Interested Level</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.Academic_interests_Level_of_study || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Programme</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.Programme || 'N/A'}</td>
                </tr>
              </table>

              <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/secure_portal_99/applications" style="background-color: #6D5795; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Full Details in Admin Portal</a>
              </div>
            </div>
            <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">This is an automated notification from Mem Connects Application Portal.</p>
            </div>
          </div>
        `,
      };

      // 2. Student Confirmation Email Template
      const studentMailOptions = {
        from: `"Mem Connects" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `Application Received - Mem Connects`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #6D5795; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Thank You!</h1>
              <p style="color: #e5e7eb; margin-top: 10px; font-size: 16px;">We have received your application</p>
            </div>
            <div style="padding: 40px 30px; background-color: #ffffff;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear <strong>${data.name || ''} ${data.family_name || ''}</strong>,</p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for applying to study in the UK through Mem Connects. We have successfully received your application details for the <strong>${data.Programme || 'requested'}</strong> programme.
              </p>
              
              <div style="background-color: #FDF8F3; border-left: 4px solid #F2852C; padding: 15px 20px; margin: 25px 0;">
                <h3 style="color: #9a3412; margin-top: 0; font-size: 16px;">What happens next?</h3>
                <p style="color: #c2410c; margin-bottom: 0; font-size: 14px; line-height: 1.5;">Our expert advisory team will review your application and documents carefully. We will contact you shortly via email or phone to discuss the next steps in your admission process.</p>
              </div>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">If you have any urgent questions, please feel free to reply to this email or contact us through our website.</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                Warm regards,<br/>
                <strong>Mem Connects Team</strong>
              </p>
            </div>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0 0 10px 0;">Mem Connects | UK University Admissions Specialists</p>
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Mem Connects. All rights reserved.</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
      if (data.email) {
        await transporter.sendMail(studentMailOptions);
      }
    } catch (emailError) {
      console.error("Error sending application email:", emailError);
      // We don't want to fail the submission if email fails, so just log it.
    }

    return { success: true, message: "Application submitted successfully!" };
  } catch (error: any) {
    console.error("Application submission error:", error);
    return { success: false, message: error.message || "Failed to submit application. Please try again." };
  }
}

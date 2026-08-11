"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

    return { success: true, message: "Application submitted successfully!" };
  } catch (error: any) {
    console.error("Application submission error:", error);
    return { success: false, message: error.message || "Failed to submit application. Please try again." };
  }
}

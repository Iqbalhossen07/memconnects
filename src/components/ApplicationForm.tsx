"use client";

import { useState } from "react";
import { submitApplication } from "@/app/actions/application";

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await submitApplication(null, formData);
      setResult(res);
      
      if (res.success) {
        (e.target as HTMLFormElement).reset();
      }
    } catch (err: any) {
      setResult({ success: false, message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const InputField = ({ label, name, type = "text", required = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} required={required} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] focus:border-transparent outline-none transition bg-white" />
    </div>
  );

  const FileField = ({ label, name, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type="file" name={name} required={required} className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#F2852C] hover:file:bg-orange-100 transition cursor-pointer border border-gray-300 rounded-lg bg-white" />
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="border-b-2 border-gray-100 pb-3 mb-6 mt-10 first:mt-0">
      <h2 className="text-2xl font-bold text-[#6D5795]">{title}</h2>
    </div>
  );

  if (result?.success) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-check text-4xl text-green-500"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-8">{result.message}</p>
        <button onClick={() => setResult(null)} className="bg-[#F2852C] hover:bg-[#D9721B] text-white px-8 py-3 rounded-full font-bold transition">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
      {result && !result.success && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
          <p className="text-red-700 font-medium">{result.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Details */}
        <div>
          <SectionTitle title="1. Personal Details" />
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField label="First Name" name="name" required />
            <InputField label="Family Name (Surname)" name="family_name" required />
            <InputField label="Email Address" name="email" type="email" required />
            <InputField label="Phone Number" name="phone" type="tel" required />
            <InputField label="Date of Birth" name="date_Of_Birth" type="date" required />
            <InputField label="Nationality" name="nationality" required />
            <InputField label="Country of Birth" name="country_Of_Birth" required />
            <InputField label="Native Language" name="native_Language" required />
            <div className="md:col-span-2">
              <InputField label="Full Address (with Postal Code)" name="address_with_postal_Code" required />
            </div>
          </div>
        </div>

        {/* Passport & Visa */}
        <div>
          <SectionTitle title="2. Passport & Visa Details" />
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField label="Name as appears in passport" name="name_appears_in_passport" />
            <InputField label="Passport Number" name="passport_Number" />
            <InputField label="Passport Issue Location" name="passport_issue_location" />
            <InputField label="Issue Date" name="issue_date" type="date" />
            <InputField label="Expiry Date" name="expiry_date" type="date" />
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Have you been to the UK in the past 10 years?</label>
              <select name="UK_in_the_past_ten_years" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none bg-white">
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <InputField label="Visa Type (If applicable)" name="Visa_type" />
            <InputField label="Visa Expiry Date" name="Visa_Expiry_date" type="date" />
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <SectionTitle title="3. Emergency Contact" />
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField label="Contact Name" name="emergency_contact_Name" />
            <InputField label="Relationship" name="emergency_contact_Relationship" />
            <InputField label="Telephone" name="emergency_contact_Telephone" type="tel" />
            <InputField label="Email" name="emergency_contact_Email" type="email" />
          </div>
        </div>

        {/* Academic History */}
        <div>
          <SectionTitle title="4. Academic History" />
          
          <h3 className="font-bold text-gray-700 mb-4 text-lg">Masters / PG (If applicable)</h3>
          <div className="grid md:grid-cols-2 gap-x-6 mb-6">
            <InputField label="Institution" name="masters_Institution" />
            <InputField label="Course" name="masters_Course" />
            <InputField label="Result/CGPA" name="masters_Results" />
            <InputField label="Passing Year (End Date)" name="masters_End_Date" type="date" />
          </div>

          <h3 className="font-bold text-gray-700 mb-4 text-lg">Undergraduate / Bachelor</h3>
          <div className="grid md:grid-cols-2 gap-x-6 mb-6">
            <InputField label="Institution" name="under_Institution" />
            <InputField label="Course" name="under_Course" />
            <InputField label="Result/CGPA" name="under_Result" />
            <InputField label="Passing Year (End Date)" name="under_End_Date" type="date" />
          </div>

          <h3 className="font-bold text-gray-700 mb-4 text-lg">HSC / A-Levels</h3>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField label="Institution" name="HSC_Institution" />
            <InputField label="Result/GPA" name="HSC_Result" />
            <InputField label="Passing Year (End Date)" name="HSC_End_Date" type="date" />
          </div>
        </div>

        {/* Academic Interests & English */}
        <div>
          <SectionTitle title="5. Academic Interests & English Test" />
          <div className="grid md:grid-cols-2 gap-x-6 mb-6">
            <InputField label="Level of Study (Applying for)" name="Academic_interests_Level_of_study" required />
            <InputField label="Preferred Programme/Course" name="Programme" required />
          </div>

          <h3 className="font-bold text-gray-700 mb-4 text-lg">English Language Test (IELTS/PTE/TOEFL)</h3>
          <div className="grid md:grid-cols-3 gap-x-6">
            <InputField label="Test Type (e.g. IELTS UKVI)" name="IELTS_UKVI" />
            <InputField label="Overall Score" name="Overall_Score" />
            <InputField label="Date of Test" name="Date_of_test" type="date" />
            <InputField label="Reading" name="Reading" />
            <InputField label="Writing" name="Writing" />
            <InputField label="Listening" name="Listening" />
            <InputField label="Speaking" name="Speaking" />
          </div>
        </div>

        {/* Employment */}
        <div>
          <SectionTitle title="6. Employment History" />
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField label="Job Title" name="Job_title" />
            <InputField label="Organization Name" name="Name_of_organization" />
            <InputField label="From Date" name="From_date" type="date" />
            <InputField label="To Date" name="To_date" type="date" />
            <div className="md:col-span-2">
              <InputField label="Organization Address" name="Address_of_organization" />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div>
          <SectionTitle title="7. Document Uploads" />
          <div className="grid md:grid-cols-2 gap-x-6">
            <FileField label="Passport Copy (All used pages)" name="passport_all_used_copy" />
            <FileField label="All Official Certificates & Marksheets" name="all_official_certificates_marksheets" />
            <FileField label="CV & Two References" name="cv_two_references" />
            <FileField label="Passport Size Photo" name="passport_photo" />
            <FileField label="Other Documents (If any)" name="others_document" />
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full md:w-auto px-10 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F2852C] hover:bg-[#D9721B] hover:shadow-xl transform hover:-translate-y-1'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-circle-notch fa-spin mr-3"></i> Submitting Application...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Submit Application <i className="fas fa-paper-plane ml-3"></i>
              </span>
            )}
          </button>
          <p className="text-gray-500 text-sm mt-4">By submitting this form, you agree to Mem Connects processing your data for university admission purposes.</p>
        </div>

      </form>
    </div>
  );
}

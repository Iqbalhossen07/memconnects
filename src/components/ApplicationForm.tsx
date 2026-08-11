"use client";

import { useState } from "react";
import { submitApplication } from "@/app/actions/application";
import { 
  MdPerson, 
  MdFlight, 
  MdContactPhone, 
  MdSchool, 
  MdLanguage, 
  MdWork, 
  MdFolder
} from "react-icons/md";

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
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} required={required} className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#F2852C] focus:border-transparent outline-none transition-all bg-white" />
    </div>
  );

  const FileField = ({ label, name, required = false }: any) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type="file" name={name} required={required} className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#F2852C] hover:file:bg-orange-100 transition-all cursor-pointer border border-gray-200 rounded-xl shadow-sm focus:shadow-md bg-white" />
    </div>
  );

  const SectionTitle = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
    <div className="border-b border-gray-200 pb-4 mb-8 mt-12 first:mt-0 flex items-center gap-4">
      <div className="bg-[#f97316] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 shadow-md">
        {icon}
      </div>
      <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
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

      {/* Required Documents Box (Separate Section) */}
      <div className="bg-[#FDF8F3] border-l-[6px] border-[#F2852C] p-6 md:p-8 rounded-r-xl shadow-sm mb-12">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">Required Documents for UK Application</h3>
        <p className="text-gray-600 mb-6 text-sm md:text-base">Please prepare the following documents to ensure a smooth application process. You will be able to upload them in the final step of this form.</p>
        
        <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base text-gray-700 mb-8">
          <ul className="list-disc pl-5 space-y-3 marker:text-gray-400">
            <li>Passport (all used pages copy)</li>
            <li>All official certificates and mark-sheets (SSC, HSC, BSc & Masters)</li>
            <li>CV (with 2 professional/academic references)</li>
            <li>Passport-size photo (1 copy)</li>
            <li>Birth certificate (English version)</li>
            <li>English test certificate (e.g., IELTS) or Medium of Instruction letter</li>
          </ul>
          <ul className="list-disc pl-5 space-y-3 marker:text-gray-400">
            <li>Work experience/internship letters (if any)</li>
            <li>Recommendation/Reference letters (2 copies)</li>
            <li>Immigration history (if any)</li>
            <li>List of universities and programs you are interested in</li>
            <li>Emergency contact details (name, phone, email, address & relationship)</li>
          </ul>
        </div>
        
        <div className="bg-purple-100 p-6 rounded-xl border border-purple-200 text-center">
          <h4 className="text-lg font-bold text-purple-900 mb-2 flex items-center justify-center gap-2">
            <MdSchool className="text-xl" /> Are You a PhD Applicant?
          </h4>
          <p className="text-purple-700 text-sm mb-4">For PhD programs, please use our dedicated application portal for specialized assistance.</p>
          <a href="/phd-application" className="inline-block bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-2.5 rounded-lg font-bold transition shadow-md hover:shadow-lg">
            Go to PhD Application
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Personal Details */}
        <div>
          <SectionTitle title="Personal Information" icon={<MdPerson className="text-2xl md:text-3xl" />} />
          <div className="grid md:grid-cols-3 gap-x-6">
            <InputField label="First Name" name="name" required />
            <InputField label="Family Name (Surname)" name="family_name" required />
            <InputField label="Email Address" name="email" type="email" required />
            <InputField label="Phone Number" name="phone" type="tel" required />
            <InputField label="Date of Birth" name="date_Of_Birth" type="date" required />
            <InputField label="Nationality" name="nationality" required />
            <InputField label="Country of Birth" name="country_Of_Birth" required />
            <InputField label="Native Language" name="native_Language" required />
            <div className="md:col-span-3">
              <InputField label="Full Address (with Postal Code)" name="address_with_postal_Code" required />
            </div>
          </div>
        </div>

        {/* Passport & Visa */}
        <div>
          <SectionTitle title="Passport & Visa Details" icon={<MdFlight className="text-2xl md:text-3xl" />} />
          <div className="grid md:grid-cols-3 gap-x-6">
            <InputField label="Name as appears in passport" name="name_appears_in_passport" />
            <InputField label="Passport Number" name="passport_Number" />
            <InputField label="Passport Issue Location" name="passport_issue_location" />
            <InputField label="Issue Date" name="issue_date" type="date" />
            <InputField label="Expiry Date" name="expiry_date" type="date" />
            
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Have you been to the UK in the past 10 years?</label>
              <select name="UK_in_the_past_ten_years" className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#F2852C] outline-none bg-white transition-all">
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
          <SectionTitle title="Emergency Contact" icon={<MdContactPhone className="text-2xl md:text-3xl" />} />
          <div className="grid md:grid-cols-3 gap-x-6">
            <InputField label="Contact Name" name="emergency_contact_Name" />
            <InputField label="Relationship" name="emergency_contact_Relationship" />
            <InputField label="Telephone" name="emergency_contact_Telephone" type="tel" />
            <InputField label="Email" name="emergency_contact_Email" type="email" />
          </div>
        </div>

        {/* Academic History */}
        <div>
          <SectionTitle title="Academic History" icon={<MdSchool className="text-2xl md:text-3xl" />} />
          
          <h3 className="font-bold text-gray-700 mb-4 text-lg">Masters / PG (If applicable)</h3>
          <div className="grid md:grid-cols-3 gap-x-6 mb-6">
            <InputField label="Institution" name="masters_Institution" />
            <InputField label="Course" name="masters_Course" />
            <InputField label="Result/CGPA" name="masters_Results" />
            <InputField label="Passing Year (End Date)" name="masters_End_Date" type="date" />
          </div>

          <h3 className="font-bold text-gray-700 mb-4 text-lg">Undergraduate / Bachelor</h3>
          <div className="grid md:grid-cols-3 gap-x-6 mb-6">
            <InputField label="Institution" name="under_Institution" />
            <InputField label="Course" name="under_Course" />
            <InputField label="Result/CGPA" name="under_Result" />
            <InputField label="Passing Year (End Date)" name="under_End_Date" type="date" />
          </div>

          <h3 className="font-bold text-gray-700 mb-4 text-lg">HSC / A-Levels</h3>
          <div className="grid md:grid-cols-3 gap-x-6">
            <InputField label="Institution" name="HSC_Institution" />
            <InputField label="Result/GPA" name="HSC_Result" />
            <InputField label="Passing Year (End Date)" name="HSC_End_Date" type="date" />
          </div>
        </div>

        {/* Academic Interests & English */}
        <div>
          <SectionTitle title="Academic Interests & English Test" icon={<MdLanguage className="text-2xl md:text-3xl" />} />
          <div className="grid md:grid-cols-3 gap-x-6 mb-6">
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
          <SectionTitle title="Employment History" icon={<MdWork className="text-2xl md:text-3xl" />} />
          <div className="grid md:grid-cols-3 gap-x-6">
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
          <SectionTitle title="Document Uploads" icon={<MdFolder className="text-2xl md:text-3xl" />} />
          <div className="grid md:grid-cols-3 gap-x-6">
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

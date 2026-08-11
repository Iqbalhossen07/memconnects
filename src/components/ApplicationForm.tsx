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
import MathCaptcha from "./MathCaptcha";

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isCaptchaValid) return;
    
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

  const InputField = ({ label, name, type = "text", required = false, placeholder = "" }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#F2852C] focus:border-transparent outline-none transition-all bg-white" />
    </div>
  );

  const FileField = ({ label, name, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type="file" name={name} required={required} className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#F2852C] hover:file:bg-orange-100 transition-all cursor-pointer border border-gray-200 rounded-xl shadow-sm focus:shadow-md bg-white" />
    </div>
  );

  const SectionTitle = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
    <div className="mb-6 mt-12 first:mt-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-[#f97316] text-2xl md:text-3xl shrink-0">
          {icon}
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
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

        {/* Personal Details & Passport */}
        <div>
          <SectionTitle title="Personal Information" icon={<MdPerson />} />
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <InputField label="First Name" name="name" required />
            <InputField label="Family Name" name="family_name" required />
            <InputField label="Email" name="email" type="email" required />
            
            <InputField label="Phone Number" name="phone" type="tel" required />
            <InputField label="Date of Birth" name="date_Of_Birth" type="date" required />
            <InputField label="Nationality" name="nationality" required />
            
            <InputField label="Country of Birth" name="country_Of_Birth" required />
            <InputField label="Native Language" name="native_Language" required />
            <div></div> {/* Empty column */}

            <div className="md:col-span-3">
              <InputField label="Name as it appears in passport" name="name_appears_in_passport" />
            </div>

            <InputField label="Passport Number" name="passport_Number" />
            <InputField label="Passport Issue Location" name="passport_issue_location" />
            <InputField label="Issue Date" name="issue_date" type="date" />
            
            <InputField label="Expiry Date" name="expiry_date" type="date" />
            <div className="md:col-span-2"></div> {/* Empty columns */}

            <div className="md:col-span-3 mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address with Postal Code <span className="text-red-500">*</span></label>
              <textarea name="address_with_postal_Code" required rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#F2852C] focus:border-transparent outline-none transition-all bg-white resize-y"></textarea>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <SectionTitle title="Emergency Contact Details" icon={<MdContactPhone />} />
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
            <InputField label="Contact Name" name="emergency_contact_Name" />
            <InputField label="Contact Telephone" name="emergency_contact_Telephone" type="tel" />
            <InputField label="Contact Email" name="emergency_contact_Email" type="email" />
            <InputField label="Relationship" name="emergency_contact_Relationship" />
          </div>
        </div>

        {/* Travel & Immigration History */}
        <div>
          <SectionTitle title="Travel & Immigration History" icon={<MdFlight />} />
          
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Applied for UK leave in the past 10 years?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" name="UK_in_the_past_ten_years" value="Yes" className="w-4 h-4 text-[#F2852C] focus:ring-[#F2852C] border-gray-300" /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" name="UK_in_the_past_ten_years" value="No" className="w-4 h-4 text-[#F2852C] focus:ring-[#F2852C] border-gray-300" /> No
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-x-4 gap-y-2">
            <InputField label="Date of Arrival" name="Date_of_Arrival" type="date" />
            <InputField label="Date of Departure" name="Date_of_Departure" type="date" />
            <InputField label="Visa Start Date" name="Visa_Start_date" type="date" />
            <InputField label="Visa Expiry Date" name="Visa_Expiry_date" type="date" />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Do you need a visa to stay in the UK?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" name="visa_to_stay_in_the_UK" value="Yes" className="w-4 h-4 text-[#F2852C] focus:ring-[#F2852C] border-gray-300" /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" name="visa_to_stay_in_the_UK" value="No" className="w-4 h-4 text-[#F2852C] focus:ring-[#F2852C] border-gray-300" /> No
              </label>
            </div>
          </div>

          <InputField label="Refusal Type (if any)" name="Refusal_type" />
        </div>

        {/* Academic History */}
        <div>
          <SectionTitle title="Academic History" icon={<MdSchool />} />
          
          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Masters/MBA</h3>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-2">
              <InputField label="Institution" name="masters_Institution" />
              <InputField label="Course" name="masters_Course" />
            </div>
            <div className="grid md:grid-cols-4 gap-x-4 gap-y-2">
              <InputField label="Level of Study" name="masters_Level_of_Study" />
              <InputField label="Result" name="masters_Results" />
              <InputField label="Start Date" name="masters_Start_date" type="date" />
              <InputField label="End Date" name="masters_End_Date" type="date" />
            </div>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Undergraduate</h3>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-2">
              <InputField label="Institution" name="under_Institution" />
              <InputField label="Course" name="under_Course" />
            </div>
            <div className="grid md:grid-cols-4 gap-x-4 gap-y-2">
              <InputField label="Level of Study" name="under_Level_of_Study" />
              <InputField label="Result" name="under_Result" />
              <InputField label="Start Date" name="under_Start_date" type="date" />
              <InputField label="End Date" name="under_End_Date" type="date" />
            </div>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">A-Level / HSC</h3>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-2">
              <InputField label="Institution" name="HSC_Institution" />
              <InputField label="Group/Course" name="HSC_Course" />
            </div>
            <div className="grid md:grid-cols-4 gap-x-4 gap-y-2">
              <InputField label="Level of Study" name="HSC_Level_of_Study" />
              <InputField label="Result" name="HSC_Result" />
              <InputField label="Start Date" name="HSC_Start_date" type="date" />
              <InputField label="End Date" name="HSC_End_Date" type="date" />
            </div>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">O-Level / SSC</h3>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-2">
              <InputField label="Institution" name="SSC_Institution" />
              <InputField label="Group/Course" name="SSC_Course" />
            </div>
            <div className="grid md:grid-cols-4 gap-x-4 gap-y-2">
              <InputField label="Level of Study" name="SSC_Level_of_Study" />
              <InputField label="Result" name="SSC_Result" />
              <InputField label="Start Date" name="SSC_Start_date" type="date" />
              <InputField label="End Date" name="SSC_End_Date" type="date" />
            </div>
          </div>
        </div>

        {/* Academic Interests */}
        <div>
          <SectionTitle title="Academic Interests" icon={<MdLanguage />} />
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <InputField label="Level of study" placeholder="e.g., Masters" name="Academic_interests_Level_of_study" required />
            <InputField label="Discipline" placeholder="e.g., Engineering" name="Discipline" />
            <InputField label="Programme" placeholder="e.g., M.Sc. in AI" name="Programme" required />
            <InputField label="Intended Start date" name="interests_Start_date" type="date" />
            <InputField label="Preferred Location" placeholder="e.g., London, UK" name="Location" />
          </div>
        </div>

        {/* English Language Proficiency */}
        <div>
          <SectionTitle title="English Language Proficiency" icon={<MdLanguage />} />
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2 mb-6">
            <InputField label="Duo lingo" name="Duo_lingo" />
            <InputField label="GMAT" name="GMAT" />
            <InputField label="IELTS" name="IELTS" />
            <InputField label="IELTS UKVI" name="IELTS_UKVI" />
            <InputField label="PTE" name="PTE" />
            <InputField label="TOFEL" name="TOFEL" />
          </div>
          <h3 className="font-bold text-gray-900 mb-4 text-sm bg-gray-50/50 border border-gray-100 p-3 rounded-lg inline-block">Detailed Scores (if applicable)</h3>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <InputField label="Date of test" name="Date_of_test" type="date" />
            <InputField label="Overall Score" name="Overall_Score" />
            <InputField label="Reading" name="Reading" />
            <InputField label="Writing" name="Writing" />
            <InputField label="Listening" name="Listening" />
            <InputField label="Speaking" name="Speaking" />
          </div>
        </div>

        {/* Employment */}
        <div>
          <SectionTitle title="Work Details (If any)" icon={<MdWork />} />
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <InputField label="Job Title" name="Job_title" />
            <InputField label="Name of Organization" name="Name_of_organization" />
            <InputField label="Address of Organization" name="Address_of_organization" />
            <InputField label="Phone Number" name="work_Phone_number" type="tel" />
            <InputField label="From Date" name="From_date" type="date" />
            <InputField label="To Date" name="To_date" type="date" />
            
            <div className="mb-5 flex items-center md:col-span-3 mt-2">
              <input type="checkbox" id="Student_currently_works" name="Student_currently_works" value="Yes" className="w-5 h-5 text-[#F2852C] bg-white border-gray-300 rounded focus:ring-[#F2852C]" />
              <label htmlFor="Student_currently_works" className="ml-3 text-sm font-semibold text-gray-700">I currently work here</label>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div>
          <SectionTitle title="Upload Documents" icon={<MdFolder />} />
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <FileField label="Passport (all used pages)" name="passport_all_used_copy" />
            <FileField label="Academic Certificates & Marksheets" name="all_official_certificates_marksheets" />
            <FileField label="CV / Resume (with references)" name="cv_two_references" />
            <FileField label="Passport Size Photo" name="passport_photo" />
            <FileField label="Other Documents" name="others_document" />
          </div>
        </div>

        <MathCaptcha onVerify={setIsCaptchaValid} />

        <div className="pt-8 border-t border-gray-100">
          <button 
            type="submit" 
            disabled={isSubmitting || !isCaptchaValid}
            className={`w-full md:w-auto px-10 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all ${(isSubmitting || !isCaptchaValid) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F2852C] hover:bg-[#D9721B] hover:shadow-xl transform hover:-translate-y-1'}`}
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

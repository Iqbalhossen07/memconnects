import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateApplicationStatus } from "@/app/actions/adminActions";

export default async function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const appId = parseInt(id);

  if (isNaN(appId)) notFound();

  const app = await prisma.applications.findUnique({
    where: { id: appId },
  });

  if (!app) notFound();

  const Field = ({ label, value }: { label: string, value: any }) => (
    <div className="mb-4">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800 font-semibold">{value || <span className="text-gray-400 italic">Not provided</span>}</p>
    </div>
  );

  const FileLink = ({ label, path }: { label: string, path: string | null }) => (
    <div className="mb-4">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      {path ? (
        <a href={`/${path}`} target="_blank" className="text-blue-500 hover:underline font-semibold flex items-center mt-1">
          <i className="fas fa-file-download mr-2"></i> View Document
        </a>
      ) : (
        <p className="text-gray-400 italic">No file uploaded</p>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/secure_portal_99/applications" className="mr-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-gray-800 transition">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Application #{app.id}</h1>
            <p className="text-gray-500 mt-1">Submitted on {new Date(app.submission_date).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <form action={async (formData) => {
            "use server";
            await updateApplicationStatus(app.id, formData.get("status") as string);
          }} className="flex items-center space-x-2">
            <select name="status" defaultValue={app.status} className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#F2852C]">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button type="submit" className="bg-[#6D5795] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a487c] transition">
              Update Status
            </button>
          </form>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#6D5795] mb-4 border-b pb-2"><i className="fas fa-user mr-2"></i> Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" value={app.name} />
            <Field label="Family Name" value={app.family_name} />
            <Field label="Email" value={app.email} />
            <Field label="Phone" value={app.phone} />
            <Field label="Date of Birth" value={app.date_Of_Birth ? new Date(app.date_Of_Birth).toLocaleDateString() : null} />
            <Field label="Nationality" value={app.nationality} />
            <div className="col-span-2">
              <Field label="Address" value={app.address_with_postal_Code} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#6D5795] mb-4 border-b pb-2"><i className="fas fa-passport mr-2"></i> Passport Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name in Passport" value={app.name_appears_in_passport} />
            <Field label="Passport Number" value={app.passport_Number} />
            <Field label="Issue Location" value={app.passport_issue_location} />
            <Field label="Issue Date" value={app.issue_date ? new Date(app.issue_date).toLocaleDateString() : null} />
            <Field label="Expiry Date" value={app.expiry_date ? new Date(app.expiry_date).toLocaleDateString() : null} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <h2 className="text-xl font-bold text-[#6D5795] mb-4 border-b pb-2"><i className="fas fa-graduation-cap mr-2"></i> Academic History</h2>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-4 font-bold text-gray-700 bg-gray-50 p-2 rounded">Undergraduate</div>
            <Field label="Institution" value={app.under_Institution} />
            <Field label="Course" value={app.under_Course} />
            <Field label="Result" value={app.under_Result} />
            <Field label="Passing Year" value={app.under_End_Date ? new Date(app.under_End_Date).toLocaleDateString() : null} />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 font-bold text-gray-700 bg-gray-50 p-2 rounded">HSC/A-Levels</div>
            <Field label="Institution" value={app.HSC_Institution} />
            <Field label="Course" value={app.HSC_Course} />
            <Field label="Result" value={app.HSC_Result} />
            <Field label="Passing Year" value={app.HSC_End_Date ? new Date(app.HSC_End_Date).toLocaleDateString() : null} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#6D5795] mb-4 border-b pb-2"><i className="fas fa-language mr-2"></i> English Proficiency</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Test Type" value={app.IELTS_UKVI} />
            <Field label="Test Date" value={app.Date_of_test ? new Date(app.Date_of_test).toLocaleDateString() : null} />
            <Field label="Overall Score" value={app.Overall_Score} />
            <div className="col-span-2 grid grid-cols-4 gap-2 mt-2">
              <Field label="Reading" value={app.Reading} />
              <Field label="Writing" value={app.Writing} />
              <Field label="Listening" value={app.Listening} />
              <Field label="Speaking" value={app.Speaking} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#6D5795] mb-4 border-b pb-2"><i className="fas fa-file-pdf mr-2"></i> Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <FileLink label="Passport Copy" path={app.passport_all_used_copy} />
            <FileLink label="Certificates/Marksheets" path={app.all_official_certificates_marksheets} />
            <FileLink label="CV & References" path={app.cv_two_references} />
            <FileLink label="Passport Photo" path={app.passport_photo} />
            <FileLink label="Other Documents" path={app.others_document} />
          </div>
        </div>
      </div>
    </div>
  );
}

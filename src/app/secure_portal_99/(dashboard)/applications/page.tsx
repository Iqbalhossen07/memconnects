import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteApplication } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";
import { MdOutlineInfo } from "react-icons/md";

export default async function ApplicationsPage() {
  const applications = await prisma.applications.findMany({
    orderBy: { submission_date: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Applications</h1>
          <p className="text-black mt-1">Manage all submitted student applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 hidden md:table-row">
                <th className="p-4 font-semibold text-black">ID</th>
                <th className="p-4 font-semibold text-black">Name</th>
                <th className="p-4 font-semibold text-black">Email</th>
                <th className="p-4 font-semibold text-black">Phone</th>
                <th className="p-4 font-semibold text-black">Date</th>
                <th className="p-4 font-semibold text-black">Status</th>
                <th className="p-4 font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition flex flex-col md:table-row p-4 md:p-0 mb-4 md:mb-0 bg-white md:bg-transparent rounded-lg shadow-sm md:shadow-none border md:border-b">
                    <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">ID:</span> #{app.id}</td>
                    <td className="p-2 md:p-4 font-medium text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Name:</span> {app.name} {app.family_name}</td>
                    <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Email:</span> {app.email}</td>
                    <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Phone:</span> {app.phone}</td>
                    <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Date:</span> {new Date(app.submission_date).toLocaleDateString()}</td>
                    <td className="p-2 md:p-4 flex justify-between items-center md:table-cell">
                      <span className="md:hidden font-bold text-black">Status:</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'Pending' ? 'bg-[#FFF9C4] text-black' :
                        app.status === 'Approved' ? 'bg-[#C8E6C9] text-black' :
                        'bg-[#FFCDD2] text-black'
                      }`}>
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-2 md:p-4 flex justify-end md:justify-start gap-2 items-center">
                      <Link 
                        href={`/secure_portal_99/applications/${app.id}`} 
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-[#00a86b] border border-gray-100 hover:border-[#00a86b]/30 hover:bg-[#00a86b]/5 rounded-xl shadow-sm transition font-medium text-sm" 
                        title="View Details"
                      >
                        <MdOutlineInfo size={18} />
                        <span>View</span>
                      </Link>
                      <DeleteButton 
                        onDelete={async () => {
                          "use server";
                          await deleteApplication(app.id);
                        }} 
                        itemType="application"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

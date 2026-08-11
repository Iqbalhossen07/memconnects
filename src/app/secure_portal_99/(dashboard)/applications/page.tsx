import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteApplication } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";

export default async function ApplicationsPage() {
  const applications = await prisma.applications.findMany({
    orderBy: { submission_date: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Applications</h1>
          <p className="text-gray-500 mt-1">Manage all submitted student applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">ID</th>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Phone</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-500">#{app.id}</td>
                    <td className="p-4 font-medium text-gray-800">{app.name} {app.family_name}</td>
                    <td className="p-4 text-sm text-gray-500">{app.email}</td>
                    <td className="p-4 text-sm text-gray-500">{app.phone}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(app.submission_date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 flex space-x-3">
                      <Link href={`/secure_portal_99/applications/${app.id}`} className="text-blue-500 hover:text-blue-700" title="View Details">
                        <i className="fas fa-eye"></i>
                      </Link>
                      <DeleteButton 
                        onDelete={async () => {
                          "use server";
                          await deleteApplication(app.id);
                        }} 
                        itemType="application"
                        className="text-red-500 hover:text-red-700" 
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { MdOutlineInfo } from "react-icons/md";
import DeleteButton from "@/components/DeleteButton";
import { deleteApplication } from "@/app/actions/adminActions";

interface Application {
  id: number;
  name: string | null;
  family_name: string | null;
  email: string | null;
  phone: string | null;
  submission_date: Date;
  status: string;
}

interface Props {
  initialApplications: Application[];
}

export default function ApplicationsTableClient({ initialApplications }: Props) {
  const [searchEmail, setSearchEmail] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = initialApplications.filter((app) => {
    const matchesEmail = app.email?.toLowerCase().includes(searchEmail.toLowerCase()) ?? false;
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    
    // If no search text, just match status. If search text exists, it must match both.
    if (searchEmail === "") return matchesStatus;
    return matchesEmail && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none transition"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center w-full sm:w-auto space-x-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Status:</label>
          <select
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F2852C] outline-none transition bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

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
              <th className="p-4 font-semibold text-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition flex flex-col md:table-row p-4 md:p-0 mb-4 md:mb-0 bg-white md:bg-transparent rounded-lg shadow-sm md:shadow-none border md:border-b">
                  <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">ID:</span> #{app.id}</td>
                  <td className="p-2 md:p-4 font-medium text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Name:</span> {app.name} {app.family_name}</td>
                  <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell break-all"><span className="md:hidden font-bold">Email:</span> {app.email}</td>
                  <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Phone:</span> {app.phone}</td>
                  <td className="p-2 md:p-4 text-sm text-black flex justify-between md:table-cell"><span className="md:hidden font-bold">Date:</span> {new Date(app.submission_date).toLocaleDateString()}</td>
                  <td className="p-2 md:p-4 flex justify-between items-center md:table-cell">
                    <span className="md:hidden font-bold text-black">Status:</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'Pending' ? 'bg-[#FFF9C4] text-black' :
                      app.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Approved' ? 'bg-[#C8E6C9] text-black' :
                      'bg-[#FFCDD2] text-black'
                    }`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-2 md:p-4 flex justify-end md:justify-end gap-2 items-center">
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
                        await deleteApplication(app.id);
                      }} 
                      itemType="application"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  {initialApplications.length === 0 ? "No applications found." : "No applications match your filter."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

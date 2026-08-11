"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { updateApplicationStatus } from "@/app/actions/adminActions";

interface StatusUpdaterProps {
  appId: number;
  currentStatus: string;
}

export default function StatusUpdater({ appId, currentStatus }: StatusUpdaterProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStatus = formData.get("status") as string;
    
    startTransition(async () => {
      const result = await updateApplicationStatus(appId, newStatus);
      if (result && result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Application status has been changed to ${newStatus}. Emails have been sent.`,
          confirmButtonColor: '#00a86b'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the status.',
          confirmButtonColor: '#6D5795'
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <select 
        name="status" 
        defaultValue={currentStatus || "Pending"} 
        className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#F2852C]"
        disabled={isPending}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-[#6D5795] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a487c] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        {isPending ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            Updating...
          </>
        ) : (
          "Update Status"
        )}
      </button>
    </form>
  );
}

import prisma from "@/lib/prisma";
import Link from "next/link";
import ApplicationsTableClient from "./ApplicationsTableClient";

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

      <ApplicationsTableClient initialApplications={applications} />
    </div>
  );
}

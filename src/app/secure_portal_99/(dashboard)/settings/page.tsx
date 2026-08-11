import { getSession } from "@/lib/auth";
import SettingsForm from "./SettingsForm";
import prisma from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await getSession();
  
  if (!session) {
    return <div>Unauthorized</div>;
  }

  // Fetch latest data from DB just in case session is stale
  const admin = await prisma.admins.findUnique({
    where: { id: session.adminId },
  });

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return <SettingsForm admin={admin} />;
}

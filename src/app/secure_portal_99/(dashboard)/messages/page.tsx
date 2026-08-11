import { getMessages } from "@/app/actions/messageActions";
import MessagesClient from "./MessagesClient";
import { MdEmail } from "react-icons/md";

export const metadata = {
  title: "Messages - Admin Dashboard",
};

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 md:mb-10 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
          <MdEmail className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Messages</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">View and manage contact form submissions.</p>
        </div>
      </div>

      <MessagesClient initialMessages={messages} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { MdEmail, MdDelete, MdClose, MdVisibility, MdMarkEmailRead } from "react-icons/md";
import { markMessageAsRead, deleteMessage } from "@/app/actions/messageActions";
import { useRouter } from "next/navigation";

type Message = {
  id: number;
  sender_name: string;
  sender_email: string;
  subject: string;
  latest_degree: string | null;
  cgpa: string | null;
  interested_program: string | null;
  message: string;
  submission_date: Date;
  is_read: boolean;
};

export default function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const router = useRouter();

  const handleView = async (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      await markMessageAsRead(msg.id);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
      );
      router.refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setIsDeleting(id);
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setIsDeleting(null);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Sender</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Subject</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${!msg.is_read ? 'bg-blue-50/30' : ''}`}>
                    <td className="p-4">
                      {!msg.is_read ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          New
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <MdMarkEmailRead /> Read
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{msg.sender_name}</div>
                      <div className="text-sm text-gray-500">{msg.sender_email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-800 font-medium line-clamp-1">{msg.subject}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(msg.submission_date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(msg)}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Message"
                        >
                          <MdVisibility size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          disabled={isDeleting === msg.id}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete Message"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for viewing message */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MdEmail className="text-blue-500 text-xl" />
                Message Details
              </h3>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">From</p>
                  <p className="font-medium text-gray-900">{selectedMessage.sender_name}</p>
                  <a href={`mailto:${selectedMessage.sender_email}`} className="text-sm text-blue-600 hover:underline">{selectedMessage.sender_email}</a>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm text-gray-800">{new Date(selectedMessage.submission_date).toLocaleString()}</p>
                </div>
                <div className="md:col-span-2 mt-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                  <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedMessage.subject}</p>
                </div>
              </div>

              {(selectedMessage.latest_degree || selectedMessage.interested_program) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-purple-50/50 rounded-xl border border-purple-100/50">
                  {selectedMessage.latest_degree && (
                    <div>
                      <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">Latest Degree</p>
                      <p className="font-medium text-purple-900 text-sm">{selectedMessage.latest_degree} {selectedMessage.cgpa ? `(CGPA: ${selectedMessage.cgpa})` : ''}</p>
                    </div>
                  )}
                  {selectedMessage.interested_program && (
                    <div>
                      <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">Interested In</p>
                      <p className="font-medium text-purple-900 text-sm">{selectedMessage.interested_program}</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message Body</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => handleDelete(selectedMessage.id)}
                className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
              >
                <MdDelete size={16} /> Delete
              </button>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

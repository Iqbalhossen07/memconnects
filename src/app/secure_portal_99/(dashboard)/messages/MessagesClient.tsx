"use client";

import { useState, useTransition } from "react";
import Swal from "sweetalert2";
import { MdOutlineInfo, MdCheckCircle, MdOutlineDelete, MdEmail } from "react-icons/md";
import { deleteMessage, bulkDeleteMessages } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";

interface ContactMessage {
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
}

interface Props {
  initialMessages: ContactMessage[];
}

export default function MessagesClient({ initialMessages }: Props) {
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const filteredMessages = initialMessages.filter((msg) =>
    msg.sender_email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredMessages.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${selectedIds.length} messages!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F2852C',
      cancelButtonColor: '#6D5795',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          await bulkDeleteMessages(selectedIds);
          setSelectedIds([]);
          Swal.fire('Deleted!', 'The selected messages have been deleted.', 'success');
        });
      }
    });
  };

  const showMessageModal = (msg: ContactMessage) => {
    Swal.fire({
      title: msg.subject,
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Name:</strong> ${msg.sender_name}</p>
          <p class="mb-2"><strong>Email:</strong> ${msg.sender_email}</p>
          ${msg.latest_degree ? `<p class="mb-2"><strong>Degree:</strong> ${msg.latest_degree}</p>` : ''}
          ${msg.cgpa ? `<p class="mb-2"><strong>CGPA:</strong> ${msg.cgpa}</p>` : ''}
          ${msg.interested_program ? `<p class="mb-2"><strong>Interested Program:</strong> ${msg.interested_program}</p>` : ''}
          <p class="mt-4 mb-2"><strong>Message:</strong></p>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 whitespace-pre-wrap">${msg.message}</div>
          <p class="text-xs text-gray-500 mt-4 text-right">Received: ${new Date(msg.submission_date).toLocaleString()}</p>
        </div>
      `,
      confirmButtonColor: '#6D5795',
      confirmButtonText: 'Close',
      width: '600px',
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
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
          
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={isPending}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shrink-0 shadow-sm"
            >
              {isPending ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <MdOutlineDelete size={20} />
              )}
              <span className="hidden sm:inline">Delete Selected ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {filteredMessages.length > 0 && (
        <div className="mb-4 flex items-center gap-2 px-1">
          <input 
            type="checkbox" 
            id="selectAll"
            className="w-4 h-4 text-[#F2852C] rounded focus:ring-[#F2852C] border-gray-300"
            checked={filteredMessages.length > 0 && selectedIds.length === filteredMessages.length}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAll" className="text-sm font-medium text-gray-700 cursor-pointer">
            Select All
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMessages.map((msg) => {
          const isSelected = selectedIds.includes(msg.id);
          return (
            <div 
              key={msg.id} 
              className={`bg-white rounded-xl shadow-sm border ${isSelected ? 'border-[#F2852C] ring-1 ring-[#F2852C]/30' : 'border-gray-100'} p-5 flex flex-col relative transition-all duration-200 hover:shadow-md`}
            >
              <div className="absolute top-5 right-5">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-[#F2852C] rounded focus:ring-[#F2852C] border-gray-300"
                  checked={isSelected}
                  onChange={() => handleSelectOne(msg.id)}
                />
              </div>

              <div className="flex items-start gap-3 mb-4 pr-8">
                <div className="w-10 h-10 bg-purple-50 text-[#6D5795] rounded-full flex items-center justify-center shrink-0">
                  <MdEmail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 line-clamp-1">{msg.sender_name}</h3>
                  <a href={`mailto:${msg.sender_email}`} className="text-sm text-blue-600 hover:underline line-clamp-1">{msg.sender_email}</a>
                </div>
              </div>

              <div className="mb-4 flex-1">
                <h4 className="font-semibold text-gray-700 mb-1 line-clamp-1">{msg.subject}</h4>
                <p className="text-gray-500 text-sm line-clamp-2">{msg.message}</p>
              </div>

              <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <i className="far fa-clock"></i>
                {new Date(msg.submission_date).toLocaleString()}
              </div>

              <div className="border-t border-gray-100 pt-4 mt-auto flex justify-end items-center gap-2">
                <button 
                  onClick={() => showMessageModal(msg)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white text-[#00a86b] border border-gray-100 hover:border-[#00a86b]/30 hover:bg-[#00a86b]/5 rounded-xl shadow-sm transition font-medium text-sm" 
                  title="View Message"
                >
                  <MdOutlineInfo size={18} />
                  <span>View</span>
                </button>
                
                <DeleteButton 
                  onDelete={async () => {
                    await deleteMessage(msg.id);
                  }} 
                  itemType="message"
                />
              </div>
            </div>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          {initialMessages.length === 0 ? "No messages found." : "No messages match your search."}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { updateAdminSettings } from "@/app/actions/settingsActions";
import Swal from "sweetalert2";
import { MdSave, MdAccountCircle } from "react-icons/md";

export default function SettingsForm({ admin }: { admin: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(admin.profile_picture ? `/uploads/admin/${admin.profile_picture}` : null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await updateAdminSettings(null, formData);
    
    if (res?.success) {
      Swal.fire({
        title: 'Success!',
        text: 'Settings updated successfully. Page will reload to apply changes.',
        icon: 'success',
        confirmButtonColor: '#F2852C'
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire('Error', res?.error || 'Failed to update settings', 'error');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account profile and credentials.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100 pb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 shadow-sm flex items-center justify-center">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <MdAccountCircle className="w-full h-full text-gray-300" />
                )}
              </div>
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
              <input 
                type="file" 
                name="profile_picture" 
                accept="image/*" 
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F2852C]/10 file:text-[#F2852C] hover:file:bg-[#F2852C]/20 cursor-pointer" 
              />
              <p className="text-xs text-gray-400 mt-2">Recommended: Square image, max 2MB. Leave empty to keep current picture.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="full_name" required defaultValue={admin.full_name} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5795] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
              <input type="email" name="email" required defaultValue={admin.email} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5795] outline-none" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input type="password" name="password" placeholder="Leave blank to keep current password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5795] outline-none" />
          </div>

          <div className="pt-6 flex justify-end">
            <button type="submit" disabled={isSubmitting} className={`flex items-center px-8 py-3 rounded-xl font-bold text-white transition shadow-md hover:shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#6D5795] hover:bg-[#5a487c]'}`}>
              <MdSave className="mr-2" size={20} />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

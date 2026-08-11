"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addTestimonial } from "@/app/actions/testimonialActions";

export default function NewTestimonialPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await addTestimonial(null, formData);
    
    if (res?.success) {
      router.push("/secure_portal_99/testimonials");
      router.refresh();
    } else {
      alert(res?.error || "Failed to add testimonial");
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link href="/secure_portal_99/testimonials" className="mr-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-gray-800 transition">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Testimonial</h1>
            <p className="text-gray-500 mt-1">Add a new student review to show on the homepage.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name *</label>
            <input type="text" name="student_name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5795] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Review Text *</label>
            <textarea name="review_text" required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5795] outline-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isSubmitting} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isSubmitting ? 'bg-gray-400' : 'bg-[#6D5795] hover:bg-[#5a487c]'}`}>
              {isSubmitting ? "Adding..." : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

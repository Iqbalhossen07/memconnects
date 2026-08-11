"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateTestimonial } from "@/app/actions/testimonialActions";
import TextEditor from "@/components/TextEditor";
import { MdArrowBack, MdSave } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditTestimonialForm({ testimonial }: { testimonial: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewText, setReviewText] = useState(testimonial.review_text);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.set("review_text", reviewText);

    const updateTestimonialWithId = updateTestimonial.bind(null, testimonial.id);
    const res = await updateTestimonialWithId(null, formData);
    
    if (res?.success) {
      Swal.fire({
        title: 'Updated!',
        text: 'Testimonial has been updated.',
        icon: 'success',
        confirmButtonColor: '#F2852C'
      }).then(() => {
        router.push("/secure_portal_99/testimonials");
        router.refresh();
      });
    } else {
      Swal.fire('Error', res?.error || "Failed to update testimonial", 'error');
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link href="/secure_portal_99/testimonials" className="mr-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-[#F2852C] transition border border-gray-100 hover:shadow-md">
            <MdArrowBack size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Testimonial</h1>
            <p className="text-gray-500 mt-1">Update student review details.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name *</label>
            <input type="text" name="student_name" defaultValue={testimonial.student_name} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5795] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Review Text *</label>
            <TextEditor value={reviewText} onChange={setReviewText} placeholder="Write the testimonial here..." />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isSubmitting} className={`flex items-center px-8 py-3 rounded-xl font-bold text-white transition shadow-md hover:shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#6D5795] hover:bg-[#5a487c]'}`}>
              <MdSave className="mr-2" size={20} />
              {isSubmitting ? "Updating..." : "Update Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

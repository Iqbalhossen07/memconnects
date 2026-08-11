"use client";

import Swal from "sweetalert2";
import { MdOutlineInfo } from "react-icons/md";

interface ViewTestimonialButtonProps {
  testimonial: {
    student_name: string;
    review_text: string;
  };
}

export default function ViewTestimonialButton({ testimonial }: ViewTestimonialButtonProps) {
  const handleView = () => {
    Swal.fire({
      title: `<span class="text-2xl font-bold text-gray-800">${testimonial.student_name}</span>`,
      html: `
        <div class="text-left mt-4 p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed text-sm max-h-[60vh] overflow-y-auto">
          ${testimonial.review_text.replace(/&nbsp;/g, ' ')}
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#F2852C',
      width: '600px',
      customClass: {
        container: 'font-sans',
      }
    });
  };

  return (
    <button 
      onClick={handleView}
      className="flex items-center gap-1.5 px-4 py-2 bg-white text-[#00a86b] border border-gray-100 hover:border-[#00a86b]/30 hover:bg-[#00a86b]/5 rounded-xl shadow-sm transition font-medium text-sm flex-shrink-0 whitespace-nowrap" 
      title="View Testimonial"
    >
      <MdOutlineInfo size={18} className="flex-shrink-0" />
      <span>View</span>
    </button>
  );
}

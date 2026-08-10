"use client";

import { useRef } from "react";

interface Testimonial {
  id: number;
  t_name: string;
  t_des: string;
  t_review: string | null;
  created_at: Date;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div ref={sliderRef} className="flex transition-transform duration-500 ease-in-out -mx-3 overflow-x-auto snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {testimonials.length > 0 ? (
            testimonials.map((row) => {
              const nameParts = row.t_name ? row.t_name.split(' ') : ['A'];
              const initials = nameParts.length > 1 
                ? (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
                : row.t_name ? row.t_name.substring(0, 2).toUpperCase() : 'A';
                
              return (
                <div key={row.id} className="testimonial-card min-w-full md:min-w-[50%] lg:min-w-[33.33%] px-3 snap-center shrink-0">
                  <div className="bg-white p-6 rounded-2xl h-full flex flex-col shadow-lg border border-gray-100 relative">
                    <div className="flex items-center mb-4 text-yellow-400">
                      <i className="fas fa-star"></i><i className="fas fa-star ml-1"></i><i className="fas fa-star ml-1"></i><i className="fas fa-star ml-1"></i><i className="fas fa-star ml-1"></i>
                    </div>
                    <i className="fas fa-quote-left text-purple-100 text-4xl absolute top-5 right-5 opacity-80"></i>
                    <p className="text-gray-600 mb-5 italic text-sm leading-relaxed flex-grow">
                      "{row.t_des}"
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#6D5795] text-white flex items-center justify-center font-bold text-lg mr-3">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{row.t_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 w-full">No testimonials found.</p>
          )}
        </div>
      </div>
      <div className="text-center mt-8">
        <button onClick={scrollLeft} className="bg-white rounded-full p-2.5 shadow-md hover:bg-gray-100 transition-colors mx-1.5">
          <i className="fas fa-chevron-left text-[#6D5795] w-4 h-4"></i>
        </button>
        <button onClick={scrollRight} className="bg-white rounded-full p-2.5 shadow-md hover:bg-gray-100 transition-colors mx-1.5">
          <i className="fas fa-chevron-right text-[#6D5795] w-4 h-4"></i>
        </button>
      </div>
    </div>
  );
}

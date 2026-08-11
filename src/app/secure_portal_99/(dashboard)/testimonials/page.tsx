import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteTestimonial } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";
import { MdAdd, MdStar, MdPerson, MdDateRange } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonials.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Testimonials Management</h1>
        <Link href="/secure_portal_99/testimonials/new" className="bg-[#6D5795] text-white px-5 py-2.5 rounded-lg hover:bg-[#59457A] shadow-md hover:shadow-lg transition flex items-center font-medium">
          <MdAdd className="mr-2" size={20} /> Add New Testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden flex flex-col transition p-6 relative">
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#F2852C]/10 text-[#F2852C] flex items-center justify-center text-xl font-bold shadow-sm">
                {test.student_name.charAt(0)}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg text-gray-800">{test.student_name}</h3>
                <div className="flex items-center text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <MdStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-gray-600 text-sm flex-1 mb-4 italic bg-gray-50 p-4 rounded-lg border border-gray-100 line-clamp-4 relative">
              <span className="absolute top-2 left-2 text-2xl text-gray-300 font-serif leading-none">"</span>
              <div className="pl-4" dangerouslySetInnerHTML={{ __html: test.review_text }} />
            </div>
            
            <div className="border-t border-gray-100 pt-4 mt-auto flex justify-end items-center gap-2">
              <Link 
                href={`/secure_portal_99/testimonials/${test.id}/edit`} 
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-blue-500 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 rounded-xl shadow-sm transition font-medium text-sm" 
                title="Edit Testimonial"
              >
                <MdOutlineEdit size={18} />
                <span>Edit</span>
              </Link>
              <DeleteButton 
                onDelete={async () => {
                  "use server";
                  await deleteTestimonial(test.id);
                }} 
                itemType="testimonial" 
              />
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          No testimonials found. Click "Add New Testimonial" to create one.
        </div>
      )}
    </div>
  );
}

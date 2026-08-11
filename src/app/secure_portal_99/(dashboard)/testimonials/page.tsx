import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteTestimonial } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonials.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage student testimonials and reviews.</p>
        </div>
        <Link href="/secure_portal_99/testimonials/new" className="bg-[#6D5795] hover:bg-[#5a487c] text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm">
          <i className="fas fa-plus mr-2"></i> Add New Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">ID</th>
                <th className="p-4 font-semibold text-gray-600">Student Name</th>
                <th className="p-4 font-semibold text-gray-600 w-1/2">Review</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length > 0 ? (
                testimonials.map((test) => (
                  <tr key={test.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-500">#{test.id}</td>
                    <td className="p-4 font-medium text-gray-800">{test.student_name}</td>
                    <td className="p-4 text-sm text-gray-500">
                      <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: test.review_text }} />
                    </td>
                    <td className="p-4 flex space-x-3 justify-end h-full items-center py-6">
                      <DeleteButton 
                        onDelete={async () => {
                          "use server";
                          await deleteTestimonial(test.id);
                        }} 
                        itemType="testimonial" 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

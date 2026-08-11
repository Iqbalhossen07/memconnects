import prisma from "@/lib/prisma";
import Link from "next/link";
import { 
  MdOutlineAssignment, 
  MdOutlineArticle, 
  MdOutlineStar,
  MdAdd,
  MdFormatListBulleted
} from "react-icons/md";

export default async function AdminDashboard() {
  const blogsCount = await prisma.blogs.count();
  const testimonialsCount = await prisma.testimonials.count();
  const applicationsCount = await prisma.applications.count();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white p-4 md:p-6 rounded-md md:rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="order-2 md:order-1 mt-2 md:mt-0">
            <p className="text-[10px] md:text-sm font-semibold text-gray-600 uppercase tracking-wider md:tracking-widest mb-1 md:mb-2">Total Applications</p>
            <p className="text-xl md:text-3xl font-extrabold text-gray-800">{applicationsCount}</p>
          </div>
          <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 bg-blue-50 text-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineAssignment className="text-xl md:text-3xl" />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="order-2 md:order-1 mt-2 md:mt-0">
            <p className="text-[10px] md:text-sm font-semibold text-gray-600 uppercase tracking-wider md:tracking-widest mb-1 md:mb-2">Published Blogs</p>
            <p className="text-xl md:text-3xl font-extrabold text-gray-800">{blogsCount}</p>
          </div>
          <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 bg-emerald-50 text-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineArticle className="text-xl md:text-3xl" />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:-translate-y-1 transition-transform duration-300 col-span-2 md:col-span-1">
          <div className="order-2 md:order-1 mt-2 md:mt-0">
            <p className="text-[10px] md:text-sm font-semibold text-gray-600 uppercase tracking-wider md:tracking-widest mb-1 md:mb-2">Testimonials</p>
            <p className="text-xl md:text-3xl font-extrabold text-gray-800">{testimonialsCount}</p>
          </div>
          <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 bg-purple-50 text-[#8A56F6] rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineStar className="text-xl md:text-3xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions (Styled exactly like the 1st/2nd images) */}
      <div className="bg-white rounded-md p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-50">
        <div className="border-b border-gray-200 pb-2 mb-6">
          <h2 className="text-2xl font-bold text-[#1a202c]">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/secure_portal_99/blogs/new" className="bg-[#f97316] hover:bg-[#ea580c] transition-colors py-2 md:py-2 px-4 md:px-5 rounded-md flex flex-row items-center gap-3 md:gap-4 group">
            <div className="w-10 h-10 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MdAdd className="text-white text-xl md:text-2xl font-bold" /> 
            </div>
            <span className="text-white font-medium text-sm md:text-base">Add New Blog</span>
          </Link>
          
          <Link href="/secure_portal_99/testimonials/new" className="bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors py-2 md:py-2 px-4 md:px-5 rounded-md flex flex-row items-center gap-3 md:gap-4 group">
            <div className="w-10 h-10 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MdAdd className="text-white text-xl md:text-2xl font-bold" /> 
            </div>
            <span className="text-white font-medium text-sm md:text-base">Add Testimonial</span>
          </Link>
          
          <Link href="/secure_portal_99/applications" className="bg-[#3b82f6] hover:bg-[#2563eb] transition-colors py-2 md:py-2 px-4 md:px-5 rounded-md flex flex-row items-center gap-3 md:gap-4 group sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MdFormatListBulleted className="text-white text-xl md:text-2xl font-bold" /> 
            </div>
            <span className="text-white font-medium text-sm md:text-base">View Applications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

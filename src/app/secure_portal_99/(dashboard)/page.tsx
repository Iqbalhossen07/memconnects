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
      
      {/* Overview Cards (Styled exactly like the 3rd image) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#F8FAFC] p-5 rounded-xl border border-gray-100/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100/50 text-blue-600 rounded-lg flex items-center justify-center">
              <MdOutlineAssignment className="text-lg" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Total Applications</h3>
          </div>
          <p className="text-2xl font-medium text-gray-900">{applicationsCount}</p>
        </div>

        <div className="bg-[#F8FAFC] p-5 rounded-xl border border-gray-100/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-100/50 text-emerald-600 rounded-lg flex items-center justify-center">
              <MdOutlineArticle className="text-lg" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Published Blogs</h3>
          </div>
          <p className="text-2xl font-medium text-gray-900">{blogsCount}</p>
        </div>

        <div className="bg-[#F8FAFC] p-5 rounded-xl border border-gray-100/50 col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-100/50 text-purple-600 rounded-lg flex items-center justify-center">
              <MdOutlineStar className="text-lg" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Testimonials</h3>
          </div>
          <p className="text-2xl font-medium text-gray-900">{testimonialsCount}</p>
        </div>
      </div>

      {/* Quick Actions (Styled exactly like the 1st/2nd images) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-50">
        <div className="border-b border-gray-200 pb-2 mb-6">
          <h2 className="text-2xl font-bold text-[#1a202c]">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/secure_portal_99/blogs/new" className="bg-[#f97316] hover:bg-[#ea580c] transition-colors h-24 md:h-28 rounded-2xl flex flex-row items-center px-6 gap-4 group">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MdAdd className="text-white text-3xl font-bold" /> 
            </div>
            <span className="text-white font-medium text-lg">Add New Blog</span>
          </Link>
          
          <Link href="/secure_portal_99/testimonials/new" className="bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors h-24 md:h-28 rounded-2xl flex flex-row items-center px-6 gap-4 group">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MdAdd className="text-white text-3xl font-bold" /> 
            </div>
            <span className="text-white font-medium text-lg">Add Testimonial</span>
          </Link>
          
          <Link href="/secure_portal_99/applications" className="bg-[#3b82f6] hover:bg-[#2563eb] transition-colors h-24 md:h-28 rounded-2xl flex flex-row items-center px-6 gap-4 group sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MdFormatListBulleted className="text-white text-2xl font-bold" /> 
            </div>
            <span className="text-white font-medium text-lg">View Applications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

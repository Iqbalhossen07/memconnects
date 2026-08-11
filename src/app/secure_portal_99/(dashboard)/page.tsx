import prisma from "@/lib/prisma";
import Link from "next/link";
import { 
  MdOutlineAssignment, 
  MdOutlineArticle, 
  MdOutlineStar,
  MdAddCircle,
  MdFormatListBulleted
} from "react-icons/md";

export default async function AdminDashboard() {
  const blogsCount = await prisma.blogs.count();
  const testimonialsCount = await prisma.testimonials.count();
  const applicationsCount = await prisma.applications.count();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">Welcome to the MemConnects admin control panel.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="order-2 md:order-1 mt-2 md:mt-0">
            <p className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase tracking-wider md:tracking-widest mb-1 md:mb-2">Total Applications</p>
            <p className="text-3xl md:text-5xl font-extrabold text-gray-800">{applicationsCount}</p>
          </div>
          <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 bg-blue-50 text-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineAssignment className="text-xl md:text-3xl" />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="order-2 md:order-1 mt-2 md:mt-0">
            <p className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase tracking-wider md:tracking-widest mb-1 md:mb-2">Published Blogs</p>
            <p className="text-3xl md:text-5xl font-extrabold text-gray-800">{blogsCount}</p>
          </div>
          <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 bg-emerald-50 text-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineArticle className="text-xl md:text-3xl" />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:-translate-y-1 transition-transform duration-300 col-span-2 md:col-span-1">
          <div className="order-2 md:order-1 mt-2 md:mt-0">
            <p className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase tracking-wider md:tracking-widest mb-1 md:mb-2">Testimonials</p>
            <p className="text-3xl md:text-5xl font-extrabold text-gray-800">{testimonialsCount}</p>
          </div>
          <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 bg-purple-50 text-[#8A56F6] rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineStar className="text-xl md:text-3xl" />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
        
        <div className="border-b border-gray-100 pb-3 mb-6 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <Link href="/secure_portal_99/blogs/new" className="group flex flex-col md:flex-row items-center justify-center md:justify-start bg-gradient-to-br from-[#F2852C] to-[#E56B09] p-4 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-white/20 p-2 rounded-full mb-2 md:mb-0 md:mr-3">
              <MdAddCircle className="text-white text-2xl" /> 
            </div>
            <span className="text-white font-medium text-xs md:text-sm text-center md:text-left">Add New Blog</span>
          </Link>
          
          <Link href="/secure_portal_99/testimonials/new" className="group flex flex-col md:flex-row items-center justify-center md:justify-start bg-gradient-to-br from-[#8A56F6] to-[#6D5795] p-4 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-white/20 p-2 rounded-full mb-2 md:mb-0 md:mr-3">
              <MdAddCircle className="text-white text-2xl" /> 
            </div>
            <span className="text-white font-medium text-xs md:text-sm text-center md:text-left">Add Testimonial</span>
          </Link>
          
          <Link href="/secure_portal_99/applications" className="group flex flex-col md:flex-row items-center justify-center md:justify-start bg-gradient-to-br from-blue-500 to-blue-600 p-4 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 col-span-2 md:col-span-1">
            <div className="bg-white/20 p-2 rounded-full mb-2 md:mb-0 md:mr-3">
              <MdFormatListBulleted className="text-white text-2xl" /> 
            </div>
            <span className="text-white font-medium text-xs md:text-sm text-center md:text-left">View Applications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

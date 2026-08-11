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
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 text-lg">Welcome to the MemConnects admin control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Total Applications</p>
            <p className="text-5xl font-extrabold text-gray-800">{applicationsCount}</p>
          </div>
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineAssignment size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Published Blogs</p>
            <p className="text-5xl font-extrabold text-gray-800">{blogsCount}</p>
          </div>
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineArticle size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Testimonials</p>
            <p className="text-5xl font-extrabold text-gray-800">{testimonialsCount}</p>
          </div>
          <div className="w-16 h-16 bg-purple-50 text-[#8A56F6] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdOutlineStar size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          <div className="border-b border-gray-800 pb-2 mb-8 inline-block w-full">
            <h2 className="text-xl font-bold text-gray-800 inline-block bg-gray-200/60 px-2 py-0.5 rounded-sm">Quick Actions</h2>
          </div>
          
          <div className="space-y-6">
            <Link href="/secure_portal_99/blogs/new" className="group flex items-center">
              <MdAddCircle className="text-[#F2852C] text-2xl mr-4 group-hover:scale-110 transition-transform" /> 
              <span className="text-gray-700 bg-gray-200/60 px-2 py-1 rounded-sm font-medium">Add New Blog Post</span>
            </Link>
            
            <Link href="/secure_portal_99/testimonials/new" className="group flex items-center">
              <MdAddCircle className="text-[#6D5795] text-2xl mr-4 group-hover:scale-110 transition-transform" /> 
              <span className="text-gray-700 bg-gray-200/60 px-2 py-1 rounded-sm font-medium">Add New Testimonial</span>
            </Link>
            
            <Link href="/secure_portal_99/applications" className="group flex items-center">
              <MdFormatListBulleted className="text-blue-500 text-2xl mr-4 group-hover:scale-110 transition-transform" /> 
              <span className="text-gray-700 bg-gray-200/60 px-2 py-1 rounded-sm font-medium">View All Applications</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

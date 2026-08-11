import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const blogsCount = await prisma.blogs.count();
  const testimonialsCount = await prisma.testimonials.count();
  const applicationsCount = await prisma.applications.count();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the MemConnects admin control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Applications</p>
            <p className="text-4xl font-bold text-gray-800">{applicationsCount}</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-2xl">
            <i className="fas fa-file-alt"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Published Blogs</p>
            <p className="text-4xl font-bold text-gray-800">{blogsCount}</p>
          </div>
          <div className="w-14 h-14 bg-orange-50 text-[#F2852C] rounded-full flex items-center justify-center text-2xl">
            <i className="fas fa-blog"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Testimonials</p>
            <p className="text-4xl font-bold text-gray-800">{testimonialsCount}</p>
          </div>
          <div className="w-14 h-14 bg-purple-50 text-[#6D5795] rounded-full flex items-center justify-center text-2xl">
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/secure_portal_99/blogs/new" className="block p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center text-gray-700">
              <i className="fas fa-plus-circle text-[#F2852C] mr-3"></i> Add New Blog Post
            </Link>
            <Link href="/secure_portal_99/testimonials/new" className="block p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center text-gray-700">
              <i className="fas fa-plus-circle text-[#6D5795] mr-3"></i> Add New Testimonial
            </Link>
            <Link href="/secure_portal_99/applications" className="block p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center text-gray-700">
              <i className="fas fa-list text-blue-500 mr-3"></i> View All Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

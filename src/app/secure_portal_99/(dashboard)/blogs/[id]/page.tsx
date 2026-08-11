import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowBack, MdCategory, MdDateRange, MdPerson } from "react-icons/md";

export default async function AdminBlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blogs.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link href="/secure_portal_99/blogs" className="mr-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-[#F2852C] transition border border-gray-100 hover:shadow-md">
          <MdArrowBack size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Details</h1>
          <p className="text-gray-500 mt-1">View blog post information.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {blog.featured_image && (
          <div className="w-full h-64 md:h-96 relative">
            <img 
              src={`/${blog.featured_image}`} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{blog.title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <MdCategory className="text-[#F2852C] mr-2" />
              <span>{blog.category || "Uncategorized"}</span>
            </div>
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <MdPerson className="text-[#F2852C] mr-2" />
              <span>Admin</span>
            </div>
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <MdDateRange className="text-[#F2852C] mr-2" />
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
            <div className={`flex items-center px-3 py-1.5 rounded-lg font-medium ${
              blog.status === 'published' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
            }`}>
              <span className="capitalize">{blog.status}</span>
            </div>
          </div>
          
          <div 
            className="prose max-w-none text-gray-700" 
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>
      </div>
    </div>
  );
}

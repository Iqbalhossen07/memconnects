import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteBlog } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blogs.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
          <p className="text-gray-500 mt-1">Manage your website's blog posts.</p>
        </div>
        <Link href="/secure_portal_99/blogs/new" className="bg-[#F2852C] hover:bg-[#D9721B] text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm">
          <i className="fas fa-plus mr-2"></i> Add New Blog
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600 w-16">Image</th>
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4">
                      {blog.featured_image ? (
                        <img src={`/${blog.featured_image}`} alt={blog.title} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                          <i className="fas fa-image"></i>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                    <td className="p-4 text-sm text-gray-500">{blog.category}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</td>
                    <td className="p-4 flex space-x-3 justify-end items-center h-[80px]">
                      <DeleteButton 
                        onDelete={async () => {
                          "use server";
                          await deleteBlog(blog.id);
                        }} 
                        itemType="blog" 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No blogs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

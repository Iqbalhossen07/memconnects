import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteBlog } from "@/app/actions/adminActions";
import DeleteButton from "@/components/DeleteButton";
import { MdAdd, MdEdit, MdCategory, MdPerson, MdDateRange, MdRemoveRedEye } from "react-icons/md";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blogs.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Blogs Management</h1>
        <Link href="/secure_portal_99/blogs/new" className="bg-[#6D5795] text-white px-5 py-2.5 rounded-lg hover:bg-[#59457A] shadow-md hover:shadow-lg transition flex items-center font-medium">
          <MdAdd className="mr-2" size={20} /> Add New Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden flex flex-col transition">
            {blog.featured_image ? (
              <img src={`/uploads/${blog.featured_image}`} alt={blog.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
                <div className="flex items-center">
                  <MdCategory className="mr-2 text-[#F2852C]" /> 
                  <span className="truncate">{blog.category || "Uncategorized"}</span>
                </div>
                <div className="flex items-center">
                  <MdPerson className="mr-2 text-[#F2852C]" /> 
                  <span className="truncate">{blog.author || "Admin"}</span>
                </div>
                <div className="flex items-center">
                  <MdDateRange className="mr-2 text-[#F2852C]" /> 
                  {new Date(blog.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mt-auto flex justify-end items-center space-x-2">
                <Link 
                  href={`/blogs/${blog.id}`} 
                  target="_blank"
                  className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition" 
                  title="View on Website"
                >
                  <MdEdit size={20} />
                </Link>
                <Link 
                  href={`/secure_portal_99/blogs/${blog.id}/edit`} 
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition" 
                  title="Edit Blog"
                >
                  <MdEdit size={20} />
                </Link>
                <DeleteButton 
                  onDelete={async () => {
                    "use server";
                    await deleteBlog(blog.id);
                  }} 
                  itemType="blog" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          No blogs found. Click "Add New Blog" to create one.
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateBlog } from "@/app/actions/blogActions";
import TextEditor from "@/components/TextEditor";
import { MdArrowBack, MdSave } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditBlogForm({ blog }: { blog: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(blog.content);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.set("content", content);

    const updateBlogWithId = updateBlog.bind(null, blog.id);
    const res = await updateBlogWithId(null, formData);
    
    if (res?.success) {
      Swal.fire({
        title: 'Updated!',
        text: 'Blog post has been updated.',
        icon: 'success',
        confirmButtonColor: '#F2852C'
      }).then(() => {
        router.push("/secure_portal_99/blogs");
        router.refresh();
      });
    } else {
      Swal.fire('Error', res?.error || "Failed to update blog", 'error');
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link href="/secure_portal_99/blogs" className="mr-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-[#F2852C] transition border border-gray-100 hover:shadow-md">
            <MdArrowBack size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Blog</h1>
            <p className="text-gray-500 mt-1">Update your blog post details.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blog Title *</label>
            <input type="text" name="title" defaultValue={blog.title} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input type="text" name="category" defaultValue={blog.category || ""} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none" placeholder="e.g. Technology, Education" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select name="status" defaultValue={blog.status} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none bg-white">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image</label>
            <input type="file" name="featured_image" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#F2852C] hover:file:bg-orange-100 cursor-pointer border border-gray-300 rounded-lg" />
            {blog.featured_image && (
              <p className="text-xs text-gray-500 mt-2">Current image: {blog.featured_image}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Content *</label>
            <TextEditor value={content} onChange={setContent} placeholder="Write your blog post here..." />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isSubmitting} className={`flex items-center px-8 py-3 rounded-xl font-bold text-white transition shadow-md hover:shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#6D5795] hover:bg-[#5a487c]'}`}>
              <MdSave className="mr-2" size={20} />
              {isSubmitting ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

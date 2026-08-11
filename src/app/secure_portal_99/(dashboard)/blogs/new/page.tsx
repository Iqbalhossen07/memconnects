"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addBlog } from "@/app/actions/blogActions";

export default function NewBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await addBlog(null, formData);
    
    if (res?.success) {
      router.push("/secure_portal_99/blogs");
      router.refresh();
    } else {
      alert(res?.error || "Failed to create blog");
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link href="/secure_portal_99/blogs" className="mr-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-gray-800 transition">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Blog</h1>
            <p className="text-gray-500 mt-1">Create a new blog post for your website.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blog Title *</label>
            <input type="text" name="title" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input type="text" name="category" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none" placeholder="e.g. Technology, Education" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select name="status" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none bg-white">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image *</label>
            <input type="file" name="featured_image" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#F2852C] hover:file:bg-orange-100 cursor-pointer border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Content (HTML allowed) *</label>
            <textarea name="content" required rows={10} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2852C] outline-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isSubmitting} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isSubmitting ? 'bg-gray-400' : 'bg-[#6D5795] hover:bg-[#5a487c]'}`}>
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

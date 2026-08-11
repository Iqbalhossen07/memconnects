import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/secure_portal_99/login");
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2D233F] text-white flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center">
            <i className="fas fa-shield-alt mr-3 text-[#F2852C]"></i> Mem<span className="text-[#F2852C]">Admin</span>
          </h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link href="/secure_portal_99" className="flex items-center px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition">
            <i className="fas fa-tachometer-alt w-6"></i> Dashboard
          </Link>
          <Link href="/secure_portal_99/applications" className="flex items-center px-4 py-3 rounded-lg text-gray-300 font-medium hover:bg-white/10 hover:text-white transition">
            <i className="fas fa-file-alt w-6"></i> Applications
          </Link>
          <Link href="/secure_portal_99/blogs" className="flex items-center px-4 py-3 rounded-lg text-gray-300 font-medium hover:bg-white/10 hover:text-white transition">
            <i className="fas fa-blog w-6"></i> Blogs
          </Link>
          <Link href="/secure_portal_99/testimonials" className="flex items-center px-4 py-3 rounded-lg text-gray-300 font-medium hover:bg-white/10 hover:text-white transition">
            <i className="fas fa-star w-6"></i> Testimonials
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-bold text-gray-800">Secure Portal</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full">
              <i className="fas fa-user-circle mr-2"></i> {session.name}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

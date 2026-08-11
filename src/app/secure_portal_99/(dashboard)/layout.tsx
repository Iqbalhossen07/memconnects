import Link from "next/link";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";
import AdminBottomNav from "./AdminBottomNav";
import { MdAccountCircle } from "react-icons/md";
import { AdminProvider } from "./AdminContext";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        
        {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex-shrink-0 flex items-center justify-between px-4 md:px-8 z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="hidden md:inline">Secure Portal</span>
            <img src="/img/logo.png" alt="Mem Connects Logo" className="h-10 md:hidden object-contain" />
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
              {session?.profile_picture ? (
                <img src={`/uploads/admin/${session.profile_picture}`} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <MdAccountCircle className="w-7 h-7 text-gray-400" />
              )}
              <span className="text-sm font-semibold text-gray-700 hidden sm:block truncate max-w-[150px]">
                {session?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminBottomNav />

      </div>
    </AdminProvider>
  );
}

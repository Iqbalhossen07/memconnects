"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MdDashboard, 
  MdArticle, 
  MdStar, 
  MdAssignment, 
  MdEmail,
  MdSettings,
  MdClose
} from "react-icons/md";
import AdminLogoutButton from "./AdminLogoutButton";
import { useAdmin } from "./AdminContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAdmin();

  const links = [
    { href: "/secure_portal_99", label: "Dashboard", icon: <MdDashboard size={24} /> },
    { href: "/secure_portal_99/applications", label: "Applications", icon: <MdAssignment size={24} /> },
    { href: "/secure_portal_99/blogs", label: "Blogs", icon: <MdArticle size={24} /> },
    { href: "/secure_portal_99/testimonials", label: "Testimonials", icon: <MdStar size={24} /> },
    { href: "/secure_portal_99/settings", label: "Settings", icon: <MdSettings size={24} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 
        w-full md:w-64 bg-[#2D233F] text-white flex flex-col shadow-xl 
        transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full hidden md:flex"}
      `}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <img src="/img/logo.png" alt="Mem Connects Logo" className="h-12 object-contain bg-white/90 p-2 rounded-xl shadow-inner" />
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MdClose size={28} />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition ${
                isActive 
                  ? "bg-[#F2852C] text-white shadow-md" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <AdminLogoutButton />
      </div>
    </aside>
    </>
  );
}

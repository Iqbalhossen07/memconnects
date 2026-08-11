"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MdDashboard, 
  MdArticle, 
  MdStar, 
  MdAssignment, 
  MdSettings 
} from "react-icons/md";
import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/secure_portal_99", label: "Dashboard", icon: <MdDashboard size={24} /> },
    { href: "/secure_portal_99/applications", label: "Applications", icon: <MdAssignment size={24} /> },
    { href: "/secure_portal_99/blogs", label: "Blogs", icon: <MdArticle size={24} /> },
    { href: "/secure_portal_99/testimonials", label: "Testimonials", icon: <MdStar size={24} /> },
    { href: "/secure_portal_99/settings", label: "Settings", icon: <MdSettings size={24} /> },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-[#2D233F] text-white flex-col shadow-xl z-20">
      <div className="p-6 border-b border-gray-700 flex justify-center items-center">
        <img src="/img/logo.png" alt="Mem Connects Logo" className="h-12 object-contain bg-white/90 p-2 rounded-xl shadow-inner" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
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
  );
}

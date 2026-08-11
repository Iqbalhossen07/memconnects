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

export default function AdminBottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/secure_portal_99", icon: <MdDashboard size={24} />, label: "Home" },
    { href: "/secure_portal_99/applications", icon: <MdAssignment size={24} />, label: "Apps" },
    { href: "/secure_portal_99/blogs", icon: <MdArticle size={24} />, label: "Blogs" },
    { href: "/secure_portal_99/testimonials", icon: <MdStar size={24} />, label: "Reviews" },
    { href: "/secure_portal_99/settings", icon: <MdSettings size={24} />, label: "Settings" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex justify-around items-center px-2 py-3 pb-safe">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
              isActive 
                ? "text-[#F2852C]" 
                : "text-gray-500 hover:text-[#6D5795] hover:bg-gray-50"
            }`}
          >
            {link.icon}
            <span className="text-[10px] mt-1 font-medium">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

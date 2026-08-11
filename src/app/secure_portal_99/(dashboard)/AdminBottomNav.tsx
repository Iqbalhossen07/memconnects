"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MdDashboard, 
  MdArticle, 
  MdStar, 
  MdAssignment, 
  MdMenu 
} from "react-icons/md";
import { useAdmin } from "./AdminContext";

export default function AdminBottomNav() {
  const pathname = usePathname();
  const { setIsMobileMenuOpen } = useAdmin();

  // Using actual menu names while keeping the colorful design from the image
  const navItems = [
    { 
      href: "/secure_portal_99", 
      label: "Dashboard", 
      icon: <MdDashboard size={22} />,
      color: "blue",
      activeBg: "bg-blue-500 text-white",
      inactiveBg: "bg-blue-50 text-blue-500"
    },
    { 
      href: "/secure_portal_99/applications", 
      label: "Applications", 
      icon: <MdAssignment size={22} />,
      color: "pink",
      activeBg: "bg-pink-500 text-white",
      inactiveBg: "bg-pink-50 text-pink-500"
    },
    { 
      href: "/secure_portal_99/blogs", 
      label: "Blogs", 
      icon: <MdArticle size={22} />,
      color: "emerald",
      activeBg: "bg-emerald-500 text-white",
      inactiveBg: "bg-emerald-50 text-emerald-500"
    },
    { 
      href: "/secure_portal_99/testimonials", 
      label: "Testimonials", 
      icon: <MdStar size={22} />,
      color: "orange",
      activeBg: "bg-orange-400 text-white",
      inactiveBg: "bg-orange-50 text-orange-400"
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-2 pb-safe z-30 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-md transition-all duration-200 ${
                isActive ? item.activeBg : item.inactiveBg
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-[10px] font-medium tracking-tight truncate w-full text-center px-1">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Menu Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-md bg-white text-gray-500 border border-gray-100 shadow-sm transition-all duration-200 hover:bg-gray-50 active:bg-gray-100"
        >
          <div className="mb-1">
            <MdMenu size={26} />
          </div>
          <span className="text-[10px] font-medium tracking-tight text-gray-500">Menu</span>
        </button>
      </div>
    </nav>
  );
}

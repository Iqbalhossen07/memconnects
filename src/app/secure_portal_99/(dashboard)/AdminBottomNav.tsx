"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MdHome, 
  MdPeople, 
  MdShoppingCart, 
  MdRestaurant, 
  MdInsertDriveFile, 
  MdMenu 
} from "react-icons/md";
import { useAdmin } from "./AdminContext";

export default function AdminBottomNav() {
  const pathname = usePathname();
  const { setIsMobileMenuOpen } = useAdmin();

  // Mapping actual routes to the requested visual representation
  // Dashboard -> Home (Blue)
  // Applications -> Members (Pink)
  // Blogs -> Bazar (Green)
  // Testimonials -> Meals (Orange)
  // Settings -> Others (Purple)
  const navItems = [
    { 
      href: "/secure_portal_99", 
      label: "Home", 
      icon: <MdHome size={22} />,
      color: "blue",
      activeBg: "bg-blue-500 text-white",
      inactiveBg: "bg-blue-50 text-blue-500"
    },
    { 
      href: "/secure_portal_99/applications", 
      label: "Members", 
      icon: <MdPeople size={22} />,
      color: "pink",
      activeBg: "bg-pink-500 text-white",
      inactiveBg: "bg-pink-50 text-pink-500"
    },
    { 
      href: "/secure_portal_99/blogs", 
      label: "Bazar", 
      icon: <MdShoppingCart size={22} />,
      color: "emerald",
      activeBg: "bg-emerald-500 text-white",
      inactiveBg: "bg-emerald-50 text-emerald-500"
    },
    { 
      href: "/secure_portal_99/testimonials", 
      label: "Meals", 
      icon: <MdRestaurant size={22} />,
      color: "orange",
      activeBg: "bg-orange-400 text-white",
      inactiveBg: "bg-orange-50 text-orange-400"
    },
    { 
      href: "/secure_portal_99/settings", 
      label: "Others", 
      icon: <MdInsertDriveFile size={22} />,
      color: "purple",
      activeBg: "bg-[#8A56F6] text-white",
      inactiveBg: "bg-purple-50 text-[#8A56F6]"
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
              className={`flex flex-col items-center justify-center w-14 h-16 rounded-2xl transition-all duration-200 ${
                isActive ? item.activeBg : item.inactiveBg
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Menu Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center w-14 h-16 rounded-2xl bg-white text-gray-500 border border-gray-100 shadow-sm transition-all duration-200 hover:bg-gray-50 active:bg-gray-100"
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

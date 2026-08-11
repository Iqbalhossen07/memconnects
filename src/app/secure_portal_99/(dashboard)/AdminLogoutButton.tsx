"use client";

import { handleLogout } from "@/app/actions/authActions";

export default function AdminLogoutButton() {
  return (
    <button
      onClick={() => handleLogout()}
      className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 hover:text-red-300 transition-colors"
    >
      <i className="fas fa-sign-out-alt mr-2"></i> Logout
    </button>
  );
}

"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { keycloakConfig } from "@/lib/config";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });

      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      const logoutUrl = `${keycloakConfig.logoutUrl}?client_id=${keycloakConfig.clientId}&post_logout_redirect_uri=${encodeURIComponent(
        keycloakConfig.postLogoutRedirectUri
      )}`;

      window.location.href = logoutUrl;
    } catch (error) {
      console.error("Logout error:", error);
      window.location.replace("/");
    }
  };

  return (
    <header className="bg-indigo-900 shadow px-4 sm:px-6 py-2 flex justify-between items-center relative">
      {/* Title */}
      <h1 className="text-lg sm:text-xl font-semibold text-white truncate">
        Dashboard
      </h1>

      {/* Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-white hover:bg-indigo-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            {/* Hide "Profile" text on small screens */}
            <span className="hidden sm:inline font-medium">Profile</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || "User Profile"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session?.user?.email || "user@example.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for closing dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}

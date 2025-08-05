"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", icon: <LayoutDashboard size={20} />, name: "Dashboard" },
    { href: "/dashboard/analytics", icon: <BarChart2 size={20} />, name: "Analytics" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 flex justify-around items-center py-2 md:hidden z-50">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center text-xs transition-colors ${
            pathname === link.href ? "text-indigo-400" : "text-gray-400 hover:text-indigo-300"
          }`}
        >
          {link.icon}
          <span className="text-[10px] mt-1">{link.name}</span>
        </Link>
      ))}

      {/* Logout button in BottomNav */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex flex-col items-center text-xs text-gray-400 hover:text-red-400 transition-colors"
      >
        <LogOut size={20} />
        <span className="text-[10px] mt-1">Logout</span>
      </button>
    </div>
  );
}

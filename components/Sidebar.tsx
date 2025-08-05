"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Analytics", href: "/dashboard/analytics" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Finance Tracker</h2>
        <nav>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 rounded mb-2 transition ${
                pathname === link.href ? "bg-indigo-600" : "hover:bg-slate-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
}

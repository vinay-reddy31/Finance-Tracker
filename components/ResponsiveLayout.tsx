"use client";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { useEffect, useState } from "react";

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {!isMobile && <Sidebar />}
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      {isMobile && <BottomNav />}
    </div>
  );
}

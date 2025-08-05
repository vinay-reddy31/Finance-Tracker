"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      <div className="flex flex-col flex-1">
        {/* Navbar (always visible) */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>

        {/* Mobile BottomNav */}
        {isMobile && <BottomNav />}
      </div>
    </div>
  );
}

"use client";
import "@/app/globals.css";
import { poppins } from "@/lib/font";
import SideNav from "./componentC/sidenav";
import Header from "./componentC/Header";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ConsumerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function ToggleSide() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <html lang="en">
      <body className={`h-full ${poppins.className} antialiased pt-[100px]`}>
        <div className="flex flex-col">
          <header className="fixed z-50 w-full top-0 left-0">
          <Header setIsSidebarOpen={ToggleSide} />

          </header>
          
          

          {/* Main Content Area - Lower z-index */}
          <main
            className={`relative z-10`}
          >
            <div className=" w-full">
              <div className="bg-transparent backdrop-blur-sm rounded-2xl border border-white/20 ">
                {children}
              </div>
            </div>
          </main>
          {/* Overlay for Mobile - Medium z-index */}
          {/* {isSidebarOpen && (
            <div
              className="sm:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )} */}
        </div>
      </body>
    </html>
  );
}

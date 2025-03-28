"use client";
import "@/app/globals.css";
import { poppins } from "@/lib/font";
import SideNav from "@/app/(ProviderDashbaord)/component/sidenav";
import Header from "@/app/(ProviderDashbaord)/component/header";
import { useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ConsumerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function ToggleSide() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <html lang="en">
      <body className={`h-full ${poppins.className} antialiased`}>
        <div className="flex min-h-screen gap-3">
          {/* Modern Sidebar */}
          <aside
            className={`fixed bg-white inset-0 lg:inset-auto lg:top-0 h-screen w-64 flex flex-col shadow transform transition-transform duration-300 z-50
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            
            <nav className="pt-9 px-4 space-y-[50px]">
              <div className=" ">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Handy Dashboard
                </h1>
              </div>
              <ul className="flex">
                <SideNav />
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main
            className={`flex-1 flex flex-col overflow-y-auto relative z-10 ${
              isSidebarOpen ? "lg:ml-[250px]" : "ml-0"
            }`}
          >
            <Header setIsSidebarOpen={ToggleSide} />
            <div className=" max-w-7xl mx-auto w-full p-2">
              <div className="bg-white">{children}</div>
            </div>
          </main>

          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </body>
    </html>
  );
}

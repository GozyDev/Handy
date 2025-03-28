"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon} from "@heroicons/react/24/outline";
export default function Header({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: () => void;
}) {
  const [userState, setUserState] = useState({
    userId: "",
    name: "",
    email: "",
    role: "",
  });
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Auth failed");
        const data = await response.json();
        setUserState(data.user);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);
  return (
    <>
      <header className="bg-white shadow-sm mb-5">
        <div className="max-w-7xl mx-auto px-2 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={setIsSidebarOpen}
              className="p-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {userState.name || userState.email}
                </p>
                {userState.email && (
                  <p className="text-xs text-gray-500">{userState.email}</p>
                )}
              </div>
              <button
                onClick={() => router.push("/logout")}
                className=" px-3 py-2 md:px-4 md:py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

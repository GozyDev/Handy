"use client";

import { useEffect, useState } from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  CheckIcon,
  UserCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";
import { UserProfile } from "@/lib/type";
import FullWidthForm from "../component/formUpdate";
export default function Page() {
  const [user, setUser] = useState<UserProfile>();
  const [laoding, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(false);
  const [editMessage, setEditMessage] = useState<string>("");

  useEffect(() => {
    try {
      const getProfile = async () => {
        const response = await fetch("api/provider/profile");
        const data = await response.json();

        if (!response.ok) {
          alert("Something went wrong");
        }
        setUser(data.user);
      };
      getProfile();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  if (laoding && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  function ProfileEdit() {
    setShowForm(true);
  }

  function MessageUpdate(mess:string){
    setShowForm(false)
    setEditMessage(mess)
    setTimeout(() => {
      setEditMessage("");
    }, 3300);
  }

  function updateProfile( updatedUserFd: UserProfile) {
    
    setUser(updatedUserFd);
   
   
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8  px-2 sm:px-6 lg:px-8">
        {user && (
          <div className="max-w-7xl mx-auto">
            {editMessage && (
              <div className="shadow p-4 rounded bg-purple-200/50 text-purple-700 mb-7 .animate-fade-in">
                <p>{editMessage}</p>
              </div>
            )}
             <header className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Profile Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage client appointments and service requests
          </p>
        </header>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
              {/* Left Column - Profile Card */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow p-4  backdrop-blur-sm">
                  <div className="flex flex-col ">
                    <div className="w-32 h-32 rounded-full bg-purple-100/50 flex items-center justify-center mb-6 mx-auto">
                      <UserCircleIcon className="w-16 h-16 text-purple-600/80 " />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                      {user?.name}
                    </h1>

                    <div className="w-full space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl">
                        <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Hourly Rate</p>
                          <p className="text-xl font-bold text-purple-600">
                            ${user?.providerProfile.rate}
                            <span className="text-sm font-medium text-gray-400">
                              /hr
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl">
                        <MapPinIcon className="w-6 h-6 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Service Areas</p>
                          <p className="text-base font-medium text-gray-700">
                            {user?.providerProfile.locations.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-purple-600 gap-2 mt-6">
                      <button
                        onClick={() => ProfileEdit()}
                        className=" flex justify-center items-center gap-1 shadow bg-purple-600/90 rounded py-2 px-4 w-full text-md text-white capitalize"
                      >
                        edit profile
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Bio Section */}
                <div className="bg-white rounded-2xl shadow border-white/20 p-8 backdrop-blur-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    About Me
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {user?.providerProfile.bio || "No bio provided yet"}
                  </p>
                </div>

                {/* Services Section */}
                <div className="bg-white rounded-2xl shadow border-white/20 p-8 backdrop-blur-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Services Offered
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user?.providerProfile.services.map((service: string) => (
                      <div
                        key={service}
                        className="flex items-center p-4 bg-purple-50/30 rounded-xl hover:bg-purple-50/50 transition-colors"
                      >
                        <CheckIcon className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                        <span className="font-medium text-gray-700">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <FullWidthForm
            onClose={() => setShowForm(false)}
            user={user}
            MessageUpdate={MessageUpdate}
            updateProfile={updateProfile}

          />
        )}
      </div>
    </>
  );
}

"use client";
import ReactDOM from "react-dom";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserProfile } from "@/lib/type";

export default function FullWidthForm({
  onClose,
  user,
  MessageUpdate,
  updateProfile
}: {
  onClose: () => void;
  MessageUpdate: (mess: string) => void;
  updateProfile:(updatedUserFd: UserProfile)=> void
  user: UserProfile | undefined;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    rate: user?.providerProfile?.rate?.toString() || "",
    location: user?.providerProfile?.locations?.join(", ") || "",
    bio: user?.providerProfile?.bio || "",
    link: user?.providerProfile?.link || "",
  });
  
  const [laoding, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();;
    setLoading(true)
    console.log("Form submitted:", formData);
    try {
      const response = await fetch("api/provider/editprofile", {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Somthing went wrong");
      } else {
       MessageUpdate(data.message)
       updateProfile(data.user)
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-2">
      <div className="relative w-full h-[600px] overflow-y-scroll max-w-2xl bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">
            Provider Profile Setup
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="Enter your professional name"
            />
          </div>

          {/* Rate & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hourly Rate
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="00.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="City, State"
              />
            </div>
          </div>

           {/* List  Field */}
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Social link
            </label>
            <input
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="Describe your services and experience."
            />
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Professional Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              rows={4}
              placeholder="Describe your services and experience..."
            />
          </div>

          {/* Form Actions */}
          <div className="pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 ${
                laoding ? "bg-purple-600/30" : "bg-purple-600"
              } text-white hover:bg-purple-700 rounded-lg transition-colors shadow-sm`}
              disabled={laoding}
            >
              {!laoding ? "Save Profile" : "Processing..."}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

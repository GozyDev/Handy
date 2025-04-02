"use client";
import { useState } from "react";
import Checkbox from "./checkbox";
import { ProviderProfile } from "@/lib/type";
import {
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ProvidersBookingForm({
  provider,
}: {
  provider: ProviderProfile;
}) {
  const [bookingData, setBookingData] = useState({
    providerID: provider.id,
    selectedServices: [] as string[],
    note: "",
    location: "",
    scheduleTime: "",
  });
  const updateBookingDataField = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };
  const updateServices = (value: string, checked: boolean) => {
    setBookingData((prev) => ({
      ...prev,
      selectedServices: checked
        ? [...prev.selectedServices, value]
        : prev.selectedServices.filter((service) => service !== value),
    }));
  };
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sucessMessage, setSucessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [validateBookingInput, setValidateBookingInput] = useState<{
    lacation: string;
    services: string;
    scheduledTime: string;
  }>({
    lacation: "",
    services: "",
    scheduledTime: "",
  });
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const ValidateBeforeBooking = () => {
    const updataValidate = {
      lacation: bookingData.location === "" ? "Invalid location" : "",
      services:  bookingData.selectedServices.length < 1 ? "Choose at least a skill" : "" ,
      scheduledTime: bookingData.scheduleTime === "" ? "Invalid Scheduled Time" : "",
    };

    setValidateBookingInput(updataValidate)

    if(!updataValidate.lacation && !updataValidate.services && !updataValidate.scheduledTime){
      handleSubmit()
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      // If response is not OK, show error and exit early
      if (!response.ok) {
        setErrorMessage(data.error);
        return;
      }

      if (response.ok) {
        setSucessMessage(data.message);
        setTimeout(() => {
          router.push("/booking");
        }, 1500);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-11 px-2 sm:px-6 lg:px-8 ">
      {/* Status Messages */}
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
        {errorMessage && (
          <div className="fixed top-4 right-4 z-50 p-4 rounded-lg bg-purple-600 shadow-lg  animate-fade-in">
            <p className="text-white font-medium">{errorMessage}</p>
          </div>
        )}
        {sucessMessage && (
          <div className="fixed top-4 right-4 z-50 p-4 rounded-lg bg-purple-600 shadow-lg  animate-fade-in">
            <p className="text-white font-medium">{sucessMessage}</p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Provider Profile Card - Enhanced Layout */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-purple-100/50 flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">👤</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {provider.user.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-600">
                    ${provider.rate}/hr
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Service Areas
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {provider.locations.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <StarIcon className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Customer Rating
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      4.9/5 (128 reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form - Enhanced Layout */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-2 py-8  md:p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 pb-4 border-b border-gray-100">
              Schedule Service
            </h1>

            <div className="space-y-8">
              {/* Service Selection */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Services
                </h2>
                <p className="text-sm text-red-900 capitalize">
                  {validateBookingInput.services}
                </p>
                <Checkbox
                  services={provider.services}
                  updataServices={updateServices}
                  bookingData={bookingData}
                />
              </div>

              {/* Date & Location Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="w-5 h-5 text-purple-600" />
                      Preferred Date & Time
                    </div>
                    <p className="text-sm text-red-900 capitalize">
                      {validateBookingInput.scheduledTime}
                    </p>
                    <input
                    min={today}
                      type="date"
                      name="scheduleTime"
                      value={bookingData.scheduleTime}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all"
                      onChange={(e) =>
                        updateBookingDataField(e.target.name, e.target.value)
                      }
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinIcon className="w-5 h-5 text-purple-600" />
                      Service Address
                    </div>
                    <p className="text-sm text-red-900 capitalize">
                      {validateBookingInput.lacation}
                    </p>
                    <input
                      type="text"
                      name="location"
                      value={bookingData.location}
                      placeholder="Enter full address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all"
                      onChange={(e) =>
                        updateBookingDataField(e.target.name, e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <DocumentTextIcon className="w-5 h-5 text-purple-600" />
                    Additional Notes (optional)
                  </div>
                  <textarea
                    name="note"
                    value={bookingData.note}
                    rows={4}
                    placeholder="Special instructions or service details..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    onChange={(e) =>
                      updateBookingDataField(e.target.name, e.target.value)
                    }
                  />
                </label>
                <div className="text-right text-sm text-gray-500">
                  {bookingData.note.length}/500
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={ValidateBeforeBooking}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                {loading ? "Process..." : "Confirm Booking Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

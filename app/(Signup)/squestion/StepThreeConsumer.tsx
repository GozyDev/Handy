"use client";
import { useState } from "react";
import { ExclamationCircleIcon, BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { PropData } from "@/lib/type";

export default function StepThreeConsumer({ nextStep, prevStep, updateFormData, formData }: PropData) {
  const [errors, setErrors] = useState({ interestedServices: "", location: "" });

  const validateAndNext = () => {
    const newErrors = {
      interestedServices: !formData.interestedServices.length ? "Please list at least one service" : "",
      location: !formData.location.trim() ? "Location is required" : ""
    };
    
    setErrors(newErrors);
    if (!Object.values(newErrors).some(err => err)) nextStep();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Service Request
          </h1>
          <p className="text-gray-600 mt-2">Tell us about your home service needs</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-100/30 p-6 space-y-6">
          {/* Services Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Required Services
              <span className="text-gray-500 ml-1">(comma separated)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <BriefcaseIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                value={formData.interestedServices}
                onChange={(e) => updateFormData("interestedServices", e.target.value.split(","))}
                placeholder="e.g., Plumbing, Electrical, Cleaning"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.interestedServices ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              {errors.interestedServices && <InputError message={errors.interestedServices} />}
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Service Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="Enter your city or address"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.location ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              {errors.location && <InputError message={errors.location} />}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={prevStep}
              className="px-4 py-3 w-full rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={validateAndNext}
              className="px-4 py-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Find Providers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputError = ({ message }: { message: string }) => (
  <div className="absolute inset-y-0 right-3 flex items-center animate-fade-in">
    <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
    <span className="sr-only">{message}</span>
  </div>
);
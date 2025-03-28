import { useState } from "react";
import { ExclamationCircleIcon, CurrencyDollarIcon, MapPinIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { PropData } from "@/lib/type";

export default function StepThreeProvider({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}: PropData) {
  const [errors, setErrors] = useState({ rate: "", locations: "" });
  const [bioLength, setBioLength] = useState(formData.bio.length);

  const validateAndNext = () => {
    const newErrors = {
      rate: !formData.rate.trim() ? "Hourly rate is required" : "",
      locations: !formData.locations.length ? "At least one service location is required" : ""
    };

    setErrors(newErrors);
    if (!Object.values(newErrors).some(err => err)) nextStep();
  };

  const handleBioChange = (value: string) => {
    updateFormData("bio", value);
    setBioLength(value.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Professional Details
          </h1>
          <p className="text-gray-600 mt-2">Complete your service provider profile</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-100/30 p-6 space-y-6">
          {/* Rate Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hourly Rate
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                value={formData.rate}
                onChange={(e) => updateFormData("rate", e.target.value)}
                placeholder="Enter your hourly rate"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.rate ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              {errors.rate && <InputError message={errors.rate} />}
            </div>
          </div>

          {/* Locations Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Service Locations
              <span className="text-gray-500 ml-1">(comma separated)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                value={formData.locations}
                onChange={(e) => updateFormData("locations", e.target.value.split(","))}
                placeholder="Cities where you provide services"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.locations ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              {errors.locations && <InputError message={errors.locations} />}
            </div>
          </div>

          {/* Bio Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Professional Bio
              <span className="text-gray-500 ml-1">(max 250 characters)</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <DocumentTextIcon className="w-5 h-5 text-gray-400" />
              </div>
              <textarea
                value={formData.bio}
                onChange={(e) => handleBioChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                rows={4}
                maxLength={250}
                placeholder="Describe your expertise and experience..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {bioLength}/250
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={prevStep}
              className="px-4 py-3 w-full rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={validateAndNext}
              className="px-4 py-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Complete Profile
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

const ArrowLeftIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);
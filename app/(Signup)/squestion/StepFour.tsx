"use client";
import { useState } from "react";
import {
  CheckCircleIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import { formDataType } from "@/lib/type";
import { useRouter } from "next/navigation";

type PropData = {
  formData: formDataType;
  prevStep: () => void;
};

export default function StepFour({ formData, prevStep }: PropData) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Registration failed");
      
      setSuccess(data.message || "Registration successful!");
      // Handle redirection here if needed
      setTimeout(()=>{
        router.push('/login')
      },1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center">
          Review & Confirm
        </h1>

        {/* Status Indicators */}
        {success && (
          <div role="alert" className="flex items-center gap-3 p-4 bg-green-50 rounded-lg animate-fade-in">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {error && (
          <div role="alert" className="flex items-center gap-3 p-4 bg-red-50 rounded-lg animate-fade-in">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-100/30 p-6 space-y-6">
          {/* Common Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Name" value={formData.name} icon={<UserCircleIcon className="w-5 h-5" />} />
            <DetailItem label="Email" value={formData.email} icon={<EnvelopeIcon className="w-5 h-5" />} />
            <DetailItem label="Account Type" value={formData.role} />
          </div>

          {/* Role-Specific Details */}
          {formData.role === "PROVIDER" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Services" value={formData.services.join(", ")} icon={<BriefcaseIcon className="w-5 h-5" />} />
              <DetailItem label="Hourly Rate" value={`$${formData.rate}/hr`} icon={<CurrencyDollarIcon className="w-5 h-5" />} />
              <DetailItem label="Locations" value={formData.locations.join(", ")} icon={<MapPinIcon className="w-5 h-5" />} />
              <DetailItem label="Bio" value={formData.bio} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Interested Services" value={formData.interestedServices.join(", ")} icon={<BriefcaseIcon className="w-5 h-5" />} />
              <DetailItem label="Location" value={formData.location} icon={<MapPinIcon className="w-5 h-5" />} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={prevStep}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              aria-disabled={loading}
              className={`flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Submitting...
                </span>
              ) : (
                "Confirm & Sign Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="flex items-start gap-3 p-3 bg-purple-50/20 rounded-lg border border-purple-100/30">
    {icon && <div className="text-purple-600 mt-0.5">{icon}</div>}
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
      <p className="text-gray-900 break-words">{value || <span className="text-gray-400">Not provided</span>}</p>
    </div>
  </div>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const EnvelopeIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
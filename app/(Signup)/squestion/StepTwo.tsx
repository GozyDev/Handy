"use client";
import { useState } from "react";
import { ExclamationCircleIcon, UserCircleIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { PropData } from "@/lib/type";

export default function StepTwo({ nextStep, prevStep, updateFormData, formData }: PropData) {
  const [error, setError] = useState({ name: "", email: "", password: "" });

  function validateBeforeNext() {
    const newError = {
      name: !formData.name.trim() ? "Please enter your full name" : "",
      email: !formData.email.trim() ? "Please enter a valid email address" : "",
      password: !formData.password.trim() ? "Password must be at least 6 characters" : ""
    };

    setError(newError);
    if (!Object.values(newError).some(err => err)) nextStep();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-100/30 p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">Join our community of professionals and clients</p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <UserCircleIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  error.name ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
                placeholder="John Doe"
              />
              {error.name && <InputError message={error.name} />}
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  error.email ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
                placeholder="john@example.com"
              />
              {error.email && <InputError message={error.email} />}
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  error.password ? "border-red-300" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 transition-all`}
                placeholder="••••••••"
              />
              {error.password && <InputError message={error.password} />}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={prevStep}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={validateBeforeNext}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Continue
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
import Link from "next/link";
import { HomeIcon, ArrowRightIcon, UserCircleIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

type PropData = {
  nextStep: () => void;
  updateFormData: (field: string, value: string) => void;
};

export default function StepOne({ nextStep, updateFormData }: PropData) {
  function handleRoleSelect(role: string) {
    updateFormData("role", role);
    nextStep();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-white flex flex-col justify-center items-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Handy
          </h1>
          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Join our community of skilled professionals and clients looking for quality services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Consumer Card */}
          <button
            onClick={() => handleRoleSelect("CONSUMER")}
            className="group relative p-8 text-left rounded-2xl bg-white/95 backdrop-blur-sm border border-white/20 hover:border-purple-100/90 transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center">
                <WrenchScrewdriverIcon className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                I need services
              </h2>
              <p className="text-gray-500 text-sm">
                Find qualified professionals for your home needs
              </p>
            </div>
          </button>

          {/* Provider Card */}
          <button
            onClick={() => handleRoleSelect("PROVIDER")}
            className="group relative p-8 text-left shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm  border border-white/20 hover:border-purple-100/90 transition-all duration-300 hover:-translate-y-1 "
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                I provide services
              </h2>
              <p className="text-gray-500 text-sm">
                Connect with clients and grow your business
              </p>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 text-sm">
          <Link 
            href="/login" 
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4" />
            Already have an account? Sign in
          </Link>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
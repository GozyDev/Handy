import { useState } from "react";
import { HOME_SERVICES } from "@/lib/services";
import {
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { formDataType } from "@/lib/type";

type PropData = {
  pNext: () => void;
  prevStep: () => void;
  formData: formDataType;
  ProvidersServices: (value: string, checked: boolean) => void;
};

export default function CheckBoxService({
  pNext,
  prevStep,
  formData,
  ProvidersServices,
}: PropData) {
  const [homeService, setHomeService] = useState(HOME_SERVICES);

  return (
    <div className="mt-10 max-w-5xl mx-auto p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/30">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Select Your Services
        </h1>
        <p className="text-gray-600 mt-2">
          Choose the services you want to offer
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {homeService.map((service) => (
          <div key={service.id} className="group relative">
            <label className="flex items-center space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50/30 transition-all duration-200">
              <input
                type="checkbox"
                className="h-5 w-5 border-2 border-gray-300 rounded-md checked:bg-purple-600 checked:border-purple-600 focus:ring-purple-500/40 cursor-pointer"
                onChange={(e)=>ProvidersServices(service.category,e.target.checked)}
              />
              <span className="text-lg font-medium text-gray-700 group-hover:text-purple-900">
                {service.category}
              </span>
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Previous Step
        </button>
        <button
          onClick={pNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Continue
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

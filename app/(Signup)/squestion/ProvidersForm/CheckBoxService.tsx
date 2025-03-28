import { useState } from "react";
import { HOME_SERVICES } from "@/lib/services";
import { ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
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

  const toggleCategory = (id: string) => {
    setHomeService(prev => 
      prev.map(service => 
        service.id === id ? { ...service, toggle: !service.toggle } : service
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/30">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Select Your Services
        </h1>
        <p className="text-gray-600 mt-2">Choose the services you want to offer</p>
      </div>

      <div className="space-y-4">
        {homeService.map((serviceCategory) => (
          <fieldset 
            key={serviceCategory.id}
            className="rounded-xl border border-purple-100/50 bg-purple-50/20 overflow-hidden transition-all"
          >
            <legend 
              onClick={() => toggleCategory(serviceCategory.id)}
              className="w-full px-6 py-4 cursor-pointer hover:bg-purple-50/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-purple-800">
                    {serviceCategory.category}
                  </span>
                  <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {serviceCategory.subServices.length} services
                  </span>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 text-purple-600 transition-transform ${
                    serviceCategory.toggle ? "rotate-180" : ""
                  }`}
                />
              </div>
            </legend>

            {serviceCategory.toggle && (
              <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceCategory.subServices.map((subservice) => {
                  const serviceKey = `${serviceCategory.category}:${subservice}`;
                  const isChecked = formData.services.includes(serviceKey);
                  
                  return (
                    <label 
                      key={subservice}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isChecked 
                          ? "border-purple-500 bg-purple-50/50" 
                          : "border-gray-200 hover:border-purple-300"
                      } transition-all cursor-pointer`}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          value={serviceKey}
                          checked={isChecked}
                          onChange={(e) => ProvidersServices(e.target.value, e.target.checked)}
                          className="sr-only" // Hide default checkbox
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isChecked 
                            ? "bg-purple-600 border-purple-600" 
                            : "bg-white border-gray-300"
                        }`}>
                          {isChecked && (
                            <CheckCircleIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="font-medium text-gray-700">{subservice}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </fieldset>
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
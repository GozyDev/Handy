import { SORT_SERVICES } from "@/lib/services";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import ReactDOM from "react-dom";
export default function SideSort({
  searchQuerys,
  debouncedFilterSearch,
}: {
  searchQuerys: string[];
  debouncedFilterSearch: (value: string, check: boolean) => void;
}) {
  const [toggleCategory, setToggleCategories] = useState(SORT_SERVICES.toggle);

  return (
    <section className=" hidden lg:block w-full sticky  top-[80px] lg:top-24  z-50 bg-white  lg:w-[400px] h-fit">
     
      {/* Filters Sidebar */}
      <section className="w-full   rounded-xl shadow-sm h-fitp-3 ">
        <fieldset className="space-y-4">
          <legend
            onClick={() => setToggleCategories(!toggleCategory)}
            className="w-full flex items-center justify-between cursor-pointer px-5 py-3 -ml-2"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {SORT_SERVICES.header}
            </h3>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-transform ${
                toggleCategory ? "rotate-180" : ""
              }`}
            />
          </legend>

          {toggleCategory && (
            <div className="space-y-3 max-h-[400] overflow-y-scroll borde ">
              {SORT_SERVICES.services.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-3 rounded-md bg-gray-500/10 py-4 px-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    checked={searchQuerys.includes(service)}
                    onChange={(e) => debouncedFilterSearch(service, e.target.checked)}
                  />
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          )}
        </fieldset>
      </section>
    </section>
  );
}

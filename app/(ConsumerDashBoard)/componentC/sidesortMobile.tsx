import ReactDOM from "react-dom";
import { SORT_SERVICES } from "@/lib/services";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
export function SideSortMObile({
  searchQuerys,
  filterSearch,
  setToogle
}: {
  searchQuerys: string[];
  filterSearch: (value: string, check: boolean) => void;
  setToogle:()=>void
}) {
  const [toggleCategory, setToggleCategories] = useState(SORT_SERVICES.toggle);

  return ReactDOM.createPortal(
    <section className="fixed inset-0 w-screen h-screen bg-black/90  z-[999] pt-24">
  <div className="relative h-full ">
    <div className="absolute bottom-0 w-full h-[90%] bg-white ">
      <div className="relative h-full p-5 ">
        <div className="sticky top-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Filter By</h1>
          <div className="mb-5 ">
            <button onClick={setToogle} className="text-purple-700 shadow p-2 px-5 rounded border">x</button>
          </div>
        </div>
        {/* Filters Sidebar */}
        <section className="w-full h-full overflow-y-scroll  ">
          <fieldset className="space-y-4">
            <legend
              onClick={() => setToggleCategories(!toggleCategory)}
              className="flex items-center justify-between cursor-pointer px-5 py-3 -ml-2"
            >
              <h3 className="text-md text-gray-900">
                {SORT_SERVICES.header}
              </h3>
              {/* <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  toggleCategory ? "rotate-180" : ""
                }`}
              /> */}
            </legend>
            {toggleCategory && (
              <div className="space-y-3 h-[300px] p-2">
                {SORT_SERVICES.services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 rounded-md bg-gray-500/10 py-4 px-3"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      checked={searchQuerys.includes(service)}
                      onChange={(e) =>
                        filterSearch(service, e.target.checked)
                      }
                    />
                    <span className="text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            )}
          </fieldset>
        </section>
        <div className="fixed bottom-0 left-0 w-full flex gap-5 p-5 bg-white">
          <button className="flex-1 py-3 px-6 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button className="flex-1 py-3 px-6 bg-purple-500 text-white rounded">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
,
    document.body
  );
}

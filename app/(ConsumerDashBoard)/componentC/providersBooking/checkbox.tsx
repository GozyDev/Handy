import { useState } from "react";

export default function Checkbox({
  services,
  updataServices,
  bookingData,
}: {
  services: string[];
  updataServices: (value: string, checked: boolean) => void;
  bookingData:{
    selectedServices: string[];
    note: string;
    location:string;
    scheduleTime:string;
  }
}) {
  const [service] = useState<string[]>(services);
  return (
    <>
      <div className="flex flex-col space-y-[10px]">
        {service.map((list:string) => (
          <label
            key={list}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name={list}
              value={list}
              className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={(e)=> updataServices(e.target.value , e.target.checked)}
              checked={bookingData.selectedServices.includes(`${list}`)}
            />
            <span className="text-gray-700">{list}</span>
          </label>
        ))}
      </div>
    </>
  );
}

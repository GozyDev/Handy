import { useState } from "react";
import CheckBoxService from "./CheckBoxService";
import StepThreeProvider from "./StepThreeProvider";
import { formDataType } from "@/lib/type";

type PropData = {
  nextStep:()=>void
  prevStep:()=>void
  updateFormData:(field: string, value:string|string[])=>void
  formData:formDataType 
  ProvidersServices:(value:string,checked:boolean) =>  void
}
export default function Pparent({
  updateFormData,
  nextStep,
  prevStep,
  formData,
  ProvidersServices,
}:PropData) {
  const [pstep, setPstep] = useState(1);
  function pNext() {
    setPstep((prev) => prev + 1);
  }

  function pPrevs() {
    if (pstep > 1) {
      setPstep((prev) => prev - 1);
    }
  }
  return (
    <>
      <div className="">
        {pstep == 1 && (
          <CheckBoxService
            pNext={pNext}
            prevStep={prevStep}
            formData={formData}
            ProvidersServices={ProvidersServices}
          />
        )}
        {pstep == 2 && (
          <StepThreeProvider
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={pPrevs}
            formData={formData}
          />
        )}
      </div>
    </>
  );
}

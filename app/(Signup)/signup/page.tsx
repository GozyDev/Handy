"use client";
import { useState } from "react";
import StepOne from "@/app/(Signup)/squestion/StepOne";
import StepTwo from "@/app/(Signup)/squestion/StepTwo";
import StepThreeConsumer from "@/app/(Signup)/squestion/StepThreeConsumer";
import StepFour from "@/app/(Signup)/squestion/StepFour";
import Pparent from "@/app/(Signup)/squestion/ProvidersForm/Pparent";
import { formDataType } from "@/lib/type";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<formDataType>({
    role: "",
    name: "henr",
    email: "jehrer",
    password: "rhuereio",
    services: [], // Provider only
    rate: "",
    locations: [], // Provider only
    bio: "", // Provider only
    interestedServices: [], // Consumer only
    location: "", // Consumer only
  });

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  function updateFormData(field: string, value:string|string[]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function ProvidersServices(value:string,checked:boolean){
    setFormData((prev) => {
      let updatedServices = prev.services

      if(checked){
        updatedServices = [...updatedServices,value]
      }
      else{
        updatedServices = updatedServices.filter(item => item !== value)
      }

      return {... prev , services:updatedServices}
    })
  }
  console.log(formData);
  return (
    <>
      {step === 1 && (
        <StepOne updateFormData={updateFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <StepTwo
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
        />
      )}
      {step === 3 && formData.role === "PROVIDER" && (
        <Pparent
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          ProvidersServices ={ProvidersServices}
        />
      )}

      {step === 3 && formData.role === "CONSUMER" && (
        <StepThreeConsumer
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
        />
      )}

      {step === 4 && <StepFour formData={formData} prevStep={prevStep} />}
    </>
  );
}

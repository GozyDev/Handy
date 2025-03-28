import { Role } from '@prisma/client';
export type formDataType = {
  role: string;
  name: string;
  password: string;
  email: string;
  services: string[]; // Provider only
  rate: string;
  locations: string[]; // Provider only
  bio: string; // Provider only
  interestedServices: string[]; // Consumer only
  location: string; // Consumer only
};

export type PropData = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (field: string, value:string|string[]) => void;
  formData: formDataType;
};

export interface ProviderCardProps {
    userId: string;
    id: string;
    services: string[];
    rate: number;
    locations: string[];
    rating: number;
    bio: string;
    name: string;
}

export type ProviderProfile = {
  user: {
    name: string;
    email: string;
    password: string;
    id: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };
  services: string[];
  id: string;
  userId: string;
  rate: number;
  locations: string[];
  bio: string;
};


export interface errotype{
  messaege:string
}



export interface UserProfile{
name:string,
providerProfile:{
  bio:string,
  locations:string[]
  rate:number
  services:string[]
  role:string
}
}
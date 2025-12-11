import type { Clinic, Specialty } from "@/types";

export type Provider = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  about: string;
  clinics: Clinic[];
  profile_pic?: string;
  specialty: Specialty;
  languages: string[];
};

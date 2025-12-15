import type { Clinic, Specialty } from "@/types";

export type Provider = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  about: string;
  clinics: Clinic[];
  profilePic: string | null;
  specialty: Specialty;
  languages: string[];
};

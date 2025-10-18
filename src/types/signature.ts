export interface SignatureData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phoneNumber?: string;
  website?: string;
  address?: string;
  logoUrl: string;
}

export interface SavedSignature {
  id: string;
  name: string;
  data: SignatureData;
  html: string;
  createdAt: string;
}

export type SignatureFormData = SignatureData;

export interface ValidationErrors {
  fullName?: string;
  jobTitle?: string;
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  address?: string;
  logoUrl?: string;
}

export type LocalStorageKey = 'signatures_v1';
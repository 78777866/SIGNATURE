import { create } from 'zustand';
import { SignatureData, SavedSignature } from '@/types/signature';
import { generateSignatureHtml } from '@/utils/generateSignatureHtml';

interface SignatureStore {
  signatureData: SignatureData;
  previewHtml: string;
  savedSignatures: SavedSignature[];
  updateField: (field: keyof SignatureData, value: string) => void;
  updateSignatureData: (data: Partial<SignatureData>) => void;
  resetForm: () => void;
  loadSignature: (signature: SavedSignature) => void;
  saveSignature: (name: string) => void;
  deleteSignature: (id: string) => void;
  loadSavedSignatures: () => void;
}

const initialSignatureData: SignatureData = {
  fullName: '',
  jobTitle: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  website: '',
  address: '',
  logoUrl: '',
};

export const useSignatureStore = create<SignatureStore>((set, get) => ({
  signatureData: initialSignatureData,
  previewHtml: '',
  savedSignatures: [],

  updateField: (field, value) => {
    const currentData = get().signatureData;
    const updatedData = { ...currentData, [field]: value };
    
    set({
      signatureData: updatedData,
      previewHtml: generateSignatureHtml(updatedData),
    });
  },

  updateSignatureData: (data) => {
    const currentData = get().signatureData;
    const updatedData = { ...currentData, ...data };
    
    set({
      signatureData: updatedData,
      previewHtml: generateSignatureHtml(updatedData),
    });
  },

  resetForm: () => {
    set({
      signatureData: initialSignatureData,
      previewHtml: generateSignatureHtml(initialSignatureData),
    });
  },

  loadSignature: (signature) => {
    set({
      signatureData: signature.data,
      previewHtml: signature.html,
    });
  },

  saveSignature: (name) => {
    const { signatureData, savedSignatures } = get();
    const html = generateSignatureHtml(signatureData);
    
    const newSignature: SavedSignature = {
      id: crypto.randomUUID(),
      name,
      data: signatureData,
      html,
      createdAt: new Date().toISOString(),
    };

    const updatedSignatures = [...savedSignatures, newSignature];
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('signatures_v1', JSON.stringify(updatedSignatures));
    }

    set({
      savedSignatures: updatedSignatures,
    });
  },

  deleteSignature: (id) => {
    const { savedSignatures } = get();
    const updatedSignatures = savedSignatures.filter(sig => sig.id !== id);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('signatures_v1', JSON.stringify(updatedSignatures));
    }

    set({
      savedSignatures: updatedSignatures,
    });
  },

  loadSavedSignatures: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('signatures_v1');
      if (stored) {
        try {
          const signatures = JSON.parse(stored) as SavedSignature[];
          set({ savedSignatures: signatures });
        } catch (error) {
          console.error('Failed to load saved signatures:', error);
          set({ savedSignatures: [] });
        }
      }
    }
  },
}));
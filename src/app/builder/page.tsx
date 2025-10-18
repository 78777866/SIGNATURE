'use client';

import { useEffect } from 'react';
import { SignatureForm } from '@/components/SignatureForm';
import { SignaturePreview } from '@/components/SignaturePreview';
import { Toolbar } from '@/components/Toolbar';
import { SavedSignatures } from '@/components/SavedSignatures';
import { useSignatureStore } from '@/store/signatureStore';

export default function BuilderPage() {
  const { updateSignatureData } = useSignatureStore();

  // Initialize preview HTML on mount
  useEffect(() => {
    updateSignatureData({});
  }, [updateSignatureData]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Email Signature Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Create professional email signatures in real-time with live preview
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Toolbar */}
          <Toolbar />

          {/* Saved Signatures */}
          <SavedSignatures />

          {/* Main Builder Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <SignatureForm />
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <SignaturePreview />
            </div>
          </div>

          {/* Mobile: Preview Below Form */}
          <div className="lg:hidden">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                💡 <strong>Tip:</strong> For the best experience, view this on a larger screen. 
                The form and preview will be side-by-side.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with Next.js, TypeScript, and TailwindCSS
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Phase 1: Client-side only • No login required • Data saved locally
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
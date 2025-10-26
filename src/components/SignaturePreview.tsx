'use client';

import { useEffect, useRef } from 'react';
import { useSignatureStore } from '@/store/signatureStore';
import { sanitizeHtml } from '@/utils/sanitizeHtml';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SignaturePreview() {
  const { previewHtml } = useSignatureStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update iframe content when previewHtml changes
  useEffect(() => {
    if (iframeRef.current && previewHtml) {
      const sanitizedHtml = sanitizeHtml(previewHtml);
      
      // Update iframe content using srcDoc
      iframeRef.current.srcdoc = sanitizedHtml;
    }
  }, [previewHtml]);

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE PREVIEW
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <iframe
            ref={iframeRef}
            id="signaturePreview"
            className="w-full h-64 border-0"
            sandbox="allow-scripts"
            title="Email Signature Preview"
            style={{
              minHeight: '200px',
              maxHeight: '400px',
              resize: 'vertical'
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          This preview shows how your signature will look in emails. The iframe provides a safe, isolated preview.
        </p>
      </CardContent>
    </Card>
  );
}
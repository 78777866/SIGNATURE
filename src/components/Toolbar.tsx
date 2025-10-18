'use client';

import { useState } from 'react';
import { useSignatureStore } from '@/store/signatureStore';
import { generateSignatureHtml } from '@/utils/generateSignatureHtml';
import { TemplateGallery } from '@/components/TemplateGallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Copy, 
  Download, 
  RotateCcw, 
  Save,
  CheckCircle,
  Info,
  Sparkles,
  Palette
} from 'lucide-react';

export function Toolbar() {
  const { signatureData, resetForm, saveSignature } = useSignatureStore();
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateGalleryOpen, setTemplateGalleryOpen] = useState(false);
  const [signatureName, setSignatureName] = useState('');

  // Helper function to show copied feedback
  const showCopiedFeedback = (key: string) => {
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // New function to copy rendered signature
  const copyRenderedSignature = async () => {
    try {
      // Always use the generated HTML approach since iframe access is restricted
      // This is more reliable and avoids cross-origin issues
      const html = generateSignatureHtml(signatureData);
      
      // Create a temporary div to simulate the rendered content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      document.body.appendChild(tempDiv);
      
      // Select and copy the content
      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      let copied = false;
      
      // Try execCommand first
      try {
        copied = document.execCommand('copy');
        if (copied) {
          showCopiedFeedback('rendered');
        }
      } catch (err) {
        console.warn('execCommand failed, trying Clipboard API fallback');
      }
      
      // Fallback to clipboard API if execCommand fails or is not supported
      if (!copied && navigator && navigator.clipboard && navigator.clipboard.write) {
        try {
          const blob = new Blob([html], { type: 'text/html' });
          await navigator.clipboard.write([
            new ClipboardItem({ 'text/html': blob })
          ]);
          showCopiedFeedback('rendered');
          copied = true;
        } catch (err) {
          console.warn('Clipboard API failed');
        }
      }
      
      // Final fallback to writeText if write() fails
      if (!copied && navigator && navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(html);
          showCopiedFeedback('rendered');
          copied = true;
        } catch (err) {
          console.warn('Clipboard writeText failed');
        }
      }
      
      // Clean up
      selection?.removeAllRanges();
      document.body.removeChild(tempDiv);
      
      if (!copied) {
        throw new Error('All copy methods failed');
      }
    } catch (error) {
      console.error('Failed to copy rendered signature:', error);
      alert('❌ Failed to copy. Please try copying the HTML code instead.');
    }
  };

  const copyHtml = async () => {
    try {
      const html = generateSignatureHtml(signatureData);
      // Check if clipboard API is available
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(html);
      } else {
        // Fallback for older browsers or environments where clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = html;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showCopiedFeedback('html');
    } catch (error) {
      console.error('Failed to copy HTML:', error);
    }
  };

  const copyJson = async () => {
    try {
      const jsonData = JSON.stringify(signatureData, null, 2);
      // Check if clipboard API is available
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(jsonData);
      } else {
        // Fallback for older browsers or environments where clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = jsonData;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showCopiedFeedback('json');
    } catch (error) {
      console.error('Failed to copy JSON:', error);
    }
  };

  const downloadHtml = () => {
    try {
      const html = generateSignatureHtml(signatureData);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'signature.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download HTML:', error);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all fields? This action cannot be undone.')) {
      resetForm();
    }
  };

  const handleSave = () => {
    if (signatureName.trim()) {
      saveSignature(signatureName.trim());
      setSignatureName('');
      setSaveDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {/* Templates Button */}
            <Button
              onClick={() => setTemplateGalleryOpen(true)}
              variant="default"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Palette className="w-4 h-4" />
              Choose Template
              <Badge variant="secondary" className="ml-2">NEW</Badge>
            </Button>
            
            {/* New Copy Rendered Signature Button */}
            <Button
              onClick={copyRenderedSignature}
              variant="default"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              disabled={copiedStates.rendered}
            >
              {copiedStates.rendered ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedStates.rendered ? 'Copied!' : 'Copy Rendered Signature'}
            </Button>

            {/* Keep the HTML copy button but reposition it */}
            <Button
              onClick={copyHtml}
              variant="outline"
              className="flex items-center gap-2"
              disabled={copiedStates.html}
            >
              {copiedStates.html ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedStates.html ? 'Copied!' : 'Copy HTML Code'}
            </Button>

            <Button
              onClick={copyJson}
              variant="outline"
              className="flex items-center gap-2"
              disabled={copiedStates.json}
            >
              {copiedStates.json ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedStates.json ? 'Copied!' : 'Copy JSON'}
            </Button>

            <Button
              onClick={downloadHtml}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download HTML
            </Button>

            <Button
              onClick={() => setSaveDialogOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Signature
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
          
          {/* Tooltip for Copy Rendered Signature */}
          <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">💡 Recommended for Gmail</p>
                <p className="mt-1">
                  Use this version for Gmail — paste it directly into Settings → Signature.
                  This copies the rendered visual output, not raw HTML code.
                </p>
              </div>
            </div>
          </div>
          
          {/* Usage Instructions for Gmail */}
          <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Gmail Signature Setup:</p>
                <ol className="mt-1 list-decimal list-inside space-y-1">
                  <li>Click "Copy Rendered Signature" above (recommended)</li>
                  <li>In Gmail, go to Settings → See all settings → General</li>
                  <li>Scroll to "Signature" section</li>
                  <li><strong>Important:</strong> Switch to "Rich Text" mode if available</li>
                  <li>Paste the signature (Ctrl+V or Cmd+V)</li>
                  <li>Click "Save Changes" at the bottom</li>
                </ol>
                <p className="mt-2 text-blue-700">
                  <strong>Note:</strong> If pasting shows plain text, try pasting into a text editor first, then copy and paste again.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Gallery Modal */}
      {templateGalleryOpen && (
        <TemplateGallery onClose={() => setTemplateGalleryOpen(false)} />
      )}

      {/* Simple Save Dialog */}
      {saveDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Save Signature</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="signatureName" className="block text-sm font-medium mb-2">
                    Signature Name
                  </label>
                  <input
                    id="signatureName"
                    type="text"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    placeholder="My Professional Signature"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSaveDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!signatureName.trim()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
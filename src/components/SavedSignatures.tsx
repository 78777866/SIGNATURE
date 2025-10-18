'use client';

import { useSignatureStore } from '@/store/signatureStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

export function SavedSignatures() {
  const { savedSignatures, loadSignature, deleteSignature } = useSignatureStore();
  const [selectedSignatureId, setSelectedSignatureId] = useState<string>('');

  const handleLoad = () => {
    const signature = savedSignatures.find(sig => sig.id === selectedSignatureId);
    if (signature) {
      loadSignature(signature);
      setSelectedSignatureId('');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this saved signature?')) {
      deleteSignature(id);
      if (selectedSignatureId === id) {
        setSelectedSignatureId('');
      }
    }
  };

  if (savedSignatures.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Saved Signatures</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select 
            value={selectedSignatureId} 
            onValueChange={setSelectedSignatureId}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a saved signature" />
            </SelectTrigger>
            <SelectContent>
              {savedSignatures.map((signature) => (
                <SelectItem key={signature.id} value={signature.id}>
                  {signature.name} - {new Date(signature.createdAt).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleLoad}
            disabled={!selectedSignatureId}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Load
          </Button>
        </div>

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {savedSignatures.map((signature) => (
            <div
              key={signature.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded border"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{signature.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(signature.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(signature.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
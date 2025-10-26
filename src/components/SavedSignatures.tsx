'use client';

import { useSignatureStore } from '@/store/signatureStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trash2, Upload, Copy, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export function SavedSignatures() {
  const { savedSignatures, loadSignature, deleteSignature, duplicateSignature } = useSignatureStore();
  const [selectedSignatureId, setSelectedSignatureId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleDuplicate = (id: string) => {
    duplicateSignature(id);
  };

  // Filter signatures based on search query
  const filteredSignatures = useMemo(() => {
    if (!searchQuery.trim()) return savedSignatures;
    
    const query = searchQuery.toLowerCase();
    return savedSignatures.filter(sig => 
      sig.name.toLowerCase().includes(query) ||
      sig.data.fullName.toLowerCase().includes(query) ||
      sig.data.companyName.toLowerCase().includes(query) ||
      sig.data.email.toLowerCase().includes(query)
    );
  }, [savedSignatures, searchQuery]);

  if (savedSignatures.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Saved Signatures ({savedSignatures.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Box */}
        {savedSignatures.length > 3 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search signatures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Select 
            value={selectedSignatureId} 
            onValueChange={setSelectedSignatureId}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a saved signature" />
            </SelectTrigger>
            <SelectContent>
              {filteredSignatures.map((signature) => (
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

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredSignatures.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No signatures found matching &quot;{searchQuery}&quot;
            </p>
          ) : (
            filteredSignatures.map((signature) => (
              <div
                key={signature.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{signature.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {signature.data.fullName} • {signature.data.companyName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(signature.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDuplicate(signature.id)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="Duplicate signature"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(signature.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Delete signature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
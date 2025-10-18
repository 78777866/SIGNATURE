'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useSignatureStore } from '@/store/signatureStore';
import { SignatureData } from '@/types/signature';
import { isAnimatedGif } from '@/utils/isAnimatedGif';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Info, AlertCircle } from 'lucide-react';

// Zod schema for form validation
const signatureSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().optional(),
  website: z.string()
    .optional()
    .refine((url) => {
      if (!url) return true;
      return url.startsWith('https://');
    }, 'Website must start with https://'),
  address: z.string().optional(),
  logoUrl: z.string()
    .min(1, 'Logo URL is required')
    .url('Please enter a valid URL')
    .refine((url) => url.startsWith('https://'), 'Logo URL must start with https://')
    .refine((url) => {
      const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
      return allowedExtensions.some(ext => url.toLowerCase().includes(ext));
    }, 'Logo must be .png, .jpg, .jpeg, .gif, or .webp'),
});

type FormData = z.infer<typeof signatureSchema>;

export function SignatureForm() {
  const { signatureData, updateField, loadSavedSignatures } = useSignatureStore();
  const [isGif, setIsGif] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signatureSchema),
    defaultValues: signatureData,
    mode: 'onChange'
  });

  // Watch logo URL for changes
  const logoUrl = watch('logoUrl');

  // Check if the logo URL is a GIF and valid
  useEffect(() => {
    if (logoUrl) {
      // Validate URL format
      try {
        new URL(logoUrl);
        setIsValidUrl(true);
      } catch {
        setIsValidUrl(false);
      }
      
      // Check if it's a GIF
      const gifDetected = isAnimatedGif(logoUrl);
      setIsGif(gifDetected);
    } else {
      setIsGif(false);
      setIsValidUrl(true);
    }
  }, [logoUrl]);

  // Update store when form values change
  useEffect(() => {
    const subscription = watch((values) => {
      // Only update if we have valid data
      if (values && typeof values === 'object') {
        Object.entries(values).forEach(([key, value]) => {
          // Only update if the value has actually changed to prevent infinite loops
          if (key in signatureData && value !== undefined && signatureData[key as keyof SignatureData] !== String(value || '')) {
            updateField(key as keyof SignatureData, String(value || ''));
          }
        });
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, updateField, signatureData]);

  // Load saved signatures on mount
  useEffect(() => {
    loadSavedSignatures();
  }, [loadSavedSignatures]);

  // Update form values when store data changes (e.g., when loading a saved signature)
  useEffect(() => {
    Object.entries(signatureData).forEach(([key, value]) => {
      // Only update if the value has actually changed to prevent infinite loops
      if (key in signatureData && signatureData[key as keyof SignatureData] !== value) {
        setValue(key as keyof FormData, value || '');
      }
    });
  }, [signatureData, setValue]);

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Form submission is handled by real-time updates
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Signature Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder="Enter your full name"
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              {...register('jobTitle')}
              placeholder="Enter your job title"
              className={errors.jobTitle ? 'border-red-500' : ''}
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              {...register('companyName')}
              placeholder="Enter your company name"
              className={errors.companyName ? 'border-red-500' : ''}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">{errors.companyName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@company.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              {...register('phoneNumber')}
              placeholder="+1 (555) 123-4567"
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              {...register('website')}
              placeholder="https://www.yourcompany.com"
              className={errors.website ? 'border-red-500' : ''}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="123 Business St.&#10;City, State 12345"
              rows={3}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Logo URL */}
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo Image URL (Use a square image, 87x113 pixels) *</Label>
            <Input
              id="logoUrl"
              {...register('logoUrl')}
              placeholder="https://example.com/logo.png"
              className={errors.logoUrl ? 'border-red-500' : ''}
            />
            {errors.logoUrl && (
              <p className="text-sm text-red-500">{errors.logoUrl.message}</p>
            )}
            
            {/* GIF Detection Message */}
            {isGif && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">🌀 Animated logo detected</p>
                  <p className="mt-1">
                    Works in Gmail and most web clients. Outlook Desktop may display only the first frame.
                  </p>
                </div>
              </div>
            )}
            
            {/* Invalid URL Warning */}
            {!isValidUrl && logoUrl && (
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md text-sm text-red-800">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">⚠️ Invalid image URL format</p>
                  <p className="mt-1">
                    Please enter a valid image URL ending with .png, .jpg, .jpeg, .webp, or .gif.
                  </p>
                </div>
              </div>
            )}
            
            <p className="text-sm text-gray-500">
              Use a square image with a size of 87 x 113 pixels. Paste a secure HTTPS image URL — uploads not allowed.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
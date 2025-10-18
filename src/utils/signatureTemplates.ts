import { SignatureData } from '@/types/signature';

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  data: SignatureData;
  category: 'professional' | 'creative' | 'minimal' | 'executive';
}

export const signatureTemplates: SignatureTemplate[] = [
  {
    id: 'professional-1',
    name: 'Classic Professional',
    description: 'Clean and professional design with all essential contact information',
    category: 'professional',
    data: {
      fullName: 'Alex Johnson',
      jobTitle: 'Senior Marketing Manager',
      companyName: 'TechCorp Solutions',
      email: 'alex.johnson@techcorp.com',
      phoneNumber: '+1 (555) 123-4567',
      website: 'https://www.techcorp.com',
      address: '123 Business Ave\nNew York, NY 10001',
      logoUrl: 'https://placehold.co/87x113/3b82f6/white?text=TC'
    }
  },
  {
    id: 'executive-1',
    name: 'Executive Style',
    description: 'Sophisticated design for C-level executives and senior management',
    category: 'executive',
    data: {
      fullName: 'Sarah Williams',
      jobTitle: 'Chief Executive Officer',
      companyName: 'Global Innovations Inc.',
      email: 'sarah.williams@globalinnovations.com',
      phoneNumber: '+1 (555) 987-6543',
      website: 'https://www.globalinnovations.com',
      address: '456 Corporate Blvd\nSan Francisco, CA 94102',
      logoUrl: 'https://placehold.co/87x113/0f172a/white?text=GI'
    }
  },
  {
    id: 'creative-1',
    name: 'Creative Designer',
    description: 'Modern and vibrant design perfect for creative professionals',
    category: 'creative',
    data: {
      fullName: 'Michael Chen',
      jobTitle: 'Creative Director',
      companyName: 'Pixel Perfect Studios',
      email: 'michael.chen@pixelperfect.com',
      phoneNumber: '+1 (555) 456-7890',
      website: 'https://www.pixelperfect.com',
      address: '789 Art District\nLos Angeles, CA 90015',
      logoUrl: 'https://placehold.co/87x113/ec4899/white?text=PP'
    }
  },
  {
    id: 'minimal-1',
    name: 'Minimalist',
    description: 'Clean and simple design focusing on essential information',
    category: 'minimal',
    data: {
      fullName: 'Emma Davis',
      jobTitle: 'Product Manager',
      companyName: 'StartUp Ventures',
      email: 'emma.davis@startup.com',
      phoneNumber: '+1 (555) 234-5678',
      website: 'https://www.startup.com',
      address: '',
      logoUrl: 'https://placehold.co/87x113/64748b/white?text=S'
    }
  },
  {
    id: 'professional-2',
    name: 'Modern Professional',
    description: 'Contemporary design with clean lines and modern aesthetics',
    category: 'professional',
    data: {
      fullName: 'David Rodriguez',
      jobTitle: 'Software Engineer',
      companyName: 'CodeCraft Technologies',
      email: 'david.rodriguez@codecraft.com',
      phoneNumber: '+1 (555) 345-6789',
      website: 'https://www.codecraft.com',
      address: '321 Tech Park\nSeattle, WA 98101',
      logoUrl: 'https://placehold.co/87x113/10b981/white?text=CC'
    }
  },
  {
    id: 'creative-2',
    name: 'Bold & Vibrant',
    description: 'Eye-catching design with bold colors and modern typography',
    category: 'creative',
    data: {
      fullName: 'Jessica Park',
      jobTitle: 'Brand Strategist',
      companyName: 'Visionary Brands',
      email: 'jessica.park@visionary.com',
      phoneNumber: '+1 (555) 567-8901',
      website: 'https://www.visionary.com',
      address: '555 Innovation Street\nAustin, TX 78701',
      logoUrl: 'https://placehold.co/87x113/f97316/white?text=VB'
    }
  },
  // Production-ready templates
  {
    id: 'modern-accent-bar',
    name: 'Modern Accent Bar',
    description: 'Professional design with colored accent bar for visual separation',
    category: 'professional',
    data: {
      fullName: '[FULL_NAME]',
      jobTitle: '[ROLE]',
      companyName: '[COMPANY]',
      email: '[EMAIL]',
      phoneNumber: '[PHONE]',
      website: '',
      address: '',
      logoUrl: '[LOGO_URL]'
    }
  },
  {
    id: 'minimalist-centered',
    name: 'Minimalist Centered Layout',
    description: 'Clean centered design with minimal elements',
    category: 'minimal',
    data: {
      fullName: '[FULL_NAME]',
      jobTitle: '[ROLE]',
      companyName: '[COMPANY]',
      email: '[EMAIL]',
      phoneNumber: '[PHONE]',
      website: '',
      address: '',
      logoUrl: '[LOGO_URL]'
    }
  },
  {
    id: 'dual-tone-split',
    name: 'Dual Tone Split Background',
    description: 'Split background with contrasting colors',
    category: 'creative',
    data: {
      fullName: '[FULL_NAME]',
      jobTitle: '[ROLE]',
      companyName: '[COMPANY]',
      email: '[EMAIL]',
      phoneNumber: '[PHONE]',
      website: '',
      address: '',
      logoUrl: '[LOGO_URL]'
    }
  },
  {
    id: 'icon-contact-strip',
    name: 'Icon-Focused Contact Strip',
    description: 'Contact information organized in icon-based strips',
    category: 'creative',
    data: {
      fullName: '[FULL_NAME]',
      jobTitle: '[ROLE]',
      companyName: '[COMPANY]',
      email: '[EMAIL]',
      phoneNumber: '[PHONE]',
      website: '',
      address: '',
      logoUrl: '[LOGO_URL]'
    }
  },
  {
    id: 'bold-header-style',
    name: 'Bold Color Header Style',
    description: 'Vibrant gradient header with circular icon indicators',
    category: 'executive',
    data: {
      fullName: '[FULL_NAME]',
      jobTitle: '[ROLE]',
      companyName: '[COMPANY]',
      email: '[EMAIL]',
      phoneNumber: '[PHONE]',
      website: '',
      address: '',
      logoUrl: '[LOGO_URL]'
    }
  }
];

export const templateCategories = [
  { id: 'all', name: 'All Templates' },
  { id: 'professional', name: 'Professional' },
  { id: 'executive', name: 'Executive' },
  { id: 'creative', name: 'Creative' },
  { id: 'minimal', name: 'Minimal' }
];

export function getTemplatesByCategory(category: string): SignatureTemplate[] {
  if (category === 'all') {
    return signatureTemplates;
  }
  return signatureTemplates.filter(template => template.category === category);
}

export function getTemplateById(id: string): SignatureTemplate | undefined {
  return signatureTemplates.find(template => template.id === id);
}
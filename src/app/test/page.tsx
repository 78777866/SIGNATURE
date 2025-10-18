'use client';

import { useState } from 'react';
import { getTemplateHtml } from '@/utils/generateTemplateHtml';

export default function TestTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern-accent-bar');
  const [logoUrl, setLogoUrl] = useState('https://placehold.co/87x113/3b82f6/white?text=TC');
  const [fullName, setFullName] = useState('Alex Johnson');
  const [role, setRole] = useState('Senior Marketing Manager');
  const [company, setCompany] = useState('TechCorp Solutions');
  const [email, setEmail] = useState('alex.johnson@techcorp.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  const getProcessedHtml = () => {
    let html = getTemplateHtml(selectedTemplate);
    html = html.replace('[LOGO_URL]', logoUrl);
    html = html.replace('[FULL_NAME]', fullName);
    html = html.replace('[ROLE]', role);
    html = html.replace('[COMPANY]', company);
    html = html.replace('[EMAIL]', email);
    html = html.replace('[PHONE]', phone);
    return html;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Template Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Template Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                <select 
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="modern-accent-bar">Modern Accent Bar</option>
                  <option value="minimalist-centered">Minimalist Centered Layout</option>
                  <option value="dual-tone-split">Dual Tone Split Background</option>
                  <option value="icon-contact-strip">Icon-Focused Contact Strip</option>
                  <option value="bold-header-style">Bold Color Header Style</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div 
              dangerouslySetInnerHTML={{ __html: getProcessedHtml() }}
              className="border border-gray-200 rounded-md p-4 min-h-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
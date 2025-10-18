import { SignatureData } from '@/types/signature';
import { isAnimatedGif } from '@/utils/isAnimatedGif';

export function generateSignatureHtml(data: SignatureData): string {
  const {
    fullName,
    jobTitle,
    companyName,
    email,
    phoneNumber,
    website,
    address,
    logoUrl
  } = data;

  // Create placeholder values for empty fields
  const displayName = fullName || '[Full Name]';
  const displayJobTitle = jobTitle || '[Job Title]';
  const displayCompanyName = companyName || '[Company Name]';
  const displayEmail = email || '[Email]';
  const displayPhone = phoneNumber || '';

  // Check if the logo is an animated GIF
  const isGif = isAnimatedGif(logoUrl);

  // Generate logo section - Simplified for better Gmail compatibility
  const logoSection = logoUrl 
    ? `<img src="${logoUrl}" alt="Company Logo" width="87" height="113" style="width: 87px; height: 113px; display: block; line-height: 100%; outline: none; text-decoration: none; border: 0;${isGif ? ' animation: none;' : ''}" />`
    : `<div style="width: 87px; height: 113px; background-color: #f3f4f6; border: 2px dashed #d1d5db; display: table-cell; vertical-align: middle; text-align: center; color: #9ca3af; font-size: 10px; font-family: Arial, sans-serif;">Logo<br/>87&times;113</div>`;

  // Generate contact info rows - Simplified for better Gmail compatibility
  const contactRows = [];
  
  // Email row
  if (email) {
    contactRows.push(`
      <tr>
        <td style="padding: 2px 0; font-family: Arial, sans-serif; font-size: 14px; color: #374151; line-height: 1.2;">
          <strong style="font-weight: bold;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${displayEmail}</a>
        </td>
      </tr>
    `);
  }

  // Phone row
  if (phoneNumber) {
    contactRows.push(`
      <tr>
        <td style="padding: 2px 0; font-family: Arial, sans-serif; font-size: 14px; color: #374151; line-height: 1.2;">
          <strong style="font-weight: bold;">Phone:</strong> ${displayPhone}
        </td>
      </tr>
    `);
  }

  // Website row
  if (website) {
    const cleanWebsite = website.startsWith('http') ? website : `https://${website}`;
    const displayWebsiteText = website.replace(/^https?:\/\//, '');
    contactRows.push(`
      <tr>
        <td style="padding: 2px 0; font-family: Arial, sans-serif; font-size: 14px; color: #374151; line-height: 1.2;">
          <strong style="font-weight: bold;">Website:</strong> <a href="${cleanWebsite}" style="color: #2563eb; text-decoration: none;">${displayWebsiteText}</a>
        </td>
      </tr>
    `);
  }

  // Address row
  if (address) {
    const formattedAddress = address.replace(/\n/g, '<br/>');
    contactRows.push(`
      <tr>
        <td style="padding: 2px 0; font-family: Arial, sans-serif; font-size: 14px; color: #374151; line-height: 1.2;">
          <strong style="font-weight: bold;">Address:</strong> ${formattedAddress}
        </td>
      </tr>
    `);
  }

  // Generate email-compatible HTML optimized for Gmail
  // Using table structure with explicit styling for maximum compatibility
  return `
<table cellspacing="0" cellpadding="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 500px;">
  <tr>
    <td valign="top" style="vertical-align: top; padding-right: 20px; width: 87px;">
      ${logoSection}
    </td>
    <td valign="top" style="vertical-align: top;">
      <table cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
        <tr>
          <td style="padding: 0 0 8px 0;">
            <div style="font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #1f2937; margin: 0; line-height: 1.2;">
              ${displayName}
            </div>
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #6b7280; margin: 2px 0 0 0; line-height: 1.2;">
              ${displayJobTitle}
            </div>
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #374151; margin: 2px 0 0 0; line-height: 1.2;">
              ${displayCompanyName}
            </div>
          </td>
        </tr>
        ${contactRows.length > 0 ? `
        <tr>
          <td style="padding: 8px 0 0 0;">
            <table cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
              ${contactRows.join('')}
            </table>
          </td>
        </tr>
        ` : ''}
      </table>
    </td>
  </tr>
</table>
  `.trim();
}
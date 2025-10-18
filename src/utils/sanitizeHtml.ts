import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: return as-is for now
    // In production, you might want to use a server-side sanitizer
    return html;
  }

  // Client-side sanitization
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'table', 'tbody', 'tr', 'td', 'div', 'span', 'p', 'br',
      'strong', 'b', 'em', 'i', 'a', 'img'
    ],
    ALLOWED_ATTR: [
      'style', 'href', 'src', 'alt', 'target', 'cellpadding', 
      'cellspacing', 'border', 'width', 'height'
    ],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onclick', 'onload', 'onmouseover', 'onfocus', 'onblur']
  });
}
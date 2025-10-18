export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export async function validateImageUrl(url: string): Promise<ImageValidationResult> {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  // Check if URL starts with HTTPS
  if (!url.startsWith('https://')) {
    return { isValid: false, error: 'URL must start with https://' };
  }

  // Check allowed extensions
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  const hasValidExtension = allowedExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );

  if (!hasValidExtension) {
    return { isValid: false, error: 'Image must be .png, .jpg, .jpeg, .gif, or .webp' };
  }

  // Try to load the image to check if it exists and get dimensions
  try {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        const { width, height } = img;
        
        // Check if dimensions are close to 87x113 (±20px tolerance)
        const targetWidth = 87;
        const targetHeight = 113;
        const tolerance = 20;
        
        const widthInRange = Math.abs(width - targetWidth) <= tolerance;
        const heightInRange = Math.abs(height - targetHeight) <= tolerance;
        
        if (!widthInRange || !heightInRange) {
          resolve({
            isValid: false,
            error: `Image dimensions (${width}×${height}) should be close to 87×113 pixels (±20px tolerance)`
          });
        } else {
          resolve({ isValid: true });
        }
      };
      
      img.onerror = () => {
        resolve({
          isValid: false,
          error: 'Unable to load image. Please check the URL.'
        });
      };
      
      // Set a timeout for the image loading
      setTimeout(() => {
        resolve({
          isValid: false,
          error: 'Image loading timeout. Please check the URL.'
        });
      }, 10000); // 10 second timeout
      
      img.src = url;
    });
  } catch {
    return {
      isValid: false,
      error: 'Failed to validate image URL'
    };
  }
}

export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  const hasValidExtension = allowedExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  return url.startsWith('https://') && hasValidExtension;
}
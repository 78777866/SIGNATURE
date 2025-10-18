/**
 * Detect if a URL points to an animated GIF
 * @param url The image URL to check
 * @returns boolean indicating if the URL is likely an animated GIF
 */
export function isAnimatedGif(url: string): boolean {
  // First check if it's a GIF by extension
  if (!url || typeof url !== 'string') return false;
  
  const lowerUrl = url.toLowerCase();
  const isGifExtension = lowerUrl.endsWith('.gif') || 
                         lowerUrl.includes('.gif?') || 
                         lowerUrl.includes('.gif#') ||
                         lowerUrl.includes('.gif&');
  
  return isGifExtension;
}
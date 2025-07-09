// Developed by Manjistha Bidkar
export function cleanText(text: string): string {
  return text
    .replace(/[^\x20-\x7E\n]/g, '')  // Remove non-ASCII
    .replace(/[^\w\s\n]/g, '')       // Remove punctuation
    .replace(/\b\w{1,2}\b/g, '')     // Remove very short words
    .replace(/\s{2,}/g, ' ')         // Collapse extra spaces
    .replace(/\n+/g, ' ')            // Remove newlines
    .toLowerCase()
    .trim();
}

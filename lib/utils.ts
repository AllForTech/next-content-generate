import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts image URLs from a Markdown string, detecting both standard
 * Markdown syntax (![...](...)) and HTML img tags (<img src="...">).
 * @param {string} markdownString
 * @returns {string[]} Array of unique extracted image URLs.
 */
export function extractMarkdownImageUrls(markdownString: string) {
  if (!markdownString) return [];

  // 1. Regex for standard Markdown images: !\[.*?\]\((.*?)\)
  const markdownRegex = /!\[.*?\]\((.*?)\)/g;

  // 2. Regex for HTML img tags: <img.*?src=["'](.*?)["'].*?>
  // This handles the editor output when resizing/modifying is done.
  const htmlImgRegex = /<img.*?src=["'](.*?)["'].*?>/gi;

  const urls = new Set(); // Use a Set to ensure unique URLs
  let match;

  // Extract from Markdown format
  while ((match = markdownRegex.exec(markdownString)) !== null) {
    urls.add(match[1].trim());
  }

  // Extract from HTML img format
  while ((match = htmlImgRegex.exec(markdownString)) !== null) {
    urls.add(match[1].trim());
  }

  // Handle custom MDX <Image> components if necessary (less common, but possible)
  // Example for <Image src="URL" ...>:
  const mdxImageRegex = /<Image\s+src=["'](.*?)["'].*?\/>/gi;
  while ((match = mdxImageRegex.exec(markdownString)) !== null) {
    urls.add(match[1].trim());
  }

  return Array.from(urls);
}


export function formatDatabaseDate(timestamp: string): string {
  if (!timestamp) return 'N/A';

  // 1. Create a Date object from the string
  const date = new Date(timestamp);

  // 2. Use the built-in toLocaleDateString for safe, localized formatting
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const generateCronString = (frequency: string, timeStr: string): string => {
  // Note: Assuming input timeStr is in 'HH:MM' format (e.g., '09:30')
  const [hour, minute] = timeStr.split(':');

  // Cron format: Minute(0-59) Hour(0-23) DayOfMonth(1-31) Month(1-12) DayOfWeek(0-7)
  switch (frequency) {
    case 'daily':
      return `${minute} ${hour} * * *`;
    case 'weekly':
      // Runs every Sunday (DayOfWeek 0 or 7)
      return `${minute} ${hour} * * 0`;
    case 'monthly':
      // Runs on the 1st day of the month
      return `${minute} ${hour} 1 * *`;
    default:
      return `${minute} ${hour} * * *`;
  }
};
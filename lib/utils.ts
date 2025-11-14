import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractMarkdownImageUrls(markdownString) {
  // Regex pattern to capture the URL group from Markdown image syntax:
  // !\[.*?\]\((.*?)\)
  // Explanation:
  // !\[.*?\] - Matches ![...something...]
  // \( - Matches the opening parenthesis
  // (.*?) - CAPTURE GROUP 1: Lazily captures the URL
  // \) - Matches the closing parenthesis
  const regex = /!\[.*?\]\((.*?)\)/g;
  const urls = [];
  let match;

  while ((match = regex.exec(markdownString)) !== null) {
    // match[1] contains the captured URL
    urls.push(match[1]);
  }

  return urls;
}
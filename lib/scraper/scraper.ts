import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeUrl(urls: string[]) {
  // Array to hold the scraped content from all URLs
  const allScrapedContent: string[] = [];
  const allScrapedData = []

  // Loop through each URL provided in the input array
  for (const url of urls) {
    try {
      console.log(`[Tool Executing] Attempting to scrape: ${url}`);

      // 🚨 FIX: Call axios.get() with the single URL string inside the loop
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Remove script and style elements
      $('script, style').remove();

      // Get the text content of the body
      const text = $('body').text();

      // Remove extra whitespace and newlines
      const cleanedText = text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s\s+/g, ' ').trim();

      // Add the cleaned content to our aggregation array
      allScrapedData.push({ url, text })
      allScrapedContent.push(`--- CONTENT FROM: ${url} ---\n${cleanedText}`);

    } catch (error) {
      const errorMessage = `Failed to scrape URL: ${url}. The website may be down, use anti-bot measures, or the URL is invalid.`;
      console.error(errorMessage, error);

      // Log the error but continue to the next URL
      allScrapedContent.push(JSON.stringify({ error: errorMessage, url: url }));
    }
  }

  // Return a single string where all scraped content is joined together.
  return {
    content: allScrapedContent.join('\n\n'),
    allScrapedData,
  }
}
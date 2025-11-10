
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeUrl(url: string) {
    try {
        console.log(`[Tool Executing] Attempting to scrape: ${url}`);
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        // Remove script and style elements
        $('script, style').remove();
        
        // Get the text content of the body
        const text = $('body').text();
        
        // Remove extra whitespace
        const cleanedText = text.replace(/\s\s+/g, ' ').trim();

        
        return cleanedText;
    } catch (error) {
      const errorMessage = `Failed to scrape URL: ${url}. The website may be down, use anti-bot measures, or the URL is invalid.`;
      console.error(errorMessage, error);
      return JSON.stringify({ error: errorMessage });
    }
}

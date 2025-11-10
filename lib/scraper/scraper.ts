
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeUrl(url: string) {
    try {
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
        console.error(`Error scraping URL: ${url}`, error);
        return JSON.stringify({ error: "Failed to scrape the URL." });
    }
}

import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

// Define the Headers used for the initial Axios request to mimic a browser
const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
};

// Interface for the data you are collecting
interface ScrapedDataItem {
  url: string;
  text: string;
  isRendered: boolean; // Indicates if Puppeteer (true) or Axios (false) was used
}

/**
 * Executes the core scraping and text cleaning logic using Cheerio.
 * @param htmlContent The HTML string (from Axios or Puppeteer).
 * @returns The cleaned text content.
 */
function processCheerio(htmlContent: string): string {
  const $ = cheerio.load(htmlContent);

  // Remove script and style elements
  $('script, style').remove();

  // Get the text content of the body
  const text = $('body').text();

  // Remove extra whitespace and newlines
  return text
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s\s+/g, ' ')
    .trim();
}

/**
 * Attempts to scrape a single URL using Puppeteer for JavaScript rendering.
 * @param url The URL to scrape.
 * @returns The rendered HTML content.
 */
async function scrapeWithPuppeteer(url: string): Promise<string> {
  console.log(`[Puppeteer Fallback] Launching browser for: ${url}`);

  // Note: For production use in a containerized environment (like Vercel),
  // you may need to pass specific launch arguments (e.g., headless: 'new', args: ['--no-sandbox'])
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Set a good user agent for the Puppeteer session as well
  await page.setUserAgent(BROWSER_HEADERS['User-Agent']);

  // Wait until the network activity is minimal, allowing client-side JS to load.
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  const html = await page.content();
  await browser.close();

  console.log(`[Puppeteer Success] Content successfully rendered for: ${url}`);
  return html;
}

/**
 * Scrapes an array of URLs, using Puppeteer as a fallback for failed Axios requests.
 * @param urls Array of URLs to scrape.
 */
export async function scrapeUrl(urls: string[]) {
  const allScrapedContent: string[] = [];
  const allScrapedData: ScrapedDataItem[] = [];

  for (const url of urls) {
    let success = false;
    let scrapedText = '';
    let isRendered = false; // Flag to track which method succeeded

    try {
      console.log(`[Tool Executing] Attempting AXIOS scrape: ${url}`);

      // --- PRIMARY ATTEMPT: AXIOS + CHEERIO (Fast) ---
      const response = await axios.get(url, {
        headers: BROWSER_HEADERS,
        timeout: 15000, // 15s timeout for the request
      });

      scrapedText = processCheerio(response.data);
      success = true;
      isRendered = false; // Axios used
    } catch (error) {
      // Check if it's a known error status that indicates anti-bot or JS required
      const status = (error as AxiosError).response?.status;
      const requiresFallback =
        [403, 405, 503].includes(status as number) || (error as Error).message.includes('timeout');

      if (requiresFallback) {
        // --- FALLBACK ATTEMPT: PUPPETEER + CHEERIO (Slow, but handles JS) ---
        try {
          const htmlContent = await scrapeWithPuppeteer(url);
          scrapedText = processCheerio(htmlContent);
          success = true;
          isRendered = true; // Puppeteer used
        } catch (puppeteerError) {
          // Both failed
          console.error(`[Puppeteer Failure] Final error for ${url}:`, puppeteerError);
        }
      } else {
        // Log non-fallback errors (e.g., DNS resolution, invalid URL structure)
        console.error(`[Axios Failure] Non-fallback error for ${url}:`, error);
      }
    }

    // --- AGGREGATE RESULTS ---
    if (success && scrapedText.length > 0) {
      allScrapedData.push({ url, text: scrapedText, isRendered });

      const method = isRendered ? 'Puppeteer (JS Render)' : 'Axios (Static)';
      allScrapedContent.push(`--- CONTENT FROM: ${url} (via ${method}) ---\n${scrapedText}`);
    } else {
      const errorMessage = `Failed to scrape URL: ${url}. Both Axios and Puppeteer failed to retrieve content.`;
      console.error(errorMessage);

      // Ensure the AI gets a clean error message to report back
      const errorContent = JSON.stringify({ error: errorMessage, url: url });
      allScrapedContent.push(errorContent);
    }
  }

  // Return the full structured result
  return {
    content: allScrapedContent.join('\n\n'),
    allScrapedData,
  };
}

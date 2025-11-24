import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch'; // Required for server-side use of unsplash-js

// Initialize the Unsplash API client
// We use 'nodeFetch' to ensure it works in the Node.js environment of Vercel functions.
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY! || '',
  fetch: nodeFetch as unknown as typeof fetch,
});

/**
 * Searches Unsplash for images based on a query and returns a list of URLs.
 * @param query The search term for the images.
 * @param count The number of images to return (max 10 for search/photos endpoint).
 * @returns A JSON string containing an array of image objects (URL, description).
 */
export async function searchUnsplashImages(query: string, count: number = 3) {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    return JSON.stringify({ error: "UNSPLASH_ACCESS_KEY is not configured." });
  }

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    throw new Error('Missing Unsplash API key.');
  }

  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY! || '',
  });

  try {
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 5,
    });

    if (result.errors) {
      throw new Error(result.errors[0]);
    }

    if (result.response.results.length === 0) {
      return 'No images found.';
    }

    return result.response.results.map((photo: any) => ({
      url: photo.urls.regular,
      alt_description: photo.alt_description,
      photographer: photo.user.name,
    }));
  } catch (error) {
    return `Error searching for images: ${error.message}`;
  }
}

  try {
    // Use the search.getPhotos endpoint for the best results
    const response = await unsplash.search.getPhotos({
      query: query,
      perPage: count,
      page: 1,
    });

    if (response.type === 'error') {
      return JSON.stringify({ error: `Unsplash API Error: ${response.errors.join(', ')}` });
    }

    // Map the results to a simplified, clean format for the LLM
    const imageUrls = response.response.results.map(photo => ({
      url: `${photo.urls.regular}&fm=jpg&w=1080&h=720`, // A good, general-purpose image size
      alt_description: photo.alt_description,
      photographer: photo.user.name,
    }));

    // Return the clean JSON string
    return JSON.stringify(imageUrls);

  } catch (error) {
    console.error("Unsplash search failed:", error);
    return JSON.stringify({ error: "Failed to connect to the Unsplash API." });
  }
}
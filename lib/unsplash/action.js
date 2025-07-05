'use server'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function getBlogImage(query, count = 15) { // Added 'count' parameter with a default of 10
    const parsed = query.trim();

    // Changed 'per_page=1' to `per_page=${count}` to fetch multiple results
    const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(parsed)}&per_page=${count}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
    });

    if (!res.ok) {
        // Provide more detailed error information if possible
        const errorText = await res.text();
        throw new Error(`Failed to fetch image: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    const result = data.results; // 'results' will now contain an array of images up to 'count'

    console.log(result);
    return result;
}

'use server'
// utils/fetchUnsplash.js
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function getBlogImage(query) {
    const parsed = typeof query === 'string' ? JSON.parse(query) : query;

    const formattedQuery = parsed.keywords.map(keyword => {
        return `${keyword}`
    }).join(',').slice(0, 3)

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(formattedQuery)}&per_page=1`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch image');

    const data = await res.json();
    const result = data.results.slice(0, 4) || data.results[0];

    console.log(result)
    return result

}

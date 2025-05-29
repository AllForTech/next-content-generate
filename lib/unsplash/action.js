'use server'
// utils/fetchUnsplash.js
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function getBlogImage(query) {
    const parsed = typeof query === 'string' ? JSON.parse(query).topic : query.topic;

    // const formattedQuery = parsed.map(keyword => {
    //     return `${keyword}`
    // }).join(',')

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(parsed)}&per_page=1`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch image');

    const data = await res.json();
    const result = data.results[0];

    // return {
    //     url: result?.urls?.regular,
    //     alt: result?.alt_description || query,
    //     photographer: result?.user?.name,
    //     source: result?.links?.html,
    // };

    console.log(result)
    return result

}

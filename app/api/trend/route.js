import { NextResponse } from 'next/server';
import gtrends from 'g-trends';

export async function GET(request) {
    try {
        const query = 'AI'; // or extract from query string
        const data = await gtrends.related(query);

        return NextResponse.json({
            keyword: query,
            relatedQueries: data.relatedQueries,
        });
    } catch (error) {
        console.error('g-trends error:', error);
        return NextResponse.json({ error: 'Failed to fetch trends' });
    }
}



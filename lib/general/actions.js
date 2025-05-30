'use server'

export async function generateContent(values) {
    const url = `https://alf-content-generate.vercel.app/api/generate`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data?.error || 'Failed to generate content.',
                content: null
            };
        }

        return {
            success: true,
            error: null,
            content: data
        };
    } catch (err) {
        return {
            success: false,
            error: err.message || 'Unknown error occurred.',
            content: null
        };
    }
}
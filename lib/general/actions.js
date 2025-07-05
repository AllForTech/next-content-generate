'use client'

export async function generateContent(values) {
    const url = process.env.API_ENDPOINT;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const reader = res.body?.getReader();
       const decoder = new TextDecoder();
        let result = ""; 

       while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
    // optionally, append to UI incrementally here
       }

        if (!response.ok) {
            return {
                success: false,
                error: data?.error || 'Failed to generate content.',
                content: null
            };
        }

       
       
       
       
       
    } catch (err) {
        return {
            success: false,
            error: err.message || 'Unknown error occurred.',
            content: null
        };
    }
}
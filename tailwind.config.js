/** @type {import('tailwindcss').Config} */ // <--- JSDoc type annotation
module.exports = {
    // Use CommonJS syntax here
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './context/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // Your original plugin using require()
        import('@tailwindcss/typography'),
    ],
}
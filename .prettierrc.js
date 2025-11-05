// .prettierrc.js

/** @type {import("prettier").Config} */
const config = {
    // Common formatting options
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    printWidth: 100,

    // This is the key for Tailwind CSS class sorting
    plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
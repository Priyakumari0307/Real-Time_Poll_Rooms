/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo color
                secondary: '#10B981', // Emerald color
                dark: '#1F2937',
            }
        },
    },
    plugins: [],
}

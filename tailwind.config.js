/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "redish": "hsl(14, 86%, 42%)",
        "body-bg": "hsl(20, 50%, 98%)",
      },
      borderColor: {
        "redish": "hsl(14, 86%, 42%)",
      },
      textColor: {
        "redish": "hsl(14, 86%, 42%)",
      }
    },
  },
  plugins: [],
}


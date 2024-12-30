/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "redish": "hsl(14, 86%, 42%)"
      },
      borderColor: {
        "redish": "hsl(14, 86%, 42%)",
      },
    },
  },
  plugins: [],
}


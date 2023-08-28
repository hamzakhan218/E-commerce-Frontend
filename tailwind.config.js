/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "2px 2px 2px 2px rgba(255, 187, 118, 0.25)",
      },
    },
  },
  plugins: [],
};

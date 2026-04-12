/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ১. বডি টেক্সটের জন্য Poppins
        poppins: ['Poppins', 'sans-serif'],
        // ২. হেডিং এবং স্পেশাল ডিজাইনের জন্য Outfit
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
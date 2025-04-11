/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        agri: ["'Cormorant Garamond'", "serif"],  // Branding font
        ledger: ["'Ledger'", "serif"],  // Navbar font
        petrona: ["'Petrona'", "serif"], 
        merriweather: ["'Merriweather'", "serif"], 
        italianno: ["'Italianno'", "cursive"],
        odor: ["'Odor Mean Chey'", "sans-serif"], 
        libre: ["'Libre Caslon Display'", "serif"],
        noto: ["'Noto Serif'", "serif"], // ✅ Added Noto Serif font
      },

      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
      },

      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

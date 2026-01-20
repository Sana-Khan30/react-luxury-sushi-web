import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#F5BE32",
        goldSoft: "#F3D382",
        dark: "#1E1E1E",
        darkCard: "#2E2E2E",
        textLight: "#D9D9D9",
      },
      fontFamily: {
        luxury: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
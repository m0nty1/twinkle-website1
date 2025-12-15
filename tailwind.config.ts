import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFCF8',
        sand: {
          50: '#FAF9F6',
          100: '#F5F0EB',
          200: '#EBE5DE',
          300: '#DMD4CC',
        },
        champagne: {
          100: '#F4EBD9',
          200: '#EADBC0',
          300: '#DEC5A0',
          400: '#D4B88C',
          500: '#C5A059',
        },
        charcoal: {
          900: '#2C2825', 
          800: '#4A423D',
          600: '#756A62'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'soft-glow': 'radial-gradient(circle at 50% 50%, #FDFCF8 0%, #F5F0EB 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
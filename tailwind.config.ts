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
        primary: {
          DEFAULT: '#0A2342',
          dark: '#051628',
          light: '#0F2F54',
        },
        accent: {
          DEFAULT: '#C68E17',
          dark: '#A67512',
          light: '#D9A43D',
        },
        surface: {
          DEFAULT: '#F5F5F5',
          light: '#FAFAFA',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#5A5A5A',
          tertiary: '#8A8A8A',
        },
        success: '#2E5E4E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px', // Force all to 0
      },
    },
  },
  plugins: [],
};
export default config;

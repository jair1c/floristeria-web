import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        roseBrand: '#c65a7c',
        blush: '#fff1f4',
        cream: '#fffaf5',
        sage: '#a3b18a',
        ink: '#2f2430'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(47, 36, 48, 0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;

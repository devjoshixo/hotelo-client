/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'nav-border': 'rgba(52, 52, 52, 0.208)',
      'nav-box-shadow': 'rgba(0, 0, 0, 0.07)',
      'signin-shadow': 'rgba(124, 124, 124, 0.083)',
      'search-input': 'rgba(0, 0, 0, 0.516)',
      'action-input': 'rgba(0, 0, 0, 0.388)',
    },
  },
  plugins: [],
};

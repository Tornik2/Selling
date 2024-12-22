/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Include files in the app directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Include shared components
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Include files in the pages directory if still used
    './public/**/*.html', // Include public files if required
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

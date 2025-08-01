/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'microsoft-blue': '#0078d4',
        'microsoft-light-blue': '#40e0d0',
        'microsoft-green': '#107c10',
        'microsoft-orange': '#ff8c00',
        'microsoft-red': '#d13438',
        'fabric-primary': '#0f6cbd',
        'fabric-secondary': '#004578',
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

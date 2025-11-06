/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      colors: {
        "ed-bg": "#020817",
        "ed-card": "#050816",
        "ed-accent": "#38bdf8",
        "ed-accent-soft": "#22c55e"
      },
      boxShadow: {
        "ed-soft": "0 18px 45px rgba(15,23,42,0.9)"
      }
    }
  },
  plugins: []
}

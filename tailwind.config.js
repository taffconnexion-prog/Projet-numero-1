/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cdlj: {
          blue: "#1a56db",
          red: "#c0392b",
          bg: "#f4f6fb",
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6DBD44",
        secondary: "#D2EBC5",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#252527",
          default: "#101010",
        },
        secondary: {
          light: "#171719",
        },
        accent: {},
        neutral: {
          light: "#FFAC34",
          default: "#6F6097",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "card-bg": "rgba(10, 14, 23, 0.85)",
        "primary-color": "#5d7ebc",
        "gray-800": "#1F2937",
      },
    },
  },
  plugins: [],
};

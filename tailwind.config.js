// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
    // если у вас есть другие папки с JSX/TSX
  ],
  theme: {
    extend: {
      // здесь ваши расширения темизации
    },
  },
  plugins: [
    // например, require('@tailwindcss/forms'), и т.д.
  ],
};
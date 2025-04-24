// postcss.config.js
module.exports = {
  plugins: {
    // сначала Tailwind — чтобы он подхватил ваши классы
    tailwindcss: {},
    // затем Autoprefixer — для префиксов в стилях
    autoprefixer: {},
  },
};
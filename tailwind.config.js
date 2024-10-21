// tailwind.config.js or tailwind.config.ts
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#186838",
        dark: "#170F49",
        // blue:"#2F80ED",
        // purple:"#E1D2FF",
        // orange:"#EFA300",
        // yellow:"#FDE1AC",
      },
    },
  },
  plugins: [],
};

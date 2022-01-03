/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  purge: [], //remove this line
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./public/**/*.html"], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

const withImages = require("next-images");
module.exports = withImages();

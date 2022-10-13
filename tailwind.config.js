/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js}", "./*.{html,js}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}

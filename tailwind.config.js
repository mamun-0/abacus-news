/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin"), flowbite.plugin()],
};

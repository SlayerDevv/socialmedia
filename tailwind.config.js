/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "small": {
          min: "320px",
          max: "360px",
        },
        "medium": {
          max: "390px",
          min: "375px"
        },
        "large": {
          max: "428px",
          min: "414px",
        },
        "extra-large": {
          min: "480px",
        },
      },
      backgroundImage: {

        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

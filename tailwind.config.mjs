/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        meteor: "meteor 5s linear infinite",
        twinkle: "twinkle 2s infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        twinkle: {
          "0%": {
            transform: "scale(1, 1)",
            background: "rgba(255, 255, 255, 0)",
            "animation-timing-function": "linear",
          },
          "40%": {
            transform: "scale(0.8, 0.8)",
            background: "rgba(255, 255, 255, 1)",
            "animation-timing-function": "ease-out",
          },
          "80%": {
            transform: "scale(1, 1)",
            background: "rgba(255, 255, 255, 0)",
          },
          "100%": {
            transform: "scale(1, 1)",
            background: "rgba(255, 255, 255, 0)",
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

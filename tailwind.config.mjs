import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#13233a",
        navy: "#173f73",
        blue: "#2869b0",
        amber: "#f1bd4a",
        paper: "#f5f7fb",
      },
      boxShadow: {
        card: "0 22px 55px rgba(19, 35, 58, 0.10)",
      },
    },
  },
  plugins: [typography],
};

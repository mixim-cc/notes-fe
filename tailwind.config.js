/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        base: {
          DEFAULT: "var(--bg-base)",
          hover: "var(--bg-base-hover)",
        },
        back: {
          DEFAULT: "var(--bg-back)",
          hover: "var(--bg-back-hover)",
        },
        front: {
          DEFAULT: "var(--bg-front)",
          hover: "var(--bg-front-hover)",
        },
        el: {
          DEFAULT: "var(--bg-el)",
          hover: "var(--bg-el-hover)",
          active: "var(--bg-el-active)",
          subtle: {
            DEFAULT: "var(--bg-el-subtle)",
            hover: "var(--bg-el-subtle-hover)",
            active: "var(--bg-el-subtle-active)",
          },
        },

        stroke: {
          base: {
            DEFAULT: "var(--border-base)",
            strong: "var(--border-base-strong)",
          },
          back: {
            DEFAULT: "var(--border-base)",
            strong: "var(--border-base-strong)",
          },
          front: {
            DEFAULT: "var(--border-base)",
            strong: "var(--border-base-strong)",
          },
        },

        shade: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          subtle: "var(--text-subtle)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height) + 24px" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

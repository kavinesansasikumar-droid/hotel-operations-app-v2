/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
  colors: {
    sidebar: {
      accent: "hsl(var(--sidebar-accent))",
    },
  },
}
        page: {
          DEFAULT: "#f8f9fa",
          dark: "#0b1220",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
};

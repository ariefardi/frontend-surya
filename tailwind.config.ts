import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      primary: "#36A388",
      emergency: "#D74B4B",
      urgent: "#E3903F",
      non_urgent: "#5CC153",
      less_urgent: "#157AD8",
      inactive: "#A1AFC3"
    }
  },
  plugins: [],
} satisfies Config;

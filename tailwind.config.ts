import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "editorial-black": "#1a1a1a",
        "editorial-red": "#c8102e",
        "editorial-cream": "#f8f6f0",
        "editorial-gray": "#6b6b6b",
        "editorial-rule": "#d4d0c8",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1a1a1a",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            a: {
              color: "#c8102e",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            h1: {
              fontFamily: "'Cormorant', Georgia, serif",
              fontWeight: "300",
            },
            h2: {
              fontFamily: "'Cormorant', Georgia, serif",
              fontWeight: "300",
              borderBottom: "1px solid #d4d0c8",
              paddingBottom: "0.5rem",
            },
            h3: {
              fontFamily: "'Cormorant', Georgia, serif",
              fontWeight: "300",
            },
            h4: {
              fontFamily: "'Cormorant', Georgia, serif",
              fontWeight: "300",
            },
            blockquote: {
              fontStyle: "italic",
              borderLeftColor: "#c8102e",
              color: "#6b6b6b",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              backgroundColor: "#f8f6f0",
              border: "1px solid #d4d0c8",
              borderRadius: "0.25rem",
              padding: "0.1rem 0.3rem",
              fontSize: "0.9em",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;

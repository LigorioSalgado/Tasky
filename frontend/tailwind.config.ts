import type { Config } from "tailwindcss";

const config: Config = {
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
        'pinky': 'linear-gradient(to right, #f56565, #ed64a6)',
        'forest': 'linear-gradient(to right, #4299e1, #48bb78)',
        'grape': 'linear-gradient(to right, #9f7aea, #667eea)',
        'sunny': 'linear-gradient(to right, #ecc94b, #ed8936)',
        'aqua': 'linear-gradient(to right, #0bc5ea, #4299e1)',
        'fruit': 'linear-gradient(to right, #48bb78, #84cc16)',
        'flower': 'linear-gradient(to right, #ed64a6, #9f7aea)',
        'simple': 'linear-gradient(to right, #a0aec0, #2d3748)',
      },
    },
  },
  plugins: [],
};
export default config;

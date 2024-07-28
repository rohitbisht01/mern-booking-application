/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Recursive", "system-ui"], // Set Recursive as the default sans font
        // sans: ["var(--font-recursive)"],
      },
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};

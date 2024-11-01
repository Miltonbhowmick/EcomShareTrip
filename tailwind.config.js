/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#1882FF;",
        gradientLeft: "#AA7D05;",
        gradientRight: "#E4BB4B;",
      },
      fontSize: {
        "small-xs": "8px",
        small: "16px",
        paragraph: "12px",
        "paragraph-md": "14px",
        "paragraph-lg": "20px",

        h1: "25px",
        h2: "20px",
        h3: "18px",
        h4: "16px",
        h5: "14px",
        h6: "12px",

        // Small screens (sm)
        "h1-sm": "30px",
        "h2-sm": "24px",
        "h3-sm": "20px",
        "h4-sm": "18px",
        "h5-sm": "16px",
        "h6-sm": "14px",

        // Medium screens (md)
        "h1-md": "40px",
        "h2-md": "32px",
        "h3-md": "28px",
        "h4-md": "24px",
        "h5-md": "20px",
        "h6-md": "18px",

        // Large screens (lg)
        "h1-lg": "50px",
        "h2-lg": "40px",
        "h3-lg": "35px",
        "h4-lg": "30px",
        "h5-lg": "24px",
        "h6-lg": "20px",

        // Extra large screens (xl)
        "h1-xl": "70px",
        "h2-xl": "48px",
        "h3-xl": "40px",
        "h4-xl": "35px",
        "h5-xl": "25px",
        "h6-xl": "20px",
      },
    },
  },
  plugins: [],
};

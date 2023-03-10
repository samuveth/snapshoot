module.exports = {
  content: ["./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color))",
        secondary: "rgb(var(--secondary-color))",
        success: "rgb(var(--success-color))",
        danger: "rgb(var(--danger-color))",
        warning: "rgb(var(--warning-color))",
        info: "rgb(var(--info-color))",
        light: "rgb(var(--light-color))",
        dark: "rgb(var(--dark-color))",
        "gray-light": "rgb(var(--gray-light))",
        "gray-medium": "rgb(var(--gray-medium))",
        "gray-dark": "rgb(var(--gray-dark))",
      },

      borderRadius: {
        default: "var(--default-border-radius)",
        button: "var(--button-border-radius)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/forms"),
  ],
};

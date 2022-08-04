const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'custom-logo': '1px 0px 53px rgba(181, 215, 224, 0.3)'
    },
      boxShadow: {
        "custom-footer": "inset 0px 1px 0px #DADADA",
        "custom-header": "0 0 30px -15px rgba(0, 0, 0, 0.3)",
        "custom-items": "inset 0px -1px 0px #DADADA"
      },
      colors: {
        primary: "#FAFAFA",
        mygreen: "#27A080",
        mygreenLight: "#EEF7F5",
        myorange: "#FF9F0A",
        myorangeLight: "#FFF7EB",
        myblue: "#007C9E",
        quaternary: "#EF476F",
        myblack: "#292929",
        placeholder: "#B9B9B9",
        inputBg: "#EAEAEA",
        inputBorder: "#D9D9D9",
        mygrey: "#474747",
        secondarygrey: "#8E8E93",
        purpleBg: "#F2F2FD",
        mymagenta: "#EF476F",
        mymagentaLight: "#FEF0F3",
        myviolet: "#7B61FF",
      },
      fontFamily: {
        "sans": ["Roboto", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

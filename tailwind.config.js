/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        LatoBlack: ["LatoBlack", "sans-serif"],
        LatoBlackItalic: ["LatoBlackItalic", "sans-serif"],
        LatoBold: ["LatoBold", "sans-serif"],
        LatoLight: ["LatoLight", "sans-serif"],
        LatoItalic: ["LatoItalic", "sans-serif"],
        Lato: ["LatoRegular", "sans-serif"],
        LatoThin: ["LatoThin", "sans-serif"],
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};

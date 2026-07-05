/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hull: "#0B2A3D",
        hull2: "#0F3A52",
        abyss: "#071B27",
        teal: "#12808C",
        tealbright: "#1AA0AE",
        brass: "#C98A3B",
        brass2: "#E0A94E",
        foam: "#EEF3F4",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

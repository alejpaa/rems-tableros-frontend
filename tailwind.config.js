/** @type {import('tailwindcss').Config} */
const {blue, green,gray,white} = require("nativewind/src/metro/picocolors");
const {red} = require("tailwindcss/colors");
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {colors: {
            // Define tus colores semánticos
            primary: {
                DEFAULT: blue[600],
                light: blue[100],
                focus: blue[500],
            },
            danger: red[600],
            success: green[600],

            // Mapeo de textos y fondos para consistencia
            text: {
                DEFAULT: gray[900],
                title: gray[800],
                label: gray[700],
                body: gray[600],
                muted: gray[500],
            },
            background: {
                DEFAULT: gray[50],
                card: white,
            },
            border: {
                DEFAULT: gray[300],
                light: gray[200],
            }
        },
        fontFamily: {
            // Asegúrate de tener la fuente "Inter" cargada en tu proyecto de React Native
            sans: ['Inter_400Regular', 'sans-serif'],
            medium: ['Inter_500Medium'],
            semibold: ['Inter_600SemiBold'],
            bold: ['Inter_700Bold'],
        },},
  },
  plugins: [],
}

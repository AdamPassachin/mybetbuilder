/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'system-ui'],
        'bebas': ['Bebas Neue', 'system-ui'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
}


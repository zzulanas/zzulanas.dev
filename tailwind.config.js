/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      "tan": "#e0dad1",
      "grayscale": {
        "50": "rgb(247, 247, 247)",
        "100": "rgb(216, 216, 216)",
        "200": "rgb(223, 223, 223)",
        "300": "rgb(153, 153, 153)",
        "400": "rgb(191, 191, 191)",
        "500": "rgb(135, 135, 135)",
        "600": "rgb(109, 109, 109)",
        "700": "rgb(95, 95, 95)",
        "800": "rgb(74, 74, 74)",
        "900": "rgb(61, 61, 61)"
      },
      'blue-steel': {
        '50': '#f4f5fb',
        '100': '#e8ebf6',
        '200': '#ccd4eb',
        '300': '#a0b1d9',
        '400': '#5d7abd',
        '500': '#4a67ad',
        '600': '#385091',
        '700': '#2e4076',
        '800': '#2a3962',
        '900': '#273253',
        '950': '#1a2037',
      },
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      pink: colors.pink,
      orange: colors.orange,
      fuschia: colors.fuchsia,
    },
    extend: {
      transitionProperty: {
        'height': 'height',
      },
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
}
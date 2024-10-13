/** @type {import('tailwindcss').Config} */

import { RollerShadesClosedTwoTone } from '@mui/icons-material';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: 'var(--primary-blu)',
        // boxRoller:'var(--box-RollerShadesClosedTwoTone)',
        // lightBlue: 'var(--light-blue)',
        // white: 'var(--white)',
        // gray: 'var(--gray)',
        // blueGradient:'var(--blue-gradien)',
        // txtColor: 'var(--txt-color)'
        // 'main': '#e002a2',
        // 'second': '#47019d',
        // 'three': '#e00256',
        // 'black': '#212121',
        // 'white': '#ffffff',
        // 'gray': '#808080e2'
        // 'blue': 'rgba(6, 119, 221, 0.8)'
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        bona_nova: ['Bona nova', 'sans-serif']
      },
    },
  },
  plugins: [],
}
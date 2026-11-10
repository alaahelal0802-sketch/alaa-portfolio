/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0D14',
        panel: '#161A24',
        line: '#232838',
        line2: '#3A3F52',
        purple: '#7C5CFF',
        mist: '#A6ADBB',
        lemon: '#C6F24E',
        dim: '#6B7186',
      },
      fontFamily: {
        display: ['Archivo', 'Arial Black', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1280px' },
    },
  },
  plugins: [],
}

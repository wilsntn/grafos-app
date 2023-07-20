/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primary: '#444444',
      white: '#ffffff',
      black: '#000000',
      secondary: '#A9A8A8',
      third: '#B1ABAB',
      label: '#025E7B',
      inputBorder: '#02394A',
      applyButtonPrimary: '#0074D9',
      applyButtonSecondary: '#A7C6E4',
      submitButtonPrimary: '#AED581',
      submitButtonSecondary: '#C7E5A4',
      cancelButtonPrimary: '#FFB74D',
      cancelButtonSecondary: '#FFC97A',
    },
  },
  plugins: [],
};

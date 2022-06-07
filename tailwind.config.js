module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      screens: {
        xl: '1440px',
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
};

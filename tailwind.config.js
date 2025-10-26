/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1536px',
        },
      },
    },
    plugins: [
      function ({ addComponents, theme }) {
        addComponents({
          '.container': {
            paddingLeft: '1rem',
            paddingRight: '1rem',
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            },
            '@screen md': {
              maxWidth: '768px',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            },
            '@screen lg': {
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '7rem',
              paddingRight: '7rem',
            },
            '@screen xl': {
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '7rem',
              paddingRight: '7rem',
            },
            '@screen xxl': {
              maxWidth: '1450px',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            },
          },
        });
      },
    ],
  };
  
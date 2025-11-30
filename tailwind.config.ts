import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
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
            maxWidth: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          },
          '@screen xl': {
            maxWidth: '1150px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
          '@screen 2xl': {
            maxWidth: '1350px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          },
        },

        // '.container-extra': {
        //   width: '100%',
        //   marginLeft: 'auto',
        //   marginRight: 'auto',
        //   paddingLeft: '1rem',
        //   paddingRight: '1rem',
        //   '@screen sm': {
        //     maxWidth: theme('screens.sm'),
        //   },
        //   '@screen md': {
        //     maxWidth: theme('screens.md'),
        //   },
        //   '@screen lg': {
        //     maxWidth: '100%',
        //     paddingLeft: '0rem',
        //     paddingRight: '0rem',
        //   },
        //   '@screen xl': {
        //     maxWidth: '100%',
        //     paddingLeft: '0rem',
        //     paddingRight: '0rem',
        //   },
        // },
      });
    },
  ],
};
export default config;

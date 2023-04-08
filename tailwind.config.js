/* eslint-disable @typescript-eslint/no-var-requires */

const plugin = require('tailwindcss/plugin');

/**
 *
 * @param {string} variableName The CSS variable name.
 */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    return opacityValue ? `rgba(var(${variableName}), ${opacityValue})` : `rgb(var(${variableName}))`;
  };
}

/**
 * Change file type to JS because VS Code Tailwind Intellisense extension
 * only works with JS tailwind configs.
 *
 * https://tailwindcss.nuxt.dev/tailwind/config#default-configuration
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  plugins: [
    // https://redpixelthemes.com/blog/change-tailwindcss-base-font-size/#2.-do-it-via-a-plugin
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '14px' },
      });
    }),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      /**
       * If you pass an invalid color name or color unit here, Tailwind will use that value as is which means
       * just passing `var(--my-custom-property)` won't work. Fortunately, we can pass a function here so we
       * can work around it while still taking advantage of Tailwind features such as making use of opacity
       * against colors.
       */
      background: withOpacity('--background-color'),
      'secondary-background': withOpacity('--background-secondary-color'),
      'on-background': withOpacity('--text-on-background-color'),
      'password-color': withOpacity('--password-text-color'),
      'placeholder-color': withOpacity('--placeholder-text-color'),
      'entry-cost-color': withOpacity('--entry-cost-text-color'),
      'table-header-background': withOpacity('--table-header-background-color'),
      'table-header-on-background': withOpacity('--table-header-text-on-background-color'),
      'border-color': withOpacity('--border-color'),
    },
    borderRadius: {
      DEFAULT: '8px',
    },
    extend: {
      spacing: {
        spacer: '1rem',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      gridTemplateColumns: {
        'dropdown-item': '24px 1fr 24px',
      },
    },
  },
};

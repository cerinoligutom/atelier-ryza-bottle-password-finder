import type { Config } from 'tailwindcss';

// https://tailwindcss.nuxt.dev/tailwind/config#default-configuration
export default <Partial<Config>>{
  theme: {
    extend: {
      spacing: {
        spacer: '1rem',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
};

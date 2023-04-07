import type { NuxtConfig } from 'nuxt/config';

const getUrl = () => {
  let siteUrl =
    process?.env?.NUXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NUXT_ENV_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  siteUrl = siteUrl.includes('http') ? siteUrl : `https://${siteUrl}`;
  // Make sure to including trailing `/`.
  siteUrl = siteUrl.charAt(siteUrl.length - 1) === '/' ? siteUrl : `${siteUrl}/`;
  return siteUrl;
};

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: {
    GQL_HOST: `${getUrl()}api/graphql`,
  },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig,

  css: [
    'primevue/resources/themes/tailwind-light/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    '@/assets/styles/main.css', // NOTE: ORDER IS IMPORTANT HERE, WE MUST BE ABLE TO OVERRIDE PRIMEVUE STYLES
  ],

  srcDir: 'src/',

  imports: {
    dirs: ['./store/**', './composables/**'],
  },

  build: {
    transpile: ['primevue'],
  },

  modules: [
    '@nuxt/devtools',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    'nuxt-typed-router',
    [
      '@nuxtjs/tailwindcss',
      {
        cssPath: '~/assets/styles/tailwind.css',
      },
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: true,
        },
      },
    ],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
    'nuxt-icon',
    '@nuxtjs/web-vitals',
    'nuxt-lodash',
    [
      'nuxt-graphql-server',
      {
        url: runtimeConfig.public?.GQL_HOST,
        schema: './src/server/**/*.graphql',
        codegen: {
          enumValues: '~/enums/index',
          contextType: '~/server/graphql/IGraphQLContext#IGraphQLContext',
        },
      },
    ],
    [
      '@nuxtjs/apollo',
      {
        autoImports: true,
        clients: {
          default: {
            httpEndpoint: runtimeConfig.public?.GQL_HOST,
          },
        },
      },
    ],
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});

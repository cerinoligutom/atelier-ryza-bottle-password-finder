import type { NuxtConfig } from 'nuxt/config';

const isProduction = process.env.NODE_ENV === 'production';
const PRODUCTION_HOST = process.env.PRODUCTION_HOST ?? 'https://ryza-pw-finder.zeferinix.com';
const LOCAL_HOST = 'http://localhost:3000';
const HOST = isProduction ? PRODUCTION_HOST : LOCAL_HOST;

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  host: HOST,

  public: {
    GQL_HOST: `${HOST}/api/graphql`,
  },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig,

  srcDir: 'src/',

  imports: {
    dirs: ['./store/**', './composables/**'],
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
});

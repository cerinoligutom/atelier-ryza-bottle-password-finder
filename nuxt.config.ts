import type { NuxtConfig } from 'nuxt/config';

const runtimeConfig: NuxtConfig['runtimeConfig'] = {};

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
        url: '/api/graphql',
        schema: './src/server/**/*.graphql',
        codegen: {
          enumValues: '~/enums/index',
          contextType: '~/server/graphql/IGraphQLContext#IGraphQLContext',
        },
      },
    ],
  ],
});

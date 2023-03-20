module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'vue', 'nuxt', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:yml/standard',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
  ],

  ignorePatterns: ['**/*.css'],

  overrides: [
    // Taken from antfu's eslint-config-vue:
    // https://github.com/antfu/eslint-config/blob/9e7ba7b13102a3bf7728628e374383f77f60f741/packages/vue/index.js#L2-L15
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'yml/quotes': 'off',
        'yml/no-empty-mapping-value': 'off',
      },
    },
  ],
};

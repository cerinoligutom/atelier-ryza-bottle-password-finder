<template>
  <button>
    <Icon v-if="mode === 'light'" :size="'24px'" :name="'material-symbols:sunny-outline-rounded'" @click="mode = 'dark'" />
    <Icon v-if="mode === 'dark'" :size="'24px'" :name="'material-symbols:dark-mode-outline-rounded'" @click="mode = 'light'" />
  </button>
</template>

<script lang="ts" setup>
const mode = useColorMode({
  modes: {
    light: '',
    dark: 'mode-dark',
  },
});
</script>

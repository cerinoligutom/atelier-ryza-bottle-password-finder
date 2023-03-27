<template>
  <nav class="container mx-auto flex flex-row h-[54px] items-center justify-between px-[32px] py-[15px] bg-background text-on-background">
    <div class="text-[16px] font-bold">Atelier Ryza: Bottle Password Finder</div>
    <div class="grid grid-flow-col gap-[24px]">
      <ThemeSwitcher />

      <button @click="showInfo = true">
        <Icon :size="'24px'" :name="'material-symbols:info-outline-rounded'" />
      </button>
    </div>
  </nav>

  <template v-if="showInfo">
    <div class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
      <OnClickOutside @trigger="showInfo = false">
        <div class="bg-background p-[24px] rounded border border-border-color text-2xl">
          <p>
            Inspired by
            <span class="underline underline-offset-4">Serity</span>
          </p>
          <p class="mt-[8px]">
            Developed by
            <NuxtLink class="underline underline-offset-4" to="https://zeferinix.com" target="_blank">ZeferiniX</NuxtLink>
          </p>
          <p class="mt-[8px]">
            Designed by
            <span>lingping</span>
          </p>
        </div>
      </OnClickOutside>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';

const showInfo = ref(false);
</script>

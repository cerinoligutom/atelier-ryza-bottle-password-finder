<template>
  <nav class="flex flex-row h-[54px] items-center justify-between px-[32px] py-[15px] bg-background text-on-background">
    <div class="text-[16px] font-bold">Atelier Ryza: Bottle Password Finder</div>
    <div class="grid grid-flow-col gap-[24px]">
      <ThemeSwitcher />

      <button>
        <Icon :size="'24px'" :name="'material-symbols:info-outline-rounded'" />
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped></style>

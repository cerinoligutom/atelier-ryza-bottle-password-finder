<template>
  <div class="relative flex">
    <Icon v-if="iconName" :name="iconName" class="z-[1] absolute self-center ml-[12px]" :size="'24px'" />
    <PVDropdown
      v-model="modelValue"
      v-bind="$attrs"
      :options="options"
      :option-label="optionLabel"
      class="dropdown"
      :class="{ 'dropdown--has-icon': !!iconName }"
    >
      <!-- https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope || {}" />
      </template>
    </PVDropdown>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */

import PVDropdown from 'primevue/dropdown';

interface IProps {
  modelValue?: any;
  options?: any[] | readonly any[];
  optionLabel?: string;
  iconName?: string;
}
const props = defineProps<IProps>();

interface IEmits {
  (e: 'update:modelValue', modelValue: any): void;
}
const emit = defineEmits<IEmits>();

const modelValue = useVModel(props, 'modelValue', emit);
</script>

<style lang="postcss" scoped>
.dropdown {
  @apply form-control;

  :deep(.p-inputtext) {
    @apply rounded-[0] p-0;
  }

  :deep(.p-dropdown-label) {
    @apply py-0 leading-[1.2rem];
  }

  :deep(.p-dropdown-trigger) {
    @apply w-auto ml-[12px] text-on-background;
  }

  &--has-icon {
    :deep(.p-dropdown-label) {
      @apply ml-[32px];
    }
  }
}
</style>

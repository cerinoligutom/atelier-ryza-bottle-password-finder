<template>
  <div class="relative flex">
    <Icon v-if="iconName" :name="iconName" class="absolute self-center ml-[12px]" :size="'24px'" />
    <PVInputNumber
      :model-value="modelValue"
      v-bind="$attrs"
      type="number"
      class="input-number"
      :class="{ 'input-number--has-icon': !!iconName }"
      @input="emit('update:modelValue', $event.value)"
    />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import PVInputNumber from 'primevue/inputnumber';

interface IProps {
  modelValue?: null | number;
  iconName?: string;
}
const props = defineProps<IProps>();

interface IEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const emit = defineEmits<IEmits>();

const modelValue = useVModel(props, 'modelValue', emit);
</script>

<style lang="postcss" scoped>
.input-number {
  :deep(.p-inputnumber-input) {
    @apply form-control;
  }

  &--has-icon {
    :deep(.p-inputnumber-input) {
      @apply pl-[46px];
    }
  }
}
</style>

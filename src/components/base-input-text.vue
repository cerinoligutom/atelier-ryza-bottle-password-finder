<template>
  <div class="relative flex">
    <Icon v-if="iconName" :name="iconName" class="absolute self-center ml-[12px]" :size="'24px'" />
    <PVInputText v-model="modelValue" v-bind="$attrs" type="text" class="input-text" :class="{ 'input-text--has-icon': !!iconName }" />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import PVInputText from 'primevue/inputtext';

interface IProps {
  modelValue?: null | string;
  iconName?: string;
}
const props = defineProps<IProps>();

interface IEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const emit = defineEmits<IEmits>();

const modelValue = useVModel(props, 'modelValue', emit);
</script>

<style lang="postcss" setup>
.input-text {
  @apply form-control;

  &--has-icon {
    @apply pl-[46px];
  }
}
</style>

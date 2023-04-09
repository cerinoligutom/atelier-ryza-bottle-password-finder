<template>
  <Highlighter
    v-if="enable"
    highlight-class-name="font-bold underline bg-highlight-color"
    :text-to-highlight="textToHighlight"
    :search-words="searchWords"
  />
  <span v-else>{{ textToHighlight }}</span>
</template>

<script lang="ts" setup>
import Highlighter from 'vue-highlight-words';

interface IProps {
  modelValue?: null | string;
  textToHighlight: string;
  enable: boolean;
}

const props = defineProps<IProps>();

const searchWords = computed(() => props.modelValue?.split(' ') || []);
</script>

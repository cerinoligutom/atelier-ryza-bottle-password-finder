<template>
  <div class="font-inter">
    <input v-model="variables.input" type="text" />
    <input v-model="variables.levelLimit" type="number" min="1" max="100" />
    <pre>{{ passwordResults }}</pre>
  </div>
</template>

<script lang="ts" setup>
const variables = ref({
  input: 'dunkelheit',
  levelLimit: 65,
});

const { result, loading, onResult } = useFindByItemNameGQL(variables);

const passwordResults = computed(() => result.value?.itemName ?? []);
</script>

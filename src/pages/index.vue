<template>
  <div class="flex flex-col items-center">
    <div class="flex">
      <BaseDropdown
        v-model="findBy"
        :options="FIND_BY_OPTIONS"
        :option-label="'label'"
        :option-value="'value'"
        placeholder="Select a City"
        :icon-name="'material-symbols:magic-button'"
      >
        <template #option="{ option }">
          <div class="grid grid-cols-dropdown-item gap-[8px]">
            <Icon :size="'24px'" :name="option.iconName" />
            <span>{{ option.label }}</span>
            <span>
              <Icon v-if="findBy === option.value" :size="'24px'" name="material-symbols:check-small-rounded" />
            </span>
          </div>
        </template>
      </BaseDropdown>

      <div class="ml-[4px]">
        <BaseInputText v-model="variables.input" />
      </div>

      <div class="ml-[20px]">
        <BaseInputNumber
          v-model="variables.levelLimit"
          :min="1"
          :max="100"
          :use-grouping="false"
          :icon-name="'material-symbols:auto-graph-rounded'"
        />
      </div>
    </div>

    <div class="mt-[40px]">
      <span class="font-semibold text-[12px]">{{ totalResults }} Results</span>

      <div class="mt-[20px]">
        <PVDataTable :value="passwordResults" :loading="loading" :paginator="true" :rows="10">
          <PVColumn field="password" header="PASSWORD">
            <template #body="{ data }">yea? {{ data.password }}</template>
          </PVColumn>
          <PVColumn field="levelEntryAndCost" header="LEVEL & ENTRY COST">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span>Lv. {{ data.level }}</span>
                <span>${{ data.cost }}</span>
              </div>
            </template>
          </PVColumn>
          <PVColumn field="primaryItem.name" header="PRIMARY DROP" />
          <PVColumn field="secondaryItem.name" header="SECONDARY DROP" />
          <PVColumn field="boss" header="LEVEL ENTRY & COST">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span>{{ data.boss.name }}</span>
                <span v-if="data.boss.type !== 'REGULAR'">({{ data.boss.type }})</span>
              </div>
            </template>
          </PVColumn>
          <PVColumn field="monster" header="MONSTER">
            <template #body="{ data }">
              <span>{{ data.monster.name }}</span>
            </template>
          </PVColumn>
          <PVColumn field="mapName" header="MAP" />
        </PVDataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PVDataTable from 'primevue/datatable';
import PVColumn from 'primevue/column';

const FIND_BY_OPTIONS = [
  {
    label: 'Item Name',
    value: 'ITEM_NAME',
    iconName: 'material-symbols:magic-button',
  },
  {
    label: 'Password',
    value: 'PASSWORD',
    iconName: 'material-symbols:password-rounded',
  },

  {
    label: 'Item Name2',
    value: 'ITEM_NAME2',
    iconName: 'material-symbols:magic-button',
  },
  {
    label: 'Password2',
    value: 'PASSWORD2',
    iconName: 'material-symbols:password-rounded',
  },
] as const;

const findBy = ref<(typeof FIND_BY_OPTIONS)[number]['value']>(FIND_BY_OPTIONS[0].value);

const variables = ref({
  input: 'dunkelheit',
  levelLimit: 65,
});

// TODO: Debounced doesn't seem to work as expected when the ref has a complex type.
// https://discord.com/channels/937808017016119440/937969993964978197/1088545905067688037
// const debouncedVariables = refDebounced(variables, 2000);

const findByItemNameGql = computed(() => useFindByItemNameGQL(variables));
const { result, loading } = findByItemNameGql.value;

const passwordResults = computed(() => result.value?.itemName ?? []);
const totalResults = computed(() => passwordResults.value.length);
</script>

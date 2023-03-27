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
        <BaseInputText v-model="input" placeholder="Search" />
      </div>

      <div class="ml-[20px]">
        <BaseInputNumber
          v-model="levelLimit"
          :min="1"
          :max="100"
          :use-grouping="false"
          :icon-name="'material-symbols:auto-graph-rounded'"
          placeholder="Enter level limit (max 100)"
        />
      </div>
    </div>

    <div class="mt-[40px] w-[80%]">
      <span class="font-semibold text-[12px]">{{ totalResults }} Results</span>

      <div class="mt-[20px]">
        <PVDataTable
          :value="passwordResults"
          :loading="loading"
          :paginator="true"
          :rows="10"
          paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          current-page-report-template="{first} to {last} of {totalRecords}"
        >
          <PVColumn field="password" header="PASSWORD">
            <template #body="{ data }">
              <div class="flex flex-row items-center group">
                <span class="font-mono text-password-color text-[20px] mr-[8px]">{{ data.password }}</span>
                <button v-tooltip.top="'Copy password'" class="hidden group-hover:block" @click="copyPassword(data.password)">
                  <Icon :size="'16px'" :name="'material-symbols:file-copy-outline'" />
                </button>
              </div>
            </template>
          </PVColumn>
          <PVColumn field="levelEntryAndCost" header="LEVEL & COST">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span>Lv. {{ data.level }}</span>
                <span class="text-entry-cost-color">${{ data.cost }}</span>
              </div>
            </template>
          </PVColumn>
          <PVColumn field="primaryItem.name" header="PRIMARY DROP" />
          <PVColumn field="secondaryItem.name" header="SECONDARY DROP" />
          <PVColumn field="boss" header="BOSS">
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

const { copy: copyPassword } = useClipboard({ legacy: true });

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
] as const;

const findBy = ref<(typeof FIND_BY_OPTIONS)[number]['value']>(FIND_BY_OPTIONS[0].value);
const input = ref('');
const levelLimit = ref(100);

// TODO: Debounced doesn't seem to work as expected when the ref has a complex type.
// Current workaround is to make individual refDebounced
const debouncedInput = refDebounced(input, 800);
const debouncedLeveLLimit = refDebounced(levelLimit, 800);
const variables = reactive({
  input: debouncedInput,
  levelLimit: debouncedLeveLLimit,
});
watch(findBy, () => {
  input.value = '';
});

const enableFindByItemName = computed(() => findBy.value === 'ITEM_NAME');
const enableFindByPassword = computed(() => findBy.value === 'PASSWORD');

const { result: findByItemNameResult, loading: isLoadingFindByItemNameResult } = useFindByItemNameGQL(variables, enableFindByItemName);
const { result: findByPasswordResult, loading: isLoadingFindByPasswordResult } = useFindByPasswordGQL(variables, enableFindByPassword);

const loading = computed(() => isLoadingFindByItemNameResult.value || isLoadingFindByPasswordResult.value);
const passwordResults = computed(() => {
  if (findBy.value === 'ITEM_NAME') {
    return findByItemNameResult.value?.itemName ?? [];
  } else if (findBy.value === 'PASSWORD') {
    return findByPasswordResult.value?.password ?? [];
  }
  return [];
});
const totalResults = computed(() => passwordResults.value.length);
</script>

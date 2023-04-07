import { QueryBuilder } from './query-builder';

import type { IEnemyData, IFieldMixEnemy, IFieldMixMap, IFieldMixMapInfo } from './types';

export const EnemyDataQB = new QueryBuilder<IEnemyData>([]);
export const FieldMixEnemyQB = new QueryBuilder<IFieldMixEnemy>([]);
export const FieldMixMapQB = new QueryBuilder<IFieldMixMap>([]);
export const FieldMixMapInfoQB = new QueryBuilder<IFieldMixMapInfo>([]);

/**
 * FIXME: Isomorphic fetch against `public/` directory doesn't work.
 *
 * Track at https://github.com/nuxt/nuxt/issues/13857
 *
 * Current workaround is to include the host in the url.
 */
export async function initData() {
  const { host } = useRuntimeConfig();

  // So how did we end up with these bunch of fetches? Things that were attempted:
  // 1. Using the existing Query Builders on the root data directory doesn't work because `__dirname` doesn't exist. Not to mention it's unreliable after bundling.
  // 2. Loading the JSON directly on the root data directory crashes the process and in turn the server for some reason
  // 3. Putting the large object in a separate module and importing it also has the same result as #2.
  // 4. Isolated the issue by making a minimal repro with just Node and the large object being loaded. The process crashes.
  //
  // And finally, here we are, serving the JSON statically and fetching it. It's not ideal but it works and good enough for what we need here.

  return await Promise.all([
    $fetch(`${host}data/enemy_data.json`, {
      onResponse({ response: { _data } }) {
        EnemyDataQB.$setData(_data);
      },
    }).then(() => {
      const EnemyDataQBCount = EnemyDataQB['_data'].length;
      console.log('EnemyData:', EnemyDataQBCount);
      return EnemyDataQBCount;
    }),

    $fetch(`${host}data/FieldMixEnemy.json`, {
      onResponse({ response: { _data } }) {
        FieldMixEnemyQB.$setData(_data);
      },
    }).then(() => {
      const FieldMixEnemyQBCount = FieldMixEnemyQB['_data'].length;
      console.log('FieldMixEnemy:', FieldMixEnemyQBCount);
      return FieldMixEnemyQBCount;
    }),

    $fetch(`${host}data/FieldMixMap.json`, {
      onResponse({ response: { _data } }) {
        FieldMixMapQB.$setData(_data);
      },
    }).then(() => {
      const FieldMixMapQBCount = FieldMixMapQB['_data'].length;
      console.log('FieldMixMap:', FieldMixMapQBCount);
      return FieldMixMapQBCount;
    }),

    $fetch(`${host}data/FieldMixMapInfo.json`, {
      onResponse({ response: { _data } }) {
        FieldMixMapInfoQB.$setData(_data);
      },
    }).then(() => {
      const FieldMixMapInfoQBCount = FieldMixMapInfoQB['_data'].length;
      console.log('FieldMixMapInfo:', FieldMixMapInfoQBCount);
      return FieldMixMapInfoQBCount;
    }),
  ]);
}

export function hasEmptyData() {
  const hasEmpty = [EnemyDataQB, FieldMixEnemyQB, FieldMixMapInfoQB, FieldMixMapQB].some((qb) => qb['_data'].length === 0);

  if (hasEmpty) console.info('Data is empty. Should reinitialize.');

  return hasEmpty;
}

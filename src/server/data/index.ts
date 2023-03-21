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
function initData() {
  const { host } = useRuntimeConfig();

  // So how did we end up with these bunch of fetches? Things that were attempted:
  // 1. Using the existing Query Builders on the root data directory doesn't work because `__dirname` doesn't exist. Not to mention it's unreliable after bundling.
  // 2. Loading the JSON directly on the root data directory crashes the process and in turn the server for some reason
  // 3. Putting the large object in a separate module and importing it also has the same result as #2.
  // 4. Isolated the issue by making a minimal repro with just Node and the large object being loaded. The process crashes.
  //
  // And finally, here we are, serving the JSON statically and fetching it. It's not ideal but it works and good enough for what we need here.

  $fetch(`${host}/data/enemy_data.json`, {
    onResponse({ response: { _data } }) {
      EnemyDataQB.$setData(_data);
      console.log('EnemyData:', EnemyDataQB['_data'].length);
    },
  });
  $fetch(`${host}/data/FieldMixEnemy.json`, {
    onResponse({ response: { _data } }) {
      FieldMixEnemyQB.$setData(_data);
      console.log('FieldMixEnemy:', FieldMixEnemyQB['_data'].length);
    },
  });
  $fetch(`${host}/data/FieldMixMap.json`, {
    onResponse({ response: { _data } }) {
      FieldMixMapQB.$setData(_data);
      console.log('FieldMixMap:', FieldMixMapQB['_data'].length);
    },
  });
  $fetch(`${host}/data/FieldMixMapInfo.json`, {
    onResponse({ response: { _data } }) {
      FieldMixMapInfoQB.$setData(_data);
      console.log('FieldMixMapInfo:', FieldMixMapInfoQB['_data'].length);
    },
  });
}
initData();

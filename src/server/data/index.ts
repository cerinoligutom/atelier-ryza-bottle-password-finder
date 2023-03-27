import { QueryBuilder } from './query-builder';

import type { IEnemyData, IFieldMixEnemy, IFieldMixMap, IFieldMixMapInfo } from './types';

export const EnemyDataQB = new QueryBuilder<IEnemyData>([]);
export const FieldMixEnemyQB = new QueryBuilder<IFieldMixEnemy>([]);
export const FieldMixMapQB = new QueryBuilder<IFieldMixMap>([]);
export const FieldMixMapInfoQB = new QueryBuilder<IFieldMixMapInfo>([]);

setTimeout(() => {
  console.info('initializing');
  $fetch(`/api/init`);
}, 2000);

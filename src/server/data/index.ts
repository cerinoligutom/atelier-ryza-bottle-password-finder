import { QueryBuilder } from '~~/data/_common/query-builder';

import FieldMixMapData from '~~/data/FieldMixMap/FieldMixMap.processed';
import EnemyDataData from '~~/data/enemy_data/enemy_data.processed';
import FieldMixEnemyData from '~~/data/FieldMixEnemy/FieldMixEnemy.processed';
import FieldMixMapInfoData from '~~/data/FieldMixMapInfo/FieldMixMapInfo.processed';

import type { IFieldMixMap } from '~~/data/FieldMixMap';
import type { IEnemyData } from '~~/data/enemy_data';
import type { IFieldMixEnemy } from '~~/data/FieldMixEnemy';
import type { IFieldMixMapInfo } from '~~/data/FieldMixMapInfo';

export const FieldMixMapQB = new QueryBuilder<IFieldMixMap>(FieldMixMapData as IFieldMixMap[]);
export const EnemyDataQB = new QueryBuilder<IEnemyData>(EnemyDataData as IEnemyData[]);
export const FieldMixEnemyQB = new QueryBuilder<IFieldMixEnemy>(FieldMixEnemyData as IFieldMixEnemy[]);
export const FieldMixMapInfoQB = new QueryBuilder<IFieldMixMapInfo>(FieldMixMapInfoData as IFieldMixMapInfo[]);

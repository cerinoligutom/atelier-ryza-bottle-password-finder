import { FieldMixEnemyQB } from '../data';

function getByIds(ids: string[]) {
  return FieldMixEnemyQB.whereIn('no', ids).exec();
}

export const fieldMixEnemyService = { getByIds };

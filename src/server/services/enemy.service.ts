import { EnemyDataQB } from '../data';

function getByIds(ids: string[]) {
  return EnemyDataQB.whereIn('monsterTag', ids).exec();
}

export const enemyService = { getByIds };

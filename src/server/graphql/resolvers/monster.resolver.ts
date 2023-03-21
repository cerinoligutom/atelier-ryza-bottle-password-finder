import { PasswordResultResolvers, PasswordResult, EnemyMonster } from '#graphql/resolver';
import type { IFieldMixMap } from '../../data/types';

export const monsterResolver: PasswordResultResolvers['monster'] = async (parent, args, { loaders }) => {
  const { fieldMixMapInfoNo } = parent as PasswordResult & IFieldMixMap;

  const { fieldMixMapInfoById, enemyById, fieldMixEnemyById } = loaders;

  const fieldMixMapInfo = await fieldMixMapInfoById.load(fieldMixMapInfoNo);

  if (fieldMixMapInfo) {
    const fieldMixEnemy = await fieldMixEnemyById.load(fieldMixMapInfo.enemyId);

    if (fieldMixEnemy) {
      const enemy = await enemyById.load(fieldMixEnemy.monsterTag);

      return {
        name: enemy?.monsterName,
      } as EnemyMonster;
    }
  }

  return null;
};

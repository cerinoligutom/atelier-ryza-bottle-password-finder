import { PasswordResultResolvers, PasswordResult, EnemyBoss } from '#graphql/resolver';
import type { IFieldMixMap } from '~~/data/FieldMixMap';
import { EnemyBossType } from '~/enums/enemy-boss-type.enum';

export const bossResolver: PasswordResultResolvers['boss'] = async (parent, args, { loaders }) => {
  const { fieldMixMapInfoNo, mapName } = parent as PasswordResult & IFieldMixMap;

  const { fieldMixMapInfoById, enemyById, fieldMixEnemyById } = loaders;

  const fieldMixMapInfo = await fieldMixMapInfoById.load(fieldMixMapInfoNo);

  if (fieldMixMapInfo) {
    const fieldMixEnemy = await fieldMixEnemyById.load(fieldMixMapInfo.bossId);

    if (fieldMixEnemy) {
      const enemy = await enemyById.load(fieldMixEnemy.monsterTag);

      let bossType: EnemyBossType;
      switch (mapName.split(' ').pop()) {
        case EnemyBossType.DOMAIN:
          bossType = EnemyBossType.DOMAIN;
          break;

        case EnemyBossType.RAVINE:
          bossType = EnemyBossType.RAVINE;
          break;

        default:
          bossType = EnemyBossType.REGULAR;
      }

      return {
        name: enemy?.monsterName,
        type: bossType,
      } as EnemyBoss;
    }
  }

  return null;
};

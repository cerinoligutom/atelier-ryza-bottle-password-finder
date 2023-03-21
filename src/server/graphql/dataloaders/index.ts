import { enemyByIdLoader } from './enemy-by-id.dataloader';
import { fieldMixMapInfoByIdLoader } from './field-mix-map-info-by-id.dataloader';
import { fieldMixEnemyByIdLoader } from './field-mix-enemy-by-id.dataloader';

export const initLoaders = () => {
  const loaders = {
    enemyById: enemyByIdLoader(),
    fieldMixMapInfoById: fieldMixMapInfoByIdLoader(),
    fieldMixEnemyById: fieldMixEnemyByIdLoader(),
  };

  return loaders;
};

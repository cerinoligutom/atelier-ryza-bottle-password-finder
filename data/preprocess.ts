import {
  preprocessEnemyData,
  preprocessFieldMixCat,
  preprocessFieldMixEnemy,
  preprocessFieldMixMap,
  preprocessFieldMixMapInfo,
  preprocessStrFieldMixMap,
  preprocessStrMonsterName,
} from './index';

const start = async () => {
  await Promise.all([
    preprocessEnemyData(),
    preprocessFieldMixCat(),
    preprocessFieldMixEnemy(),
    preprocessFieldMixMap(),
    preprocessFieldMixMapInfo(),
    preprocessStrFieldMixMap(),
    preprocessStrMonsterName(),
  ]);

  console.info('Preprocessing successful');
};
start();

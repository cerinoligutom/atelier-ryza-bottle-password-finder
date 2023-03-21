export interface IFieldMixMap {
  no: string;
  level: number;
  cost: number;
  password: string;
  fieldMixMapInfoNo: string;
  subItemId: string;
  primaryItemName: string;
  secondaryItemName: string;
  mapName: string;
}

export interface IEnemyData {
  nameId: string;
  monsterTag: string;
  characterTag: string;
  raceTag: string;
  monsterName: string;
}

export interface IFieldMixEnemy {
  no: string;
  monsterTag: string;
  encounterGroupTag: string;
}

export interface IFieldMixMapInfo {
  no: string;
  stringId: string;
  enemyId: string;
  bossId: string;
}

import { preprocessData } from '../_common/preprocessData';
import { getProcessedData } from '../_common/getProcessedData';
import { QueryBuilder } from '../_common/query-builder';

interface IFieldMixMapInfoXML {
  Root: {
    FieldMixMapInfo: Array<{
      $: {
        No: string;
        stringID: string;
        mapPattern: string;
        mapGroup: string;
        element: string;
        collect: string;
        gimmickModel: string;
        enemy: string;
        boss: string;
        point: string;
        sky: string;
      };
    }>;
  };
}

export interface IFieldMixMapInfo {
  no: string;
  stringId: string;
  enemyId: string;
  bossId: string;
}

const FILE_NAME = 'FieldMixMapInfo';

export const preprocessFieldMixMapInfo = async () => {
  return preprocessData<IFieldMixMapInfoXML, IFieldMixMapInfo[]>(FILE_NAME, __dirname, (data) =>
    data.Root.FieldMixMapInfo.map((x) => {
      const { No, stringID, enemy, boss } = x.$;

      const processedData: IFieldMixMapInfo = {
        bossId: boss.replace('FIELD_MIX_ENEMY_', ''), // Remove "FIELD_MIX_ENEMY_" prefix to get the IDs
        enemyId: enemy.replace('FIELD_MIX_ENEMY_', ''), // Remove "FIELD_MIX_ENEMY_" prefix to get the IDs
        no: No,
        stringId: stringID,
      };

      return processedData;
    }),
  );
};

const fieldMixMapInfo = getProcessedData<IFieldMixMapInfo[]>(FILE_NAME, __dirname);
export const qbFieldMixMapInfo = new QueryBuilder<IFieldMixMapInfo>(fieldMixMapInfo);

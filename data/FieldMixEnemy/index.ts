import { preprocessData } from '../_common/preprocessData';
import { getProcessedData } from '../_common/getProcessedData';
import { QueryBuilder } from '../_common/query-builder';

interface IFieldMixEnemyXML {
  Root: {
    FieldMixEnemy: Array<{
      $: {
        No: string;
        enemySymbolTag: string;
        encountGroupTag: string;
      };
    }>;
  };
}

export interface IFieldMixEnemy {
  no: string;
  monsterTag: string;
  encounterGroupTag: string;
}

const FILE_NAME = 'FieldMixEnemy';

export const preprocessFieldMixEnemy = async () => {
  return preprocessData<IFieldMixEnemyXML, IFieldMixEnemy[]>(FILE_NAME, __dirname, (data) =>
    data.Root.FieldMixEnemy.map((x) => {
      const { No, encountGroupTag, enemySymbolTag } = x.$;

      const processedData: IFieldMixEnemy = {
        monsterTag: enemySymbolTag.replace('ENEMY_SYMBOL_FLDMIX_SYMBOL_', 'MONSTER_'), // Replace "ENEMY_SYMBOL_FLDMIX_SYMBOL_" prefix with "MONSTER_" to get the monsterTag
        no: No,
        encounterGroupTag: encountGroupTag,
      };

      return processedData;
    }),
  );
};

const fieldMixEnemy = getProcessedData<IFieldMixEnemy[]>(FILE_NAME, __dirname);
export const qbFieldMixEnemy = new QueryBuilder<IFieldMixEnemy>(fieldMixEnemy);

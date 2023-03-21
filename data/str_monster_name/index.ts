import { preprocessData } from '../_common/preprocessData';
import { getProcessedData } from '../_common/getProcessedData';
import { QueryBuilder } from '../_common/query-builder';

interface IStrMonsterNameXML {
  Root: {
    str: Array<{
      $: {
        String_No: string;
        Text: string;
      };
    }>;
  };
}

export interface IStrMonsterName {
  no: string;
  text: string;
}

const FILE_NAME = 'str_monster_name';

export const preprocessStrMonsterName = async () => {
  return preprocessData<IStrMonsterNameXML, IStrMonsterName[]>(FILE_NAME, __dirname, (data) =>
    data.Root.str.map((x) => {
      const { String_No, Text } = x.$;

      const processedData: IStrMonsterName = {
        no: String_No,
        text: Text,
      };

      return processedData;
    }),
  );
};

const strMonsterName = getProcessedData<IStrMonsterName[]>(FILE_NAME, __dirname);
export const qbStrMonsterName = new QueryBuilder<IStrMonsterName>(strMonsterName);

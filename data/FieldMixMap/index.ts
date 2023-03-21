import { preprocessData } from '../_common/preprocessData';
import { getProcessedData } from '../_common/getProcessedData';
import { QueryBuilder } from '../_common/query-builder';
import { qbStrFieldMixMap } from '../str_field_mix_map';
import { qbSubitems } from '../_subitems';

interface IFieldMixMapXML {
  Root: {
    FieldMixMap: Array<{
      $: {
        No: string;
        l: string; // level
        g: string; // gold/cole cost
        p: string; // password
        i: string; // info (entry in FieldMixMapInfo)
        c: string; // [not used] category (entry in FieldMixCategory)
        s: string; // subitem
      };
    }>;
  };
}

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

const FILE_NAME = 'FieldMixMap';

export const preprocessFieldMixMap = async () => {
  return preprocessData<IFieldMixMapXML, IFieldMixMap[]>(FILE_NAME, __dirname, (data) =>
    data.Root.FieldMixMap.map((x) => {
      const { No, l: level, g: cost, p: password, i: index, s: subItemId } = x.$;

      const { primaryItemName, mapName } = qbStrFieldMixMap.where('index', +index).first();
      const secondaryItemName = qbSubitems.where('id', subItemId).first().name;

      const processedData: IFieldMixMap = {
        password,
        subItemId,
        primaryItemName,
        secondaryItemName,
        mapName,
        no: No,
        level: +level,
        cost: +cost,
        fieldMixMapInfoNo: index,
      };

      return processedData;
    }),
  );
};

const fieldMixMap = getProcessedData<IFieldMixMap[]>(FILE_NAME, __dirname);
export const qbFieldMixMap = new QueryBuilder<IFieldMixMap>(fieldMixMap);

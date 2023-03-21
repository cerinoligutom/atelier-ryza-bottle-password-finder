import { preprocessData } from '../_common/preprocessData';
import { getProcessedData } from '../_common/getProcessedData';
import { QueryBuilder } from '../_common/query-builder';

interface IFieldMixCatXML {
  Root: {
    FieldMixCat: Array<{
      $: {
        No: string;
        category: string;
      };
    }>;
  };
}

export interface IFieldMixCat {
  no: string;
  category: string;
}

const FILE_NAME = 'FieldMixCat';

export const preprocessFieldMixCat = async () => {
  return preprocessData<IFieldMixCatXML, IFieldMixCat[]>(FILE_NAME, __dirname, (data) =>
    data.Root.FieldMixCat.map((x) => {
      const { No, category } = x.$;

      const processedData: IFieldMixCat = {
        category,
        no: No,
      };

      return processedData;
    }),
  );
};

const fieldMixCat = getProcessedData<IFieldMixCat[]>(FILE_NAME, __dirname);
export const qbFieldMixCat = new QueryBuilder<IFieldMixCat>(fieldMixCat);

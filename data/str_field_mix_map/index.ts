import { preprocessData } from '../_common/preprocessData';
import { getProcessedData } from '../_common/getProcessedData';
import { QueryBuilder } from '../_common/query-builder';
import { MAP_SUFFIXES } from './map-suffixes';
import { NAME_FIXES } from './name-fixes';

interface IStrFieldMixMapXML {
  Root: {
    str: Array<{
      $: {
        String_No: string;
        Text: string;
      };
    }>;
  };
}

export interface IStrFieldMixMap {
  no: string;
  mapName: string;
  primaryItemName: string;
}

const FILE_NAME = 'str_field_mix_map';

export const preprocessStrFieldMixMap = async () => {
  return preprocessData<IStrFieldMixMapXML, IStrFieldMixMap[]>(FILE_NAME, __dirname, (data) =>
    data.Root.str.map((x) => {
      const { String_No, Text } = x.$;

      // Handle mapName
      let mapName = Text;
      mapName = mapName.replace('^00', ''); // Remove ^00
      mapName = mapName.endsWith('Ravin') ? mapName.replace('Ravin', 'Ravine') : mapName;

      // Apparently, the "areaName" value contains both the item and map type.
      // We'll have to split this, the pattern is consistent with "Primary Item" + "Map Type".
      // A list of suffixes (map type) is hard-coded to aid with this.

      // Handle primaryItemName
      let primaryItemName = mapName;
      for (const suffix of MAP_SUFFIXES) {
        if (primaryItemName.endsWith(suffix)) {
          primaryItemName = primaryItemName.replace(suffix, '').trim();
          break;
        }
      }
      primaryItemName = NAME_FIXES[primaryItemName] ? NAME_FIXES[primaryItemName] : primaryItemName;

      const processedData: IStrFieldMixMap = {
        mapName,
        primaryItemName,
        no: String_No,
      };

      return processedData;
    }),
  );
};

const strFieldMixMap = getProcessedData<IStrFieldMixMap[]>(FILE_NAME, __dirname);
export const qbStrFieldMixMap = new QueryBuilder<IStrFieldMixMap>(strFieldMixMap);

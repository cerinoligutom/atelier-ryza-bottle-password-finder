import { FieldMixMapInfoQB } from '../data';

function getByIds(fieldMixMapInfoIds: string[]) {
  return FieldMixMapInfoQB.whereIn('no', fieldMixMapInfoIds).exec();
}

export const fieldMixMapInfoService = { getByIds };

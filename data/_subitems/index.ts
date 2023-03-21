// https://docs.google.com/spreadsheets/d/11kUPrcjhh99UL2nyZmfzzsISF67ZKmhdCaslAFkIHVA
// Credits to Serity and Aeris for the hardwork

import { QueryBuilder } from '../_common/query-builder';
import subitemsJson from './subitems.json';

export interface ISubItemRaw {
  level: string;
  areaName: string;
  password: string;
  id: string;
  name: string;
}

const subItems: ISubItemRaw[] = subitemsJson;
export const qbSubitems = new QueryBuilder(subItems);

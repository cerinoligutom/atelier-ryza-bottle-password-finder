import { FieldMixMapQB } from '../data';
import { orderBy } from 'natural-orderby';
import { OrderByDirection } from '~/enums';
import { uniqBy } from 'lodash-es';

function findByName(name: string, levelLimit = 100) {
  const primaryItemResults = FieldMixMapQB.like('primaryItemName', name)
    .lessThan('level', levelLimit + 1)
    .exec();

  const secondaryItemResults = FieldMixMapQB.like('secondaryItemName', name)
    .lessThan('level', levelLimit + 1)
    .exec();

  let results = [...primaryItemResults, ...secondaryItemResults];
  results = uniqBy(results, 'password');
  results = orderBy(results, [(v) => v.level, (v) => v.cost], [OrderByDirection.DESC, OrderByDirection.DESC]);
  return results;
}

export const itemDropsService = { findByName };

import { PasswordResultResolvers, PasswordResult, ItemDrop } from '#graphql/resolver';
import type { IFieldMixMap } from '../../data/types';

export const secondaryItemResolver: PasswordResultResolvers['secondaryItem'] = async (parent) => {
  const { secondaryItemName } = parent as PasswordResult & IFieldMixMap;

  return {
    name: secondaryItemName,
  } as ItemDrop;
};

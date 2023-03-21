import { PasswordResultResolvers, PasswordResult, ItemDrop } from '#graphql/resolver';
import type { IFieldMixMap } from '~~/data/FieldMixMap';

export const primaryItemResolver: PasswordResultResolvers['primaryItem'] = async (parent) => {
  const { primaryItemName } = parent as PasswordResult & IFieldMixMap;

  return {
    name: primaryItemName,
  } as ItemDrop;
};

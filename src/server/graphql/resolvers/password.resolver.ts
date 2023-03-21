import { QueryResolvers, PasswordResult } from '#graphql/resolver';
import type { IFieldMixMap } from '../../data/types';
import { bottlePasswordsService } from '../../services';

export const passwordResolver: QueryResolvers['password'] = async (_, { input, levelLimit }) => {
  const results = bottlePasswordsService.getByPassword(input, levelLimit);

  return results as (PasswordResult & IFieldMixMap)[];
};

import { QueryResolvers, PasswordResult } from '#graphql/resolver';
import type { IFieldMixMap } from '../../data/types';
import { bottlePasswordsService } from '../../services';
import { z } from 'zod';

const schema = z.object({
  input: z.string().trim(),
  levelLimit: z.number().min(1).optional(),
});

export const passwordResolver: QueryResolvers['password'] = async (_, args) => {
  const { input, levelLimit } = schema.parse(args);

  if (!input) return [];

  const results = await bottlePasswordsService.getByPassword(input, levelLimit);

  return results as (PasswordResult & IFieldMixMap)[];
};

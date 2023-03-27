import { QueryResolvers } from '#graphql/resolver';
import { itemDropsService } from '../../services';
import { z } from 'zod';

const schema = z.object({
  input: z.string().trim(),
  levelLimit: z.number().min(1).optional(),
});

export const itemNameResolver: QueryResolvers['itemName'] = async (_, args) => {
  const { input, levelLimit } = schema.parse(args);

  if (!input) return [];

  const results = await itemDropsService.findByName(input, levelLimit);

  return results;
};

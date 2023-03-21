import { QueryResolvers } from '#graphql/resolver';
import { itemDropsService } from '../../services';

export const itemNameResolver: QueryResolvers['itemName'] = async (_, { input, levelLimit }) => {
  const results = itemDropsService.findByName(input, levelLimit);

  return results;
};

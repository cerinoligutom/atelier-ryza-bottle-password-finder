import { fieldMixEnemyService } from '../../services';
import { createDataLoader } from '~/utils/create-dataloader.util';

export const fieldMixEnemyByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const results = fieldMixEnemyService.getByIds(ids);

    return ids.map((id) => results.find((result) => result.no === id) || null);
  });
};

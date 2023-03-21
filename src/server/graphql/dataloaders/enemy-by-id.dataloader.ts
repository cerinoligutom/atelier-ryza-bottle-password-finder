import { enemyService } from '../../services';
import { createDataLoader } from '~/utils/create-dataloader.util';

export const enemyByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const results = enemyService.getByIds(ids);

    return ids.map((id) => results.find((result) => result.monsterTag === id) || null);
  });
};

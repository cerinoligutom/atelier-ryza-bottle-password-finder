import { enemyService } from '../../services';

export const enemyByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const results = enemyService.getByIds(ids);

    return ids.map((id) => results.find((result) => result.monsterTag === id) || null);
  });
};

import { fieldMixEnemyService } from '../../services';

export const fieldMixEnemyByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const results = fieldMixEnemyService.getByIds(ids);

    return ids.map((id) => results.find((result) => result.no === id) || null);
  });
};

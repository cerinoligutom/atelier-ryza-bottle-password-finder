import { fieldMixMapInfoService } from '../../services';

export const fieldMixMapInfoByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const results = fieldMixMapInfoService.getByIds(ids);

    return ids.map((id) => results.find((result) => result.no === id) || null);
  });
};

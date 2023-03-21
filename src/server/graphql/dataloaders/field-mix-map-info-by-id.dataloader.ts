import { fieldMixMapInfoService } from '../../services';
import { createDataLoader } from '~/utils/create-dataloader.util';

export const fieldMixMapInfoByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const results = fieldMixMapInfoService.getByIds(ids);

    return ids.map((id) => results.find((result) => result.no === id) || null);
  });
};

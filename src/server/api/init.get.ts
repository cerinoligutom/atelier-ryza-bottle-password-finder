import { initData } from '../data';

export default defineEventHandler(async () => {
  return await initData();
});

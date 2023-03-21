import { xml2json } from './xml2json';
import { writeProcessedData } from './writeProcessedData';

export const preprocessData = async <T, R>(fileName: string, filePath: string, cb: (jsonData: T) => R): Promise<R> => {
  const jsonData = await xml2json<T>(fileName, filePath);
  const processedData = cb(jsonData);

  return writeProcessedData(fileName, filePath, processedData);
};

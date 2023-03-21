import fs from 'fs';

export const writeProcessedData = async <T>(fileName: string, filePath: string, processedData: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    const FILE_PATH_TS = `${filePath}/${fileName}.processed.ts`; // For app consumption
    const FILE_PATH_JSON = `${filePath}/${fileName}.processed.json`; // For preprocessing

    fs.writeFile(FILE_PATH_JSON, JSON.stringify(processedData, null, 2), (err) => {
      if (err) {
        console.error(`Error writing "${FILE_PATH_JSON}"`);
        reject(err);
        return;
      }

      console.info(`Successfully written ${FILE_PATH_JSON}`);

      resolve(processedData);
    });

    fs.writeFile(FILE_PATH_TS, `export default ${JSON.stringify(processedData, null, 2)}`, (err) => {
      if (err) {
        console.error(`Error writing "${FILE_PATH_TS}"`);
        reject(err);
        return;
      }

      console.info(`Successfully written ${FILE_PATH_TS}`);

      resolve(processedData);
    });
  });
};

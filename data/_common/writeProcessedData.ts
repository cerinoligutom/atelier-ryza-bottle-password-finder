import fs from 'fs';

export const writeProcessedData = async <T>(fileName: string, filePath: string, processedData: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    const FILE_PATH = `${filePath}/${fileName}_processed.json`;

    fs.writeFile(FILE_PATH, JSON.stringify(processedData, null, 2), (err) => {
      if (err) {
        console.error(`Error writing "${FILE_PATH}"`);
        reject(err);
        return;
      }

      console.info(`Successfully written ${FILE_PATH}`);

      resolve(processedData);
    });
  });
};

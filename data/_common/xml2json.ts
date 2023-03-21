import xml2js from 'xml2js';
import fs from 'fs';

export const xml2json = async <T>(fileName: string, filePath: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    const FILE_PATH_XML = `${filePath}/${fileName}.xml`;
    const FILE_PATH_JSON = `${filePath}/${fileName}.json`;

    const parser = new xml2js.Parser();
    fs.readFile(FILE_PATH_XML, async (readErr, buffer) => {
      if (readErr) {
        console.error(`Error reading "${FILE_PATH_XML}"`);
        reject(readErr);
        return;
      }

      const data = await parser.parseStringPromise(buffer);
      fs.writeFile(FILE_PATH_JSON, JSON.stringify(data, null, 2), (writeErr) => {
        if (writeErr) {
          console.error(`Error writing "${FILE_PATH_XML}"`);
          reject(writeErr);
          return;
        }
        resolve(data);
      });
    });
  });
};

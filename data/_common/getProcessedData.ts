import fs from 'fs';

// This is expected to error if the file doesn't exist. It shouldn't happen as the file should've been available already upon preprocessing.
export const getProcessedData = <T>(fileName: string, filePath: string): T => {
  let data = '[]';

  try {
    data = fs.readFileSync(`${filePath}/${fileName}_processed.json`, 'utf8');
  } catch {
    console.error(`Failed to read ${fileName}_processed.json`);
  }
  return JSON.parse(data);
};

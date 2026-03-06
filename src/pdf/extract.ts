import pdf from 'pdf-parse';
import fs from 'fs';

export async function extractText(filePath: string) {
  const buffer = fs.readFileSync(filePath);

  const data = await pdf(buffer);

  return data.text;
}

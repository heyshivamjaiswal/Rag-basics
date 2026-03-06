import { chunking } from '../chunk/chunkText';
import { hfEmbed } from '../embeddings/embed';
import { extractText } from '../pdf/extract';
import { storeChunk } from '../vector/storeChunk';

export async function ingestionBook(filePath: string) {
  const text = await extractText(filePath);

  const chunks = await chunking(text);

  const embeddings: number[][] = [];

  for (const chunk of chunks) {
    const vector = await hfEmbed(chunk);
    embeddings.push(vector);
  }

  await storeChunk(chunks, embeddings);
}

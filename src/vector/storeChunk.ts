import { pinecone } from './pinecone';

const index = pinecone.Index('books');

export async function storeChunk(chunks: string[], embeddings: number[][]) {
  const vectors = chunks.map((chunk, i) => ({
    id: `chunk-${Date.now()}-${i}`,
    values: embeddings[i],
    metadata: {
      text: chunk,
      chunkId: i,
    },
  }));

  await index.upsert({
    records: vectors,
  });
}

import { pinecone } from './pinecone';

export async function initialIndex() {
  const indexName = 'books';

  const indexes = await pinecone.listIndexes();

  const exists = indexes.indexes?.find((i) => i.name === indexName);

  if (!exists) {
    await pinecone.createIndex({
      name: indexName,
      dimension: 386,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });
    console.log('Pinecone index created');
  }
}

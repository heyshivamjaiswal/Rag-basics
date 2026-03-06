import { hfEmbed } from '../embeddings/embed';
import { buildContext } from '../llm/contextBuild';
import { generatesAnswer } from '../llm/generateAnswer';
import { pinecone } from '../vector/pinecone';

const index = pinecone.Index('books');

export async function search(question: string) {
  const queryEmbedding = await hfEmbed(question);

  const results = await index.query({
    vector: queryEmbedding,
    topK: 8,
    includeMetadata: true,
  });

  const context = buildContext(results.matches || []);

  const answer = await generatesAnswer(context, question);

  return answer;
}

import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_API_KEY);

export async function hfEmbed(text: string): Promise<number[]> {
  const embedding = await hf.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: text,
  });

  return embedding as number[];
}

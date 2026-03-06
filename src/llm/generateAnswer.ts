import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generatesAnswer(context: string, question: string) {
  const prompt = `
You are a helpful assistant.

Answer the question ONLY using the context below.
If the answer is not in the context, say "The document does not contain this information."

Context:
${context}

Question:
${question}
`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}

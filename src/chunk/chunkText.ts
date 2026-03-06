export async function chunking(text: string) {
  const chunkSize = 400;
  const overlap = 50;

  const chunks: string[] = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

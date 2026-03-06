export function buildContext(results: any[]) {
  const context = results.map((r) => r.metadata?.text).join('\n\n');

  return context;
}

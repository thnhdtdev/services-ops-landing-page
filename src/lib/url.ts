export function httpUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    return ["https:", "http:"].includes(url.protocol)
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

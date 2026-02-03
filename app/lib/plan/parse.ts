export function extractJsonBlock(source: string) {
  const firstCurly = source.indexOf("{");
  const firstBracket = source.indexOf("[");
  const candidates = [firstCurly, firstBracket].filter((value) => value >= 0);
  if (candidates.length === 0) return null;
  const start = Math.min(...candidates);

  const lastCurly = source.lastIndexOf("}");
  const lastBracket = source.lastIndexOf("]");
  const end = Math.max(lastCurly, lastBracket);
  if (end <= start) return null;

  return source.slice(start, end + 1);
}

export function parseJsonFromText(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("Plan input is empty.");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const extracted = extractJsonBlock(trimmed);
    if (!extracted) {
      throw new Error("No JSON block found in the plan input.");
    }
    return JSON.parse(extracted);
  }
}

export function toNumber(value: unknown) {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function formatCount(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}b`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return `${Math.round(value)}`;
}

export function formatMs(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  if (value >= 1000) return `${(value / 1000).toFixed(2)}s`;
  if (value >= 100) return `${value.toFixed(0)}ms`;
  if (value >= 10) return `${value.toFixed(1)}ms`;
  return `${value.toFixed(2)}ms`;
}

export function formatBytes(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}GB`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}MB`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}kB`;
  return `${Math.round(value)}B`;
}

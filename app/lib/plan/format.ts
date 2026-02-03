const countFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
  useGrouping: true,
});

export function formatCount(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  return countFormatter.format(value);
}

export function formatMs(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  if (value === 0) return "0.00ms";
  if (value >= 1000) return `${(value / 1000).toFixed(2)}s`;
  if (value >= 100) return `${value.toFixed(0)}ms`;
  if (value >= 10) return `${value.toFixed(1)}ms`;
  if (value >= 1) return `${value.toFixed(2)}ms`;
  if (value >= 0.1) return `${value.toFixed(3)}ms`;
  return `${value.toFixed(4)}ms`;
}

export function formatBytes(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  if (value === 0) return "0B";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}GB`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}MB`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}kB`;
  if (Number.isInteger(value)) return `${value}B`;
  return `${value.toFixed(2)}B`;
}

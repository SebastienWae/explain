import type { NormalizedPlanGraph, NormalizedPlanNode, PlanEdge, PlanMetrics, PlanStats } from "@/lib/plan/normalize";
import { parseJsonFromText, toNumber } from "@/lib/plan/parse";
import { buildDuckdbWarnings } from "@/lib/plan/warnings";

function toMs(value?: number) {
  if (value === undefined) return undefined;
  return value * 1000;
}

function normalizeOperatorName(node: Record<string, unknown>) {
  const operatorName = node.operator_name;
  const operatorType = node.operator_type;
  if (typeof operatorName === "string" && operatorName.trim()) return operatorName.trim();
  if (typeof operatorType === "string" && operatorType.trim()) return operatorType.trim();
  return "Operator";
}

function formatDuckdbLabel(nodeType: string, node: Record<string, unknown>) {
  const extraInfo = node.extra_info as Record<string, unknown> | undefined;
  const tableName = extraInfo?.Table as string | undefined;
  if (tableName) return `${nodeType} (${tableName})`;
  return nodeType;
}

function formatDetailValue(value: unknown) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) {
    const filtered = value.map((item) => String(item)).filter(Boolean);
    return filtered.length ? filtered.join(", ") : undefined;
  }
  const text = String(value);
  return text.trim() ? text : undefined;
}

function formatDuckdbDetail(node: Record<string, unknown>) {
  const extraInfo = node.extra_info as Record<string, unknown> | undefined;
  if (!extraInfo) return undefined;

  const orderBy = formatDetailValue(extraInfo["Order By"]);
  if (orderBy) return `by ${orderBy}`;

  const conditions = formatDetailValue(extraInfo.Conditions);
  if (conditions) return `on ${conditions}`;

  const filters = formatDetailValue(extraInfo.Filters ?? extraInfo.Filter);
  if (filters) return `filter ${filters}`;

  return undefined;
}

export function parseDuckdbPlan(rawPlan: string): NormalizedPlanGraph {
  const json = parseJsonFromText(rawPlan);
  const root = Array.isArray(json) ? json[0] : json;
  if (!root || typeof root !== "object") {
    throw new Error("DuckDB plan is empty or invalid.");
  }

  const rootRecord = root as Record<string, unknown>;
  const planStats = rootRecord.planStats as Record<string, unknown> | undefined;
  const stats: PlanStats = {
    executionTimeMs: toMs(
      toNumber(planStats?.executionTime) ??
        toNumber(rootRecord.executionTime) ??
        toNumber(rootRecord.latency) ??
        toNumber(rootRecord.cpu_time),
    ),
  };

  const nodes: NormalizedPlanNode[] = [];
  const edges: PlanEdge[] = [];
  const cteGroups: Record<string, string[]> = {};
  let counter = 0;

  const visit = (node: Record<string, unknown>, parentId?: string): { id: string } => {
    const id = `duck-${counter++}`;
    const nodeType = normalizeOperatorName(node);
    const label = formatDuckdbLabel(nodeType, node);

    const extraInfo = node.extra_info as Record<string, unknown> | undefined;
    const estimated = extraInfo?.["Estimated Cardinality"];

    const operatorTiming = toMs(toNumber(node.operator_timing));
    const operatorRows = toNumber(node.operator_cardinality);
    const operatorRowsScanned = toNumber(node.operator_rows_scanned);
    const resultSize = toNumber(node.result_set_size);
    const planRows = toNumber(estimated);

    const metrics: PlanMetrics = {
      exclusiveTimeMs: operatorTiming,
      totalTimeMs: operatorTiming,
      actualRows: operatorRows,
      planRows,
      resultSize,
      bufferBytes: resultSize,
      rowsScanned: operatorRowsScanned,
    };

    const normalized: NormalizedPlanNode = {
      id,
      type: nodeType,
      label,
      detail: formatDuckdbDetail(node),
      db: "duckdb",
      metrics,
      warnings: [],
      raw: node,
      parentId,
    };

    nodes.push(normalized);

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        rows: operatorRows ?? planRows,
      });
    }

    const children = Array.isArray(node.children) ? (node.children as Record<string, unknown>[]) : [];
    for (const child of children) {
      visit(child, id);
    }

    return { id };
  };

  const hasOperator = typeof rootRecord.operator_name === "string" || typeof rootRecord.operator_type === "string";
  if (hasOperator) {
    visit(rootRecord);
  } else if (Array.isArray(rootRecord.children)) {
    for (const child of rootRecord.children as Record<string, unknown>[]) {
      visit(child);
    }
  } else {
    throw new Error("DuckDB plan does not contain operator nodes.");
  }

  const maxRows = Math.max(0, ...nodes.map((node) => node.metrics.actualRows ?? 0));
  const maxRowsScanned = Math.max(0, ...nodes.map((node) => node.metrics.rowsScanned ?? 0));
  const maxResultSize = Math.max(0, ...nodes.map((node) => node.metrics.resultSize ?? 0));
  const maxEstimatedRows = Math.max(0, ...nodes.map((node) => node.metrics.planRows ?? 0));
  const maxDuration = Math.max(0, ...nodes.map((node) => node.metrics.exclusiveTimeMs ?? 0));

  stats.maxRows = maxRows || undefined;
  stats.maxRowsScanned = maxRowsScanned || undefined;
  stats.maxResultSize = maxResultSize || undefined;
  stats.maxEstimatedRows = maxEstimatedRows || undefined;
  stats.maxDuration = maxDuration || undefined;

  for (const node of nodes) {
    node.warnings = buildDuckdbWarnings(node.metrics, stats);
  }

  return {
    nodes,
    edges,
    cteGroups,
    stats,
    db: "duckdb",
  };
}

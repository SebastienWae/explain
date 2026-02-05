import type { NormalizedPlanGraph, NormalizedPlanNode, PlanEdge, PlanMetrics, PlanStats } from "@/lib/plan/normalize";
import { parseJsonFromText, toNumber } from "@/lib/plan/parse";
import { buildPostgresWarnings } from "@/lib/plan/warnings";

const NODE_TYPE_LABELS: Record<string, string> = {
  "Seq Scan": "Seq Scan",
  "Index Scan": "Index Scan",
  "Index Only Scan": "Index Only Scan",
  "CTE Scan": "CTE Scan",
  "Nested Loop": "Nested Loop",
  "Hash Join": "Hash Join",
  "Merge Join": "Merge Join",
};

function normalizeNodeType(value: unknown) {
  if (typeof value === "string" && value.trim()) return value.trim();
  return "Plan Node";
}

function formatPostgresLabel(nodeType: string, node: Record<string, unknown>) {
  const relation = (node["Relation Name"] as string | undefined) ?? (node.Alias as string | undefined);
  const indexName = node["Index Name"] as string | undefined;
  const functionName = node["Function Name"] as string | undefined;
  const cteName = node["CTE Name"] as string | undefined;

  if (nodeType === "CTE Scan" && cteName) {
    return `${nodeType} (${cteName})`;
  }
  if (indexName) {
    return `${nodeType} (${indexName})`;
  }
  if (relation) {
    return `${nodeType} (${relation})`;
  }
  if (functionName) {
    return `${nodeType} (${functionName})`;
  }
  return NODE_TYPE_LABELS[nodeType] ?? nodeType;
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

function formatPostgresDetail(node: Record<string, unknown>) {
  const sortKey = formatDetailValue(node["Sort Key"]);
  if (sortKey) return `by ${sortKey}`;

  const groupKey = formatDetailValue(node["Group Key"]);
  if (groupKey) return `group by ${groupKey}`;

  const hashCond = formatDetailValue(node["Hash Cond"]);
  if (hashCond) return `on ${hashCond}`;

  const mergeCond = formatDetailValue(node["Merge Cond"]);
  if (mergeCond) return `on ${mergeCond}`;

  const joinFilter = formatDetailValue(node["Join Filter"]);
  if (joinFilter) return `on ${joinFilter}`;

  const indexCond = formatDetailValue(node["Index Cond"]);
  if (indexCond) return `filter ${indexCond}`;

  const recheckCond = formatDetailValue(node["Recheck Cond"]);
  if (recheckCond) return `filter ${recheckCond}`;

  const filter = formatDetailValue(node.Filter);
  if (filter) return `filter ${filter}`;

  return undefined;
}

function extractCteDefinition(node: Record<string, unknown>) {
  const subplan = node["Subplan Name"];
  const parentRelationship = node["Parent Relationship"];
  if (typeof subplan === "string" && subplan.startsWith("CTE ") && parentRelationship === "InitPlan") {
    return subplan.slice(4).trim();
  }
  return undefined;
}

function extractCteReference(node: Record<string, unknown>) {
  const cteName = node["CTE Name"];
  if (typeof cteName === "string" && cteName.trim()) return cteName.trim();
  return undefined;
}

function computeEstimateFactor(actualRows?: number, planRows?: number) {
  if (actualRows === undefined || planRows === undefined) return undefined;
  if (actualRows === 0 && planRows === 0) return undefined;
  if (actualRows === 0 || planRows === 0) return Number.POSITIVE_INFINITY;
  if (actualRows >= planRows) return actualRows / planRows;
  return planRows / actualRows;
}

const BUFFER_BLOCK_KEYS = [
  "Shared Hit Blocks",
  "Shared Read Blocks",
  "Shared Dirtied Blocks",
  "Shared Written Blocks",
  "Local Hit Blocks",
  "Local Read Blocks",
  "Local Dirtied Blocks",
  "Local Written Blocks",
  "Temp Read Blocks",
  "Temp Written Blocks",
] as const;

const POSTGRES_BLOCK_BYTES = 8192;

function sumBufferBlocks(node: Record<string, unknown>) {
  let total = 0;
  let hasValue = false;
  for (const key of BUFFER_BLOCK_KEYS) {
    const value = toNumber(node[key]);
    if (value !== undefined) {
      total += value;
      hasValue = true;
    }
  }
  return hasValue ? total : undefined;
}

function isInitPlan(child: Record<string, unknown>) {
  const relationship = child["Parent Relationship"];
  if (typeof relationship !== "string") return false;
  return relationship === "InitPlan" || relationship === "SubPlan";
}

export function parsePostgresPlan(rawPlan: string): NormalizedPlanGraph {
  const json = parseJsonFromText(rawPlan);
  const root = Array.isArray(json) ? json[0] : json;
  if (!root || typeof root !== "object") {
    throw new Error("PostgreSQL plan is empty or invalid.");
  }

  const planRoot = (root as Record<string, unknown>).Plan ?? root;
  if (!planRoot || typeof planRoot !== "object") {
    throw new Error("PostgreSQL plan does not contain a Plan object.");
  }

  const stats: PlanStats = {
    executionTimeMs: toNumber((root as Record<string, unknown>)["Execution Time"]),
    planningTimeMs: toNumber((root as Record<string, unknown>)["Planning Time"]),
  };

  const nodes: NormalizedPlanNode[] = [];
  const edges: PlanEdge[] = [];
  const cteGroups: Record<string, string[]> = {};
  const cteDefinitions = new Map<string, string>();
  const cteReferences: Array<{ id: string; name: string }> = [];
  let counter = 0;

  const visit = (
    node: Record<string, unknown>,
    parentId?: string,
    cteContext?: string,
  ): { id: string; totalTimeMs?: number; totalCost?: number; totalBufferBlocks?: number } => {
    const id = `pg-${counter++}`;
    const nodeType = normalizeNodeType(node["Node Type"]);
    const label = formatPostgresLabel(nodeType, node);

    const loops = toNumber(node["Actual Loops"]) ?? 1;
    const workersLaunched =
      toNumber(node["Workers Launched"] ?? node["Workers Launched By Gather"] ?? node["Workers Launched by Gather"]) ??
      0;
    const workerDivisor = workersLaunched + 1;

    const totalTimeRaw = toNumber(node["Actual Total Time"]);
    const startupTimeRaw = toNumber(node["Actual Startup Time"]);
    const totalTimeMs = totalTimeRaw !== undefined ? (totalTimeRaw * loops) / workerDivisor : undefined;
    const startupTimeMs = startupTimeRaw !== undefined ? (startupTimeRaw * loops) / workerDivisor : undefined;
    const totalBufferBlocks = sumBufferBlocks(node);

    const actualRowsRaw = toNumber(node["Actual Rows"]);
    const planRowsRaw = toNumber(node["Plan Rows"]);
    const actualRows = actualRowsRaw !== undefined ? actualRowsRaw * loops : undefined;
    const planRows = planRowsRaw !== undefined ? planRowsRaw * loops : undefined;

    const rowsRemovedFilter = toNumber(node["Rows Removed by Filter"]) ?? 0;
    const rowsRemovedJoin = toNumber(node["Rows Removed by Join Filter"]) ?? 0;
    const rowsRemovedRecheck = toNumber(node["Rows Removed by Index Recheck"]) ?? 0;
    const rowsRemoved = rowsRemovedFilter + rowsRemovedJoin + rowsRemovedRecheck || undefined;
    const rowsRemovedRatio =
      rowsRemoved !== undefined && actualRows !== undefined && actualRows + rowsRemoved > 0
        ? (rowsRemoved / (rowsRemoved + actualRows)) * 100
        : undefined;

    const heapFetches = toNumber(node["Heap Fetches"]);
    const totalCost = toNumber(node["Total Cost"]);
    const estimateFactor = computeEstimateFactor(actualRows, planRows);

    const cteDefinition = extractCteDefinition(node);
    const cteReference = extractCteReference(node);
    if (cteDefinition && !cteDefinitions.has(cteDefinition)) {
      cteDefinitions.set(cteDefinition, id);
    }
    if (cteReference) {
      cteReferences.push({ id, name: cteReference });
    }
    const nextCteContext = cteDefinition ?? cteContext;

    const children = Array.isArray(node.Plans) ? (node.Plans as Record<string, unknown>[]) : [];
    const childSummaries = children.map((child) => visit(child, id, nextCteContext));

    let childTimeSum = 0;
    let childCostSum = 0;
    let childBufferSum = 0;
    for (const [index, childSummary] of childSummaries.entries()) {
      const child = children[index];
      if (!child) continue;
      const excludeInitPlan = isInitPlan(child) && nodeType !== "Result";
      if (!excludeInitPlan && childSummary.totalTimeMs !== undefined) {
        childTimeSum += childSummary.totalTimeMs;
      }
      if (!excludeInitPlan && childSummary.totalCost !== undefined) {
        childCostSum += childSummary.totalCost;
      }
      if (!excludeInitPlan && childSummary.totalBufferBlocks !== undefined) {
        childBufferSum += childSummary.totalBufferBlocks;
      }
    }

    const exclusiveTimeMs = totalTimeMs !== undefined ? Math.max(0, totalTimeMs - childTimeSum) : undefined;
    const exclusiveCost = totalCost !== undefined ? Math.max(0, totalCost - childCostSum) : undefined;
    const exclusiveBufferBlocks =
      totalBufferBlocks !== undefined ? Math.max(0, totalBufferBlocks - childBufferSum) : undefined;

    const metrics: PlanMetrics = {
      exclusiveTimeMs,
      totalTimeMs: totalTimeMs ?? startupTimeMs,
      actualRows,
      planRows,
      rowsRemoved,
      rowsRemovedRatio,
      heapFetches,
      bufferBytes: exclusiveBufferBlocks !== undefined ? exclusiveBufferBlocks * POSTGRES_BLOCK_BYTES : undefined,
      cost: exclusiveCost,
      totalCost,
      estimateFactor,
    };

    const normalized: NormalizedPlanNode = {
      id,
      type: nodeType,
      label,
      detail: formatPostgresDetail(node),
      db: "postgresql",
      metrics,
      warnings: [],
      raw: node,
      cteGroup: nextCteContext,
      cteReference,
      parentId,
    };

    nodes.push(normalized);
    if (nextCteContext) {
      if (!cteGroups[nextCteContext]) cteGroups[nextCteContext] = [];
      cteGroups[nextCteContext].push(id);
    }

    if (parentId && !cteDefinition) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        rows: actualRows ?? planRows,
        rowsRemovedRatio,
      });
    }

    return { id, totalTimeMs, totalCost, totalBufferBlocks };
  };

  visit(planRoot as Record<string, unknown>);

  for (const reference of cteReferences) {
    const targetId = cteDefinitions.get(reference.name) ?? cteGroups[reference.name]?.[0];
    if (!targetId || targetId === reference.id) continue;
    edges.push({
      id: `e-cte-${reference.id}-${targetId}`,
      source: reference.id,
      target: targetId,
      kind: "cte",
    });
  }

  const maxRows = Math.max(0, ...nodes.map((node) => node.metrics.actualRows ?? 0));
  const maxTotalCost = Math.max(0, ...nodes.map((node) => node.metrics.totalCost ?? 0));
  const maxCost = Math.max(0, ...nodes.map((node) => node.metrics.cost ?? 0));
  const maxDuration = Math.max(0, ...nodes.map((node) => node.metrics.exclusiveTimeMs ?? 0));
  const maxEstimateFactor = Math.max(0, ...nodes.map((node) => node.metrics.estimateFactor ?? 0));

  stats.maxRows = maxRows || undefined;
  stats.maxTotalCost = maxTotalCost || undefined;
  stats.maxCost = maxCost || undefined;
  stats.maxDuration = maxDuration || undefined;
  stats.maxEstimateFactor = maxEstimateFactor || undefined;

  for (const node of nodes) {
    node.warnings = buildPostgresWarnings(node.metrics, stats);
  }

  return {
    nodes,
    edges,
    cteGroups,
    stats,
    db: "postgresql",
  };
}

import type { DatabaseKey } from "@/data/databases";
import { parseDuckdbPlan } from "@/lib/plan/duckdb";
import { parsePostgresPlan } from "@/lib/plan/postgres";

export type WarningSeverity = 2 | 3 | 4;

export type WarningKind = "slow" | "cost" | "estimate" | "filter" | "heap" | "rows" | "result";

export type PlanWarning = {
  kind: WarningKind;
  severity: WarningSeverity;
  message: string;
  value?: number;
  percent?: number;
};

export type PlanMetrics = {
  exclusiveTimeMs?: number;
  totalTimeMs?: number;
  actualRows?: number;
  planRows?: number;
  rowsRemoved?: number;
  rowsRemovedRatio?: number;
  heapFetches?: number;
  bufferBytes?: number;
  cost?: number;
  totalCost?: number;
  estimateFactor?: number;
  resultSize?: number;
  rowsScanned?: number;
};

export type NormalizedPlanNode = {
  id: string;
  type: string;
  label: string;
  detail?: string;
  db: DatabaseKey;
  metrics: PlanMetrics;
  warnings: PlanWarning[];
  raw: unknown;
  cteGroup?: string;
  cteReference?: string;
  parentId?: string;
};

export type PlanEdge = {
  id: string;
  source: string;
  target: string;
  rows?: number;
  rowsRemovedRatio?: number;
  kind?: "cte";
};

export type PlanStats = {
  executionTimeMs?: number;
  planningTimeMs?: number;
  maxRows?: number;
  maxRowsScanned?: number;
  maxResultSize?: number;
  maxEstimatedRows?: number;
  maxCost?: number;
  maxTotalCost?: number;
  maxDuration?: number;
  maxEstimateFactor?: number;
};

export type NormalizedPlanGraph = {
  nodes: NormalizedPlanNode[];
  edges: PlanEdge[];
  cteGroups: Record<string, string[]>;
  stats: PlanStats;
  db: DatabaseKey;
};

export function normalizePlan(databaseKey: DatabaseKey, rawPlan: string): NormalizedPlanGraph {
  switch (databaseKey) {
    case "postgresql":
      return parsePostgresPlan(rawPlan);
    case "duckdb":
      return parseDuckdbPlan(rawPlan);
    default:
      throw new Error(`Unsupported database key: ${databaseKey}`);
  }
}

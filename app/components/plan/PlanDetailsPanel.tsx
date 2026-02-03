import { formatBytes, formatCount, formatMs } from "@/lib/plan/format";
import type { NormalizedPlanNode } from "@/lib/plan/normalize";

function getDetailEntries(node: NormalizedPlanNode) {
  const entries: Array<{ label: string; value: string }> = [];
  const raw = node.raw as Record<string, unknown>;

  const possibleKeys = [
    "Relation Name",
    "Schema",
    "Alias",
    "Join Type",
    "Hash Cond",
    "Merge Cond",
    "Filter",
    "Index Cond",
    "Recheck Cond",
    "Sort Key",
    "Group Key",
    "Output",
    "CTE Name",
    "Subplan Name",
  ];

  for (const key of possibleKeys) {
    const value = raw[key];
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      entries.push({ label: key, value: value.join(", ") });
    } else {
      entries.push({ label: key, value: String(value) });
    }
  }

  if (node.db === "duckdb") {
    const extraInfo = raw.extra_info as Record<string, unknown> | undefined;
    if (extraInfo) {
      for (const [key, value] of Object.entries(extraInfo)) {
        entries.push({ label: key, value: Array.isArray(value) ? value.join(", ") : String(value) });
      }
    }
  }

  return entries;
}

export function PlanDetailsPanel({ node }: { node?: NormalizedPlanNode }) {
  if (!node) {
    return (
      <div className="h-full rounded-md border border-input bg-secondary/60 p-4 text-sm text-muted-foreground">
        Click a node to see its details.
      </div>
    );
  }

  const { metrics } = node;
  const entries = getDetailEntries(node);

  return (
    <div className="h-full rounded-md border border-input bg-secondary/60 p-4">
      <div className="text-sm font-semibold text-foreground wrap-break-word">{node.label}</div>
      {node.detail && <div className="text-xs text-muted-foreground/80 wrap-break-word">{node.detail}</div>}

      <div className="grid grid-cols-2 gap-2 text-xs mt-3">
        <div>
          <div className="text-muted-foreground">Exclusive time</div>
          <div className="font-medium">{formatMs(metrics.exclusiveTimeMs ?? metrics.totalTimeMs)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Actual rows</div>
          <div className="font-medium">{formatCount(metrics.actualRows ?? metrics.planRows)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Plan rows</div>
          <div className="font-medium">{formatCount(metrics.planRows)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Cost</div>
          <div className="font-medium">{formatCount(metrics.cost ?? metrics.totalCost)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Rows removed</div>
          <div className="font-medium">{formatCount(metrics.rowsRemoved)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Estimate factor</div>
          <div className="font-medium">
            {metrics.estimateFactor !== undefined ? metrics.estimateFactor.toFixed(2) : "—"}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">Result size</div>
          <div className="font-medium">{formatBytes(metrics.resultSize)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Rows scanned</div>
          <div className="font-medium">{formatCount(metrics.rowsScanned)}</div>
        </div>
      </div>

      {node.warnings.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-semibold text-foreground mb-2">Warnings</div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {node.warnings.map((warning, index) => (
              <li key={`${warning.kind}-${index}`}>
                <span className="font-medium text-foreground">[{warning.severity}]</span> {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-semibold text-foreground mb-2">Details</div>
          <div className="space-y-2 text-xs">
            {entries.map((entry) => (
              <div key={entry.label}>
                <div className="text-muted-foreground">{entry.label}</div>
                <div className="font-medium break-words">{entry.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

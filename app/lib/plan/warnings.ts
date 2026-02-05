import type { PlanMetrics, PlanStats, PlanWarning, WarningSeverity } from "@/lib/plan/normalize";
import { clamp } from "@/lib/plan/parse";

function severityFromThresholds(percent: number, thresholds: [number, number, number?]) {
  const [high, medium, low] = thresholds;
  if (percent > high) return 4;
  if (percent > medium) return 3;
  if (low !== undefined && percent > low) return 2;
  return null;
}

function addWarning(list: PlanWarning[], warning: PlanWarning | null) {
  if (warning) list.push(warning);
}

export function buildPostgresWarnings(metrics: PlanMetrics, stats: PlanStats) {
  const warnings: PlanWarning[] = [];
  if (metrics.exclusiveTimeMs !== undefined && stats.executionTimeMs) {
    const percent = (metrics.exclusiveTimeMs / stats.executionTimeMs) * 100;
    const severity = severityFromThresholds(percent, [90, 40, 10]);
    addWarning(
      warnings,
      severity
        ? {
            kind: "slow",
            severity,
            percent,
            message: `Slow node (${percent.toFixed(1)}% of execution time)`,
          }
        : null,
    );
  }

  if (metrics.cost !== undefined && stats.maxCost) {
    const percent = (metrics.cost / stats.maxCost) * 100;
    const severity = severityFromThresholds(percent, [90, 40, 10]);
    addWarning(
      warnings,
      severity
        ? {
            kind: "cost",
            severity,
            percent,
            message: `High cost (${percent.toFixed(1)}% of max cost)`,
          }
        : null,
    );
  }

  if (metrics.estimateFactor !== undefined) {
    const factor = metrics.estimateFactor;
    const severity = factor > 1000 ? 4 : factor > 100 ? 3 : factor > 10 ? 2 : null;
    addWarning(
      warnings,
      severity
        ? {
            kind: "estimate",
            severity,
            value: factor,
            message: `Bad row estimate (x${factor.toFixed(1)})`,
          }
        : null,
    );
  }

  if (metrics.rowsRemovedRatio !== undefined) {
    const percent = metrics.rowsRemovedRatio;
    const severity = severityFromThresholds(percent, [90, 50]);
    addWarning(
      warnings,
      severity
        ? {
            kind: "filter",
            severity,
            percent,
            message: `Heavy filtering (${percent.toFixed(1)}% removed)`,
          }
        : null,
    );
  }

  if (metrics.heapFetches !== undefined) {
    const actualRows = metrics.actualRows ?? 0;
    const rowsRemoved = metrics.rowsRemoved ?? 0;
    const denominator = actualRows + rowsRemoved;
    if (denominator > 0) {
      const percent = clamp((metrics.heapFetches / denominator) * 100, 0, 100);
      const severity = severityFromThresholds(percent, [90, 40, 0]);
      addWarning(
        warnings,
        severity
          ? {
              kind: "heap",
              severity: severity as WarningSeverity,
              percent,
              message: `High heap fetches (${percent.toFixed(1)}%)`,
            }
          : null,
      );
    }
  }

  return warnings;
}

export function buildDuckdbWarnings(metrics: PlanMetrics, stats: PlanStats) {
  const warnings: PlanWarning[] = [];
  if (metrics.exclusiveTimeMs !== undefined && stats.executionTimeMs) {
    const percent = (metrics.exclusiveTimeMs / stats.executionTimeMs) * 100;
    const severity = severityFromThresholds(percent, [90, 50]);
    addWarning(
      warnings,
      severity
        ? {
            kind: "slow",
            severity,
            percent,
            message: `Slow operator (${percent.toFixed(1)}% of execution time)`,
          }
        : null,
    );
  }

  if (metrics.actualRows !== undefined && stats.maxRows) {
    const percent = (metrics.actualRows / stats.maxRows) * 100;
    const severity = severityFromThresholds(percent, [90, 50]);
    addWarning(
      warnings,
      severity
        ? {
            kind: "rows",
            severity,
            percent,
            message: `Row-heavy operator (${percent.toFixed(1)}% of max rows)`,
          }
        : null,
    );
  }

  if (metrics.resultSize !== undefined && stats.maxResultSize) {
    const percent = (metrics.resultSize / stats.maxResultSize) * 100;
    const severity = severityFromThresholds(percent, [90, 50]);
    addWarning(
      warnings,
      severity
        ? {
            kind: "result",
            severity,
            percent,
            message: `Large result set (${percent.toFixed(1)}% of max size)`,
          }
        : null,
    );
  }

  return warnings;
}

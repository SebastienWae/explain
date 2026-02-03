import { IconAlertTriangle, IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { PlanDetailsPanel } from "@/components/plan/PlanDetailsPanel";
import { PlanGraph } from "@/components/plan/PlanGraph";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DATABASES, type DatabaseKey } from "@/data/databases";
import { normalizePlan } from "@/lib/plan/normalize";

type ViewMode = "graph" | "grid" | "flame";

export function PlanVisualizer({
  databaseKey,
  plan,
  onBack,
}: {
  databaseKey: DatabaseKey;
  plan: string;
  onBack: () => void;
}) {
  const database = DATABASES[databaseKey];
  const [viewMode, setViewMode] = useState<ViewMode>("graph");
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(undefined);

  const graphState = useMemo(() => {
    if (!plan.trim()) {
      return { graph: null, error: "Plan input is empty." };
    }
    try {
      return { graph: normalizePlan(databaseKey, plan), error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to parse the plan.";
      return { graph: null, error: message };
    }
  }, [databaseKey, plan]);

  const selectedNode = graphState.graph?.nodes.find((node) => node.id === selectedNodeId);

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="secondary" size="icon" onClick={onBack}>
          <IconArrowLeft />
        </Button>
        <ToggleGroup
          variant="outline"
          size="lg"
          className="bg-background"
          value={[viewMode]}
          onValueChange={(value) => {
            const [next] = value as ViewMode[];
            if (next) {
              setViewMode(next);
            }
          }}
        >
          <ToggleGroupItem value="graph">Graph</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="flame">Flame</ToggleGroupItem>
        </ToggleGroup>
        <span className="text-muted-foreground text-sm ml-auto">{database.name}</span>
      </div>

      <div className="flex flex-1 min-h-0 flex-col">
        {viewMode !== "graph" && (
          <div className="flex flex-1 items-center justify-center rounded-md border border-input bg-secondary p-6 text-center text-sm text-muted-foreground">
            {viewMode === "grid" ? "Grid view is coming soon." : "Flame view is coming soon."}
          </div>
        )}

        {viewMode === "graph" && (
          <div className="flex flex-1 min-h-0 flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 min-h-0 min-w-0 flex-col">
              {graphState.graph ? (
                <PlanGraph graph={graphState.graph} selectedNodeId={selectedNodeId} onSelectNode={setSelectedNodeId} />
              ) : (
                <div className="rounded-md border border-input bg-secondary/60 p-6 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2 text-foreground">
                    <IconAlertTriangle className="mt-0.5 size-4 text-destructive" />
                    <div>
                      <div className="font-semibold">Unable to render graph</div>
                      <div className="text-xs text-muted-foreground mt-1">{graphState.error}</div>
                    </div>
                  </div>
                  <pre className="mt-4 max-h-[40vh] overflow-auto rounded border border-input bg-background p-3 text-xs text-muted-foreground">
                    {plan}
                  </pre>
                </div>
              )}
            </div>
            <div className="flex min-h-0 w-full flex-col bg-secondary lg:w-80">
              {graphState.graph ? (
                <PlanDetailsPanel node={selectedNode} />
              ) : (
                <div className="rounded-md border border-input bg-secondary/60 p-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 text-foreground">
                    <IconInfoCircle className="size-4" />
                    <span>Parsing failed. Fix the plan input to see details.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

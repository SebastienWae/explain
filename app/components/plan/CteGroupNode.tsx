import type { Node, NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";

type CteGroupData = {
  label: string;
};

type CteGroupFlowNode = Node<CteGroupData, "cteGroup">;

export function CteGroupNode({ data }: NodeProps<CteGroupFlowNode>) {
  return (
    <div
      className={cn(
        "relative h-full w-full rounded-lg border border-dashed border-primary/45 bg-primary/10",
        "text-[11px] text-foreground/90 shadow-sm",
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-primary">
        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold text-primary-foreground">
          CTE
        </span>
        <span className="text-foreground normal-case">{data.label}</span>
      </div>
    </div>
  );
}

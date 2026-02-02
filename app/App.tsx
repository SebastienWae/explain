import { IconBrandGithub, IconBrandX, IconExternalLink, IconInfoCircle, IconSchema } from "@tabler/icons-react";
import { useState } from "react";
import { PlanEditor } from "@/components/PlanEditor";
import { PlanVisualizer } from "@/components/PlanVisualizer";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { DatabaseKey } from "@/data/databases";

type View = "editor" | "visualizer";

function Background() {
  return (
    <div
      className="absolute inset-0 z-0 bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle at 25% 25%, #222222 1px, transparent 1px), radial-gradient(circle at 75% 75%, #111111 1px, transparent 1px)",
        backgroundSize: "10px 10px",
        imageRendering: "pixelated",
      }}
    />
  );
}

function SocialLinks() {
  return (
    <div className="absolute right-4 top-4 flex items-center gap-4">
      <ButtonGroup>
        <Button
          variant="secondary"
          size="icon"
          nativeButton={false}
          render={
            <a href="https://github.com/SebastienWae/explain" rel="noreferrer" target="_blank">
              <IconBrandGithub />
            </a>
          }
        />
        <Button
          variant="secondary"
          size="icon"
          nativeButton={false}
          render={
            <a href="https://x.com/Seb_Wae" rel="noreferrer" target="_blank">
              <IconBrandX />
            </a>
          }
        />
      </ButtonGroup>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <IconSchema className="size-6" />
      </div>
      <h1 className="text-3xl font-semibold">EXPLAIN PLAN VISUALIZER</h1>
    </div>
  );
}

function PrivacyNotice() {
  return (
    <div className="flex justify-between items-center rounded-md bg-primary text-primary-foreground p-2 text-xs border">
      <span className="inline-flex items-center gap-2 text-sm">
        <IconInfoCircle />
        Everything is done in-browser, your data never leaves your device.
      </span>
      <Button
        variant="secondary"
        nativeButton={false}
        render={
          <a href="https://github.com/SebastienWae/explain" rel="noreferrer" target="_blank">
            <IconExternalLink />
            run locally
          </a>
        }
      />
    </div>
  );
}

function App() {
  const [selectedDb, setSelectedDb] = useState<DatabaseKey>("duckdb");
  const [plans, setPlans] = useState<Record<string, string>>({});
  const [view, setView] = useState<View>("editor");

  const currentPlan = plans[selectedDb] ?? "";

  return (
    <div className="min-h-screen w-full relative">
      <Background />
      <div className="relative flex flex-col w-full min-h-svh items-center justify-start px-4 pt-16">
        <SocialLinks />
        <div className="flex flex-col gap-4 w-full max-w-2xl xl:max-w-4xl">
          <Header />
          {view === "editor" ? (
            <PlanEditor
              selectedDb={selectedDb}
              onDbChange={setSelectedDb}
              plans={plans}
              setPlans={setPlans}
              onSubmit={() => setView("visualizer")}
            />
          ) : (
            <PlanVisualizer databaseKey={selectedDb} plan={currentPlan} onBack={() => setView("editor")} />
          )}
          <PrivacyNotice />
        </div>
      </div>
    </div>
  );
}

export default App;

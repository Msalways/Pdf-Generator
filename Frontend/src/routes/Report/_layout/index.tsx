import GenerateReport from "@/components/generate-report";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Report/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <GenerateReport />
    </div>
  );
}

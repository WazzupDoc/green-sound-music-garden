import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/start-veselia")({
  head: () => serviceHead("start-veselia"),
  component: Page,
});

function Page() {
  return <ServicePage slug="start-veselia" />;
}

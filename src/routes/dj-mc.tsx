import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/dj-mc")({
  head: () => serviceHead("dj-mc"),
  component: Page,
});

function Page() {
  return <ServicePage slug="dj-mc" />;
}

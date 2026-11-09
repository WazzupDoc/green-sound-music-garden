import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/trupa")({
  head: () => serviceHead("trupa"),
  component: Page,
});

function Page() {
  return <ServicePage slug="trupa" />;
}

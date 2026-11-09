import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/hostess")({
  head: () => serviceHead("hostess"),
  component: Page,
});

function Page() {
  return <ServicePage slug="hostess" />;
}

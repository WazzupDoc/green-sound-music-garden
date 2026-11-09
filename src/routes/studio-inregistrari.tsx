import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/studio-inregistrari")({
  head: () => serviceHead("studio-inregistrari"),
  component: Page,
});

function Page() {
  return <ServicePage slug="studio-inregistrari" />;
}

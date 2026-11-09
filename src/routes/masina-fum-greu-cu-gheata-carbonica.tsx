import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/masina-fum-greu-cu-gheata-carbonica")({
  head: () => serviceHead("masina-fum-greu-cu-gheata-carbonica"),
  component: Page,
});

function Page() {
  return <ServicePage slug="masina-fum-greu-cu-gheata-carbonica" />;
}

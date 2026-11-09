import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/echipamente-de-sunet-si-lumini")({
  head: () => serviceHead("echipamente-de-sunet-si-lumini"),
  component: Page,
});

function Page() {
  return <ServicePage slug="echipamente-de-sunet-si-lumini" />;
}

import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, serviceHead } from "@/components/site/ServicePage";

export const Route = createFileRoute("/ursitoare-botez")({
  head: () => serviceHead("ursitoare-botez"),
  component: Page,
});

function Page() {
  return <ServicePage slug="ursitoare-botez" />;
}

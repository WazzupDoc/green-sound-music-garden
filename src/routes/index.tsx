import { createFileRoute } from "@tanstack/react-router";
import { ConceptHomeV170 } from "@/components/atelier/ConceptHomeV170";
import rebuildCss from "@/styles/home-rebuild-v297.css?inline";
import { localBusinessLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Green Sound Music Pitești | DJ & MC, muzică live, sunet și lumini",
    description: "DJ & MC, trupă live, sonorizare și lumini pentru nunți, botezuri, petreceri și concerte. Green Sound Music, Pitești și Argeș.",
    path: "/",
    jsonLd: [localBusinessLd()],
  }),
  component: Home,
});

/** One independent editorial composition; no cumulative homepage overrides. */
function Home() {
  return (
    <div className="gs170-home" data-bespoke="v297">
      <style>{rebuildCss}</style>
      <ConceptHomeV170 />
    </div>
  );
}

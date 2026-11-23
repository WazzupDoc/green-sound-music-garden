import { createFileRoute } from "@tanstack/react-router";
import { ConceptHomeV170 } from "@/components/atelier/ConceptHomeV170";
import homeReferenceCss from "@/styles/home-reference-v170.css?inline";
import restoredHomeCss from "@/styles/home-refinement-v215.css?inline";
import photographicHeroCss from "@/styles/home-photographic-v279.css?inline";
import editorialProgrammeCss from "@/styles/home-editorial-v280.css?inline";
import { localBusinessLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Green Sound Music Pitești | DJ & MC, muzică live, sunet și lumini",
    description: "Atmosfere create prin muzică și lumină. DJ & MC, trupă live, sonorizare, scenotehnică, LED și efecte pentru nunți, botezuri, petreceri și concerte în Pitești și Argeș.",
    path: "/",
    jsonLd: [localBusinessLd()],
  }),
  component: Home,
});

/** One new concept-faithful composition; no cumulative V160/V166/V168 CSS. */
function Home() {
  return (
    <div className="gs170-home" data-art-direction="v279" data-services-direction="v280">
      <style>{homeReferenceCss + "\n" + restoredHomeCss + "\n" + photographicHeroCss + "\n" + editorialProgrammeCss}</style>
      <ConceptHomeV170 />
    </div>
  );
}

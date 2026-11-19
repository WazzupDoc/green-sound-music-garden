import { createFileRoute } from "@tanstack/react-router";
import { ConceptHomeV170 } from "@/components/atelier/ConceptHomeV170";
import homeReferenceCss from "@/styles/home-reference-v170.css?inline";
import serviceDirectoryCss from "@/styles/home-service-directory.css?inline";
import restoredHomeCss from "@/styles/home-refinement-v215.css?inline";
import editorialCoverCss from "@/styles/home-editorial-cover-v244.css?inline";
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

function Home() {
  return (
    <div className="gs170-home">
      <style>{homeReferenceCss + "\n" + serviceDirectoryCss + "\n" + restoredHomeCss + "\n" + editorialCoverCss}</style>
      <ConceptHomeV170 />
    </div>
  );
}

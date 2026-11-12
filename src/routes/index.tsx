import { createFileRoute } from "@tanstack/react-router";
import { GreenShowHome } from "@/components/atelier/GreenShowHome";
import { localBusinessLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Green Sound Music Pitești | DJ, muzică live, sunet și lumini",
    description: "Din 2008, în Pitești: DJ & MC, trupă live, sonorizare, lumini și servicii pentru nunți, botezuri, concerte și evenimente private sau corporate.",
    path: "/",
    jsonLd: [localBusinessLd()],
  }),
  component: GreenShowHome,
});

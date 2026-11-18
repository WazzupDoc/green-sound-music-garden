import type { ServiceSlug } from "@/data/site";
import type { ReactNode } from "react";

type SigilProps = { slug: ServiceSlug; className?: string };

/**
 * Eight original single-stroke drawings inspired by stage and production tools.
 * Artwork is purely decorative; the adjacent link retains the accessible name.
 * Do not confuse these pictograms with photos or claims about owned equipment.
 */
export function ServiceSigilV217({ slug, className = "" }: SigilProps) {
  const content: Record<ServiceSlug, ReactNode> = {
    "dj-mc": <>
      <circle cx="23" cy="23" r="15" /><circle cx="23" cy="23" r="3.5" />
      <path d="M23 8v7M23 31v7M8 23h7M31 23h7M34 12l-5 5" />
    </>,
    trupa: <>
      <path d="M8 31V20c0-10 8-16 15-16s15 6 15 16v11" />
      <rect x="6" y="24" width="8" height="14" rx="2" />
      <rect x="32" y="24" width="8" height="14" rx="2" />
      <path d="M38 35c-1 6-7 8-14 8h-4" />
    </>,
    "studio-inregistrari": <>
      <rect x="18" y="6" width="12" height="23" rx="6" />
      <path d="M11 23c0 13 24 13 24 0M23 34v8M16 42h14M22 13h4M22 19h4" />
    </>,
    "echipamente-de-sunet-si-lumini": <>
      <path d="M12 6h24v14H12zM18 20l-7 22M30 20l7 22M4 42h39" />
      <path d="M16 6V3M32 6V3M19 12h10M17 30l-5 7M31 30l5 7" />
    </>,
    "masina-fum-greu-cu-gheata-carbonica": <>
      <path d="M9 34h30v7H9zM14 34v-5M34 34v-5" />
      <path d="M16 26c-6-4 2-8 0-13s-5-4-4-9M26 26c-6-4 2-8 0-13s-5-4-4-9M35 26c-6-4 2-8 0-13s-5-4-4-9" />
    </>,
    hostess: <>
      <path d="M23 6a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM9 40c1-11 5-16 14-16s13 5 14 16H9Z" />
      <path d="M15 28l8 6 8-6M23 34v6" />
    </>,
    "ursitoare-botez": <>
      <path d="M23 5l4 11 11 4-11 4-4 11-4-11-11-4 11-4 4-11Z" />
      <path d="M38 5v7M34.5 8.5h7M9 34v8M5 38h8" />
    </>,
    "start-veselia": <>
      <path d="M7 24c4-9 9-13 16-13s12 4 16 13M7 24c2 10 8 16 16 16s14-6 16-16" />
      <circle cx="17" cy="26" r="1.5" /><circle cx="29" cy="26" r="1.5" />
      <path d="M17 34c4 3 8 3 12 0M23 11V4M9 17 4 12M37 17l5-5" />
    </>,
  };

  return <svg className={className} viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1.55"
    strokeLinejoin="round" strokeLinecap="round" focusable="false" aria-hidden="true">
    {content[slug]}
  </svg>;
}

/* Oversized graphic signatures for the three menu chapters. No third-party SVGs. */
export function ChapterSigilV217({ type }: { type: "music" | "tech" | "moments" }) {
  return <svg className="gs217-chapter-glyph" viewBox="0 0 90 90" fill="none" stroke="currentColor"
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" focusable="false" aria-hidden="true">
    {type === "music" && <>
      <path d="M13 45h7m6-12v24m7-37v50m7-59v68m7-45v22m7-37v52m7-29v8m7-17v34m7-22v11" />
      <path d="M8 45h74" strokeDasharray="2 8" strokeOpacity=".4" />
    </>}
    {type === "tech" && <>
      <path d="M22 17h46l-7 20H29l-7-20ZM45 37v42M29 79h32" />
      <path d="M29 37 8 70M39 37 31 79M51 37l8 42M61 37l21 33" strokeDasharray="5 5" strokeOpacity=".65" />
      <circle cx="45" cy="26" r="6" />
    </>}
    {type === "moments" && <>
      <circle cx="45" cy="45" r="21" strokeDasharray="1 6" />
      <path d="M45 7v18M45 65v18M7 45h18M65 45h18M19 19l13 13M58 58l13 13M71 19 58 32M32 58 19 71" />
      <path d="m45 33 4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z" />
    </>}
  </svg>;
}

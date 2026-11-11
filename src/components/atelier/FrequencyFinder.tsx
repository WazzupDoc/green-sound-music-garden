import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, AudioLines, CornerDownLeft, Search, X } from "lucide-react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { events, services } from "@/data/site";

type FinderEntry = {
  href: string;
  title: string;
  category: "SERVICIU" | "EVENIMENT" | "PAGINĂ";
  detail: string;
  keywords: string;
};

const destinationPages: FinderEntry[] = [
  { href: "/", title: "Acasă", category: "PAGINĂ", detail: "Green Sound Music — din Pitești, pentru evenimente din România", keywords: "acasa home green sound" },
  { href: "/servicii", title: "Toate serviciile", category: "PAGINĂ", detail: "Muzică live, DJ & MC, sunet, lumini, efecte și producție", keywords: "servicii oferta toate produse" },
  { href: "/evenimente", title: "Tipuri de evenimente", category: "PAGINĂ", detail: "Nunți, botezuri, corporate, concerte și petreceri private", keywords: "evenimente categorii petreceri" },
  { href: "/portofoliu", title: "Portofoliu foto și video", category: "PAGINĂ", detail: "Fotografii și filmări publicate de Green Sound Music", keywords: "video fotografii galerie filmari portofoliu" },
  { href: "/despre-noi", title: "Despre Green Sound", category: "PAGINĂ", detail: "Povestea, echipa și etapele unei producții", keywords: "despre noi poveste echipa proces studio" },
  { href: "/contact", title: "Contact și cerere de ofertă", category: "PAGINĂ", detail: "Discutăm data, locația și serviciile evenimentului", keywords: "contact pret cerere oferta whatsapp telefon" },
];

const directory: readonly FinderEntry[] = [
  ...services.map((service): FinderEntry => ({
    href: "/" + service.slug,
    title: service.name,
    category: "SERVICIU",
    detail: service.short,
    keywords: [service.formLabel, service.eyebrow, service.h1, ...service.highlights.map(h => h.title)].join(" "),
  })),
  ...events.map((event): FinderEntry => ({
    href: "/evenimente/" + event.slug,
    title: event.name,
    category: "EVENIMENT",
    detail: event.short,
    keywords: [event.formLabel, event.h1, ...event.moments.map(m => m.title)].join(" "),
  })),
  ...destinationPages,
];

// No network search, tracking, indexing service or user search history.
// Short local directory is prepared once and filtered synchronously per query.
const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const indexed = directory.map(entry => ({
  entry,
  title: normalize(entry.title),
  haystack: normalize([entry.title, entry.category, entry.detail, entry.keywords].join(" ")),
}));

const featuredPaths = [
  "/dj-mc",
  "/evenimente/nunti",
  "/echipamente-de-sunet-si-lumini",
  "/portofoliu",
  "/servicii",
  "/contact",
];

export function FrequencyFinder({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length === 0) {
      return featuredPaths
        .map(path => directory.find(item => item.href === path))
        .filter((item): item is FinderEntry => item !== undefined);
    }

    return indexed
      .filter(item => terms.every(word => item.haystack.includes(word)))
      .map(item => ({
        entry: item.entry,
        score: item.title === terms.join(" ") ? 0 :
          item.title.startsWith(terms[0]!) ? 1 :
            item.title.includes(terms[0]!) ? 2 : 3,
      }))
      .sort((a, b) => a.score - b.score || a.entry.title.localeCompare(b.entry.title, "ro"))
      .slice(0, 9)
      .map(item => item.entry);
  }, [query]);

  const focusResult = (index: number) => {
    const links = resultsRef.current?.querySelectorAll<HTMLAnchorElement>("a.gs-finder__result");
    if (!links?.length) return;
    if (index < 0) inputRef.current?.focus();
    else links[Math.min(index, links.length - 1)]?.focus();
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      focusResult(0);
    } else if (event.key === "Enter" && results.length > 0) {
      event.preventDefault();
      resultsRef.current?.querySelector<HTMLAnchorElement>("a.gs-finder__result")?.click();
    }
  };

  const onResultKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusResult(index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusResult(index - 1);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="gs-finder__overlay" />
        <Dialog.Content className="gs-finder" aria-describedby="gs-finder-description"
          onOpenAutoFocus={event => {
            event.preventDefault();
            inputRef.current?.focus();
          }}>
          <div className="gs-finder__topline">
            <span><AudioLines className="size-4" aria-hidden /> GREEN SOUND / FREQUENCY FINDER</span>
            <Dialog.Close className="gs-finder__close" aria-label="Închide căutarea">
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <div className="gs-finder__intro">
            <Dialog.Title>Găsește-ți <em>ritmul.</em></Dialog.Title>
            <Dialog.Description id="gs-finder-description">
              Caută în serviciile, evenimentele și paginile Green Sound Music. Fără cont sau cereri trimise automat.
            </Dialog.Description>
          </div>
          <label className="gs-finder__search" htmlFor="gs-finder-input">
            <Search className="size-5" aria-hidden />
            <input ref={inputRef} id="gs-finder-input" type="search" autoComplete="off"
              value={query} onChange={event => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="DJ, lumini, nuntă, concert..."
              aria-label="Caută serviciile și evenimentele Green Sound"
              aria-controls="gs-finder-results" />
            <kbd aria-hidden>↵</kbd>
          </label>
          <div className="gs-finder__results-top">
            <span>{query.trim() ? "REZULTATE" : "ÎNCEPE DE AICI"}</span>
            <span role="status">{results.length} {results.length === 1 ? "destinație" : "destinații"}</span>
          </div>
          <div id="gs-finder-results" ref={resultsRef} className="gs-finder__results"
            aria-label="Pagini găsite">
            {results.length > 0 ? results.map((entry, index) => (
              <Link key={entry.href} to={entry.href} className="gs-finder__result"
                onKeyDown={event => onResultKeyDown(event, index)}
                onClick={() => onOpenChange(false)}
                data-result-url={entry.href}>
                <span className="gs-finder__result-no">{String(index+1).padStart(2, "0")}</span>
                <span className="gs-finder__result-content">
                  <strong>{entry.title}</strong>
                  <small>{entry.detail}</small>
                </span>
                <span className="gs-finder__result-type">{entry.category}</span>
                <ArrowUpRight className="gs-finder__result-arrow size-5" aria-hidden />
              </Link>
            )) : (
              <div className="gs-finder__empty" role="status">
                <Search className="size-6" aria-hidden />
                <strong>Nu am găsit o pagină pentru această căutare.</strong>
                <p>Încearcă „DJ”, „lumini”, „nuntă” sau spune-ne direct ce pregătești.</p>
                <Link to="/contact" onClick={() => onOpenChange(false)}>
                  Cere o ofertă personalizată <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            )}
          </div>
          <div className="gs-finder__footer">
            <span><ArrowDown className="size-4" aria-hidden /> Săgeți: navighează</span>
            <span><CornerDownLeft className="size-4" aria-hidden /> Enter: deschide</span>
            <span><kbd>ESC</kbd> Închide</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

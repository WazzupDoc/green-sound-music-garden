import { useEffect, useState } from "react";

type LightMode = "neutru" | "verde" | "cald" | "albastru";
const KEY = "gsm-light";
const options: ReadonlyArray<{ id: LightMode; label: string }> = [
  { id: "neutru", label: "Neutru" },
  { id: "verde", label: "Verde" },
  { id: "cald", label: "Cald" },
  { id: "albastru", label: "Albastru" },
];
function valid(value: string | null): value is LightMode {
  return options.some(option => option.id === value);
}

/** Shared control. Storage is optional and SSR always starts with neutral markup. */
export function LightDesk() {
  const [active, setActive] = useState<LightMode>("neutru");

  useEffect(() => {
    let saved: string | null = null;
    try { saved = window.localStorage.getItem(KEY); } catch { /* storage blocked */ }
    const next = valid(saved) ? saved : "neutru";
    document.documentElement.dataset.light = next;
    setActive(next);
    const sync = (event: StorageEvent) => {
      if (event.key !== KEY) return;
      const mode = valid(event.newValue) ? event.newValue : "neutru";
      document.documentElement.dataset.light = mode;
      setActive(mode);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const select = (next: LightMode) => {
    document.documentElement.dataset.light = next;
    setActive(next);
    try { window.localStorage.setItem(KEY, next); } catch { /* current page remains usable */ }
  };

  return (
    <section className="gs-global-light" aria-labelledby="gs-global-light-title">
      <div className="gs-global-light__intro">
        <h2 id="gs-global-light-title">Lumina scenei</h2>
        <p>Alege tonul fotografiilor. Setarea se păstrează când schimbi pagina.</p>
      </div>
      <div className="gs-global-light__choices" role="group" aria-label="Temperatura luminii">
        {options.map(option => (
          <button key={option.id} type="button" className="gs-global-light__choice"
            aria-pressed={active === option.id} onClick={() => select(option.id)}>
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

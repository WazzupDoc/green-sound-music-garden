# V51 — Etapa 2: cod integral al fișierelor modificate

Acest document include **fără omisiuni** conținutul celor zece fișiere schimbate în această etapă, extras direct din ramura `design/v51-regia-serii-foundation`. Fișierele rămân sursa de adevăr; documentul este o copie de inspecție.

**Notă:** `bun.lock` trebuie regenerat și validat înainte de integrare. Nu există confirmarea unui build/CI pentru acest commit în momentul redactării. Nu publicați pe domeniul oficial.

## `package.json`

```json
{
  "name": "tanstack_start_ts",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "check:quality": "npm run typecheck && npm run build"
  },
  "overrides": {
    "rolldown": "1.2.1"
  },
  "dependencies": {
    "@fontsource-variable/hanken-grotesk": "^5.3.0",
    "@fontsource/instrument-serif": "^5.3.0",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tailwindcss/vite": "^4.2.1",
    "@tanstack/react-query": "^5.101.1",
    "@tanstack/react-router": "1.170.41",
    "@tanstack/react-start": "1.168.60",
    "@tanstack/router-plugin": "1.168.42",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lenis": "1.3.25",
    "lucide-react": "^0.575.0",
    "motion": "14.10.1",
    "react": "^19.2.0",
    "react-day-picker": "^9.14.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.71.2",
    "react-resizable-panels": "^4.6.5",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "tailwindcss": "^4.2.1",
    "tw-animate-css": "^1.3.4",
    "vaul": "^1.1.2",
    "vite-tsconfig-paths": "^6.0.2",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@lovable.dev/vite-tanstack-config": "2.26.5",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.16.5",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^5.2.0",
    "eslint": "^9.32.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.6",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^20.0.3",
    "nitro": "3.0.260603-beta",
    "prettier": "^3.7.3",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.56.1",
    "vite": "8.1.5",
    "vitest": "^4.1.10"
  }
}
```

## `src/routes/__root.tsx`

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import "@fontsource-variable/hanken-grotesk/wght.css";
import "@fontsource/instrument-serif/400-italic.css";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { ClientMotion } from "@/components/atelier/ClientMotion";
import { StageFallback } from "@/components/site/StageFallback";

function NotFoundComponent() {
  // React Router/TanStack Start retains the actual not-found HTTP semantics.
  // The branded content is a helpful recovery UI, not a fake success screen.
  return <StageFallback variant="missing" />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return <StageFallback variant="error" onRetry={() => {
    router.invalidate();
    reset();
  }} />;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0A0F15" },
      { title: "Green Sound Music — DJ, trupă, sonorizare și lumini în Pitești" },
      { name: "description", content: "Muzică, sunet, lumini și efecte pentru evenimente, din Pitești, din 2008." },
      { name: "author", content: "Green Sound Music" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="director-progress" aria-hidden="true"><div className="director-progress__line" /></div>
      <ClientMotion />
      <SiteHeader />
      <main id="continut">
        <Outlet />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </QueryClientProvider>
  );
}
```

## `src/styles.css`

```css
/*
 * Tailwind v4 entry: config lives here, with no tailwind.config.js or PostCSS plugin.
 * Keep every @import in this top block. Web fonts load via <link> in src/routes/__root.tsx.
 */
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";
@import "./styles/atelier.css";
@import "./styles/directors-cut.css";
@import "./styles/soundcheck.css";
@import "./styles/scene-console.css";
@import "./styles/portfolio-journal.css";
@import "./styles/event-brief.css";
@import "./styles/contact-editorial.css";
@import "./styles/quote-preview.css";
@import "./styles/quote-guidance.css";
@import "./styles/signature-cursor.css";
@import "./styles/light-desk.css";
@import "./styles/offstage.css";
@import "./styles/atmosphere-interlude.css";
@import "./styles/production-journey.css";
@import "./styles/production-index.css";
@import "./styles/editorial-reset.css";
@import "./styles/service-mix.css";
@import "./styles/service-discovery.css";
@import "./styles/frequency-finder.css";
@import "./styles/event-journal.css";
@import "./styles/performance-adaptive.css";
@import "./styles/regia-serii-foundation.css";

@custom-variant dark (&:is(.dark *));

/*
 * GREEN SOUND MUSIC — design system "Lumina de scenă"
 * Night-stage ink backgrounds, the brand's own logo green as the single signal colour,
 * warm ivory "daylight" sections for rhythm, and a sparing amber spotlight accent.
 */

@theme inline {
  --font-display: "Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-glow: var(--primary-glow);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-spotlight: var(--spotlight);
  --color-paper: var(--paper);
  --color-paper-foreground: var(--paper-foreground);
  --color-paper-muted: var(--paper-muted);
  --color-paper-border: var(--paper-border);
  --color-ink: var(--ink);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --animate-rise: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  --animate-marquee: marquee 40s linear infinite;
  --animate-pulse-ring: pulse-ring 2.4s ease-out infinite;
  --animate-kenburns: kenburns 7s cubic-bezier(0.2, 0.6, 0.3, 1) both;
}

:root {
  --radius: 0.5rem;

  /* Night stage (HEX refs: ink #0B100E, surface #131A17, ivory #F4EFE4) */
  --ink: #0A0F15;
  --background: #0A0F15;
  --foreground: #F3F0E9;
  --card: #101820;
  --card-foreground: #F3F0E9;
  --popover: #101820;
  --popover-foreground: #F3F0E9;

  /* Brand green taken from the existing logo (#2FB24C) */
  --primary: #49B768;
  --primary-glow: oklch(0.82 0.2 140);
  --primary-foreground: #0A0F15;

  --secondary: #101820;
  --secondary-foreground: #F3F0E9;
  --muted: #101820;
  --muted-foreground: #B8BCB9;
  --accent: oklch(0.27 0.03 155);
  --accent-foreground: oklch(0.955 0.014 85);

  /* Amber spotlight — used only for tiny highlights */
  --spotlight: oklch(0.83 0.14 78);

  /* Daylight sections (#F4EFE4 paper, ink text) */
  --paper: #F3F0E9;
  --paper-foreground: #0A0F15;
  --paper-muted: #404B46;
  --paper-border: oklch(0.86 0.02 85);

  --destructive: oklch(0.68 0.2 25);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(1 0 0 / 11%);
  --input: oklch(1 0 0 / 16%);
  --ring: #49B768;

  --gradient-stage: radial-gradient(
    120% 80% at 70% 0%,
    color-mix(in oklab, var(--primary) 22%, transparent) 0%,
    transparent 55%
  );
  --gradient-hero-fade: linear-gradient(
    180deg,
    color-mix(in oklab, var(--ink) 35%, transparent) 0%,
    color-mix(in oklab, var(--ink) 55%, transparent) 45%,
    var(--ink) 100%
  );
  --gradient-side-fade: linear-gradient(
    90deg,
    var(--ink) 0%,
    color-mix(in oklab, var(--ink) 80%, transparent) 40%,
    transparent 100%
  );
  --shadow-glow: 0 14px 30px -18px oklch(0 0 0 / 80%);
  --shadow-card: 0 30px 60px -30px oklch(0 0 0 / 70%);

  --chart-1: var(--primary);
  --chart-2: var(--spotlight);
  --chart-3: oklch(0.6 0.1 200);
  --chart-4: oklch(0.7 0.1 300);
  --chart-5: oklch(0.6 0.15 30);
  --sidebar: var(--card);
  --sidebar-foreground: var(--foreground);
  --sidebar-primary: var(--primary);
  --sidebar-primary-foreground: var(--primary-foreground);
  --sidebar-accent: var(--accent);
  --sidebar-accent-foreground: var(--accent-foreground);
  --sidebar-border: var(--border);
  --sidebar-ring: var(--ring);
}

@layer base {
  * {
    border-color: var(--color-border);
  }
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    font-feature-settings: "ss01";
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-display);
    letter-spacing: -0.025em;
    text-wrap: balance;
  }
  p {
    text-wrap: pretty;
  }
  ::selection {
    background: var(--primary);
    color: var(--primary-foreground);
  }
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 3px;
  }
}

@layer components {
  .container-site {
    width: 100%;
    max-width: 88rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4vw, 3rem);
  }
  .section {
    padding-block: clamp(4.5rem, 10vw, 8.5rem);
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--primary);
  }
  .eyebrow::before {
    content: "";
    width: 1.75rem;
    height: 1px;
    background: currentColor;
  }
  .display-xl {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(2.4rem, 5.4vw, 5rem);
    line-height: 0.98;
    letter-spacing: -0.04em;
  }
  .display-lg {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.85rem, 3.4vw, 3rem);
    line-height: 1.04;
    letter-spacing: -0.032em;
  }
  /* Small technical label: timecodes, counters, credits roles */
  .label-tech {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }
  /* Camera viewfinder corner marks for framed media */
  .viewfinder {
    position: relative;
  }
  .viewfinder::before {
    --vf: color-mix(in oklab, var(--foreground) 75%, transparent);
    content: "";
    position: absolute;
    inset: 14px;
    z-index: 3;
    pointer-events: none;
    background:
      linear-gradient(var(--vf), var(--vf)) top left / 16px 1px no-repeat,
      linear-gradient(var(--vf), var(--vf)) top left / 1px 16px no-repeat,
      linear-gradient(var(--vf), var(--vf)) top right / 16px 1px no-repeat,
      linear-gradient(var(--vf), var(--vf)) top right / 1px 16px no-repeat,
      linear-gradient(var(--vf), var(--vf)) bottom left / 16px 1px no-repeat,
      linear-gradient(var(--vf), var(--vf)) bottom left / 1px 16px no-repeat,
      linear-gradient(var(--vf), var(--vf)) bottom right / 16px 1px no-repeat,
      linear-gradient(var(--vf), var(--vf)) bottom right / 1px 16px no-repeat;
  }
  .rec-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: var(--destructive);
    animation: blink 1.6s steps(2, start) infinite;
  }
  .no-scrollbar {
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .scrim-bottom {
    background: linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--ink) 85%, transparent) 100%);
  }
  .text-outline {
    color: transparent;
    -webkit-text-stroke: 1px color-mix(in oklab, var(--foreground) 35%, transparent);
  }
  .surface-paper .text-outline {
    -webkit-text-stroke-color: color-mix(in oklab, var(--paper-foreground) 30%, transparent);
  }
  .display-md {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.5rem, 2.6vw, 2.25rem);
    line-height: 1.1;
  }
  .serif-accent {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.01em;
  }
  .lead {
    font-size: clamp(1.05rem, 1.4vw, 1.25rem);
    line-height: 1.6;
  }
  .prose-site p + p {
    margin-top: 1.1em;
  }
  .prose-site strong {
    color: var(--foreground);
    font-weight: 600;
  }
  .surface-paper {
    background: var(--paper);
    color: var(--paper-foreground);
  }
  .surface-paper .eyebrow {
    color: oklch(0.45 0.16 145);
  }
  .surface-stage {
    background-image: var(--gradient-stage);
  }
  .hero-fade {
    background: var(--gradient-hero-fade);
  }
  .side-fade {
    background: var(--gradient-side-fade);
  }
  .glow {
    box-shadow: var(--shadow-glow);
  }
  .shadow-card {
    box-shadow: var(--shadow-card);
  }
  .grain {
    position: relative;
    isolation: isolate;
  }
  .grain::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .link-underline {
    background-image: linear-gradient(currentColor, currentColor);
    background-size: 0% 1px;
    background-repeat: no-repeat;
    background-position: 0 100%;
    transition: background-size 0.35s ease;
  }
  .link-underline:hover,
  .link-underline:focus-visible {
    background-size: 100% 1px;
  }
  .equalizer {
    display: inline-flex;
    align-items: flex-end;
    gap: 3px;
    height: 14px;
  }
  .equalizer span {
    width: 3px;
    background: var(--primary);
    border-radius: 1px;
    animation: eq 1.1s ease-in-out infinite;
  }
  .equalizer span:nth-child(2) {
    animation-delay: -0.4s;
  }
  .equalizer span:nth-child(3) {
    animation-delay: -0.75s;
  }
}

/* ---------- Scroll reveal (activated by RevealObserver after hydration) ---------- */
[data-reveal] {
  transition:
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    clip-path 1.25s cubic-bezier(0.77, 0, 0.18, 1);
  transition-delay: var(--d, 0ms);
}
html.reveal-ready [data-reveal]:not([data-in]) {
  opacity: 0;
  transform: translateY(26px);
}
html.reveal-ready [data-reveal="mask"]:not([data-in]) {
  opacity: 1;
  transform: none;
  clip-path: inset(100% 0 0 0);
}
[data-reveal="mask"][data-in] {
  clip-path: inset(0 0 0 0);
}
html.reveal-ready [data-reveal="wave"]:not([data-in]) rect {
  transform: scaleY(0.08);
}
[data-reveal="wave"] rect {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i, 0) * 14ms);
}

/* ---------- Route transitions (View Transitions API, progressive) ---------- */
::view-transition-old(root) {
  animation: vt-out 0.28s ease both;
}
::view-transition-new(root) {
  animation: vt-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes vt-out {
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
@keyframes vt-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
@keyframes kenburns {
  from {
    transform: scale(1.1) translate3d(1.5%, 1%, 0);
  }
  to {
    transform: scale(1) translate3d(0, 0, 0);
  }
}
@keyframes fill-x {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@keyframes eq {
  0%,
  100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}
@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent);
  }
  100% {
    box-shadow: 0 0 0 18px transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
  html.reveal-ready [data-reveal]:not([data-in]) {
    opacity: 1;
    transform: none;
    clip-path: none;
  }
}
```

## `src/styles/regia-serii-foundation.css`

```css
/* Regia Serii — etapa 2 / identitatea comună, fără șabloane decorative. */
:root {
  --gs-ink:#0A0F15; --gs-stage:#101820; --gs-chalk:#F3F0E9;
  --gs-mineral:#B8BCB9; --gs-green:#49B768; --gs-green-on-chalk:#1F6B3A;
  --gs-indigo:#404A98;
  --gs-space-1:8px; --gs-space-2:16px; --gs-space-3:24px;
  --gs-space-4:32px; --gs-space-5:48px; --gs-space-6:72px;
  --gs-radius:4px; --gs-shadow:0 18px 48px #0003;
  --gs-fast:200ms; --gs-medium:500ms; --gs-slow:900ms;
  --gs-ease:cubic-bezier(.2,.7,.2,1);
}
body { background:var(--gs-ink);color:var(--gs-chalk);font-size:16px; }
main :is(h2,h3,h4) em,main h1:not(#crafted-hero-title) em {
  font-family:inherit!important;font-style:normal!important;font-weight:inherit!important;color:inherit;
}
button,input,textarea,select { font:inherit; }
:where(a,button,input,textarea,select,summary):focus-visible {
  outline:2px solid var(--gs-green);outline-offset:3px;
}
.surface-paper a:focus-visible,.gs-index a:focus-visible { outline-color:var(--gs-green-on-chalk); }
/* A genuine, global tonal grade on the project's existing images.
   Neutral intentionally leaves the original photograph unaltered. */
html[data-light="verde"] main img:not([src*="favicon"]) {
  filter:sepia(.08) hue-rotate(15deg) saturate(1.12);
}
html[data-light="cald"] main img:not([src*="favicon"]) {
  filter:sepia(.16) saturate(1.12) brightness(1.03);
}
html[data-light="albastru"] main img:not([src*="favicon"]) {
  filter:sepia(.08) hue-rotate(170deg) saturate(.84);
}
html[data-light="verde"] main .gs-index__photo img,
html[data-light="verde"] main .crafted-hero__image {
  filter:sepia(.08) hue-rotate(15deg) saturate(1.12);
}
html[data-light="cald"] main .gs-index__photo img,
html[data-light="cald"] main .crafted-hero__image {
  filter:sepia(.16) saturate(1.12) brightness(1.03);
}
html[data-light="albastru"] main .gs-index__photo img,
html[data-light="albastru"] main .crafted-hero__image {
  filter:sepia(.08) hue-rotate(170deg) saturate(.84);
}
html[data-light] main img:not([src*="favicon"]) {
  transition:filter var(--gs-medium) var(--gs-ease);
}
html[data-light="cald"] main { --gs-ambient-tint:#d6a04608; }
html[data-light="verde"] main { --gs-ambient-tint:#49b76808; }
html[data-light="albastru"] main { --gs-ambient-tint:#404a980d; }
main { background-color:var(--gs-ambient-tint,transparent); }
.gs-global-light-wrap { border-top:1px solid #B8BCB938;padding-block:28px 44px; }
.gs-global-light { display:flex;align-items:center;justify-content:space-between;gap:22px 35px;flex-wrap:wrap; }
.gs-global-light__intro h2 { font-size:clamp(1.2rem,1.5vw,1.5rem);font-weight:650;letter-spacing:-.02em; }
.gs-global-light__intro p { font-size:1rem;line-height:1.6;color:var(--gs-mineral);margin-top:7px; }
.gs-global-light__choices { display:flex;flex-wrap:wrap;gap:8px; }
.gs-global-light__choice { min-height:44px;padding:9px 15px;border:1px solid #B8BCB97a;
  border-radius:var(--gs-radius);font-size:1rem;font-weight:650;color:var(--gs-chalk);
  transition:background var(--gs-fast) var(--gs-ease),border-color var(--gs-fast) var(--gs-ease);
}
.gs-global-light__choice:hover { border-color:var(--gs-chalk); }
.gs-global-light__choice[aria-pressed="true"] {
  background:var(--gs-chalk);color:var(--gs-ink);border-color:var(--gs-chalk);
}
.atelier-header { background:var(--gs-ink); }
.atelier-mobile-menu { background:var(--gs-ink); }
.atelier-header__menu-btn,.atelier-header__finder-btn { min-width:44px;min-height:44px; }
.director-contact-intro { background:var(--gs-stage);color:var(--gs-chalk); }
.director-contact-intro::before,.director-contact-intro::after { display:none; }
.director-contact-intro h1 { font-size:clamp(2.5rem,5vw,4.4rem); }
.director-contact-intro p,.director-contact-quote :is(label,input,textarea,select),
.quote-preview__intro,.quote-preview__notice { font-size:1rem; }
.director-contact-quote :is(input,textarea,select) { min-height:44px; }
.quote-preview__title em { font-family:inherit;font-style:normal; }
.quote-preview__ticket { background:var(--gs-chalk);color:var(--gs-ink);box-shadow:var(--gs-shadow); }
.quote-preview__ticket::after { display:none; }
@media(max-width:639px) {
  .gs-global-light__choices { width:100%; }
  .gs-global-light__choice { flex:1 1 calc(50% - 8px); }
  .atelier-mobile-menu__link { min-height:48px; }
}
@media(prefers-reduced-motion:reduce) {
  html[data-light] main img:not([src*="favicon"]),
  .gs-global-light__choice { transition:none!important; }
  ::view-transition-old(root),::view-transition-new(root) { animation:none!important; }
}
```

## `src/components/atelier/ClientMotion.tsx`

```tsx
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getBrowserConnection, getPerformanceSignals, shouldUseLiteEffects } from "@/lib/performance";

/** Adaptive performance, browser-native scrolling; no decorative cursor. */
export function ClientMotion() {
  const pathname = useRouterState({ select: state => state.location.pathname });
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = getBrowserConnection();
    const apply = () => {
      document.documentElement.dataset["gsPerformance"] =
        shouldUseLiteEffects(getPerformanceSignals()) ? "lite" : "full";
    };
    apply();
    motion.addEventListener("change", apply);
    connection?.addEventListener?.("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      connection?.removeEventListener?.("change", apply);
      delete document.documentElement.dataset["gsPerformance"];
    };
  }, []);
  useEffect(() => {
    document.body.classList.remove("atelier-menu-locked");
  }, [pathname]);
  return null;
}
```

## `src/components/site/SiteHeader.tsx`

```tsx
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Phone, X, MessageCircle, Search } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

// The searchable directory is requested only when opened, not on every page load.
const FrequencyFinder = lazy(() => import("@/components/atelier/FrequencyFinder").then(module => ({ default: module.FrequencyFinder })));

const navigation = [
  { to: "/", title: "Acasă" },
  { to: "/evenimente", title: "Evenimente" },
  { to: "/servicii", title: "Servicii" },
  { to: "/portofoliu", title: "Portofoliu" },
  { to: "/studio-inregistrari", title: "Studio" },
  { to: "/despre-noi", title: "Despre noi" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderActivated, setFinderActivated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const finderButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const path = useRouterState({ select: state => state.location.pathname });
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setFinderOpen(false);
  }, [path]);

  useEffect(() => {
    // Avoid dispatching React state on every scroll frame; the floating header
    // only needs to know when the 22px threshold changes.
    let aboveThreshold = window.scrollY > 22;
    setScrolled(aboveThreshold);
    const onScroll = () => {
      const next = window.scrollY > 22;
      if (next === aboveThreshold) return;
      aboveThreshold = next;
      setScrolled(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("atelier-menu-locked");
    // Keyboard focus stays inside the expanded menu until it is closed.
    const raf = window.requestAnimationFrame(() =>
      menuPanelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const focusable = Array.from(menuPanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []).filter(element => element.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.cancelAnimationFrame(raf);
      document.body.classList.remove("atelier-menu-locked");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return;
      const key = event.key.toLowerCase();
      const command = (event.metaKey || event.ctrlKey) && key === "k" && !event.altKey;
      const target = event.target;
      const editing = target instanceof Element &&
        Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
      const slash = key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey &&
        !editing && !document.querySelector('[role="dialog"]');
      // Never steal keystrokes from an existing dialog or a form.
      if (!slash && !command) return;
      if (!finderOpen && document.querySelector('[role="dialog"]')) return;
      event.preventDefault();
      setOpen(false);
      setFinderActivated(true);
      setFinderOpen(previous => !previous);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [finderOpen]);

  const onFinderOpenChange = (next: boolean) => {
    // Keep the dialog root mounted after first use; Radix owns close focus.
    setFinderOpen(next);
  };

  return (
    <header ref={headerRef} className={`atelier-header ${scrolled || open ? "atelier-header--scrolled" : ""}`}>
      <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Sari la conținut</a>
      <div className="container-site atelier-header__inner">
        <Logo />
        <nav className="atelier-header__nav" aria-label="Navigare principală">
          {navigation.map((entry) => (
            <Link key={entry.to} to={entry.to} activeOptions={{ exact: entry.to === "/" }}
              activeProps={{ className: "atelier-header__link--active" }} className="atelier-header__link">
              {entry.title}
            </Link>
          ))}
        </nav>
        <div className="atelier-header__actions">
          <button ref={finderButtonRef} type="button" className="atelier-header__finder-btn"
            aria-label="Caută servicii și evenimente" aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K" title="Caută servicii, evenimente și pagini (Ctrl+K)"
            onClick={() => { setOpen(false); setFinderActivated(true); setFinderOpen(true); }}>
            <Search className="size-5" aria-hidden />
            <span className="atelier-header__finder-hint" aria-hidden>⌘K</span>
          </button>
          <a href={business.phoneHref} className="atelier-header__phone" aria-label={`Sună Green Sound Music la ${business.phoneDisplay}`}>
            <Phone className="size-4" aria-hidden /> {business.phoneDisplay}
          </a>
          <Link to="/contact" className="atelier-header__quote">
            Cere ofertă <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button ref={menuButtonRef} type="button" className="atelier-header__menu-btn" aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-controls="atelier-mobile-navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="atelier-menu" ref={menuPanelRef} id="atelier-mobile-navigation" className="atelier-mobile-menu" role="dialog" aria-modal="true" aria-label="Meniu de navigare"
            initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : .2, ease: [.2, .7, .2, 1] }}>
            <nav aria-label="Meniu mobil" className="container-site atelier-mobile-menu__body">
              {navigation.map((entry, index) => (
                <Link key={entry.to} to={entry.to} onClick={() => setOpen(false)} className="atelier-mobile-menu__link">
                  <small>0{index + 1}</small><span>{entry.title}</span><ArrowUpRight className="size-5" aria-hidden />
                </Link>
              ))}
              <div className="atelier-mobile-menu__actions">
                <a href={business.phoneHref}><Phone aria-hidden className="size-5" /> Sună</a>
                <a href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden className="size-5" /> WhatsApp
                </a>
                <Link to="/contact" onClick={() => setOpen(false)}>Cere ofertă</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        {finderActivated && <FrequencyFinder open={finderOpen} onOpenChange={onFinderOpenChange}
          returnFocusRef={finderButtonRef} />}
      </Suspense>
    </header>
  );
}
```

## `src/components/site/SiteFooter.tsx`

```tsx
import { Link } from "@tanstack/react-router";
import { business, navEvents, navServices } from "@/data/site";
import { Logo } from "./Logo";
import { LightDesk } from "./LightDesk";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain border-t border-border bg-ink pb-24 sm:pb-0">
      <div className="container-site overflow-hidden py-16">
        <p aria-hidden className="display-xl select-none whitespace-nowrap text-foreground/[0.06]">
          Culoarea petrecerii tale
        </p>
      </div>
      <div className="container-site grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Muzică, sunet, lumini și efecte pentru evenimente. Firmă din Pitești, activă din {business.founded}.
          </p>
          <address className="space-y-1 text-sm not-italic text-foreground/85">
            <p>
              {business.address.street}, {business.address.city} {business.address.postalCode}, jud. {business.address.region}
            </p>
            <p>
              <a href={business.phoneHref} className="link-underline font-semibold">
                {business.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${business.email}`} className="link-underline">
                {business.email}
              </a>
            </p>
          </address>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Evenimente</h2>
          <ul className="space-y-2.5 text-sm">
            {navEvents.map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="link-underline text-foreground/80 hover:text-foreground">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Servicii</h2>
          <ul className="space-y-2.5 text-sm">
            {navServices.map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="link-underline text-foreground/80 hover:text-foreground">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Green Sound</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/portofoliu" className="link-underline text-foreground/80 hover:text-foreground">Portofoliu</Link></li>
            <li><Link to="/despre-noi" className="link-underline text-foreground/80 hover:text-foreground">Despre noi</Link></li>
            <li><Link to="/contact" className="link-underline text-foreground/80 hover:text-foreground">Contact & ofertă</Link></li>
            <li><Link to="/confidentialitate" className="link-underline text-foreground/80 hover:text-foreground">Confidențialitate</Link></li>
          </ul>
          <h2 className="eyebrow mb-4 mt-8">Urmărește-ne</h2>
          <ul className="flex flex-wrap gap-2">
            {business.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-site gs-global-light-wrap">
        <LightDesk />
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} Green Sound Music. Toate drepturile rezervate.</p>
          <p className="text-base text-[#F3F0E9]">{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
```

## `src/components/site/MobileActionBar.tsx`

```tsx
import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

/** Sticky conversion bar on phones: call, WhatsApp, quote. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-[#0A0F15] pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="grid grid-cols-3">
        <a href={business.phoneHref} className="flex flex-col items-center gap-1 py-3 text-base font-medium">
          <Phone className="size-5 text-primary" aria-hidden />
          Sună
        </a>
        <a
          href={whatsappUrl(defaultWhatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-border py-3 text-base font-medium"
        >
          <MessageCircle className="size-5 text-primary" aria-hidden />
          WhatsApp
        </a>
        <Link to="/contact" className="flex flex-col items-center gap-1 bg-primary py-3 text-base font-semibold text-primary-foreground">
          <FileText className="size-5" aria-hidden />
          Cere ofertă
        </Link>
      </div>
    </div>
  );
}
```

## `src/components/site/Logo.tsx`

```tsx
import { Link } from "@tanstack/react-router";

/** Uses the actual Green Sound project favicon, never a generated placeholder logo. */
export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  return (
    <Link to="/" className="group inline-flex shrink-0 items-center gap-3" aria-label="Green Sound Music — pagina principală">
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#bbefa2]/50 bg-[#071409]">
        <img src="/favicon.png" width={40} height={40} decoding="async" alt="" className="size-full object-contain transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="flex flex-col leading-[1.03]">
        <span className={`font-display text-base font-bold tracking-tight ${tone === "paper" ? "text-paper-foreground" : "text-foreground"}`}>GREEN SOUND</span>
        <span className="mt-1 text-xs font-bold tracking-[.24em] text-[#B8BCB9]">MUSIC</span>
      </span>
    </Link>
  );
}
```

## `src/components/site/LightDesk.tsx`

```tsx
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
```


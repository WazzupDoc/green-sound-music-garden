import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { ClientMotion } from "@/components/atelier/ClientMotion";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-24">
      <div className="max-w-md text-center">
        <p className="serif-accent text-7xl text-primary">404</p>
        <h1 className="display-md mt-4">Pagina nu mai cântă aici</h1>
        <p className="mt-3 text-muted-foreground">Pagina căutată nu există sau a fost mutată.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Pagina principală
          </Link>
          <Link to="/contact" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Pagina nu s-a încărcat</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A apărut o eroare. Încearcă din nou sau revino la pagina principală.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Încearcă din nou
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Pagina principală
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#070c08" },
      { title: "Green Sound Music — DJ, trupă, sonorizare și lumini în Pitești" },
      { name: "description", content: "Muzică, sunet, lumini și efecte pentru evenimente, din Pitești, din 2008." },
      { name: "author", content: "Green Sound Music" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap&subset=latin-ext",
      },
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

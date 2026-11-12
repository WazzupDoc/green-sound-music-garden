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
import "@fontsource-variable/syne/wght.css";
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
      ...(import.meta.env["VITE_SITE_ENV"] !== "production" ? [{ name: "robots", content: "noindex, follow" }] : []),
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

import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * Scroll-reveal for any element with `data-reveal` ("" = fade-up, "mask" = clip reveal, "wave" = bars).
 * Content is visible in the server HTML; motion only switches on after hydration, and anything
 * already on screen at that moment is marked revealed immediately so nothing flashes.
 */
export function RevealObserver() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const html = document.documentElement;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const scan = () => {
      const firstPass = !html.classList.contains("reveal-ready");
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])").forEach((el) => {
        if (firstPass) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            el.setAttribute("data-in", "");
            return;
          }
        }
        io.observe(el);
      });
    };

    scan();
    html.classList.add("reveal-ready");

    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

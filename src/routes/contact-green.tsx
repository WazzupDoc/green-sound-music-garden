import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Real legacy WordPress contact address:
 * https://greensoundmusic.com/contact-green/
 * Preserve bookmarked and indexed links when the new site is deployed.
 * Do not fabricate redirect rules for unverified former page paths.
 */
export const Route = createFileRoute("/contact-green")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
  component: () => null,
});

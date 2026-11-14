import { createFileRoute, notFound } from "@tanstack/react-router";
import { EventPage } from "@/components/site/EventPage";
import { getEvent } from "@/data/site";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/evenimente/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { slug: event.slug };
  },
  head: ({ loaderData }) => {
    const event = loaderData ? getEvent(loaderData.slug) : undefined;
    if (!event) return { meta: [{ title: "Pagină indisponibilă — Green Sound Music" }, { name: "robots", content: "noindex" }] };
    const path = `/evenimente/${event.slug}`;
    return pageHead({
      title: event.seoTitle,
      description: event.seoDescription,
      image: event.image,
      path,
      jsonLd: [
        breadcrumbLd([
          { name: "Acasă", path: "/" },
          { name: "Evenimente", path: "/evenimente" },
          { name: event.name, path },
        ]),
        ...(event.faqs.length ? [faqLd(event.faqs)] : []),
      ],
    });
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const event = getEvent(slug)!;
  return <EventPage event={event} />;
}

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITE_URL, events, images, services } from "@/data/site";
import { pageHead, serializeJsonLd } from "./seo";

/** Canonical business pages only; no query variants, invented city pages or 404s. */
const editorialPaths = [
  "/", "/servicii/", "/evenimente/", "/portofoliu/",
  "/despre-noi/", "/contact/", "/confidentialitate/",
];

describe("search discovery: genuine sitemap and shared preview", () => {
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const robots = readFileSync("public/robots.txt", "utf8");
  const expected = [
    ...editorialPaths,
    ...services.map(service => `/${service.slug}/`),
    ...events.map(event => `/evenimente/${event.slug}/`),
  ].map(path => SITE_URL + path);

  it("lists exactly the verified indexable routes once with canonical trailing slashes", () => {
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]!);
    expect(urls).toHaveLength(20);
    expect(new Set(urls).size).toBe(urls.length);
    expect(new Set(urls)).toEqual(new Set(expected));
    expect(urls.every(url => url.startsWith("https://greensoundmusic.com/"))).toBe(true);
    expect(urls.every(url => !url.includes("?") && !url.includes("#"))).toBe(true);
  });

  it("omits unverified lastmod dates and exposes the sitemap in robots.txt", () => {
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(sitemap).not.toContain("<lastmod>");
    expect(robots).toMatch(/^Sitemap: https:\/\/greensoundmusic\.com\/sitemap\.xml$/m);
    expect(robots).not.toMatch(/^Disallow: \/$/m);
  });

  it("supplies an actual first-party Open Graph and Twitter preview for every page", () => {
    const title = "DJ și muzică pentru evenimente | Green Sound Music";
    const h = pageHead({ title, description: "Sonorizare și lumini la evenimente.", path: "/servicii" });
    const meta = h.meta;
    const get = (key: string) => {
      const hit = meta.find(m =>
        ("property" in m && m.property === key) || ("name" in m && m.name === key));
      return hit && "content" in hit ? hit.content : undefined;
    };
    const expectedImage = SITE_URL + images.concert.src;
    expect(get("og:image")).toBe(expectedImage);
    expect(get("twitter:image")).toBe(expectedImage);
    expect(get("og:image:alt")).toBe(images.concert.alt);
    expect(get("og:image:width")).toBe(String(images.concert.w));
    expect(get("og:image:height")).toBe(String(images.concert.h));
    expect(h.links).toContainEqual({ rel: "canonical", href: SITE_URL + "/servicii/" });
    expect(get("og:url")).toBe(SITE_URL + "/servicii/");
  });

  it("supports genuine page-specific service/event photography without changing canonicals", () => {
    const chosen = services[0]!;
    const h = pageHead({
      title: chosen.seoTitle,
      description: chosen.seoDescription,
      path: "/" + chosen.slug,
      image: chosen.image,
    });
    const preview = h.meta.find(m => "property" in m && m.property === "og:image");
    expect(preview && "content" in preview ? preview.content : undefined)
      .toBe(new URL(chosen.image.src, SITE_URL).href);
    expect(h.links[0]?.href).toBe(SITE_URL + "/" + chosen.slug + "/");
  });
});


describe("safe SSR JSON-LD serialization", () => {
  it("escapes script terminators and HTML-sensitive characters without losing schema data", () => {
    const malicious = '</script><script>alert("x")</script> & \u2028 \u2029';
    const encoded = serializeJsonLd({ "@type": "Service", name: malicious });
    expect(encoded).not.toContain("<");
    expect(encoded).not.toContain(">");
    expect(encoded).not.toContain("&");
    expect(encoded).not.toContain("\u2028");
    expect(encoded).not.toContain("\u2029");
    expect(JSON.parse(encoded)).toEqual({ "@type": "Service", name: malicious });
  });

  it("uses safe serialization in the actual page head scripts", () => {
    const payload = { "@context": "https://schema.org", name: "</script><img src=x>" };
    const head = pageHead({ title: "Test", description: "Test", path: "/", jsonLd: [payload] });
    expect(head.scripts[0]?.children).toBe(serializeJsonLd(payload));
  });
});

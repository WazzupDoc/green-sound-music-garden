const assert = require("node:assert/strict");
const { chromium } = require("playwright");

/**
 * V38 / SEO + navigation release gate for the *development preview*, not the
 * currently deployed WordPress site. The sitemap defines the real 20 routes.
 * No analytics credentials, private APIs, personal data or external SEO service.
 */
const origin = "http://127.0.0.1:4175";
const site = "https://greensoundmusic.com";
const normalizePath = path => path === "/" ? "/" : path.replace(/\/+$/, "") + "/";

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    const sitemap = await page.request.get(origin + "/sitemap.xml", { timeout: 15000 });
    assert.equal(sitemap.status(), 200, "sitemap.xml must return HTTP 200");
    const content = await sitemap.text();
    const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(hit => hit[1]);
    assert.equal(urls.length, 20, "expected twenty editorial and service routes");
    assert.equal(new Set(urls).size, 20, "all sitemap URLs must be unique");

    const paths = new Set(urls.map(url => normalizePath(new URL(url).pathname)));
    const assets = new Set();
    const brokenLinks = new Map();
    const summaries = [];

    for (const absolute of urls) {
      assert.ok(absolute.startsWith(site + "/"), "sitemap uses the declared canonical origin");
      const path = normalizePath(new URL(absolute).pathname);
      const response = await page.goto(origin + path, { waitUntil: "domcontentloaded", timeout: 30000 });
      assert.equal(response?.status(), 200, path + " must return a real HTTP 200");

      const snapshot = await page.evaluate(() => {
        const meta = (selector) => document.head.querySelector(selector)?.getAttribute("content") ?? "";
        return {
          documentTitle: document.title,
          h1: [...document.querySelectorAll("main h1")].map(node => node.textContent?.trim() ?? ""),
          description: meta('meta[name="description"]'),
          ogTitle: meta('meta[property="og:title"]'),
          ogDescription: meta('meta[property="og:description"]'),
          ogImage: meta('meta[property="og:image"]'),
          twitterImage: meta('meta[name="twitter:image"]'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
          structured: [...document.querySelectorAll('script[type="application/ld+json"]')]
            .map(node => node.textContent ?? ""),
          links: [...document.querySelectorAll('main a[href], header a[href], footer a[href]')]
            .map(link => link.getAttribute("href") ?? ""),
          images: [...document.querySelectorAll('img[src^="/media/greensound/"]')]
            .map(node => node.getAttribute("src") ?? ""),
        };
      });
      assert.equal(snapshot.h1.length, 1, path + " must have exactly one meaningful H1");
      assert.ok(snapshot.h1[0].length >= 10, path + " H1 is not descriptive");
      assert.ok(snapshot.documentTitle.includes("Green Sound"), path + " title must retain the verified brand");
      assert.ok(snapshot.description.length >= 70, path + " needs an explanatory meta description");
      assert.equal(snapshot.canonical, absolute, path + " canonical must agree with sitemap URL");
      assert.equal(snapshot.ogTitle, snapshot.documentTitle, path + " Open Graph title must match document title");
      assert.equal(snapshot.ogDescription, snapshot.description, path + " Open Graph text must match metadata");
      assert.ok(snapshot.ogImage.startsWith("https://"), path + " OG image must be absolute HTTPS");
      assert.equal(snapshot.ogImage, snapshot.twitterImage, path + " Twitter image should match OG image");
      assert.ok(snapshot.structured.length >= 1, path + " requires business-relevant structured data");
      for (const raw of snapshot.structured) {
        const schema = JSON.parse(raw);
        assert.ok(schema["@context"] === "https://schema.org", path + " structured data needs actual schema.org context");
      }
      for (const asset of snapshot.images) assets.add(asset);
      for (const href of snapshot.links) {
        if (!href || href.startsWith("#") || /^(mailto:|tel:|sms:|javascript:)/i.test(href)) continue;
        let target;
        try { target = new URL(href, origin + path); } catch { continue; }
        if (target.origin !== origin) continue;
        const resolved = normalizePath(target.pathname);
        // Assets and one-page anchors are not cross-page navigation targets.
        if (/\.[a-z0-9]{2,6}$/i.test(resolved)) continue;
        if (!paths.has(resolved)) {
          const key = path + " → " + href;
          brokenLinks.set(key, (brokenLinks.get(key) ?? 0) + 1);
        }
      }
      summaries.push({ path, h1: snapshot.h1[0], ld: snapshot.structured.length });
    }

    assert.deepEqual([...brokenLinks.keys()], [], "Every first-party page link must resolve to an actual sitemap route");

    for (const asset of assets) {
      const response = await page.request.get(origin + asset, { timeout: 15000 });
      assert.equal(response.status(), 200, "The referenced original Green Sound photo is missing: " + asset);
      assert.match(response.headers()["content-type"] ?? "", /^image\//i, "Photo serves valid image content: " + asset);
    }

    console.log("PASS V38 site-wide audit: " + summaries.length +
      " canonical pages with HTTP 200, unique H1, brand titles, SEO metadata, OG/Twitter images, safe JSON-LD, " +
      "no broken first-party links, " + assets.size + " existing first-party images.");
    console.log("Path + structured-data count (no private visitor data):");
    summaries.forEach(item => console.log(item.path + " · schema " + item.ld));
  } finally {
    await page.close();
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

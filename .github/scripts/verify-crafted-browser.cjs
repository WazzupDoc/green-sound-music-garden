// V76: audit the actual V48 editorial homepage, not the retired Regia homepage.
// The separate verify-regia.cjs remains intact for its own design branch.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const base = "http://127.0.0.1:4175";
const widths = [360, 390, 430, 768, 1440, 1920];
const output = "screenshots/crafted-atmospheres";
fs.mkdirSync(output, { recursive: true });

async function noOverflow(page, route, width) {
  const dims = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  assert(dims.scroll <= dims.client + 2,
    `Horizontal overflow at ${route} / ${width}px: ${JSON.stringify(dims)}`);
}

async function main() {
  const browser = await chromium.launch({
    headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    for (const width of widths) {
      const page = await browser.newPage({
        viewport: { width, height: 900 }, reducedMotion: "reduce",
      });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(base + "/", {
        waitUntil: "domcontentloaded", timeout: 45000,
      });
      assert.equal(response.status(), 200);
      await page.locator(".crafted-hero h1").waitFor({ timeout: 15000 });
      // Wait for the React event handlers before clicking a server-rendered film control.
      // A DOMContentLoaded-only screenshot can show the SSR UI before hydration.
      await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({ timeout: 15000 });
      assert.equal(await page.locator("main h1").count(), 1);
      assert.equal(await page.locator(".gs-index__chapter").count(), 3);
      assert.equal(await page.locator(".gs-index__service").count(), 8);
      assert.equal(await page.locator(".director-reel__choice").count(), 3);
      assert.equal(await page.locator(".crafted-finale__link").count(), 1);
      assert.equal(await page.locator("main form").count(), 0);
      assert.equal(await page.locator(".rs-programme__choice").count(), 0);
      assert.equal(await page.locator("video[autoplay]").count(), 0);
      await noOverflow(page, "/", width);
      await page.screenshot({
        path: `${output}/editorial-home-${width}.png`,
        fullPage: true, animations: "disabled",
      });
      const film = page.locator(".director-reel__choice").nth(1);
      await film.click();
      assert.equal(await film.getAttribute("aria-pressed"), "true");
      await page.keyboard.press("Tab");
      assert.deepEqual(errors, [], `Browser errors at ${width}px`);
      await page.close();
    }

    const page = await browser.newPage({
      viewport: { width: 390, height: 844 }, reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of ["/servicii", "/evenimente", "/portofoliu", "/contact",
      "/despre-noi", "/confidentialitate"]) {
      const response = await page.goto(base + route, { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200, `HTTP ${route}`);
      assert.equal(await page.locator("main h1").count(), 1, `H1 ${route}`);
      await noOverflow(page, route, 390);
    }
    const contact = await page.goto(base + "/contact", { waitUntil: "domcontentloaded" });
    assert.equal(contact.status(), 200);
    await page.locator("form[aria-label='Cerere de ofertă']").waitFor();
    const sitemap = await page.request.get(base + "/sitemap.xml");
    assert.equal(sitemap.status(), 200);
    assert.match(await sitemap.text(), /<loc>/);
    assert.deepEqual(errors, [], "Secondary route browser errors");
    await page.close();
    console.log("PASS V76 editorial browser: six widths, 3 chapters/8 links, 3 real film choices, single finale CTA, no autoplay, secondary routes, Contact, sitemap");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

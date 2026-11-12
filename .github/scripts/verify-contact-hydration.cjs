// V45: direct-link SSR -> hydration contract for the real Contact flow.
// Uses the Chromium installation already provisioned by the quality workflow.
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const origin = "http://127.0.0.1:4175";
(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    for (const width of [360, 390, 430, 768, 1440, 1920]) {
      const page = await browser.newPage({ viewport: { width, height: width <= 430 ? 780 : 900 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => {
        if (message.type() === "error") errors.push(message.text());
        if (message.type() === "warning" && /hydration|did not match|server html/i.test(message.text())) errors.push(message.text());
      });
      const url = origin + "/contact?date=2027-07-18&location=Pite%C8%99ti&utm_source=regression#cerere-oferta";
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      assert.equal(response?.status(), 200, "Contact direct navigation must respond HTTP 200");
      assert.equal(await page.locator("main h1").count(), 1, "Exactly one Contact H1");
      await page.locator('form[aria-label="Cerere de ofertă"]').waitFor({ timeout: 30000 });
      await page.waitForFunction(() =>
        document.querySelector("#q-date")?.value === "2027-07-18" &&
        document.querySelector("#q-location")?.value === "Pitești",
        null, { timeout: 15000 });
      assert.equal(await page.locator('head link[rel="canonical"]').getAttribute("href"),
        "https://greensoundmusic.com/contact/", "Tracking query must not pollute canonical URL");
      assert.equal(await page.locator('head meta[property="og:url"]').getAttribute("content"),
        "https://greensoundmusic.com/contact/", "OG URL must agree with canonical");
      assert.equal(await page.locator('form[aria-label="Cerere de ofertă"]').count(), 1,
        "Hydration must not duplicate the form");
      // V48: ensure the form remains usable at every supported viewport, not just mounted.
      const viewportAudit = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        dateVisible: (() => { const el = document.querySelector("#q-date"); if (!el) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= window.innerWidth + 1; })(),
        locationVisible: (() => { const el = document.querySelector("#q-location"); if (!el) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= window.innerWidth + 1; })()
      }));
      assert.ok(viewportAudit.scrollWidth <= viewportAudit.innerWidth + 1,
        "Contact must not create horizontal page overflow at " + width + "px: " + JSON.stringify(viewportAudit));
      assert.ok(viewportAudit.dateVisible && viewportAudit.locationVisible,
        "Date and location inputs must remain inside the viewport at " + width + "px");
      await page.locator("#q-location").focus();
      assert.equal(await page.evaluate(() => document.activeElement?.id), "q-location",
        "Location input must be keyboard focusable at " + width + "px");
      assert.deepEqual(errors, [], "No React hydration or browser console errors at " + width + "px");
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForFunction(() =>
        document.querySelector("#q-date")?.value === "2027-07-18" &&
        document.querySelector("#q-location")?.value === "Pitești",
        null, { timeout: 30000 });
      assert.equal(await page.locator('form[aria-label="Cerere de ofertă"]').count(), 1, "Reload must mount exactly one form at " + width + "px");
      assert.equal(await page.locator('head link[rel="canonical"]').getAttribute("href"), "https://greensoundmusic.com/contact/", "Reload canonical at " + width + "px");
      assert.equal(await page.locator('head meta[property="og:url"]').getAttribute("content"), "https://greensoundmusic.com/contact/", "Reload OG URL at " + width + "px");
      assert.deepEqual(errors, [], "Reload must preserve prefill without hydration errors at " + width + "px");
      await page.close();
    }
    // V47: canonical metadata and the Contact heading must exist in SSR HTML,
    // not only after client-side JavaScript has run. This catches crawler-visible regressions.
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await noJs.newPage();
      const response = await page.goto(origin + "/contact?date=2027-07-18&utm_source=seo-audit#cerere-oferta",
        { waitUntil: "domcontentloaded", timeout: 45000 });
      assert.equal(response?.status(), 200, "No-JS Contact SSR must respond HTTP 200");
      assert.equal(await page.locator("main h1").count(), 1, "Contact H1 must be server rendered");
      assert.equal(await page.locator('head link[rel="canonical"]').count(), 1, "SSR must provide exactly one canonical");
      assert.equal(await page.locator('head meta[property="og:url"]').count(), 1, "SSR must provide exactly one OG URL");
      assert.equal(await page.locator('head link[rel="canonical"]').getAttribute("href"),
        "https://greensoundmusic.com/contact/", "No-JS SSR canonical must exclude tracking and fragments");
      assert.equal(await page.locator('head meta[property="og:url"]').getAttribute("content"),
        "https://greensoundmusic.com/contact/", "No-JS SSR Open Graph URL must match canonical");
      await page.close();
    } finally { await noJs.close(); }
    console.log("PASS V48: six-width Contact hydration, viewport/keyboard usability and no-JS SSR metadata");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

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
    console.log("PASS V46: Contact direct navigation/reload, prefill, canonical/OG and hydration at 360/390/430/768/1440/1920");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

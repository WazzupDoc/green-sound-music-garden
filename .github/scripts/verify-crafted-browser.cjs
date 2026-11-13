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
      // Load the actual LOCAL event photographs before taking visual evidence.
      // Full-page screenshots do not reliably trigger lazy images below the fold.
      const photos = await page.locator(".gs-index__photo img").evaluateAll(async imgs => {
        for (const img of imgs) img.loading = "eager";
        await Promise.all(imgs.map(img => img.decode().catch(() => null)));
        return imgs.map(img => ({ width: img.naturalWidth, src: img.currentSrc }));
      });
      assert.equal(photos.length, 3, "Three authored editorial chapter photographs");
      assert(photos.every(img => img.width > 0),
        `Broken or undownloaded service photograph at ${width}px: ${JSON.stringify(photos)}`);
      assert.equal(await page.locator(".gs-index__signal-ledger").count(), 3,
        "One original Green Sound channel engraving per chapter");
      assert.equal(await page.locator(".gs-index__routing").count(), 3);

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
      if (width === 390 || width === 1440) {
        await page.locator(".gs-index__chapters").screenshot({
          path: `${output}/service-ledger-${width}-static.png`,
          animations: "disabled",
        });
      }

      const film = page.locator(".director-reel__choice").nth(1);
      await film.click();
      assert.equal(await film.getAttribute("aria-pressed"), "true");
      await page.keyboard.press("Tab");
      // V81: real native modal navigation / focus / Escape at every mobile-tablet width.
      if (width <= 768) {
        const menuButton = page.locator(".atelier-header__menu-btn");
        await menuButton.click();
        const dialog = page.locator("dialog.atelier-mobile-menu[open]");
        await dialog.waitFor({ timeout: 8000 });
        assert.equal(await dialog.evaluate(element => element.matches(":modal")), true,
          "Menu must be a real top-layer modal, not a role-only overlay");
        assert.equal(await dialog.locator(".gsm-nav-index__link").count(), 6);
        assert.equal(await page.evaluate(() => document.activeElement?.closest("dialog") !== null), true,
          "Initial focus must move inside the menu");
        assert.equal(await page.locator("body").evaluate(element => element.classList.contains("atelier-menu-locked")), true);
        await noOverflow(page, "open stage index", width);
        await page.screenshot({
          path: `${output}/stage-index-open-${width}.png`,
          fullPage: false, animations: "disabled",
        });
        await page.keyboard.press("Tab");
        assert.equal(await page.evaluate(() => document.activeElement?.closest("dialog") !== null), true,
          "Tab must stay within the native modal");
        await page.keyboard.press("Escape");
        await dialog.waitFor({ state: "hidden", timeout: 8000 });
        await page.waitForFunction(() =>
          document.activeElement === document.querySelector(".atelier-header__menu-btn"));
        assert.equal(await menuButton.getAttribute("aria-expanded"), "false");
      }
      assert.deepEqual(errors, [], `Browser errors at ${width}px`);
      await page.close();
    }

    // Real full-motion state: compositor entrance animation must be present,
    // but reduced-motion / Lite snapshots stay static.
    const activePage = await browser.newPage({
      viewport: { width: 390, height: 844 }, reducedMotion: "no-preference",
    });
    await activePage.goto(base + "/", { waitUntil: "domcontentloaded" });
    await activePage.locator('.crafted-hero[data-hydrated="true"]').waitFor();
    await activePage.locator(".atelier-header__menu-btn").click();
    await activePage.locator("dialog.atelier-mobile-menu[open]").waitFor();
    const animationName = await activePage.locator(".gsm-nav-index__layout")
      .evaluate(element => getComputedStyle(element).animationName);
    assert.match(animationName, /gsm-nav-reveal/, "Full-motion menu entrance must be active");
    await activePage.screenshot({
      path: `${output}/stage-index-motion-390.png`, animations: "allow",
    });
    await activePage.evaluate(() =>
      document.documentElement.setAttribute("data-gs-performance", "lite"));
    const liteAnimation = await activePage.locator(".gsm-nav-index__layout")
      .evaluate(element => getComputedStyle(element).animationName);
    assert.equal(liteAnimation, "none", "Lite must suppress navigation animation");
    await activePage.screenshot({
      path: `${output}/stage-index-lite-390.png`, animations: "disabled",
    });

    // The decorative meters only move on a genuine pointer/focus action
    // in full-motion mode; they are neither background autoplay nor audio-driven.
    await activePage.locator("dialog.atelier-mobile-menu[open]")
      .evaluate(dialog => dialog.close());
    await activePage.evaluate(() => document.documentElement.removeAttribute("data-gs-performance"));
    await activePage.locator(".gs-index__service").first().focus();
    const meterMotion = await activePage.locator(".gs-index__signal-ledger-bars i").first()
      .evaluate(element => getComputedStyle(element).animationName);
    assert.match(meterMotion, /gs-index-meter-pulse/,
      "Focus must reveal the opt-in channel gesture when full motion is allowed");
    await activePage.screenshot({
      path: `${output}/service-ledger-motion-390.png`,
      animations: "allow",
    });
    await activePage.evaluate(() =>
      document.documentElement.setAttribute("data-gs-performance", "lite"));
    const liteMeter = await activePage.locator(".gs-index__signal-ledger-bars i").first()
      .evaluate(element => getComputedStyle(element).animationName);
    assert.equal(liteMeter, "none", "Lite must eliminate the channel meter animation");
    await activePage.close();

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
    console.log("PASS V83 service photos loaded + 3 unique signal engravings + motion/Lite, V81 editorial modal browser: six widths, 3 chapters/8 links, 3 real film choices, single finale CTA, no autoplay, secondary routes, Contact, sitemap");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

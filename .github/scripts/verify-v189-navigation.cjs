// V189 — real Chromium before/after at identical route, viewport and focus state.
// Baseline server: V188 at :4176. Candidate server: V189 at :4175.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");

const out = "screenshots/gs-v189-navigation";
fs.mkdirSync(out, { recursive: true });
const widths = [360, 390, 430, 768, 1440, 1920];

async function openMenu(browser, base, width, reducedMotion = "reduce") {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion,
  });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto(base, { waitUntil: "domcontentloaded", timeout: 45000 });
  assert.equal(response.status(), 200, base + " must return HTTP 200");
  await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({ timeout: 20000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  if (width > 1100) {
    // Desktop menu is deliberately reachable for design audit only.
    // This stylesheet changes the test viewport, never the repo's UX.
    await page.addStyleTag({ content: ".atelier-header__menu-btn{display:inline-flex!important}" });
  }
  await page.locator(".atelier-header__menu-btn").click();
  const dialog = page.locator("dialog.atelier-mobile-menu[open]");
  await dialog.waitFor({ timeout: 8000 });
  assert.equal(await dialog.evaluate(el => el.matches(":modal")), true);
  assert.equal(await dialog.locator(".gsm-nav-index__link").count(), 6);
  assert.deepEqual(errors, [], "No runtime errors on " + base + " at " + width);
  return { page, dialog };
}

async function commonFocus(page, dialog, label) {
  await dialog.locator(".gsm-nav-index__link").nth(2).focus();
  assert.equal(await dialog.locator(".gsm-nav-index__cue strong").innerText(), "Servicii");
  await page.screenshot({
    path: out + "/" + label + ".png",
    fullPage: false, animations: "disabled",
  });
  const frame = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  assert(frame.scrollWidth <= frame.clientWidth + 2, label + " overflow " + JSON.stringify(frame));
}

(async () => {
  const browser = await chromium.launch({
    headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    // Matched baseline vs candidate: same route, width, height, reduced motion and focused service link.
    for (const width of [390, 1440]) {
      const before = await openMenu(browser, "http://127.0.0.1:4176/", width);
      await commonFocus(before.page, before.dialog, "before-v188-" + width);
      await before.page.close();
      const after = await openMenu(browser, "http://127.0.0.1:4175/", width);
      await commonFocus(after.page, after.dialog, "after-v189-" + width);
      assert.equal(await after.dialog.locator('[data-preview="true"]').count(), 1);
      assert.equal(await after.dialog.locator('[data-preview="true"] .gsm-nav-index__link').innerText().then(s => s.includes("Servicii")), true);
      const bars = after.dialog.locator(".gsm189-channel");
      assert.equal(await bars.count(), 6, "V189 must show a signal meter per real route");
      if (width === 390) {
        const cue = after.dialog.locator(".gsm189-mobile-current");
        assert.equal(await cue.isVisible(), true);
        assert.match(await cue.innerText(), /SERVICII|Muzică/i);
      }
      await after.page.keyboard.press("ArrowDown");
      assert.equal(await after.page.evaluate(() => document.activeElement?.textContent?.includes("Portofoliu")), true);
      await after.page.keyboard.press("Home");
      assert.equal(await after.page.evaluate(() => document.activeElement?.textContent?.includes("Acasă")), true);
      await after.page.keyboard.press("End");
      assert.equal(await after.page.evaluate(() => document.activeElement?.textContent?.includes("Despre noi")), true);
      await after.page.keyboard.press("Escape");
      await after.dialog.waitFor({ state: "hidden", timeout: 8000 });
      await after.page.waitForFunction(() =>
        document.activeElement === document.querySelector(".atelier-header__menu-btn"));
      await after.page.close();
    }

    // Regression across all requested widths with real computed style, not source-string assertions.
    for (const width of widths) {
      const { page, dialog } = await openMenu(browser, "http://127.0.0.1:4175/", width);
      await dialog.locator(".gsm-nav-index__link").nth(1).focus();
      assert.equal(await dialog.locator(".gsm-nav-index__cue strong").innerText(), "Evenimente");
      await page.screenshot({
        path: out + "/candidate-" + width + ".png",
        animations: "disabled", fullPage: false,
      });
      const animation = await dialog.locator(".gsm189-channel i").first()
        .evaluate(el => getComputedStyle(el).animationName);
      assert.equal(animation, "none", "Reduced motion must stop level bars");
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      await page.close();
    }

    // Two real states to prove that signal meter moves only in full-motion, not in Lite.
    const moving = await openMenu(browser, "http://127.0.0.1:4175/", 390, "no-preference");
    await moving.page.evaluate(() => document.documentElement.removeAttribute("data-gs-performance"));
    const link = moving.dialog.locator(".gsm-nav-index__link").nth(1);
    await link.hover();
    const movingName = await link.locator(".gsm189-channel i").first()
      .evaluate(el => getComputedStyle(el).animationName);
    assert.match(movingName, /gsm189-levels/, "Active signal channel should animate in full-motion");
    await moving.page.screenshot({ path: out + "/motion-full-390.png", animations: "allow" });
    await moving.page.evaluate(() => document.documentElement.setAttribute("data-gs-performance", "lite"));
    const liteName = await link.locator(".gsm189-channel i").first()
      .evaluate(el => getComputedStyle(el).animationName);
    assert.equal(liteName, "none", "Lite signal channel must be static");
    await moving.page.screenshot({ path: out + "/motion-lite-390.png", animations: "disabled" });
    await moving.page.close();
    console.log("PASS V189 real Chromium matched 390/1440 before-after; six widths; keyboard, motion, Lite");
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

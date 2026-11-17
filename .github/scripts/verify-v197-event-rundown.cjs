/* V197 / actual Chromium. Matched before-after same route, viewport and scroll state. */
const fs = require("node:fs");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { chromium } = require("playwright");
const dir = "screenshots/gs-v197-events";
fs.mkdirSync(dir, {recursive: true});
const hash = name => crypto.createHash("sha256").update(fs.readFileSync(dir + "/" + name)).digest("hex");
(async () => {
  const browser = await chromium.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  try {
    for (const [phase, port, widths] of [
      ["before", 4176, [390, 1440]],
      ["after", 4175, [360, 390, 430, 768, 1440, 1920]]
    ]) {
      for (const width of widths) {
        const page = await browser.newPage({viewport: {width, height: 900}, deviceScaleFactor: 1, reducedMotion: "reduce"});
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        const response = await page.goto("http://127.0.0.1:" + port + "/evenimente/nunti", {waitUntil: "domcontentloaded", timeout: 45000});
        assert.equal(response.status(), 200, phase + " HTTP 200");
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator("main h1").count(), 1);
        assert.equal(await page.locator(".rs-event-timeline li").count() > 1, true);
        const heroImage = await page.locator(".rs-inner-hero__image img").evaluate(async img => {
          await img.decode();
          return {width: img.naturalWidth, height: img.naturalHeight};
        });
        assert(heroImage.width > 0 && heroImage.height > 0, "Real owner image decoded");
        const overflow = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          client: document.documentElement.clientWidth
        }));
        assert(overflow.scroll <= overflow.client + 2, phase + " overflow at " + width + ": " + JSON.stringify(overflow));
        const section = page.locator(".rs-event-timeline");
        await section.scrollIntoViewIfNeeded();
        await page.evaluate(() => document.querySelector(".rs-event-timeline").scrollIntoView({block:"start",behavior:"instant"}));
        await page.screenshot({path: dir + "/" + phase + "-rundown-viewport-" + width + ".png", animations: "disabled"});
        if (width === 390 || width === 1440) {
          await section.screenshot({path: dir + "/" + phase + "-rundown-section-" + width + ".png", animations: "disabled"});
        }
        if (phase === "after") {
          const computed = await page.locator(".rs-event-timeline > .container-site").evaluate(el => getComputedStyle(el).display);
          assert.equal(computed, "grid", "V197 SSR CSS must visibly apply");
          const heading = await page.locator("#desfasurator-titlu").innerText();
          assert.match(heading, /ultimul moment/i);
          assert.equal(await section.locator("h3").count(), await section.locator(".rs-event-timeline__counter").count());
          const jumps = await page.locator(".rs-inner-hero__actions a[href='#desfasurator-eveniment']").count();
          assert.equal(jumps, 1, "Original event navigation preserved");
          await page.locator(".rs-inner-hero__actions a[href='#desfasurator-eveniment']").click();
          assert.equal(await section.evaluate(el => document.activeElement === el), true, "Keyboard focus moved to timeline");
          const links = await section.locator("li a").evaluateAll(items => items.map(link => ({href:link.getAttribute("href"), label:link.textContent.trim()})));
          assert(links.every(link => link.href && link.href.startsWith("/") && link.label.length > 6));
          const motion = await section.locator("li").first().evaluate(el => getComputedStyle(el).animationName);
          assert.equal(motion, "none", "Reduced motion has no timeline animation");
          await page.evaluate(() => document.documentElement.setAttribute("data-gs-performance", "lite"));
          assert.equal(await section.locator("li").first().evaluate(el => getComputedStyle(el).animationName), "none");
        }
        assert.deepEqual(errors, [], phase + " page errors " + width);
        console.log("PASS", phase, width, "hero_image", heroImage.width, heroImage.height);
        await page.close();
      }
    }
    for (const width of [390, 1440]) {
      const before = hash("before-rundown-viewport-" + width + ".png");
      const after = hash("after-rundown-viewport-" + width + ".png");
      assert.notEqual(before, after, "No visual difference in matched " + width + "px view");
      console.log("DIFFERENT matched real-browser screenshots at", width);
    }
    const noJs = await browser.newContext({javaScriptEnabled: false, viewport: {width: 390, height: 900}});
    const page = await noJs.newPage();
    assert.equal((await page.goto("http://127.0.0.1:4175/evenimente/nunti", {waitUntil:"domcontentloaded"})).status(), 200);
    assert(await page.locator(".gs197-event-page .rs-event-timeline li").count() > 1, "SSR without JS");
    await noJs.close();
  } finally { await browser.close(); }
})().catch(error => {console.error(error); process.exitCode = 1;});

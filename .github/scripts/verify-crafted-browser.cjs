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
      assert.equal(await page.locator(".gs-index__signal-ledger").count(), 0,
        "V86 removed decorative fake signal badges, not merely CSS-hidden");
      assert.equal(await page.locator(".gs-index__routing").count(), 0);
      assert.equal(await page.locator(".gs-home-v86").count(), 1,
        "Only V86 scoped homepage art direction must render");
      const h1Text = await page.locator(".crafted-hero h1").innerText();
      assert.match(h1Text,/EVENIMENTE/, "New event-first headline actually renders");
      assert.match(h1Text,/NEUITAT/, "New green oversized second line actually renders");
      const heroHeight = (await page.locator(".crafted-hero").boundingBox())?.height ?? Infinity;
      if(width===1440) {
        assert(heroHeight < 790,
          `V89 hero must be more compact than previous 900px concepts: ${heroHeight}px`);
      }
      assert.equal(await page.locator(".gs-index__photo img").count(),3);
      assert.equal(await page.locator(".gs-v86__graphic svg").count(), 1,
        "Original Green Sound signal mark must be in the hydrated hero");
      assert.equal(await page.locator(".gs-production-deck-v85").count(), 0,
        "Oversized fake hardware must not render in the V86 first screen");
      if(width===1440){
        const indexHeight = (await page.locator(".gs-index").boundingBox())?.height ?? Infinity;
        assert(indexHeight < 1120,
          `V89 should end service chapter within approximately 1 viewport: ${indexHeight}px`);
      }
      const serviceBg = await page.locator(".gs-index").evaluate(el => getComputedStyle(el).backgroundColor);
      assert.equal(serviceBg, "rgb(6, 25, 17)",
        "V89 compact event programme must be visible, not the prior V86 styling");
      if (width >= 1100) {
        const rects = await Promise.all(["sound", "stage", "people"].map(key =>
          page.locator(`.gs-index__chapter[data-chapter="${key}"]`).boundingBox()
        ));
        assert(rects.every(Boolean) &&
          rects[0].x + 65 < rects[1].x &&
          Math.abs(rects[1].x - rects[2].x) < 10 &&
          rects[0].height > rects[1].height * 1.4,
          "Featured chapter on left must span two editorial rows, 2 compact acts stacked on right");
        const stagePhoto = await page.locator(".gs-production-backdrop-v85").evaluate(async img => {
          img.loading = "eager";
          await img.decode().catch(() => null);
          return { width: img.naturalWidth, height: img.naturalHeight };
        });
        assert(stagePhoto.width > 0 && stagePhoto.height > 0, "Real green stage photo must load in hero");
      }
      assert.equal(await page.locator('.crafted-hero__actions a[href="/contact"]').count(), 1,
        "Visible hero offer CTA should lead directly to the working Contact flow");
      if (width <= 640) {
        const sceneLink=page.locator(".scene-console__link");
        assert.equal(await sceneLink.isVisible(),true,
          "Mobile event detail link must remain genuinely usable");
        const bulkyCopy = await page.locator(".scene-console__content h2").isVisible();
        assert.equal(bulkyCopy,false,
          "Mobile scene notes must be a compact deep-link, not a duplicate block");
        const heroBox=await page.locator(".crafted-hero").boundingBox();
        if (width === 390) {
          assert(heroBox && heroBox.height < 970,
            `V86 mobile hero must not consume the first 1000px again: ${heroBox?.height}`);
        }
      }


      assert.equal(await page.locator(".director-reel__choice").count(), 3);
      const filmPosters = await page.locator(".director-reel__choice .gs-v87-film-thumb img")
        .evaluateAll(async imgs => {
          for(const img of imgs) img.loading="eager";
          await Promise.all(imgs.map(img => img.decode().catch(() => null)));
          return imgs.map(img=>({w:img.naturalWidth,src:img.currentSrc}));
        });
      assert.equal(filmPosters.length,3,"V87 has 3 authentic published video poster selections");
      assert(filmPosters.every(p=>p.w>0 && p.src.includes("/media/greensound/")),
        `V87 film posters must decode from actual site-owned media: ${JSON.stringify(filmPosters)}`);

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
        await page.screenshot({
          path: `${output}/premium-v89-home-${width}.png`,
          fullPage: true, animations: "disabled"
        });
        await page.locator(".crafted-hero").screenshot({
          path: `${output}/premium-v89-hero-${width}.png`,
          animations: "disabled"
        });
        await page.locator(".gs-index__chapters").screenshot({
          path: `${output}/premium-v89-services-${width}.png`,
          animations: "disabled",
        });
        await page.locator(".director-reel").screenshot({
          path: `${output}/v87-film-contact-sheet-${width}.png`,
          animations:"disabled"
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

    // A real visible original waveform motion, not a fake hardware/audio meter.
    await activePage.keyboard.press("Escape");
    await activePage.locator("dialog.atelier-mobile-menu[open]")
      .waitFor({ state: "hidden", timeout: 8000 });
    await activePage.locator(".crafted-hero__mode").nth(1).click();
    assert.equal(await activePage.locator(".crafted-hero").getAttribute("data-scene"), "private",
      "Stage scene controls must still work after visual redesign");
    await activePage.close();

    const motionPage = await browser.newPage({
      viewport: {width: 1440,height:900},reducedMotion:"no-preference"
    });
    await motionPage.goto(base + "/", { waitUntil:"domcontentloaded" });
    await motionPage.locator('.crafted-hero[data-hydrated="true"]').waitFor();
    await motionPage.evaluate(() => document.documentElement.removeAttribute("data-gs-performance"));
    const waveform = motionPage.locator(".gs-v86__graphic svg");
    const realMotion = await waveform.evaluate(el => getComputedStyle(el).animationName);
    assert.match(realMotion,/gs-v89-signal-drift/,
      "Full-motion desktop genuinely animates the original Green Sound signal");
    await motionPage.screenshot({path:`${output}/premium-v89-motion-1440.png`,
      animations:"allow",fullPage:false});
    await motionPage.evaluate(() => document.documentElement.setAttribute("data-gs-performance","lite"));
    const liteMotion = await waveform.evaluate(el => getComputedStyle(el).animationName);
    assert.equal(liteMotion,"none","Lite must fully disable the signature wave animation");
    await motionPage.close();


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
    console.log("PASS V87 3 real video posters + V86 signature redesign visually distinct, all 3 authentic editorial photos loaded, original waveform motion/Lite, native nav: six widths, 3 chapters/8 links, 3 real film choices, single finale CTA, no autoplay, secondary routes, Contact, sitemap");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

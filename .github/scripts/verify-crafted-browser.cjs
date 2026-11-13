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
      assert.equal(await page.locator(".gs-v90-ticker").count(),1,
        "The new kinetic top-band must actually be present");
      assert.equal(await page.locator(".gs-v90-show-wall__frame").count(),3);
      assert.equal(await page.locator(".gs-v90-show-wall").getAttribute("data-active"),"live");
      const tickerBg = await page.locator(".gs-v90-ticker").evaluate(el=>getComputedStyle(el).backgroundColor);
      assert.equal(tickerBg,"rgb(198, 255, 156)",
        "V90 masthead is an unmistakable solid-lime contrast band, not the old dark beam overlay");
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
        const wallImages = await page.locator(".gs-v90-show-wall__frame img").evaluateAll(async imgs => {
          for(const img of imgs) img.loading="eager";
          await Promise.all(imgs.map(img=>img.decode().catch(()=>null)));
          return imgs.map(img=>({w:img.naturalWidth,h:img.naturalHeight,src:img.currentSrc}));
        });
        assert.equal(wallImages.length,3,"Original V90 perspective art uses 3 Green Sound media files");
        assert(wallImages.every(img=>img.w>0 && img.h>0 && img.src.includes("/media/greensound/")),
          `All first-party V90 photos must be decoded: ${JSON.stringify(wallImages)}`);
        const wallRect = await page.locator(".gs-v90-show-wall").boundingBox();
        assert(wallRect && wallRect.width>500 && wallRect.height>310,
          "V90 photo wall must physically occupy the first screen, not exist only in hidden DOM");
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
          path: `${output}/show-wall-v90-home-${width}.png`,
          fullPage: true, animations: "disabled"
        });
        await page.locator(".crafted-hero").screenshot({
          path: `${output}/show-wall-v90-hero-${width}.png`,
          animations: "disabled"
        });
        await page.locator(".gs-index__chapters").screenshot({
          path: `${output}/show-wall-v90-services-${width}.png`,
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
      // V92: the eight inner service pages should finally have a visual
      // language as convincing as the homepage, not the retired generic hero.
      // Audit three distinct service disciplines at both desktop and mobile.
      if (width === 390 || width === 1440) {
        for (const slug of ["dj-mc","echipamente-de-sunet-si-lumini","ursitoare-botez"]) {
          const response = await page.goto(base + "/" + slug, { waitUntil:"domcontentloaded" });
          assert.equal(response.status(), 200, `V92 service page ${slug} returns 200`);
          const stage = page.locator(".gs-v92-stage");
          await stage.waitFor({timeout:12000});
          assert.equal(await page.locator("main h1").count(),1,
            `V92 service ${slug} has a single semantic H1`);
          const media = await stage.locator(".gs-v92-stage__photo img").evaluate(async img=>{
            await img.decode().catch(()=>null);
            return {src:img.currentSrc,w:img.naturalWidth,h:img.naturalHeight};
          });
          assert(media.w>0 && media.h>0,
            `V92 authentic service image missing: ${slug} / ${JSON.stringify(media)}`);
          const stageRect = await stage.boundingBox();
          assert(stageRect && stageRect.width >= width-2,
            `V92 hero should fill available viewport: ${slug} /${width}`);
          if (width === 1440) {
            const mediaBox = await stage.locator(".gs-v92-stage__media").boundingBox();
            const copyBox = await stage.locator(".gs-v92-stage__copy").boundingBox();
            assert(mediaBox && copyBox,"V92 image+copy must both have visible geometry");
            if(slug === "ursitoare-botez") {
              assert(mediaBox.x < copyBox.x,
                "V92 PEOPLE service must have a visibly REVERSED visual composition");
            } else {
              assert(mediaBox.x > copyBox.x,
                "V92 MUSIC and TECH must lead text left and live project imagery right");
            }
          }

          const cta = stage.locator('a[href="#oferta-titlu"]');
          assert.equal(await cta.isVisible(),true,
            "V92 offer CTA must be visibly reachable, not a decorative button");
          await noOverflow(page,"/service "+slug,width);
          await stage.screenshot({
            path:`${output}/v92-service-stage-${slug}-${width}.png`,
            animations:"disabled"
          });
          // This is a genuine same-page anchor to an existing form whose
          // defaultServices is prefilled with the requested service.
          await cta.click();
          await page.waitForFunction(()=>location.hash==="#oferta-titlu");
          await page.locator("form[aria-label='Cerere de ofertă']").waitFor();
          assert.equal(await page.locator("#oferta-titlu").count(),1);
          const expectedService = {
            "dj-mc":"DJ & MC",
            "echipamente-de-sunet-si-lumini":"Sonorizare, lumini, ecrane LED",
            "ursitoare-botez":"Ursitoare / animație copii",
          }[slug];
          const selections = await page.locator(".gs-quote__choice[data-checked='true']")
            .allTextContents();
          assert(selections.some(label=>label.includes(expectedService)),
            `The exact service must be genuinely PRESELECTED in the working form: ${slug} ${JSON.stringify(selections)}`);

        }
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
    assert.equal(await activePage.locator(".gs-v90-show-wall").getAttribute("data-active"),"private",
      "Scene selection must physically change the wall, not just text");
    assert.equal(await activePage.locator(".gs-v90-show-wall__frame--private").isVisible(),true,
      "Touch users must SEE the actual Private event photograph after switching modes");
    assert.equal(await activePage.locator(".gs-v90-show-wall__frame--live").isVisible(),false,
      "Mobile must not keep showing the first stage photo after choosing Private");
    await activePage.screenshot({
      path:`${output}/v90-private-scene-390.png`,animations:"disabled",fullPage:false
    });
    await activePage.locator(".crafted-hero__mode").nth(2).click();
    assert.equal(await activePage.locator(".gs-v90-show-wall__frame--production").isVisible(),true,
      "Touch users must SEE the real Production photograph");


    await activePage.close();

    const motionPage = await browser.newPage({
      viewport: {width: 1440,height:900},reducedMotion:"no-preference"
    });
    await motionPage.goto(base + "/", { waitUntil:"domcontentloaded" });
    await motionPage.locator('.crafted-hero[data-hydrated="true"]').waitFor();
    await motionPage.evaluate(() => document.documentElement.removeAttribute("data-gs-performance"));
    await motionPage.locator(".gs-v90-show-wall__frame img").evaluateAll(async imgs=>{
      for(const img of imgs)img.loading="eager";
      await Promise.all(imgs.map(img=>img.decode().catch(()=>null)));
    });
    await motionPage.locator('.crafted-hero[data-stage-visible="true"][data-lights="on"]').waitFor();
    const ticker = motionPage.locator(".gs-v90-ticker__track");
    const lead = motionPage.locator(".gs-v90-show-wall__frame--live");
    const tickerAnimation = await ticker.evaluate(el=>getComputedStyle(el).animationName);
    const frameAnimation = await lead.evaluate(el=>getComputedStyle(el).animationName);
    assert.match(tickerAnimation,/gs-v90-ticker-flow/,
      "The top cinematic typography actually travels in full motion");
    assert.match(frameAnimation,/gs-v90-film-float/,
      "The 3D photo wall actually floats in full motion");
    await motionPage.screenshot({path:`${output}/v90-live-wall-motion-start-1440.png`,
      animations:"allow",fullPage:false});
    await motionPage.waitForTimeout(1350);
    await motionPage.screenshot({path:`${output}/v90-live-wall-motion-next-1440.png`,
      animations:"allow",fullPage:false});
    await motionPage.locator(".crafted-hero__mode").nth(1).click();
    assert.equal(await motionPage.locator(".gs-v90-show-wall").getAttribute("data-active"),"private");
    const privateTransform = await motionPage.locator(".gs-v90-show-wall__frame--private")
      .evaluate(el=>getComputedStyle(el).transform);
    assert.notEqual(privateTransform,"none","Selecting Private must transform a REAL photo in 3D");
    await motionPage.screenshot({path:`${output}/v90-private-scene-1440.png`,
      animations:"disabled",fullPage:false});
    await motionPage.locator(".director-hero__lights").click();
    const lightsOff = await ticker.evaluate(el=>getComputedStyle(el).animationName);
    assert.equal(lightsOff,"none","User's Lights OFF must stop the new stage animation");
    await motionPage.locator(".director-hero__lights").click();
    await motionPage.evaluate(() => document.documentElement.setAttribute("data-gs-performance","lite"));
    const liteMotion = await ticker.evaluate(el=>getComputedStyle(el).animationName);
    assert.equal(liteMotion,"none","Lite must fully disable the cinematic ticker");
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
    console.log("PASS V90 3D real-image show wall, live kinetic ticker and interactive Light Desk + V87 films visually distinct, all 3 authentic editorial photos loaded, original waveform motion/Lite, native nav: six widths, 3 chapters/8 links, 3 real film choices, single finale CTA, no autoplay, secondary routes, Contact, sitemap");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

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
    // V170: screenshots of actual owner's 4th-reference-inspired homepage
    // on six widths, real media decode, full catalogue and usable controls.
    for (const width of widths) {
      const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"reduce"});
      const errors=[];
      page.on("pageerror",error=>errors.push(error.message));
      const response=await page.goto(base+"/",{waitUntil:"domcontentloaded",timeout:45000});
      assert.equal(response.status(),200);
      await page.locator('.gs170-home .gs170-hero[data-hydrated="true"]').waitFor({timeout:15000});
      await page.evaluate(async()=>{await document.fonts.ready});
      assert.equal(await page.locator("main h1").count(),1);
      assert.equal(await page.locator(".gs170-home").count(),1);
      assert.equal(await page.locator('nav[aria-label="Contact rapid"]').count(),0);
      assert.equal(await page.locator(".gs170-stage__image").count(),1);
      const image=await page.locator(".gs170-stage__image").evaluate(async img=>{
        await img.decode().catch(()=>null);
        return {src:img.currentSrc,w:img.naturalWidth,h:img.naturalHeight};
      });
      assert(image.w>0&&image.h>0&&image.src.includes("/media/greensound/"),
        "First-party concert hero must decode");
      assert.match(await page.locator(".gs170-hero h1").innerText(),/evenimente memorabile/i);
      assert.equal(await page.locator(".gs170-service-card").count(),5);
      assert.equal(await page.locator(".gs170-services__extras nav a").count(),3);
      assert.equal(await page.locator(".gs170-process__steps li").count(),4);
      assert.equal(await page.locator(".gs170-film-card").count(),3);
      assert.equal(await page.locator("main form").count(),0);
      assert.equal(await page.locator("video[autoplay]").count(),0);
      assert.equal(await page.locator(".gs170-hero__control button[aria-pressed=true]").count(),2);
      const noMotion=await page.locator(".gs170-stage__beams i").first()
        .evaluate(el=>getComputedStyle(el).animationName);
      assert.equal(noMotion,"none","Reduced motion must suppress stage beams");
      await noOverflow(page,"/",width);
      await page.screenshot({path:output+"/editorial-home-"+width+".png",fullPage:true,animations:"disabled"});
      if(width===390||width===1440){
        await page.locator(".gs170-hero").screenshot({path:output+"/v170-hero-"+width+".png",animations:"disabled"});
        await page.locator(".gs170-services").screenshot({path:output+"/v170-services-"+width+".png",animations:"disabled"});
        await page.locator(".gs170-films").screenshot({path:output+"/v170-films-"+width+".png",animations:"disabled"});
        await page.locator(".gs170-final").screenshot({path:output+"/v170-finale-"+width+".png",animations:"disabled"});
      }
      await page.getByRole("button",{name:"Efect ON"}).click();
      assert.equal(await page.locator(".gs170-hero").getAttribute("data-lights"),"off");
      await page.getByRole("button",{name:"Efect OFF"}).click();
      assert.equal(await page.locator(".gs170-hero").getAttribute("data-lights"),"on");
      await page.getByRole("button",{name:"Rece"}).click();
      assert.equal(await page.locator(".gs170-hero").getAttribute("data-hue"),"cool");
      await page.locator(".gs170-film-card").nth(1).click();
      const filmDialog=page.getByRole("dialog");
      await filmDialog.waitFor({timeout:8000});
      assert.equal(await filmDialog.locator("iframe").count(),0,"Real video requires visitor Play");
      await page.keyboard.press("Escape");
      await filmDialog.waitFor({state:"hidden",timeout:8000});
      if(width<=768){
        const menu=page.locator(".atelier-header__menu-btn");
        await menu.click();
        const dialog=page.locator("dialog.atelier-mobile-menu[open]");
        await dialog.waitFor({timeout:8000});
        assert.equal(await dialog.evaluate(el=>el.matches(":modal")),true);
        assert.equal(await dialog.locator(".gsm-nav-index__link").count(),6);
        await noOverflow(page,"open mobile nav",width);
        await page.screenshot({path:output+"/stage-index-open-"+width+".png",animations:"disabled",fullPage:false});
        await page.keyboard.press("Tab");
        assert.equal(await page.evaluate(()=>document.activeElement?.closest("dialog")!==null),true);
        await page.keyboard.press("Escape");
        await dialog.waitFor({state:"hidden",timeout:8000});
        await page.waitForFunction(()=>document.activeElement===
          document.querySelector(".atelier-header__menu-btn"));
      }
      assert.deepEqual(errors,[],"Homepage runtime errors at "+width);
      await page.close();
    }

    // V94 production cue: same real menu, two visual viewports and actual
    // keyboard navigation. Never treat the hidden mobile trigger as visible
    // on desktop; activate the existing dialog through its React control.
    for (const navWidth of [390, 1440]) {
      const navPage = await browser.newPage({
        viewport:{width:navWidth,height:900},reducedMotion:"reduce",
      });
      await navPage.goto(base + "/", {waitUntil:"domcontentloaded"});
      await navPage.locator('.gs170-hero[data-hydrated="true"]').waitFor();
      if (navWidth === 390) {
        await navPage.locator(".atelier-header__menu-btn").click();
      } else {
        // Desktop menu is normally hidden; force only its trigger visible for
        // design audit, without altering production responsive behavior.
        await navPage.addStyleTag({content:".atelier-header__menu-btn{display:inline-flex!important}"});
        await navPage.locator(".atelier-header__menu-btn").click();
      }
      const navDialog=navPage.locator("dialog.atelier-mobile-menu[open]");
      await navDialog.waitFor({timeout:8000});
      await navPage.screenshot({
        path:`${output}/v94-navigation-open-${navWidth}.png`,
        animations:"disabled",fullPage:false,
      });
      await navPage.locator(".gsm-nav-index__link").nth(2).focus();
      assert.equal(await navPage.locator(".gsm-nav-index__cue strong").innerText(),"Servicii");
      await navPage.screenshot({
        path:`${output}/v94-navigation-focus-${navWidth}.png`,
        animations:"disabled",fullPage:false,
      });
      await navPage.keyboard.press("Escape");
      await navDialog.waitFor({state:"hidden",timeout:8000});
      await navPage.close();
    }
    const navJourney = await browser.newPage({viewport:{width:390,height:900}});
    await navJourney.goto(base + "/", {waitUntil:"domcontentloaded"});
    await navJourney.locator('.gs170-hero[data-hydrated="true"]').waitFor();
    await navJourney.locator(".atelier-header__menu-btn").click();
    await navJourney.locator(".gsm-nav-index__link").nth(2).click();
    await navJourney.waitForURL("**/servicii");
    assert.equal(await navJourney.locator("dialog.atelier-mobile-menu[open]").count(),0);
    assert.equal(await navJourney.locator(".atelier-header__menu-btn").getAttribute("aria-expanded"),"false");
    await navJourney.close();

    // Real full-motion state: compositor entrance animation must be present,
    // but reduced-motion / Lite snapshots stay static.
    const activePage = await browser.newPage({
      viewport: { width: 390, height: 844 }, reducedMotion: "no-preference",
    });
    await activePage.goto(base + "/", { waitUntil: "domcontentloaded" });
    await activePage.locator('.gs170-hero[data-hydrated="true"]').waitFor();
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

    // V170: real motion state, opt-out & accessible film choice.
    await activePage.keyboard.press("Escape");
    await activePage.locator("dialog.atelier-mobile-menu[open]")
      .waitFor({state:"hidden",timeout:8000});
    await activePage.locator(".gs170-film-card").nth(0).click();
    const activeFilm=activePage.getByRole("dialog");
    await activeFilm.waitFor({timeout:9000});
    assert.equal(await activeFilm.locator("iframe").count(),0);
    await activePage.keyboard.press("Escape");
    await activeFilm.waitFor({state:"hidden",timeout:8000});
    await activePage.close();

    const motionPage=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
    await motionPage.goto(base+"/",{waitUntil:"domcontentloaded"});
    await motionPage.locator('.gs170-hero[data-hydrated="true"]').waitFor();
    const stage=motionPage.locator(".gs170-hero");
    assert.equal(await stage.getAttribute("data-lights"),"on");
    const beam=await motionPage.locator(".gs170-stage__beams i").first()
      .evaluate(el=>getComputedStyle(el).animationName);
    assert.match(beam,/gs170-beam/);
    await motionPage.screenshot({path:output+"/v170-light-green-1440.png",animations:"allow"});
    await motionPage.getByRole("button",{name:"Rece"}).click();
    assert.equal(await stage.getAttribute("data-hue"),"cool");
    await motionPage.screenshot({path:output+"/v170-light-cool-1440.png",animations:"disabled"});
    await motionPage.getByRole("button",{name:"Efect ON"}).click();
    assert.equal(await stage.getAttribute("data-lights"),"off");
    await motionPage.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
    assert.equal(await motionPage.locator(".gs170-stage__beams i").first().evaluate(el=>
      getComputedStyle(el).animationName),"none","Lite must suppress decorative motion");
    await motionPage.close();

    // V157: Contact editorial journey proof at the same real desktop/mobile widths.
    // This is the actual rendered route, not a mockup or a static HTML fixture.
    for (const contactWidth of [390, 1440]) {
      const contactPage = await browser.newPage({
        viewport: { width: contactWidth, height: 900 }, reducedMotion: "reduce",
      });
      const response = await contactPage.goto(base + "/contact", { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200);
      await contactPage.locator(".director-contact-signal__steps").waitFor({ timeout: 15000 });
      assert.equal(await contactPage.locator(".director-contact-signal__steps li").count(), 3);
      const entry = contactPage.locator(".director-contact-signal__action");
      assert.equal(await entry.getAttribute("href"), "#contact-form-title");
      await noOverflow(contactPage, "/contact", contactWidth);
      await contactPage.locator(".director-contact-intro").screenshot({
        path: `${output}/v157-contact-intro-${contactWidth}.png`, animations: "disabled",
      });
      await entry.focus();
      assert.equal(await entry.evaluate(el => el === document.activeElement), true);
      await entry.click();
      assert.equal(new URL(contactPage.url()).hash, "#contact-form-title");
      await contactPage.close();
    }

    // V161 / Real Chromium proof of the new gallery as a 6-photo atlas,
    // the authentic video storyboard, the shareable lightbox and filters.
    // Matching before captures: baseline V160 CI run #43839890033.
    for (const portfolioWidth of widths) {
      const portfolioPage=await browser.newPage({
        viewport:{width:portfolioWidth,height:900},reducedMotion:"reduce",
      });
      const errors=[];
      portfolioPage.on("pageerror", e=>errors.push(e.message));
      const response=await portfolioPage.goto(base+"/portofoliu",{waitUntil:"domcontentloaded"});
      assert.equal(response.status(),200);
      await portfolioPage.locator(".rs-gallery__frame").first().waitFor();
      await portfolioPage.locator(".rs-video-library__item").first().waitFor();
      assert.equal(await portfolioPage.locator(".gs161-portfolio").count(),1);
      assert.equal(await portfolioPage.locator(".gs161-hero h1").count(),1);
      assert.equal(await portfolioPage.locator(".gs161-hero__media img").count(),1);
      const heroImage=await portfolioPage.locator(".gs161-hero__media img").evaluate(async img=>{
        await img.decode().catch(()=>null);
        return {width:img.naturalWidth,src:img.currentSrc};
      });
      assert(heroImage.width>0 && heroImage.src.includes("/media/greensound/"),
        "Portfolio's first screen must use actual existing project photography");
      assert.equal(await portfolioPage.locator(".rs-gallery__frame").count(),6);
      assert.equal(await portfolioPage.locator(".gs161-photo-counter").count(),6);
      assert.equal(await portfolioPage.locator(".rs-video-library__item").count(),6);
      assert.equal(await portfolioPage.locator(".gs161-film-thumb img").count(),6);
      const galleryDisplay=await portfolioPage.locator(".rs-gallery__rail")
        .evaluate(el=>getComputedStyle(el).display);
      assert.equal(galleryDisplay,"grid",
        "V161 must change the old horizontal carousel into a real image-led atlas");
      const photos=await portfolioPage.locator(".rs-gallery__media img").evaluateAll(async imgs=>{
        for(const img of imgs)img.loading="eager";
        await Promise.all(imgs.map(img=>img.decode().catch(()=>null)));
        return imgs.map(img=>({width:img.naturalWidth,src:img.currentSrc}));
      });
      assert(photos.length===6 && photos.every(img=>img.width>0 &&
        img.src.includes("/media/greensound/")),
        "All six original photographs must decode in Chromium");
      const posterImages=await portfolioPage.locator(".gs161-film-thumb img").evaluateAll(async imgs=>{
        for(const img of imgs)img.loading="eager";
        await Promise.all(imgs.map(img=>img.decode().catch(()=>null)));
        return imgs.map(img=>({width:img.naturalWidth,src:img.currentSrc}));
      });
      assert(posterImages.length===6 && posterImages.slice(0,3).every(img=>
        img.width>0 && img.src.includes("/media/greensound/")),
        "The first three real-film previews must have project-owned posters");
      await noOverflow(portfolioPage,"/portofoliu",portfolioWidth);
      await portfolioPage.screenshot({
        path:`${output}/portfolio-current-${portfolioWidth}.png`,
        animations:"disabled",fullPage:true,
      });
      if (portfolioWidth===390 || portfolioWidth===1440) {
        await portfolioPage.locator(".gs161-hero").screenshot({
          path:`${output}/portfolio-hero-${portfolioWidth}.png`,
          animations:"disabled",
        });
        await portfolioPage.locator(".rs-gallery").screenshot({
          path:`${output}/portfolio-photos-${portfolioWidth}.png`,
          animations:"disabled",
        });
        await portfolioPage.locator(".rs-video-library").screenshot({
          path:`${output}/portfolio-films-${portfolioWidth}.png`,
          animations:"disabled",
        });
        // Verify new aesthetics do not break the original, accessible functionality.
        await portfolioPage.locator(".rs-gallery__filters button").nth(2).click();
        assert.equal(await portfolioPage.locator(".rs-gallery__frame").count(),1,
          "Tehnică filter must show exactly the original stage photograph");
        await portfolioPage.locator(".rs-gallery__filters button").first().click();
        assert.equal(await portfolioPage.locator(".rs-gallery__frame").count(),6);
        await portfolioPage.locator('.rs-gallery__frame[data-photo-id="concert"]').click();
        const photoDialog=portfolioPage.locator(".rs-photo-dialog");
        await photoDialog.waitFor({state:"visible",timeout:8000});
        assert.equal(new URL(portfolioPage.url()).searchParams.get("photo"),"concert");
        await photoDialog.focus();
        await portfolioPage.keyboard.press("ArrowRight");
        await portfolioPage.waitForFunction(()=>new URL(location.href).searchParams.get("photo")==="dj");
        await portfolioPage.keyboard.press("Escape");
        await photoDialog.waitFor({state:"hidden",timeout:8000});
        await portfolioPage.locator(".rs-video-library__filters button").nth(3).click();
        assert((await portfolioPage.locator(".rs-video-library__item").count())>=1,
          "Studio film filter must preserve actual published video links");
        await portfolioPage.locator(".rs-video-library__filters button").first().click();
        assert.equal(await portfolioPage.locator(".rs-video-library__item").count(),6);
        await portfolioPage.locator(".rs-video-library__item").nth(1).click();
        await portfolioPage.waitForFunction(()=>new URL(location.href).searchParams.has("film"));
        // TanStack Link exposes the active film as aria-current="page". Keep
        // the distinct selected-film styling tied to the same real URL state.
        await portfolioPage.waitForFunction(() => document.querySelectorAll(".rs-video-library__item[data-current=true]").length === 1);
        assert.equal(await portfolioPage.locator(".rs-video-library__item[data-current=true]").count(),1);
        assert.equal(await portfolioPage.locator(".rs-video-library__item[data-current=true]").getAttribute("aria-current"),"page");
        assert.equal(await portfolioPage.locator(".rs-video-library iframe").count(),0,
          "YouTube must never load until the visitor explicitly presses Play");
        await noOverflow(portfolioPage,"Portfolio interactions",portfolioWidth);
      }
      assert.deepEqual(errors,[],`Portfolio runtime errors at ${portfolioWidth}`);
      await portfolioPage.close();
    }

    // V93: actual footer snapshots at identical 390/1440 viewports.
    for (const footerWidth of [360,390,430,768,1440,1920]) {
      const footerPage = await browser.newPage({
        viewport:{width:footerWidth,height:900},reducedMotion:"reduce",
      });
      await footerPage.goto(base + "/", {waitUntil:"domcontentloaded"});
      await footerPage.locator(".gs-footer-v93__marquee").waitFor({timeout:15000});
      assert.equal(await footerPage.locator(".gs-footer-v93__cta").count(),1);
      assert.equal(await footerPage.locator(".gs-footer-v93__cta").getAttribute("href"),"/contact#contact-form-title");
      await noOverflow(footerPage, "/", footerWidth);
      if(footerWidth===390 || footerWidth===1440) {
        await footerPage.locator(".gs-footer-v93").screenshot({
          path:`${output}/footer-v93-${footerWidth}.png`,animations:"disabled",
        });
        const computed=await footerPage.locator(".gs-footer-v93__marquee span").first()
          .evaluate(el=>getComputedStyle(el).fontSize);
        assert.ok(parseFloat(computed)>45,"Footer giant type should be visibly computed");
      }
      await footerPage.close();
    }

    // V95: real browser proof of About at all six viewports, with decoded source media.
    for (const aboutWidth of widths) {
      const aboutPage = await browser.newPage({
        viewport:{width:aboutWidth,height:900},reducedMotion:"reduce",
      });
      const aboutResponse=await aboutPage.goto(base+"/despre-noi",{waitUntil:"domcontentloaded"});
      assert.equal(aboutResponse.status(),200);
      await aboutPage.locator(".gs-about-v95__hero h1").waitFor({timeout:15000});
      assert.equal(await aboutPage.locator("main h1").count(),1);
      assert.equal(await aboutPage.locator(".gs-about-v95__steps li").count(),4);
      assert.equal(await aboutPage.locator(".gs-about-v95__cta").getAttribute("href"),"/contact#contact-form-title");
      const aboutImages=await aboutPage.locator(".gs-about-v95 img").evaluateAll(async imgs=>{
        for(const img of imgs) img.loading="eager";
        await Promise.all(imgs.map(img=>img.decode().catch(()=>null)));
        return imgs.map(img=>({src:img.currentSrc,width:img.naturalWidth}));
      });
      assert(aboutImages.length>=2 && aboutImages.every(img=>img.width>0),
        "About photographs must decode: "+JSON.stringify(aboutImages));
      assert.equal(await aboutPage.locator("style").evaluateAll(styles=>
        styles.some(s=>s.textContent.includes(".gs-about-v95__hero-grid"))),true,
        "SSR-scoped About CSS must reach the browser");
      await noOverflow(aboutPage,"/despre-noi",aboutWidth);
      if(aboutWidth===390||aboutWidth===1440) {
        await aboutPage.screenshot({
          path:`${output}/about-v95-${aboutWidth}.png`,fullPage:true,animations:"disabled",
        });
        const bg=await aboutPage.locator(".gs-about-v95__hero").evaluate(el=>
          getComputedStyle(el).backgroundColor);
        assert.equal(bg,"rgb(16, 37, 27)","About hero must have real emerald computed CSS");
      }
      await aboutPage.close();
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
      if (route === "/servicii") assert.equal(await page.locator('nav[aria-label="Contact rapid"]').count(),1,
        "Interior pages must retain the mobile quick contact navigation");
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
    console.log("PASS V170 owner-selected source-photo stage, animated mixing deck and beams, 5 featured + 3 real service links, 4-step process, 3 source films, Lite/reduced motion, responsive navigation, Contact, portfolio, sitemap and six-width pages.");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

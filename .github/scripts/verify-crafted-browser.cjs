const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const origin = "http://127.0.0.1:4175";
const cases = [360,390,430,768,1440,1920];
const dir = "screenshots/crafted-atmospheres";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
  const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try{
    for(const width of cases){
      const height=width>=1440?900:width>=768?1024:844;
      const page=await browser.newPage({viewport:{width,height},isMobile:false});
      const failures=[];
      page.on("pageerror",e=>failures.push(e.message));
      const netFailures=[];
      page.on("requestfailed",req=>{if(req.url().startsWith(origin))netFailures.push({url:req.url().slice(0,200),error:req.failure()?.errorText})});
      page.on("response",res=>{if(res.status()>=400&&res.url().startsWith(origin))netFailures.push({url:res.url().slice(0,200),status:res.status()})});
      page.on("console",msg=>{if(msg.type()==="error")failures.push("console @ "+page.url()+": "+msg.text().slice(0,5000))});

      await page.goto(origin+"/",{waitUntil:"domcontentloaded",timeout:45000});
      await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
      await page.waitForTimeout(250);
      assert.equal(await page.locator("main h1").count(),1,"Home H1 at "+width+"px");
      assert.match(await page.locator("main h1").innerText(),/Construim atmosfera/i);
      // V48: one original no-JS programme instead of three overlapping
      // event, service and atmosphere selectors on the homepage.
      assert.equal(await page.locator(".gs-index__chapter").count(),3,
        "Service programme has three deliberate editorial chapters");
      assert.equal(await page.locator(".gs-index__service").count(),8,
        "All eight real services are directly visible without another interactive picker");
      assert.equal(await page.locator(".director-brief,.crafted-experiences,.crafted-services,.soundcheck,.gs-pulse").count(),0,
        "The homepage must not reintroduce five repetitive widgets");
      assert.equal(await page.locator(".crafted-finale").count(),1,
        "Keep one clear final contact CTA, no repeated embedded quote forms");
      assert.equal(await page.locator("main form").count(),0,
        "Home promotes a dedicated, fully validated Contact page instead of duplicate forms");
      assert.equal(await page.locator(".gs-index__chapter img").count(),3,
        "All three original brand-photo chapters are visible");
      const serviceLinks = await page.locator(".gs-index__service").evaluateAll(els =>
        els.map(el=>el.getAttribute("href")));
      assert.equal(new Set(serviceLinks).size,8,"Each actual company service links exactly once");
      assert.ok(serviceLinks.includes("/dj-mc") && serviceLinks.includes("/ursitoare-botez") &&
        serviceLinks.includes("/echipamente-de-sunet-si-lumini"),
        "Music, stage and family-event specialties have genuinely usable links");
      if(width===390 || width===1440){
        await page.locator(".gs-index__chapters").scrollIntoViewIfNeeded();
        await page.locator(".gs-index__chapters").screenshot({
          path:dir+"/v48-production-index-"+width+".png",animations:"disabled"});
        await page.locator(".gs-index__service").first().click();
        await page.waitForURL(url=>url.pathname==="/dj-mc",{timeout:15000});
        assert.equal(await page.locator("main h1").count(),1);
        await page.goto(origin+"/",{waitUntil:"domcontentloaded"});
        await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
      }
            // V32 search-engine discovery: both responses must be real static files,
      // not an HTML fallback pretending to be an XML sitemap.
      if(width===390 || width===1440){
        const sitemapResponse = await page.request.get(origin+"/sitemap.xml");
        assert.equal(sitemapResponse.status(),200,"Canonical sitemap is an actual HTTP 200 resource");
        const xml = await sitemapResponse.text();
        assert.match(xml,/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
        const discovery = await page.evaluate(xmlText => {
          const dom=new DOMParser().parseFromString(xmlText,"application/xml");
          return { parseErrors:dom.querySelectorAll("parsererror").length,
            links:Array.from(dom.getElementsByTagName("loc")).map(e=>e.textContent) };
        },xml);
        assert.equal(discovery.parseErrors,0,"Sitemap must be valid XML, not HTML");
        assert.equal(discovery.links.length,20,"All twenty real routes are discoverable");
        assert.equal(new Set(discovery.links).size,20,"No duplicate canonical addresses");
        assert.ok(discovery.links.every(url=>url?.startsWith("https://greensoundmusic.com/")),
          "Sitemap URLs must be absolute and canonical");
        const robotsResponse = await page.request.get(origin+"/robots.txt");
        assert.equal(robotsResponse.status(),200);
        assert.match(await robotsResponse.text(),/^Sitemap: https:\/\/greensoundmusic\.com\/sitemap\.xml$/m);
      }
      const homeOgImage=await page.locator('head meta[property="og:image"]').getAttribute("content");
      assert.match(homeOgImage??"",/^https:\/\/greensoundmusic\.com\/media\/greensound\/concert-public-lumini\.webp$/);
      assert.equal(await page.locator('head meta[name="twitter:image"]').getAttribute("content"),homeOgImage,
        "Social images should match on OG and Twitter cards");
      // React can add a favicon image preload before the hero. Inspect only
      // the real first-party hero and reject duplicate hero resource hints.
      const heroPreloads = await page.locator('head link[rel="preload"][as="image"][href*="/media/greensound/"]').evaluateAll(nodes =>
        nodes.map(link=>({href:link.getAttribute("href")??"",
          priority:link.getAttribute("fetchpriority"),type:link.getAttribute("type")})));
      assert.equal(heroPreloads.length,1,
        "Exactly one first-party hero preload must exist: "+JSON.stringify(heroPreloads));
      assert.ok(heroPreloads[0].priority === "high",
        "The real SSR hero preload must carry high priority: "+JSON.stringify(heroPreloads));
      const heroPhoto=await page.locator(".crafted-hero__image").evaluate(el=>({url:el.currentSrc,loaded:el.complete && el.naturalWidth>0}));
      assert.ok(heroPhoto.loaded && heroPhoto.url.includes("/media/greensound/"),
        "Original Green Sound hero photo must load as locally hosted WebP: "+JSON.stringify(heroPhoto));
      assert.equal(await page.locator(".crafted-hero__mode").count(),3);
      assert.equal(await page.locator(".scene-console").count(),1,"An editorial scene-notes panel must exist");
      assert.equal(await page.locator(".gs-lightboard").count(),1,"User-controlled lighting desk exists");
      assert.equal(await page.locator(".gs-cursor").count(),1,"Original music cursor is mounted as decoration");
      assert.equal(await page.locator(".atelier-header__finder-btn").isVisible(),true,
        "Search must be reachable from every viewport without opening the mobile nav");
      if(width<=1120){
        const headerControls = await page.evaluate(() => {
          const menu=document.querySelector(".atelier-header__menu-btn")?.getBoundingClientRect();
          const finder=document.querySelector(".atelier-header__finder-btn")?.getBoundingClientRect();
          return {menuRight:menu?.right ?? -1,menuLeft:menu?.left ?? -1,
            finderRight:finder?.right ?? -1,finderLeft:finder?.left ?? -1,
            viewport:innerWidth};
        });
        assert.ok(headerControls.menuRight<=headerControls.viewport-6 &&
          headerControls.menuLeft>=6 && headerControls.finderRight<=headerControls.menuLeft+1 &&
          headerControls.finderLeft>=6,
          "Search and hamburger must remain distinct and fully inside narrow headers: "+JSON.stringify(headerControls));
      }
      assert.equal(await page.locator(".gs-finder").count(),0,
        "Lazy search directory should not mount until explicitly opened");
      if(width===390 || width===1440){
        const finderButton = page.locator(".atelier-header__finder-btn");
        if(width===1440) await page.keyboard.press("Control+k");
        else await finderButton.click();
        const finderInput = page.locator("#gs-finder-input");
        await finderInput.waitFor({timeout:15000});
        assert.equal(await finderInput.evaluate(el=>el===document.activeElement),true,
          "Search focus enters the text field after opening");
        assert.equal(await page.locator(".gs-finder__result").count(),6,
          "The empty query offers six useful first-party destinations");
        await finderInput.fill("LUMINI");
        assert.equal(await page.locator('.gs-finder__result[data-result-url="/echipamente-de-sunet-si-lumini"]').count(),1,
          "Local search finds existing lighting services case-insensitively");
        await page.locator(".gs-finder").screenshot({path:dir+"/frequency-finder-"+width+".png",animations:"disabled"});
        await finderInput.fill("nunta");
        assert.ok(await page.locator(".gs-finder__result").count()>0,
          "Accent-insensitive search finds the wedding event by its real form label");
        await finderInput.press("ArrowDown");
        assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains("gs-finder__result")),true,
          "Down Arrow focuses the first result");
        await page.keyboard.press("ArrowUp");
        assert.equal(await finderInput.evaluate(el=>el===document.activeElement),true,
          "Up Arrow returns focus to the search input");
        await finderInput.fill("not-a-real-service-xyz");
        assert.equal(await page.locator(".gs-finder__result").count(),0,
          "Unknown text must never fabricate matching services");
        assert.equal(await page.locator(".gs-finder__empty a[href='/contact']").count(),1,
          "Empty search offers a real contact alternative");
        await page.keyboard.press("Escape");
        await page.locator(".gs-finder").waitFor({state:"hidden",timeout:7000});
        await page.waitForFunction(() => document.activeElement?.classList.contains("atelier-header__finder-btn"),
          null,{timeout:7000});
        assert.equal(await finderButton.evaluate(el=>el===document.activeElement),true,
          "Escape closes the modal and returns focus to its trigger after Radix dismissal");
        if(width===1440){
          await page.keyboard.press("/");
          await page.locator("#gs-finder-input").waitFor({timeout:7000});
          await page.locator("#gs-finder-input").fill("sonorizare");
          await page.locator('.gs-finder__result[data-result-url="/echipamente-de-sunet-si-lumini"]').click();
          await page.waitForURL(url=>url.pathname==="/echipamente-de-sunet-si-lumini",{timeout:15000});
          assert.equal(await page.locator(".gs-finder").count(),0,
            "Choosing a result should close the directory and navigate to the existing page");
          await page.goto(origin+"/",{waitUntil:"domcontentloaded"});
          await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
        }
      }
      if(width>=1024){
        assert.equal(await page.locator(".gs-cursor__toggle").isVisible(),true,"Fine pointer cursor FX can be switched off");
        const fxPosition=await page.evaluate(()=>{
          const toggle=document.querySelector(".gs-cursor__toggle")?.getBoundingClientRect();
          const header=document.querySelector(".atelier-header")?.getBoundingClientRect();
          return {top:toggle?.top ?? 0,bottomOfHeader:header?.bottom ?? 10000};
        });
        assert.ok(fxPosition.top > fxPosition.bottomOfHeader+7,
          "Brand cursor toggle must sit below the fixed header, not over the nav: "+JSON.stringify(fxPosition));
        await page.mouse.move(230,270);
        await page.waitForFunction(() => document.querySelector(".gs-cursor")?.getAttribute("data-visible")==="true",null,{timeout:7000});
        await page.locator(".gs-cursor__toggle").click();
        assert.equal(await page.locator(".gs-cursor__toggle").getAttribute("aria-pressed"),"false");
        await page.locator(".gs-cursor__toggle").click();
        assert.equal(await page.locator(".gs-cursor__toggle").getAttribute("aria-pressed"),"true");
      }else{
        assert.equal(await page.locator(".gs-cursor__toggle").isVisible(),false,
          "No decoration UI on narrow screens");
      }
      assert.match(await page.locator(".scene-console__content h2").innerText(),/Un public/i);
      assert.equal(await page.locator(".scene-console__link").getAttribute("href"),"/evenimente/concerte-festivaluri");
      assert.ok(await page.locator(".scene-console").isVisible(),"Scene notes must be visible, including mobile");
      if(width <= 430){
        const order=await page.evaluate(()=>{
          const controls=document.querySelector(".crafted-hero__bottom").getBoundingClientRect();
          const notes=document.querySelector(".scene-console").getBoundingClientRect();
          return {controlsTop:controls.top,notesTop:notes.top};
        });
        assert.ok(order.controlsTop < order.notesTop,
          "On mobile the selectable scenes must be discoverable before the story card: "+JSON.stringify(order));
      }
      assert.equal(await page.locator(".director-reel__choice").count(),3,"Three real showreel chapters exist");
      assert.equal(await page.locator(".director-reel iframe").count(),0,"Real video player must not auto-load");
      assert.equal(await page.locator(".gs-index__chapters > article").count(),3,
        "The redesigned homepage keeps an intentional three-part production story");
      const bbox=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,inner:innerWidth}));
      assert.ok(bbox.doc<=bbox.inner+2,width+"px root overflow: "+JSON.stringify(bbox));
      if(width===360 || width===390 || width===1440){
        await page.screenshot({path:dir+"/home-"+width+".png",fullPage:false});
        await page.locator(".gs-index__chapters").scrollIntoViewIfNeeded();
        await page.screenshot({path:dir+"/v48-index-"+width+".png",fullPage:false});
        await page.locator(".director-reel").scrollIntoViewIfNeeded();
        await page.waitForFunction(() => {
          const image = document.querySelector(".director-reel__player img");
          return image && image.complete && image.naturalWidth >= 640 &&
            image.currentSrc.includes("/media/greensound/film-");
        },null,{timeout:15000});
        await page.screenshot({path:dir+"/reel-"+width+".png",fullPage:false});
        if(width === 1440){
          await page.locator(".director-reel__layout").screenshot({path:dir+"/reel-component-desktop.png",animations:"disabled"});
        }
      }
      await page.locator(".crafted-hero__mode").nth(1).click();
      await page.waitForFunction(() => document.querySelector(".crafted-hero")?.getAttribute("data-scene")==="private",null,{timeout:10000}).catch(async e=>{
        const diag=await page.evaluate(()=>({
          ready:document.readyState,
          scripts:[...document.scripts].map(s=>({src:s.src,type:s.type,inline:s.textContent?.slice(0,100)})),
          resources:performance.getEntriesByType("resource").filter(x=>x.name.includes("client")||x.name.includes("entry")||x.name.includes("vite")).map(x=>({url:x.name.slice(0,180),duration:x.duration})).slice(0,18),
          vite:!!document.querySelector("vite-error-overlay"),
        }));
        throw new Error("Stage selector failed; JS errors: "+JSON.stringify(failures)+"; Network: "+JSON.stringify(netFailures)+"; Diagnostic: "+JSON.stringify(diag)+"; "+e.message);
      });
      assert.equal(await page.locator(".crafted-hero").getAttribute("data-scene"),"private");
      assert.match(await page.locator(".scene-console__content h2").innerText(),/Serile speciale/i);
      assert.equal(await page.locator(".scene-console__link").getAttribute("href"),"/evenimente/nunti");
      await page.locator(".crafted-hero__mode").nth(2).click();
      assert.match(await page.locator(".scene-console__content h2").innerText(),/Tehnologia din spatele emoției/i);
      assert.equal(await page.locator(".scene-console__link").getAttribute("href"),"/evenimente/evenimente-corporate");
      const stageSwitch=page.locator(".director-hero__lights");
      assert.equal(await page.locator(".crafted-hero").getAttribute("data-lights"),"on");
      await stageSwitch.click();
      assert.equal(await page.locator(".crafted-hero").getAttribute("data-lights"),"off");
      await stageSwitch.click();
      assert.equal(await page.locator(".crafted-hero").getAttribute("data-lights"),"on");
      await page.locator(".gs-lightboard__summary").click();
      assert.equal(await page.locator(".gs-lightboard").getAttribute("open"),"");
      await page.locator(".gs-lightboard__tone").nth(1).click();
      assert.equal(await page.locator(".crafted-hero").getAttribute("data-light-tone"),"gold");
      assert.equal(await page.locator(".gs-lightboard__tone").nth(1).getAttribute("aria-pressed"),"true");
      await page.locator("#gs-light-power").focus();
      await page.keyboard.press("End");
      assert.equal(await page.locator(".crafted-hero").getAttribute("data-light-power"),"100");
      await page.locator(".gs-lightboard__summary").click();
      await page.locator(".director-reel").scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const image=document.querySelector(".director-reel__player img");
        return image && image.complete && image.naturalWidth >= 640 && image.currentSrc.includes("/media/greensound/film-");
      },null,{timeout:15000});
      const reelChoice=page.locator(".director-reel__choice");
      await reelChoice.nth(1).click();
      assert.equal(await reelChoice.nth(1).getAttribute("aria-pressed"),"true");
      assert.equal(await page.locator(".director-reel iframe").count(),0,"Changing chapters must not start sound");
      if(width===1440){
        await page.locator(".director-reel__all").click();
        await page.waitForURL(url => url.pathname === "/portofoliu" && url.searchParams.has("film"),{timeout:15000});
        const pickedFilm = new URL(page.url()).searchParams.get("film");
        await page.waitForFunction(id => document.querySelector(".film-archive__player")?.getAttribute("data-selected-film")===id,
          pickedFilm,{timeout:15000});
        assert.equal(await page.locator(`.film-archive__pick[data-film-id="${pickedFilm}"]`).getAttribute("aria-pressed"),"true",
          "Homepage film link should select the same real archived film");
        assert.equal(await page.locator(".film-archive iframe").count(),0,"Deep-linked film must not autoplay");
      }
      if(width===390){
        // V48: direct service discovery doesn't require a wizard or intermediate form.
        await page.locator(".gs-index__service").last().click();
        await page.waitForURL(url=>url.pathname==="/start-veselia",{timeout:15000});
        await page.goto(origin+"/",{waitUntil:"domcontentloaded"});
        await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
        const menu=page.locator(".atelier-header__menu-btn");
        await menu.click();
        assert.equal(await menu.getAttribute("aria-expanded"),"true");
        await page.waitForFunction(() =>
          document.activeElement?.classList.contains("atelier-mobile-menu__link"),null,{timeout:7000});
        assert.equal(await page.locator(".atelier-mobile-menu__link").first().evaluate(el => el === document.activeElement),true,
          "Keyboard focus should enter mobile navigation on its first link");
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"),"false","Escape must close the menu");
        assert.equal(await menu.evaluate(el=>el === document.activeElement),true,
          "Escape restores focus to the menu trigger");
        await menu.click();
        await page.locator(".atelier-mobile-menu__link").filter({hasText:"Servicii"}).click();
        await page.waitForURL(/\/servicii/,{timeout:15000});
        assert.equal(await page.locator("main h1").count(),1);
        await page.screenshot({path:dir+"/services-page-mobile.png",fullPage:false});
        await page.goto(origin+"/contact",{waitUntil:"domcontentloaded"});
        // The quote form is intentionally client-only to prevent RHF SSR mismatches;
        // essential phone/email contacts remain server-rendered and immediately usable.
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor({timeout:30000});
        assert.equal(await page.locator('form[aria-label="Cerere de ofertă"]').count(),1);
        const contactLayout = await page.evaluate(()=>{
          const heading=document.querySelector(".director-contact-intro h1");
          const header=document.querySelector(".atelier-header");
          const headingTop=heading?.getBoundingClientRect().top ?? 0;
          const headerBottom=header?.getBoundingClientRect().bottom ?? 10000;
          return {headingTop,headerBottom};
        });
        assert.ok(contactLayout.headingTop > contactLayout.headerBottom + 15,
          "Contact title must clear floating mobile nav: "+JSON.stringify(contactLayout));
        assert.equal(await page.locator("main h1").count(),1);
        await page.screenshot({path:dir+"/contact-mobile.png",fullPage:false});
        await page.locator("#q-name").fill("Ana Test");
        await page.locator("#q-phone").fill("0766566275");
        await page.locator("#q-event").selectOption("Nuntă");
        const suggestions = page.locator(".gs-quote__suggestion");
        await suggestions.first().waitFor({timeout:15000});
        assert.equal(await suggestions.count(),4,"Real wedding catalogue produces four curated suggestions");
        assert.equal(await page.locator(".gs-quote__choice input").count(),9,
          "Eight real services and one exclusive request-for-advice");
        assert.equal(await page.locator(".gs-quote__choice input:checked").count(),0,
          "Event suggestions must never select options without visitor consent");
        await suggestions.first().click();
        assert.equal(await suggestions.first().getAttribute("aria-pressed"),"true",
          "Explicitly chosen recommendation becomes a selected real service");
        assert.equal(await page.locator(".gs-quote__choice input:checked").count(),1);
        const helpChoice = page.locator(".gs-quote__choice").filter({hasText:"Nu știu încă"});
        await helpChoice.click();
        assert.equal(await page.locator(".gs-quote__choice input:checked").count(),1,
          "Asking for a recommendation clears concrete service choices");
        assert.equal(await helpChoice.locator("input").isChecked(),true);
        await suggestions.first().click();
        assert.equal(await helpChoice.locator("input").isChecked(),false,
          "Selecting a concrete service must deselect the exclusive advice state");
        assert.equal(await page.locator(".gs-quote__choice input:checked").count(),1);
        await page.locator(".gs-quote__suggestions").screenshot({
          path:dir+"/guided-quote-wedding-mobile-390.png",animations:"disabled"});
        await page.locator("#q-date").fill("2027-12-18");
        await page.locator('input[name="consent"]').check();
        await page.getByRole("button",{name:/Verifică și continuă spre trimitere/}).click();
        await page.locator(".quote-preview").waitFor({timeout:15000});
        assert.match(await page.locator(".quote-preview__event").innerText(),/Nuntă/);
        assert.match(await page.locator(".quote-preview__intro").innerText(),/Nimic nu a fost transmis încă/);
        assert.match(await page.locator(".quote-preview__ticket").innerText(),/Ana Test/);
        assert.match(await page.locator(".quote-preview__ticket").innerText(),/2027-12-18/);
        assert.match(await page.locator(".quote-preview__whatsapp").getAttribute("href"),/^https:\/\/wa\.me\//);
        assert.match(await page.locator(".quote-preview__email").getAttribute("href"),/^mailto:/);
        // V33: a quote can also be copied for a user's chosen messaging app.
        // Clipboard success must correspond to an ACTUAL copied message.
        await page.context().grantPermissions(["clipboard-read","clipboard-write"]);
        await page.locator(".quote-preview__copy").click();
        await page.waitForFunction(() => document.querySelector(".quote-preview__copy-status")?.textContent?.includes("clipboard"));
        const copiedText=await page.evaluate(() => navigator.clipboard.readText());
        assert.match(copiedText,/Ana Test/);
        assert.match(copiedText,/Nuntă/);
        assert.ok(copiedText.includes("Data: 18.12.2027"),"The copied message must preserve the actual event date");
        assert.match(await page.locator(".quote-preview__copy-status").innerText(),/nu a fost trimis automat/i);
        // Browser with disabled clipboard: never claim success, show manual text.
        await page.evaluate(() => Object.defineProperty(navigator,"clipboard",{
          configurable:true,value:{writeText:async()=>{throw new Error("Clipboard denied")}}
        }));
        await page.locator(".quote-preview__copy").click();
        await page.waitForFunction(() => document.querySelector(".quote-preview__copy-status")?.textContent?.includes("nu este disponibilă"));
        assert.match(await page.locator(".quote-preview__manual textarea").inputValue(),/Ana Test/);
        await page.screenshot({path:dir+"/event-pass-preview-390.png",fullPage:false});
        await page.locator(".quote-preview__edit").click();
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor({timeout:10000});
        assert.equal(await page.locator("#q-name").inputValue(),"Ana Test","Editing must restore existing data");
        // V34: no silent ninth option; selecting all eight authentic services
        // remains legal while the separate advisory choice clears them instead.
        const realServiceInputs = page.locator(".gs-quote__choice").filter({hasNotText:"Nu știu încă"});
        assert.equal(await realServiceInputs.count(),8);
        for(let i=0;i<8;i++){
          const input=realServiceInputs.nth(i).locator("input");
          if(!await input.isChecked()) await realServiceInputs.nth(i).click();
        }
        assert.equal(await realServiceInputs.locator("input:checked").count(),8);
        assert.match(await page.locator(".gs-quote__count").innerText(),/8 \/ 8/);
        await helpChoice.click();
        assert.equal(await realServiceInputs.locator("input:checked").count(),0);
        assert.equal(await helpChoice.locator("input").isChecked(),true);
        await page.goto(origin+"/despre-noi",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator("main h1").count(),1);
        await page.locator('.gs-journey[data-hydrated="true"]').waitFor({timeout:30000});
        await page.locator(".gs-journey__step").first().waitFor();
        assert.equal(await page.locator(".gs-journey__step").count(),4,
          "The About page has four accessible production stages");
        assert.match(await page.locator(".gs-journey__chapter h3").innerText(),/Începem cu povestea ta/);
        await page.locator(".gs-journey__step").nth(2).click();
        assert.equal(await page.locator(".gs-journey__step").nth(2).getAttribute("aria-pressed"),"true");
        assert.match(await page.locator(".gs-journey__chapter h3").innerText(),/Punem tehnica în acord/);
        await page.locator(".gs-journey__chapter-bottom button").click();
        assert.match(await page.locator(".gs-journey__chapter h3").innerText(),/ideea devine experiență/);
        await page.locator(".gs-journey__chapter-bottom button").click();
        assert.match(await page.locator(".gs-journey__chapter h3").innerText(),/Începem cu povestea ta/,
          "The final journey action should return to step 01");
        const aboutOverflow = await page.evaluate(()=>({documentWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert.ok(aboutOverflow.documentWidth<=aboutOverflow.viewport+2,
          "Production Journey must never overflow a narrow viewport: "+JSON.stringify(aboutOverflow));
        await page.locator(".gs-journey__body").screenshot({path:dir+"/production-journey-mobile-390.png",animations:"disabled"});

        // V29: selection, overview, quote handoff and safe reset are all real.
        await page.goto(origin+"/servicii",{waitUntil:"domcontentloaded"});
        await page.locator('.gs-service-mix[data-hydrated="true"]').waitFor({timeout:30000});
        assert.equal(await page.locator(".gs-service-mix__pick").count(),8,
          "Eight real Green Sound services are selectable");
        assert.equal(await page.locator(".gs-service-mix__submit").isDisabled(),true,
          "Empty brief must not submit a meaningless quote");
        await page.locator('.gs-service-mix__pick[data-service-slug="dj-mc"]').click();
        assert.equal(await page.locator('.gs-service-mix__pick[data-service-slug="dj-mc"]').getAttribute("aria-pressed"),"true");
        await page.locator('.gs-service-mix__pick[data-service-slug="echipamente-de-sunet-si-lumini"]').click();
        assert.equal(await page.locator(".gs-service-mix__token").count(),2,
          "Two genuine company services appear in the editable brief");
        assert.equal(await page.locator(".gs-service-mix__submit").isEnabled(),true);
        assert.match(await page.locator(".gs-service-mix__visual-title h3").innerText(),/Sonorizare/i);
        const serviceOverflow = await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert.ok(serviceOverflow.doc <= serviceOverflow.viewport+2,
          "Service Mix must not overflow mobile: "+JSON.stringify(serviceOverflow));
        await page.locator(".gs-service-mix__layout").screenshot({
          path:dir+"/service-mix-mobile-390.png",animations:"disabled"});
        assert.equal(await page.locator('form.gs-service-mix__form input[name="services"]').inputValue(),
          "DJ & MC|Sonorizare, lumini, ecrane LED","The native GET contains exact first-party form labels");
        await page.locator(".gs-service-mix__submit").click();
        await page.waitForURL(url=>url.pathname==="/contact"&&url.searchParams.has("services"),{timeout:15000});
        // TanStack Router may canonicalize the native GET pipe string into a
        // JSON list after running validateSearch. Check the same allowlisted
        // values in either route representation AND the actual checked form.
        const handoff = new URL(page.url());
        const rawServices = handoff.searchParams.get("services") ?? "";
        const decodedServices = rawServices.startsWith("[")
          ? JSON.parse(rawServices) : rawServices.split("|");
        assert.deepEqual(decodedServices,
          ["DJ & MC","Sonorizare, lumini, ecrane LED"],
          "The route carries precisely the two real service labels");
        await page.waitForFunction(()=>
          document.querySelectorAll('form[aria-label="Cerere de ofertă"] input[type="checkbox"]:checked').length===2,
          null,{timeout:15000});
        assert.equal(await page.locator('form[aria-label="Cerere de ofertă"] input[type="checkbox"]:checked').count(),2,
          "Selected services survive native GET and validated Contact initialization");

        await page.goto(origin+"/servicii",{waitUntil:"domcontentloaded"});
        await page.locator('.gs-service-mix[data-hydrated="true"]').waitFor();
        await page.locator('.gs-service-mix__pick[data-service-slug="dj-mc"]').click();
        await page.locator(".gs-service-mix__clear").click();
        assert.equal(await page.locator(".gs-service-mix__token").count(),0,"Clear selection really empties the brief");
        assert.equal(await page.locator(".gs-service-mix__submit").isDisabled(),true);
        await page.goto(origin+"/confidentialitate",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator("main h1").count(),1);
        // V25: the original-photo editorial journal is actually interactive,
        // navigation is accessible, and the film archive never auto-plays.
        await page.goto(origin+"/portofoliu",{waitUntil:"domcontentloaded"});
        await page.locator('.journal[data-hydrated="true"]').waitFor({timeout:30000});
        assert.equal(await page.locator(".journal__photo").count(),6,"Six first-party photo journal frames");
        const journalTiles = await page.locator(".journal__photo").evaluateAll((nodes) =>
          nodes.slice(0,3).map(node => {
            const r=node.getBoundingClientRect();
            return {top:r.top,bottom:r.bottom,left:r.left,right:r.right};
          }));
        assert.ok(journalTiles[1].top >= journalTiles[0].bottom - 2,
          "Mobile gallery must not overlap the hero photo with the next row: "+JSON.stringify(journalTiles));
        await page.locator(".journal__photo").first().click();
        await page.locator('[role="dialog"]').waitFor();
        assert.match(await page.locator(".journal-dialog__title").innerText(),/Ritmul serii/);
        await page.locator('.journal-dialog__arrow[aria-label="Fotografia următoare"]').click();
        assert.match(await page.locator(".journal-dialog__title").innerText(),/Scena se transformă/);
        await page.keyboard.press("Escape");
        await page.locator('[role="dialog"]').waitFor({state:"hidden"});
        assert.equal(await page.locator(".film-archive__pick").count(),6,"Six authentic Green Sound films");
        assert.equal(await page.locator(".film-archive iframe").count(),0,"No autoplay or remote iframe");
        await page.locator(".film-archive__filter").filter({hasText:"Studio"}).click();
        assert.equal(await page.locator(".film-archive__pick").count(),3,"Studio filters actual published clips");
        assert.equal(await page.locator(".film-archive__filter").filter({hasText:"Studio"}).getAttribute("aria-pressed"),"true");
        await page.locator(".journal__grid").screenshot({path:dir+"/portfolio-journal-390.png",animations:"disabled"});
        await page.locator(".film-archive__grid").screenshot({path:dir+"/film-archive-390.png",animations:"disabled"});

        // Every event detail page uses actual recommended services in the native
        // quote journey. No auto-submit, pricing or availability claims.
        await page.goto(origin+"/evenimente/nunti",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator(".event-brief__items li").count(),5,"Wedding brief recommendations");
        await page.locator('.event-brief input[name="date"]').fill("2027-09-18");
        await page.locator('.event-brief input[name="location"]').fill("Pitești");
        await page.locator(".event-brief__submit").click();
        await page.waitForURL(url => url.pathname === "/contact" && url.searchParams.has("event"), {timeout:15000});
        const nativeBriefUrl = new URL(page.url());
        assert.equal(nativeBriefUrl.searchParams.get("event"),"Nuntă","The event is in the native GET URL");
        assert.equal(nativeBriefUrl.searchParams.get("date"),"2027-09-18","The date is in the native GET URL");
        assert.equal(nativeBriefUrl.searchParams.get("location"),"Pitești","The location is in the native GET URL");
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor();
        // RHF initializes after the /contact route hydrates; assert final client input
        // state, not the brief SSR placeholders before the form becomes interactive.
        await page.waitForFunction(() => {
          const event=document.querySelector("#q-event"),date=document.querySelector("#q-date"),
            place=document.querySelector("#q-location"),services=document.querySelectorAll('form[aria-label="Cerere de ofertă"] input[type="checkbox"]:checked');
          return event?.value==="Nuntă" && date?.value==="2027-09-18" && place?.value==="Pitești" && services.length===5;
        },null,{timeout:15000});
        assert.equal(await page.locator("#q-event").inputValue(),"Nuntă");
        assert.equal(await page.locator("#q-date").inputValue(),"2027-09-18");
        assert.equal(await page.locator("#q-location").inputValue(),"Pitești");
        assert.equal(await page.locator('form[aria-label="Cerere de ofertă"] input[type="checkbox"]:checked').count(),5,
          "All actual wedding recommendations survive validation");
        await page.screenshot({path:dir+"/event-brief-contact-390.png",fullPage:false});

      }
      assert.deepEqual(failures,[],"Unexpected page errors at "+width+"px");
      if(width===1440){
        await page.goto(origin+"/contact",{waitUntil:"domcontentloaded"});
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor({timeout:30000});
        // V36: real invalid submit must keep the visitor in the form and expose
        // associated error text to both sighted and assistive-tech users.
        await page.locator('form[aria-label="Cerere de ofertă"] button[type="submit"]').click();
        await page.locator("#q-name-err").waitFor({state:"visible"});
        assert.equal(await page.locator("#q-name").getAttribute("aria-invalid"),"true");
        assert.equal(await page.locator("#q-name").getAttribute("aria-describedby"),"q-name-err");
        assert.equal(await page.locator("#q-consent").count(),0,"Consent checkbox is associated by label, not a duplicate ID");
        assert.equal(await page.locator('input[name="consent"]').getAttribute("aria-invalid"),"true");
        assert.equal(await page.locator('input[name="consent"]').getAttribute("aria-describedby"),"q-consent-err");
        assert.equal(await page.locator("#q-consent-err").getAttribute("role"),"alert");
        assert.equal(await page.locator(".quote-preview").count(),0,"Invalid quote must never produce a prepared ticket");
        await page.locator("#q-event").selectOption("Eveniment corporate");
        await page.locator(".gs-quote__suggestions").waitFor({timeout:15000});
        assert.equal(await page.locator(".gs-quote__suggestion").count(),4,
          "Real corporate event suggestions use the genuine company catalogue");
        await page.locator(".gs-quote__suggestions").scrollIntoViewIfNeeded();
        await page.locator(".gs-quote__suggestions").screenshot({
          path:dir+"/guided-quote-corporate-desktop-1440.png",animations:"disabled"});
        await page.goto(origin+"/servicii",{waitUntil:"domcontentloaded"});
        await page.locator('.gs-service-mix[data-hydrated="true"]').waitFor();
        await page.locator('.gs-service-mix__pick[data-service-slug="trupa"]').click();
        await page.locator('.gs-service-mix__pick[data-service-slug="echipamente-de-sunet-si-lumini"]').click();
        await page.locator(".gs-service-mix__layout").scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>{
          const image=document.querySelector(".gs-service-mix__visual img");
          return image&&image.complete&&image.naturalWidth>0;
        },null,{timeout:15000});
        await page.locator(".gs-service-mix__layout").screenshot({
          path:dir+"/service-mix-desktop-1440.png",animations:"disabled"});
        await page.locator(".gs-service-mix__brief").screenshot({
          path:dir+"/service-mix-brief-desktop-1440.png",animations:"disabled"});
        await page.goto(origin+"/despre-noi",{waitUntil:"domcontentloaded"});
        await page.locator(".gs-journey__body").scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>{
          const image=document.querySelector(".gs-journey__image img");
          return image && image.complete && image.naturalWidth>0;
        },null,{timeout:15000});
        await page.locator(".gs-journey__body").screenshot({path:dir+"/production-journey-desktop-1440.png",animations:"disabled"});
        await page.goto(origin+"/portofoliu",{waitUntil:"domcontentloaded"});
        await page.locator(".journal__photo").first().scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>{const img=document.querySelector(".journal__photo img");return img && img.complete && img.naturalWidth>0},null,{timeout:15000});
        await page.screenshot({path:dir+"/portfolio-desktop-1440.png",fullPage:false});
        await page.locator(".film-archive__grid").scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>{
          const image=document.querySelector(".film-archive__player img");
          return image && image.complete && image.naturalWidth>0;
        },null,{timeout:15000});
        await page.screenshot({path:dir+"/film-archive-desktop-1440.png",fullPage:false});
      }
      if(width===390 || width===1440){
        await page.goto(origin+"/ursitoare-botez",{waitUntil:"domcontentloaded"});
        await page.locator(".gs-service-relations__grid").waitFor({timeout:15000});
        const matches = page.locator(".gs-service-relations__card");
        assert.equal(await matches.count(),3,
          "Three curated services, not arbitrary globally repeated links");
        assert.deepEqual(await matches.evaluateAll(nodes =>
          nodes.map(n=>n.getAttribute("data-related-service"))),
          ["start-veselia","dj-mc","hostess"],
          "Ursitoare page must recommend only context-relevant real services");
        assert.equal(await matches.first().getAttribute("href"),"/start-veselia");
        const photoReport = await page.evaluate(() => {
          const hero = document.querySelector(".atelier-inner-hero img")?.getAttribute("src");
          const images=[...document.querySelectorAll("[data-service-gallery]")].map(img=>img.getAttribute("src"));
          return { hero, images };
        });
        assert.equal(photoReport.images.length,2,
          "Only the two first-party non-hero photographic gallery frames appear");
        assert.equal(new Set(photoReport.images).size,photoReport.images.length,
          "Actual service gallery must never duplicate its photo");
        assert.ok(photoReport.images.every(image => image !== photoReport.hero),
          "Hero photo is not re-rendered inside service gallery");
        await page.locator(".gs-service-relations__grid").scrollIntoViewIfNeeded();
        await page.locator(".gs-service-relations__grid").screenshot({
          path:dir+"/service-relations-"+width+".png",animations:"disabled"});
      }
      if(width===390 || width===1440){
        await page.goto(origin+"/dj-mc",{waitUntil:"domcontentloaded"});
        const serviceOg=await page.locator('head meta[property="og:image"]').getAttribute("content");
        assert.match(serviceOg??"",/\/media\/greensound\/dj-mc-green-sound\.webp$/,
          "Real service pages should share their own real photographed service image");
        assert.equal(await page.locator('head meta[name="twitter:image"]').getAttribute("content"),serviceOg);
        assert.equal(await page.locator('head link[rel="canonical"]').getAttribute("href"),
          "https://greensoundmusic.com/dj-mc/","Sitemap and page canonical URLs must agree");
      }
      if(width===390 || width===1440){
        const errorsBefore404 = failures.length;
        const missingUrl = origin+"/pagina-care-nu-exista-green-sound";
        const notFoundResponse = await page.goto(missingUrl,{waitUntil:"domcontentloaded"});
        assert.equal(notFoundResponse?.status(),404,"Unknown paths must return a genuine HTTP 404, not a 200");
        await page.locator('.gs-offstage[data-variant="missing"]').waitFor({timeout:15000});
        assert.equal(await page.locator("main h1").count(),1,"Custom 404 has exactly one meaningful H1");
        assert.match(await page.locator("main h1").innerText(),/Aici încă nu a început.*spectacolul/s);
        assert.match(await page.locator(".gs-offstage__lead").innerText(),/petrecerea ta/i);
        assert.equal(await page.locator(".gs-offstage__primary").getAttribute("href"),"/contact",
          "Missing pages help visitors reach a real event offer");
        assert.equal(await page.locator('.gs-offstage__extra a[href="/evenimente"]').count(),1,
          "404 still connects visitors to actual event pages");
        const missingPageWidth = await page.evaluate(() => ({
          doc:document.documentElement.scrollWidth,window:window.innerWidth
        }));
        assert.ok(missingPageWidth.doc <= missingPageWidth.window+2,
          "404 must not horizontally overflow: "+JSON.stringify(missingPageWidth));
        await page.screenshot({path:dir+"/offstage-404-"+width+".png",fullPage:false});
        // Browsers log an intentional top-level 404 as a console resource error.
        // We assert the HTTP status and accept precisely that expected message,
        // while any other console or page error remains a hard failure.
        const errorsOn404 = failures.splice(errorsBefore404);
        assert.deepEqual(errorsOn404.filter(error =>
          !error.startsWith("console @ "+missingUrl+": Failed to load resource: the server responded with a status of 404")
        ),[],"Unexpected errors on the genuine 404 page");
      }
      assert.deepEqual(failures,[],"Unexpected page errors at "+width+"px");
      await page.close();
    }
    // V33: Chrome's optional Save-Data hint should avoid heavy decorative
    // animation without hiding real content or the booking/contact paths.
    const lite=await browser.newPage({viewport:{width:1440,height:900}});
    await lite.addInitScript(() => {
      Object.defineProperty(navigator,"connection",{configurable:true,value:{
        saveData:true,effectiveType:"2g",addEventListener(){},removeEventListener(){}
      }});
    });
    await lite.goto(origin+"/",{waitUntil:"domcontentloaded"});
    await lite.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
    await lite.waitForFunction(() => document.documentElement.dataset.gsPerformance==="lite",
      null,{timeout:15000});
    assert.equal(await lite.locator(".crafted-stage-lights__beam").first().evaluate(e=>getComputedStyle(e).animationName),
      "none","Save-Data must stop expensive stage beam animation");
    assert.equal(await lite.locator(".gs-cursor__toggle").isVisible(),false,
      "The low-resource visitor shouldn't render decorative cursor controls");
    assert.equal(await lite.locator(".crafted-hero__mode").count(),3,
      "Lite mode must preserve all real scene navigation");
    assert.equal(await lite.locator(".gs-index__service").count(),8,
      "All actual service links remain accessible in Save-Data lite mode");
        assert.equal(await lite.locator(".atelier-header__quote").count(),1,
      "Lite mode must preserve offer conversion");
    await lite.screenshot({path:dir+"/adaptive-lite-1440.png",fullPage:false});
    await lite.close();

    const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
    await reduced.goto(origin+"/",{waitUntil:"domcontentloaded"});
    const stageMotion=await reduced.locator(".crafted-stage-lights__beam").first().evaluate(e=>getComputedStyle(e).animationName);
    assert.equal(stageMotion,"none","Reduced-motion must disable decorative stage beams");
    assert.equal(await reduced.locator(".gs-cursor__toggle").isVisible(),false,"Reduced motion hides cursor FX");
    assert.equal(await reduced.locator(".gs-index__service").count(),8,
      "Reduced-motion visitors can browse the complete service index");
    await reduced.close();
    console.log("PASS V48: lean music-led homepage, 3 chapters/8 direct links, no duplicated widgets/forms, real films, Contact/SEO and six-width browser QA");
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

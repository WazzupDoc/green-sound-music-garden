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
      const heroPhoto=await page.locator(".crafted-hero__image").evaluate(el=>({url:el.currentSrc,loaded:el.complete && el.naturalWidth>0}));
      assert.ok(heroPhoto.loaded && heroPhoto.url.includes("/media/greensound/"),
        "Original Green Sound hero photo must load as locally hosted WebP: "+JSON.stringify(heroPhoto));
      assert.equal(await page.locator(".crafted-hero__mode").count(),3);
      assert.equal(await page.locator(".scene-console").count(),1,"An editorial scene-notes panel must exist");
      assert.equal(await page.locator(".gs-lightboard").count(),1,"User-controlled lighting desk exists");
      assert.equal(await page.locator(".gs-cursor").count(),1,"Original music cursor is mounted as decoration");
      if(width>=1024){
        assert.equal(await page.locator(".gs-cursor__toggle").isVisible(),true,"Fine pointer cursor FX can be switched off");
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
      assert.equal(await page.locator('.director-brief form[action="/contact"]').count(),1,"Native quote planner exists");
      assert.equal(await page.locator(".director-reel__choice").count(),3,"Three real showreel chapters exist");
      assert.equal(await page.locator(".director-reel iframe").count(),0,"Real video player must not auto-load");
      assert.equal(await page.locator(".crafted-experiences__option").count(),5);
      assert.equal(await page.locator(".crafted-services__row").count(),5);
      assert.equal(await page.locator(".soundcheck__event").count(),5,"Five native event options");
      assert.equal(await page.locator(".soundcheck__service").count(),7,"Seven actual event services");
      assert.equal(await page.locator(".soundcheck__story-beat").count(),5,
        "Five real wedding story beats, drawn from existing event data");
      assert.equal(await page.locator(".soundcheck__story-beat").first().getAttribute("aria-pressed"),"true");
      assert.equal(await page.locator(".soundcheck__form input[name=services]").count(),1,
        "A single bounded service list, submitted as part of a native GET form");
      const bbox=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,inner:innerWidth}));
      assert.ok(bbox.doc<=bbox.inner+2,width+"px root overflow: "+JSON.stringify(bbox));
      if(width===360 || width===390 || width===1440){
        await page.screenshot({path:dir+"/home-"+width+".png",fullPage:false});
        await page.locator(".director-brief").scrollIntoViewIfNeeded();
        await page.screenshot({path:dir+"/brief-"+width+".png",fullPage:false});
        await page.locator(".crafted-experiences").scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>Array.from(document.querySelectorAll(".crafted-experiences__frame img")).some(i=>i.complete&&i.naturalWidth>0),null,{timeout:12000});

        await page.screenshot({path:dir+"/events-"+width+".png",fullPage:false});
        await page.locator(".crafted-services").scrollIntoViewIfNeeded();
        await page.screenshot({path:dir+"/services-"+width+".png",fullPage:false});
        await page.locator(".soundcheck").scrollIntoViewIfNeeded();
        await page.screenshot({path:dir+"/soundcheck-"+width+".png",fullPage:false});
        await page.locator(".soundcheck__storyboard").screenshot({path:dir+"/storyboard-"+width+".png",animations:"disabled"});
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
      await page.locator(".crafted-experiences__option").first().click();
      assert.equal(await page.locator(".crafted-experiences__option").first().getAttribute("aria-pressed"),"true");
      await page.locator(".crafted-services__row .crafted-services__select").nth(1).click();
      assert.equal(await page.locator(".crafted-services__row").nth(1).getAttribute("data-selected"),"true");
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
        // V22: selected event, selected service, date and location survive the native
        // request and populate the existing validated quote form (without sending it).
        await page.locator(".soundcheck__event").nth(2).click();
        assert.equal(await page.locator(".soundcheck__event").nth(2).getAttribute("aria-pressed"),"true");
        assert.equal(await page.locator(".soundcheck__story-beat").count(),4,"Corporate story beat count");
        const before=await page.locator(".soundcheck__service input:checked").count();
        await page.locator(".soundcheck__service").first().click();
        const after=await page.locator(".soundcheck__service input:checked").count();
        assert.equal(Math.abs(after-before),1,"One service selection changes on click");
        await page.locator(".soundcheck__story-beat").nth(2).click();
        assert.equal(await page.locator(".soundcheck__story-beat").nth(2).getAttribute("aria-pressed"),"true");
        assert.match(await page.locator(".soundcheck__story-detail strong").innerText(),/Lansarea/);
        const addMomentService=page.locator(".soundcheck__story-add");
        assert.equal(await addMomentService.count(),1,"Missing service can be added from real story moment");
        await addMomentService.click();
        assert.equal(await page.locator(".soundcheck__service input:checked").count(),after+1,
          "Storyboard adds the missing service exactly once");
        assert.equal(await page.locator(".soundcheck__story-included").count(),1,
          "Moment visibly confirms the new service is included");
        await page.locator('.soundcheck__form input[name="date"]').fill("2027-08-21");
        await page.locator('.soundcheck__form input[name="location"]').fill("Pitești");
        await page.locator(".soundcheck__cta").click();
        await page.waitForURL(/\/contact\?/, {timeout:15000});
        const soundcheckUrl = new URL(page.url());
        assert.equal(soundcheckUrl.searchParams.get("date"),"2027-08-21","Date must survive native GET");
        assert.equal(soundcheckUrl.searchParams.get("location"),"Pitești","Location must survive native GET");
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor();
        await page.waitForTimeout(250);
        assert.equal(await page.locator("#q-event").inputValue(),"Eveniment corporate");
        assert.equal(await page.locator("#q-date").inputValue(),"2027-08-21");
        assert.equal(await page.locator("#q-location").inputValue(),"Pitești");
        assert.equal(await page.locator('form[aria-label="Cerere de ofertă"] input[type="checkbox"]:checked').count(),
          after+1,"Selected services must prefill exactly, including the storyboard addition");
        await page.screenshot({path:dir+"/soundcheck-prefilled-390.png",fullPage:false});
        await page.goto(origin+"/",{waitUntil:"domcontentloaded"});
        await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});

        await page.locator("#brief-event").selectOption("Nuntă");
        await page.locator("#brief-date").fill("2027-07-18");
        await page.locator("#brief-location").fill("Pitești");
        await page.locator(".director-brief__submit").click();
        await page.waitForURL(/\/contact\?/, {timeout:15000});
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor();
        await page.waitForFunction(() => document.querySelector("#q-event")?.value === "Nuntă" &&
          document.querySelector("#q-date")?.value === "2027-07-18" &&
          document.querySelector("#q-location")?.value === "Pitești",null,{timeout:15000});
        await page.screenshot({path:dir+"/contact-prefilled-390.png",fullPage:false});
        await page.goto(origin+"/",{waitUntil:"domcontentloaded"});
        await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
        const menu=page.locator(".atelier-header__menu-btn");
        await menu.click();
        assert.equal(await menu.getAttribute("aria-expanded"),"true");
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
        await page.screenshot({path:dir+"/event-pass-preview-390.png",fullPage:false});
        await page.locator(".quote-preview__edit").click();
        await page.locator('form[aria-label="Cerere de ofertă"]').waitFor({timeout:10000});
        assert.equal(await page.locator("#q-name").inputValue(),"Ana Test","Editing must restore existing data");
        await page.goto(origin+"/despre-noi",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator("main h1").count(),1);
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
      await page.close();
    }
    const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
    await reduced.goto(origin+"/",{waitUntil:"domcontentloaded"});
    const stageMotion=await reduced.locator(".crafted-stage-lights__beam").first().evaluate(e=>getComputedStyle(e).animationName);
    assert.equal(stageMotion,"none","Reduced-motion must disable decorative stage beams");
    assert.equal(await reduced.locator(".gs-cursor__toggle").isVisible(),false,"Reduced motion hides cursor FX");
    await reduced.close();
    console.log("PASS V26: musical cursor, stage light desk, proposal preview with explicit channel links, film deep links, six responsive widths and reduced motion");
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

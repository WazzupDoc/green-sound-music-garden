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
      page.on("console",msg=>{if(msg.type()==="error")failures.push("console: "+msg.text().slice(0,300))});

      await page.goto(origin+"/",{waitUntil:"domcontentloaded",timeout:45000});
      await page.locator('.crafted-hero[data-hydrated="true"]').waitFor({timeout:30000});
      await page.waitForTimeout(250);
      assert.equal(await page.locator("main h1").count(),1,"Home H1 at "+width+"px");
      assert.match(await page.locator("main h1").innerText(),/Construim atmosfera/i);
      const heroPhoto=await page.locator(".crafted-hero__image").evaluate(el=>({url:el.currentSrc,loaded:el.complete && el.naturalWidth>0}));
      assert.ok(heroPhoto.loaded && heroPhoto.url.includes("/media/greensound/"),
        "Original Green Sound hero photo must load as locally hosted WebP: "+JSON.stringify(heroPhoto));
      assert.equal(await page.locator(".crafted-hero__mode").count(),3);
      assert.equal(await page.locator(".crafted-experiences__option").count(),5);
      assert.equal(await page.locator(".crafted-services__row").count(),5);
      const bbox=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,inner:innerWidth}));
      assert.ok(bbox.doc<=bbox.inner+2,width+"px root overflow: "+JSON.stringify(bbox));
      if(width===360 || width===390 || width===1440){
        await page.screenshot({path:dir+"/home-"+width+".png",fullPage:false});
        await page.locator(".crafted-experiences").scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>Array.from(document.querySelectorAll(".crafted-experiences__frame img")).some(i=>i.complete&&i.naturalWidth>0),null,{timeout:12000});

        await page.screenshot({path:dir+"/events-"+width+".png",fullPage:false});
        await page.locator(".crafted-services").scrollIntoViewIfNeeded();
        await page.screenshot({path:dir+"/services-"+width+".png",fullPage:false});
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
      await page.locator(".crafted-experiences__option").first().click();
      assert.equal(await page.locator(".crafted-experiences__option").first().getAttribute("aria-pressed"),"true");
      await page.locator(".crafted-services__row .crafted-services__select").nth(1).click();
      assert.equal(await page.locator(".crafted-services__row").nth(1).getAttribute("data-selected"),"true");
      if(width===390){
        const menu=page.locator(".atelier-header__menu-btn");
        await menu.click();
        assert.equal(await menu.getAttribute("aria-expanded"),"true");
        await page.locator(".atelier-mobile-menu__link").filter({hasText:"Servicii"}).click();
        await page.waitForURL(/\/servicii/,{timeout:15000});
        assert.equal(await page.locator("main h1").count(),1);
        await page.screenshot({path:dir+"/services-page-mobile.png",fullPage:false});
        await page.goto(origin+"/contact",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator('form[aria-label="Cerere de ofertă"]').count(),1);
        assert.equal(await page.locator("main h1").count(),1);
        await page.screenshot({path:dir+"/contact-mobile.png",fullPage:false});
        await page.goto(origin+"/despre-noi",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator("main h1").count(),1);
        await page.goto(origin+"/confidentialitate",{waitUntil:"domcontentloaded"});
        assert.equal(await page.locator("main h1").count(),1);
      }
      assert.deepEqual(failures,[],"Unexpected page errors at "+width+"px");
      await page.close();
    }
    const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
    await reduced.goto(origin+"/",{waitUntil:"domcontentloaded"});
    const stageMotion=await reduced.locator(".crafted-stage-lights__beam").first().evaluate(e=>getComputedStyle(e).animationName);
    assert.equal(stageMotion,"none","Reduced-motion must disable decorative stage beams");
    await reduced.close();
    console.log("PASS: six viewport widths, home interactions, menu, routes, contact, reduced motion");
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

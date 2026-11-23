/* V278 real Chromium audit for /evenimente.
   Matched viewports, real images and keyboard/focus/no-JS/Lite.
   No screenshot is synthesized. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const stage = process.env.GS278_STAGE === "before" ? "before" : "after";
const after = stage === "after";
const dir = "screenshots/v278", base = "http://127.0.0.1:4175";
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const browser = await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try {
    for (const width of (after ? [360,390,430,768,1440,1920] : [390,1440])) {
      const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      const res = await page.goto(base + "/evenimente", {waitUntil:"domcontentloaded",timeout:45000});
      assert.equal(res.status(),200);
      await page.locator('[data-hydrated="true"].gs173-events').waitFor({timeout:18000});
      await page.evaluate(async () => { await document.fonts.ready; });
      const photo = await page.locator(".gs173-stage-image img").evaluate(async img => {await img.decode();return {w:img.naturalWidth,h:img.naturalHeight,src:img.currentSrc};});
      assert(photo.w > 0 && photo.h > 0 && photo.src.includes("/media/greensound/"),"real owner media decoded");
      assert.equal(await page.locator(".gs173-setlist__select").count(),5);
      assert.equal(await page.locator(".gs173-setlist__route").count(),5);
      const layout = await page.evaluate(() => {
        const rail=document.querySelector(".gs173-setlist");
        return {display:getComputedStyle(rail).display,grid:getComputedStyle(rail).gridTemplateColumns,
          overflow:getComputedStyle(rail).overflowX,scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,
          railScroll:rail.scrollWidth,railClient:rail.clientWidth};
      });
      assert(layout.scroll <= layout.client + 2,stage+" body overflow at "+width+" "+JSON.stringify(layout));
      if(after) {
        assert.equal(layout.display,"block","Five-track programme renders as readable editorial rows");
        assert(layout.railScroll <= layout.railClient+2,"No hidden mobile horizontal setlist");
        assert.equal(await page.locator(".gs278-setlist__heading h2").innerText(),"Alege ritmul.");
      }
      await page.screenshot({path:dir+"/"+stage+"-full-"+width+".png",fullPage:true,animations:"disabled"});
      if([390,1440].includes(width))await page.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
      if(after) {
        const first=page.locator(".gs173-setlist__select").first();
        await first.focus();
        await page.keyboard.press("ArrowDown");
        await page.waitForFunction(()=>document.querySelectorAll(".gs173-setlist__select")[1]?.getAttribute("aria-pressed")==="true");
        assert(await page.locator(".gs173-setlist__select").nth(1).evaluate(el=>document.activeElement===el),"ArrowDown focus follows selection");
        assert.match(await page.locator(".gs173-photobox__caption h2").innerText(),/Botezuri/i);
        const href=await page.locator(".gs173-cues__contact").getAttribute("href");
        assert(href.includes("event=")&&href.endsWith("#contact-form-title"));
        await page.keyboard.press("End");
        assert.equal(await page.locator(".gs173-setlist__select").last().getAttribute("aria-pressed"),"true");
        await page.keyboard.press("Home");
        assert.equal(await page.locator(".gs173-setlist__select").first().getAttribute("aria-pressed"),"true");
        if([390,1440].includes(width)){
          await page.locator(".gs173-setlist__select").nth(2).click();
          await page.waitForFunction(()=>document.querySelector(".gs173-photobox__caption h2")?.textContent?.toLowerCase().includes("corporate"));
          await page.locator(".gs173-stage-image img").evaluate(async img=>img.decode());
          await page.screenshot({path:dir+"/after-selected-"+width+".png",animations:"disabled"});
        }
      }
      assert.deepEqual(errors,[],stage+" page errors at "+width);
      await page.close();
      console.log("PASS",stage,width,JSON.stringify(layout));
    }
    if(after){
      const motion=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
      await motion.goto(base+"/evenimente",{waitUntil:"domcontentloaded"});
      await motion.locator('[data-hydrated="true"].gs278-events').waitFor();
      assert.match(await motion.locator(".gs173-stage-image__gates i").first().evaluate(el=>getComputedStyle(el).animationName),/gs173-gate-open/);
      await motion.screenshot({path:dir+"/after-motion-1440.png",animations:"allow"});
      await motion.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
      assert.equal(await motion.locator(".gs173-stage-image__gates i").first().evaluate(el=>getComputedStyle(el).animationName),"none");
      await motion.screenshot({path:dir+"/after-lite-1440.png",animations:"disabled"});
      await motion.close();
      const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
      const nojs=await ctx.newPage();
      assert.equal((await nojs.goto(base+"/evenimente",{waitUntil:"domcontentloaded"})).status(),200);
      assert.equal(await nojs.locator(".gs173-setlist__route").count(),5);
      await nojs.screenshot({path:dir+"/after-nojs-390.png",animations:"disabled"});
      await ctx.close();
    }
  } finally { await browser.close(); }
})().catch(err=>{console.error(err);process.exitCode=1;});

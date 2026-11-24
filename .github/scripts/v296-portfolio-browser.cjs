const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const stage = process.env.GS296_STAGE === "before" ? "before" : "after";
const after = stage === "after", dir = "screenshots/v296";
const url = "http://127.0.0.1:4175/portofoliu";
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    for (const width of (after ? [360,390,430,768,1440,1920] : [390,1440])) {
      const page = await browser.newPage({ viewport: {width,height:900}, deviceScaleFactor:1, reducedMotion:"reduce" });
      const errors=[]; page.on("pageerror", e => errors.push(e.message));
      assert.equal((await page.goto(url,{waitUntil:"domcontentloaded"})).status(),200);
      await page.locator('.rs-video-library[data-hydrated="true"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const opener = page.locator('.rs-gallery__frame[data-photo-id="concert"]');
      await opener.click();
      const dialog = page.locator(".rs-photo-dialog");
      await dialog.waitFor({state:"visible"});
      const image = dialog.locator(".rs-photo-dialog__media > img");
      await image.evaluate(im => im.decode());
      assert(await image.evaluate(im => im.naturalWidth > 0 && im.naturalHeight > 0));
      assert.equal(new URL(page.url()).searchParams.get("photo"),"concert");
      if (after) {
        const strip = dialog.locator(".gs296-filmstrip");
        assert.equal(await strip.locator("button").count(),6);
        assert.equal(await strip.locator('[aria-pressed="true"]').getAttribute("data-frame-id"),"concert");
        await strip.locator("img").evaluateAll(imgs => Promise.all(imgs.map(im => im.decode())));
        assert(await strip.locator("img").evaluateAll(imgs => imgs.every(im => im.naturalWidth > 0 && im.naturalHeight > 0)));
        assert.equal(await image.evaluate(el => getComputedStyle(el).animationName),"none");
        assert.equal(await strip.evaluate(el => getComputedStyle(el).display),"grid");
      }
      await dialog.evaluate(el => { el.scrollTop=0; });
      assert(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth+2),"Dialog horizontal overflow at "+width);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth+2));
      await page.screenshot({path:dir+"/"+stage+"-viewer-"+width+".png",animations:"disabled"});
      if (after) {
        const strip = dialog.locator(".gs296-filmstrip");
        await strip.screenshot({path:dir+"/after-strip-"+width+".png",animations:"disabled"});
        await strip.locator('[data-frame-id="scena"]').click();
        await page.waitForFunction(() => new URL(location.href).searchParams.get("photo")==="scena");
        await image.evaluate(im=>im.decode());
        assert.equal(await strip.locator('[aria-pressed="true"]').getAttribute("data-frame-id"),"scena");
        await dialog.focus();
        await page.keyboard.press("Home");
        await page.waitForFunction(() => new URL(location.href).searchParams.get("photo")==="concert");
        await page.keyboard.press("End");
        await page.waitForFunction(() => new URL(location.href).searchParams.get("photo")==="copii");
        assert.equal(await strip.locator('[aria-pressed="true"]').getAttribute("data-frame-id"),"copii");
      }
      await page.keyboard.press("Escape");
      await dialog.waitFor({state:"hidden"});
      if (after) {
        await page.waitForFunction(() => document.activeElement?.getAttribute("data-photo-id")==="concert");
        await page.locator(".rs-gallery__filters button").nth(2).click();
        await page.locator('.rs-gallery__frame[data-photo-id="scena"]').click();
        await dialog.waitFor({state:"visible"});
        assert.equal(await dialog.locator(".gs296-filmstrip button").count(),1);
        await page.keyboard.press("Escape");
        await dialog.waitFor({state:"hidden"});
      }
      assert.deepEqual(errors,[]);
      console.log("PASS",stage,width);
      await page.close();
    }
    if (after) {
      const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
      await page.goto(url,{waitUntil:"domcontentloaded"});
      await page.locator('.rs-video-library[data-hydrated="true"]').waitFor();
      await page.evaluate(() => document.documentElement.dataset.gsPerformance="full");
      await page.locator('.rs-gallery__frame[data-photo-id="concert"]').click();
      const dialog=page.locator(".rs-photo-dialog");
      await dialog.waitFor({state:"visible"});
      const image=dialog.locator(".rs-photo-dialog__media > img");
      await dialog.locator(".gs296-filmstrip img").evaluateAll(imgs=>Promise.all(imgs.map(im=>im.decode())));
      await dialog.locator('[data-frame-id="dj"]').click();
      await dialog.locator('[data-gs296-photo="dj"]').waitFor();
      assert.equal(await image.evaluate(el=>getComputedStyle(el).animationName),"gs296-edit-cut");
      // Pause a genuine CSS animation at two deterministic times for visual evidence.
      await image.evaluate(async im=>{
        await im.decode();
        const a=im.getAnimations().find(a=>a.animationName==="gs296-edit-cut");
        if (!a) throw Error("Missing edit-cut animation");
        a.pause(); a.currentTime=25;
      });
      await image.screenshot({path:dir+"/after-motion-25ms.png",animations:"allow"});
      await image.evaluate(im=>{const a=im.getAnimations().find(a=>a.animationName==="gs296-edit-cut");a.currentTime=279;});
      await image.screenshot({path:dir+"/after-motion-279ms.png",animations:"allow"});
      await page.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
      assert.equal(await image.evaluate(el=>getComputedStyle(el).animationName),"none");
      await page.screenshot({path:dir+"/after-lite-1440.png",animations:"disabled"});
      await page.close();
      const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});
      const p=await nojs.newPage(); assert.equal((await p.goto(url)).status(),200);
      assert.equal(await p.locator(".rs-gallery__frame").count(),6);
      assert.equal(await p.locator(".gs296-filmstrip").count(),0);
      await nojs.close();
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});

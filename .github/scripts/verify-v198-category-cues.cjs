/* V198 matched real Chromium screenshots and interaction proof.
 * Baseline V197 port 4176; candidate V198 port 4175.
 * No synthetic/mock imagery. Screenshot exactly the same routes and selected states.
 */
const {chromium} = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const crypto = require("node:crypto");
const out = "screenshots/gs-v198-category-cues";
fs.mkdirSync(out,{recursive:true});
const hash = name => crypto.createHash("sha256").update(fs.readFileSync(out+"/"+name)).digest("hex");

async function stabilize(page) {
  await page.evaluate(() => document.fonts.ready);
  const dims = await page.evaluate(() => ({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
  assert(dims.scroll <= dims.viewport + 2,"unexpected horizontal overflow "+JSON.stringify(dims));
}
async function selectParty(page) {
  const buttons=page.locator(".gs173-setlist__select");
  assert.equal(await buttons.count(), 5);
  await buttons.nth(4).click();
  await page.waitForFunction(() => document.querySelector(".gs173-cues__eyebrow")?.textContent?.includes("Petreceri private"),null,{timeout:15000});
  await page.waitForFunction(() => document.querySelector(".gs173-photobox__caption h2")?.textContent?.includes("Petreceri private"),null,{timeout:15000});
  const selected=page.locator(".gs173-setlist__item").nth(4);
  assert.equal(await selected.getAttribute("data-active"),"true");
  assert.equal(await buttons.nth(4).getAttribute("aria-pressed"),"true");
  const photo=await page.locator(".gs173-stage-image img").evaluate(async img => {
    await img.decode(); return {w:img.naturalWidth,h:img.naturalHeight};
  });
  assert(photo.w>0&&photo.h>0,"actual source stage photo must decode");
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try{
  for(const [phase,port,widths] of [["before",4176,[390,1440]],["after",4175,[360,390,430,768,1440,1920]]]){
   for(const width of widths){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
    const errors=[];page.on("pageerror",e=>errors.push(e.message));
    const resp=await page.goto("http://127.0.0.1:"+port+"/evenimente",{waitUntil:"domcontentloaded",timeout:60000});
    assert.equal(resp.status(),200);
    await page.locator(".gs173-setlist__select").first().waitFor();
    await selectParty(page);
    await stabilize(page);
    const band=page.locator(".gs173-setlist__header");
    await band.evaluate(node=>window.scrollTo({top:Math.max(0,node.getBoundingClientRect().top+scrollY-140),behavior:"instant"}));
    await page.screenshot({path:out+"/"+phase+"-events-viewport-"+width+".png",animations:"disabled"});
    if([390,1440].includes(width)){
      await page.locator(".gs173-setlist").screenshot({path:out+"/"+phase+"-setlist-"+width+".png",animations:"disabled"});
      await page.screenshot({path:out+"/"+phase+"-events-full-"+width+".png",fullPage:true,animations:"disabled"});
    }
    if(phase==="after"){
      const svgCount=await page.locator(".gs173-setlist .gs198-cue svg").count();
      assert.equal(svgCount,5,"one original vector cue per event");
      const selected=page.locator(".gs173-setlist__item").nth(4).locator(".gs198-cue");
      assert.equal(await selected.getAttribute("data-kind"),"petreceri-private");
      assert.equal(await selected.getAttribute("data-play"),"true");
      const still=await selected.locator(".gs198-cue__confetti > *").first().evaluate(n=>getComputedStyle(n).animationName);
      assert.equal(still,"none","reduce motion must disable confetti");
      const eventNav=page.locator(".gs173-setlist__select").nth(4);
      await eventNav.focus();
      await page.keyboard.press("ArrowLeft");
      assert.equal(await page.locator(".gs173-setlist__item").nth(3).getAttribute("data-active"),"true");
      assert.equal(await page.locator(".gs173-setlist__select").nth(3).evaluate(n=>document.activeElement===n),true,"arrow navigation moves keyboard focus");
      assert.equal(await page.locator(".gs173-setlist__item").nth(3).locator(".gs198-cue").getAttribute("data-play"),"true");
    }
    assert.deepEqual(errors,[],"page errors "+phase+" / "+width);
    console.log("PASS "+phase+" events "+width);
    await page.close();
   }
  }
  for(const width of [390,1440]){
    assert.notEqual(hash("before-events-viewport-"+width+".png"),hash("after-events-viewport-"+width+".png"),"visible event index change "+width);
  }
  // Real full-motion proof: initial cue is static; user selection launches an individual burst.
  for(const width of [390,1440]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"no-preference"});
    await page.goto("http://127.0.0.1:4175/evenimente",{waitUntil:"domcontentloaded"});
    const party=page.locator(".gs173-setlist__select").nth(4);
    const initial=await party.locator(".gs198-cue__confetti > *").first().evaluate(n=>getComputedStyle(n).animationName);
    assert.equal(initial,"none","never animate before interaction");
    await party.click();
    const pulse=await party.locator(".gs198-cue__confetti > *").first().evaluate(n=>getComputedStyle(n).animationName);
    assert.match(pulse,/gs198-party-burst/);
    await page.waitForTimeout(180);
    await page.locator(".gs173-setlist__header").evaluate(node=>window.scrollTo({top:Math.max(0,node.getBoundingClientRect().top+scrollY-140),behavior:"instant"}));
    await page.screenshot({path:out+"/after-party-burst-"+width+".png",animations:"allow"});
    const old=await party.locator(".gs198-cue").evaluateHandle(n=>n);
    await party.click();
    assert(await old.evaluate(n=>!n.isConnected),"repeated click must replay cue with fresh DOM");
    await page.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
    const lite=await party.locator(".gs198-cue__confetti > *").first().evaluate(n=>getComputedStyle(n).animationName);
    assert.equal(lite,"none","Lite disables burst");
    await page.screenshot({path:out+"/after-party-lite-"+width+".png",animations:"disabled"});
    await page.close();
  }
  // Distinct DJ record hover/focus on the actual Services route.
  for(const width of [390,1440]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"no-preference"});
    assert.equal((await page.goto("http://127.0.0.1:4175/servicii",{waitUntil:"domcontentloaded"})).status(),200);
    const dj=page.locator(".rs-service-index li a").filter({has:page.locator('.gs198-cue[data-kind="dj-mc"]')}).first();
    await dj.scrollIntoViewIfNeeded();
    assert.equal(await page.locator(".rs-service-index .gs198-cue").count(),8);
    await dj.hover();
    const record=await dj.locator(".gs198-cue__record").evaluate(n=>getComputedStyle(n).animationName);
    assert.match(record,/gs198-record-turn/);
    await page.screenshot({path:out+"/after-dj-hover-"+width+".png",animations:"allow"});
    await page.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
    assert.equal(await dj.locator(".gs198-cue__record").evaluate(n=>getComputedStyle(n).animationName),"none");
    await stabilize(page);
    await page.close();
  }
  const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  for(const uri of ["/evenimente","/servicii"]){
    const page=await ctx.newPage();
    const res=await page.goto("http://127.0.0.1:4175"+uri,{waitUntil:"domcontentloaded"});
    assert.equal(res.status(),200,uri);
    assert.equal(await page.locator(".gs198-cue svg").count(),uri==="/evenimente"?5:8);
    const links=await page.locator(uri==="/evenimente"?".gs173-setlist__route":".rs-service-index li a").count();
    assert.equal(links,uri==="/evenimente"?5:8,"native deep-link still works without JS");
    await page.close();
  }
  await ctx.close();
  console.log("PASS V198 matched category cues, re-click, distinct motion, 6 widths, reduced-motion/Lite, SSR no-JS");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

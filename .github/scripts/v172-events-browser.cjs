const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const before = process.env.GS172_STAGE === "before";
const mode = before ? "before" : "after";
const widths = before ? [390,1440] : [360,390,430,768,1440,1920];
const base = "http://127.0.0.1:4175";
const directory = "screenshots/v172";
fs.mkdirSync(directory,{recursive:true});

(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try {
  for (const width of widths) {
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[]; page.on("pageerror", e=>errors.push(e.message));
   const response=await page.goto(base+"/evenimente",{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response.status(),200,"/evenimente SSR 200");
   await page.evaluate(async()=>{await document.fonts.ready});
   if(before) {
    await page.locator(".rs-events-index__row").first().waitFor({timeout:12000});
    assert.equal(await page.locator(".rs-events-index__row").count(),5);
    await page.locator(".rs-events-index__image img").first().evaluate(async img=>{img.loading="eager";await img.decode()});
   }else{
    await page.locator('[data-hydrated="true"].gs172-programme').waitFor({timeout:15000});
    await page.locator(".gs172-programme__select").first().waitFor({timeout:12000});
    const heroImage=await page.locator(".gs172-intro__visual img").evaluate(async img=>{await img.decode();return {w:img.naturalWidth,h:img.naturalHeight,src:img.currentSrc}});
    assert(heroImage.w>0&&heroImage.h>0&&heroImage.src.includes("/media/greensound/"),"Authentic hero photo must decode");
    const heroFont=await page.locator(".gs172-intro__italic").evaluate(el=>({family:getComputedStyle(el).fontFamily,color:getComputedStyle(el).color,fill:getComputedStyle(el).webkitTextFillColor,style:getComputedStyle(el).fontStyle}));
    assert(/serif/i.test(heroFont.family),"Second headline line must use expressive serif");
    assert.equal(heroFont.fill,"rgb(164, 219, 115)","Expressive headline must visibly use the green text fill");
    assert.equal(heroFont.style,"italic","Second headline must stay italic");
    assert.equal(await page.locator(".gs172-programme__select").count(),5);
    assert.equal(await page.locator(".gs172-programme__detail").count(),5);
    const photo=await page.locator(".gs172-stage__photo img").evaluate(async img=>{await img.decode();return{src:img.currentSrc,w:img.naturalWidth,h:img.naturalHeight}});
    assert(photo.w>0&&photo.h>0,"Real preview image must decode");
    assert(photo.src.includes("/media/greensound/") || photo.src.includes("ytimg.com"),"Use existing business catalogue photos");
    const animation=await page.locator(".gs172-intro__signal path").evaluate(el=>getComputedStyle(el).animationName);
    assert.equal(animation,"none","Reduced-motion suppresses moving signal");
   }
   const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   assert(overflow.scroll<=overflow.client+2,mode+" "+width+"px overflow "+JSON.stringify(overflow));
   await page.screenshot({path:directory+"/"+mode+"-full-"+width+".png",fullPage:true,animations:"disabled"});
   if(width===390||width===1440) await page.screenshot({path:directory+"/"+mode+"-viewport-"+width+".png",animations:"disabled"});
   if(!before){
     const first=page.locator(".gs172-programme__select").first();
     await first.focus();await page.keyboard.press("ArrowDown");
     await page.waitForFunction(() => document.querySelectorAll(".gs172-programme__select")[1]?.getAttribute("aria-pressed") === "true", {timeout:7000});
     assert.equal(await page.locator(".gs172-programme__select").nth(1).getAttribute("aria-pressed"),"true","ArrowDown selects second event");
     assert.equal(await page.locator(".gs172-programme__select").nth(1).evaluate(el=>document.activeElement===el),true,"Keyboard focus moves with selection");
     const second=await page.locator(".gs172-programme__select").nth(1).innerText();
     assert((await page.locator(".gs172-stage__image-caption h3").innerText()).includes(second.trim().split("\n").pop().trim()),"Preview reflects selection");
     const offer=await page.locator(".gs172-stage__brief").getAttribute("href");
     assert(offer.startsWith("/contact?event=")&&offer.endsWith("#contact-form-title"),"Contextual Contact link");
     assert.equal(await page.locator(".gs172-stage__actions a").count(),2);
     assert((await page.locator(".gs172-stage__services a").count())>0);
     if(width===390||width===1440) await page.screenshot({path:directory+"/after-selected-"+width+".png",fullPage:false,animations:"disabled"});
   }
   assert.deepEqual(errors,[],"Browser JS errors: "+mode+" "+width);
   console.log("PASS",mode,width,overflow);
   await page.close();
  }
  if(!before){
   const full=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
   await full.goto(base+"/evenimente",{waitUntil:"domcontentloaded"});
   await full.locator(".gs172-intro__signal path").waitFor();
   const running=await full.locator(".gs172-intro__signal path").evaluate(el=>getComputedStyle(el).animationName);
   assert.match(running,/gs172-signal/,"Full-motion signal animates");
   await full.screenshot({path:directory+"/after-full-motion-1440.png",animations:"allow"});
   await full.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
   assert.equal(await full.locator(".gs172-intro__signal path").evaluate(el=>getComputedStyle(el).animationName),"none","Lite suppresses animation");
   await full.screenshot({path:directory+"/after-lite-1440.png",animations:"disabled"});
   await full.close();
   const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
   const nojsPage=await nojs.newPage();
   const nojsResponse=await nojsPage.goto(base+"/evenimente",{waitUntil:"domcontentloaded"});
   assert.equal(nojsResponse.status(),200,"SSR without JS");
   assert.equal(await nojsPage.locator(".gs172-programme__detail").count(),5,"All deep links on SSR no-JS");
   assert.equal(await nojsPage.locator(".gs172-stage__photo img").count(),1);
   await nojsPage.screenshot({path:directory+"/after-nojs-390.png",animations:"disabled"});
   await nojs.close();
  }
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

/* V280 / REAL Chromium before-after visual gate.
 * Baseline = exact V279 SHA, candidate = current exact V280 HEAD.
 * No generated mockups: real browser renders the owned photographs. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS280_STAGE==="before"?"before":"after";
const after=stage==="after",base="http://127.0.0.1:4175",dir="screenshots/v280";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try {
  for(const width of (after?[360,390,430,768,1440,1920]:[390,1440])){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const resp=await page.goto(base+"/",{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(resp.status(),200,"SSR route / at "+width);
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({timeout:15000});
   await page.evaluate(async()=>{
     await document.fonts.ready;
     const images=[...document.images];for(const image of images)image.loading="eager";
     await Promise.allSettled(images.map(image=>image.decode()));
   });
   assert.equal(await page.locator(".gs170-film-card").count(),3,"Three genuine film triggers");
   assert.equal(await page.locator("main h1").count(),1);
   const mainImage=await page.locator(".gs170-stage__image").evaluate(im=>({w:im.naturalWidth,h:im.naturalHeight,url:im.currentSrc}));
   assert(mainImage.w>0&&mainImage.h>0&&mainImage.url.includes("/media/greensound/"),"Verified hero photo");
   const scroll=await page.evaluate(()=>({client:document.documentElement.clientWidth,full:document.documentElement.scrollWidth}));
   assert(scroll.full<=scroll.client+2,"Horizontal overflow at "+width+": "+JSON.stringify(scroll));
   if(after){
    assert.equal(await page.locator('.gs170-home[data-services-direction="v280"]').count(),1);
    assert.equal(await page.locator(".gs-index__chapter").count(),3,"Three photographic chapters");
    assert.equal(await page.locator(".gs-index__service").count(),8,"Eight direct service links");
    assert.equal(await page.locator(".gs170-service-card").count(),0,"Remove old service tiles");
    assert.equal(await page.locator(".gs170-process").count(),0,"Remove redundant process");
    const photo=await page.locator(".gs-index__photo img").evaluateAll(imgs=>imgs.map(im=>({src:im.currentSrc,w:im.naturalWidth,h:im.naturalHeight})));
    assert.equal(photo.length,3);
    assert(photo.every(im=>im.w>0&&im.h>0),"All authentic service photos decoded: "+JSON.stringify(photo));
    const color=await page.locator(".gs-index").evaluate(el=>getComputedStyle(el).backgroundColor);
    assert.equal(color,"rgb(235, 231, 219)","New warm-paper editorial direction is applied in browser");
    const reduced=await page.locator(".gs-index__photo img").first().evaluate(el=>getComputedStyle(el).transitionDuration);
    assert(reduced.split(",").every(x=>parseFloat(x) < .01),"Reduced-motion removes service photo transitions");
    const first=page.locator(".gs-index__service").first();
    await first.focus();assert(await first.evaluate(el=>document.activeElement===el),"Keyboard can focus native service link");
    if(width===390)await page.screenshot({path:dir+"/after-keyboard-focus-390.png",animations:"disabled"});
   }else{
    assert.equal(await page.locator(".gs170-service-card").count(),5,"Genuine V279 baseline");
    assert.equal(await page.locator(".gs170-process__steps li").count(),4);
   }
   await page.screenshot({path:dir+"/"+stage+"-full-"+width+".png",fullPage:true,animations:"disabled"});
   if(width===390||width===1440){
    await page.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
    const target=after?".gs-index":".gs170-services";
    await page.locator(target).screenshot({path:dir+"/"+stage+"-services-"+width+".png",animations:"disabled"});
    await page.locator(".gs170-films").screenshot({path:dir+"/"+stage+"-films-"+width+".png",animations:"disabled"});
   }
   if(after){
    const first=page.locator(".gs-index__service").first();
    await first.click();
    await page.waitForURL(/\/dj-mc\/?$/, {timeout:12000});
    await page.goBack({waitUntil:"domcontentloaded"});
    await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
    const control=page.locator(".gs170-hero__control");
    await control.getByRole("button",{name:/Efect ON/i}).click();
    assert.equal(await page.locator(".gs170-hero").getAttribute("data-lights"),"off");
    await control.getByRole("button",{name:/Efect OFF/i}).click();
    const film=page.locator(".gs170-film-card").first();
    await film.click();
    await page.getByRole("dialog").waitFor();
    assert.equal(await page.getByRole("dialog").locator("iframe").count(),0,"No embedded playback before Play");
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({state:"hidden"});
   }
   assert.deepEqual(errors,[],stage+" page errors at "+width);
   console.log("PASS",stage,width,JSON.stringify({scroll,mainImage}));
   await page.close();
  }
  if(after){
   const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
   await page.goto(base+"/",{waitUntil:"domcontentloaded"});
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
   const image=page.locator(".gs-index__photo img").first();
   const initial=await image.evaluate(el=>getComputedStyle(el).transform);
   await page.locator(".gs-index__chapter").first().hover();
   await page.waitForTimeout(950);
   const hovered=await image.evaluate(el=>getComputedStyle(el).transform);
   assert.notEqual(initial,hovered,"Full-motion editorial photograph reacts to hover");
   await page.locator(".gs-index").screenshot({path:dir+"/after-motion-hover-1440.png",animations:"allow"});
   await page.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
   await page.waitForTimeout(50);
   const lite=await image.evaluate(el=>({transition:getComputedStyle(el).transitionDuration,transform:getComputedStyle(el).transform}));
   assert(lite.transition.split(",").every(x=>parseFloat(x)<.01),"Lite disables photo transition");
   await page.screenshot({path:dir+"/after-lite-1440.png",animations:"disabled"});
   console.log("PASS full-motion vs Lite",initial,hovered,lite);
   await page.close();
   const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
   const nojs=await context.newPage();
   assert.equal((await nojs.goto(base+"/",{waitUntil:"domcontentloaded"})).status(),200);
   assert.equal(await nojs.locator(".gs-index__service").count(),8,"SSR/no-JS direct service access");
   await nojs.screenshot({path:dir+"/after-nojs-390.png",animations:"disabled"});
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

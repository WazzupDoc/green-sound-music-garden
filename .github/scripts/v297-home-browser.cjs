const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS297_STAGE==="before"?"before":"after",after=stage==="after",dir="screenshots/v297";
const url="http://127.0.0.1:4175/";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try{
  for(const width of (after?[360,390,430,768,1440,1920]:[390,1440])){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   assert.equal((await page.goto(url,{waitUntil:"domcontentloaded"})).status(),200);
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   for(const selector of [".gs170-stage__image",".gs-index__photo img",".gs170-film-card__image img",...(after?[".gs297-portrait img"]:[])]){
    const images=page.locator(selector);
    assert(await images.count()>0);
    for(const im of await images.all()){await im.scrollIntoViewIfNeeded();assert(await im.evaluate(async img=>{await img.decode();return img.naturalWidth>0&&img.naturalHeight>0}));}
   }
   await page.evaluate(()=>window.scrollTo(0,0));
   assert.equal(await page.locator("main h1").count(),1);
   assert.equal(await page.locator(".gs-index__chapter").count(),3);
   assert.equal(await page.locator(".gs-index__service").count(),8);
   assert.equal(await page.locator(".gs170-film-card").count(),3);
   assert.equal(await page.locator("main form").count(),0);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),"Horizontal overflow "+width);
   if(after){
    assert.equal(await page.locator(".gs297-diptych figure").count(),2);
    assert.equal(await page.locator(".gs170-stage__console,.gs170-stage__beams").count(),0);
    assert.equal(await page.locator(".gs297-signal svg").evaluate(el=>getComputedStyle(el).animationName),"none");
    assert.equal(await page.locator(".gs170-hero").evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(244, 241, 232)");
    assert(await page.locator(".gs170-hero h1 span").evaluate(el=>el.getBoundingClientRect().right<=innerWidth+1),"Headline overflow "+width);
   }
   await page.screenshot({path:dir+"/"+stage+"-home-"+width+".png",fullPage:true,animations:"disabled"});
   if(width===390||width===1440){
    for(const [name,selector] of [["hero",".gs170-hero"],["services",".gs-index"],["films",".gs170-films"],["contact",".gs170-final"]]){
     await page.locator(selector).screenshot({path:dir+"/"+stage+"-"+name+"-"+width+".png",animations:"disabled"});
    }
   }
   if(after){
    await page.getByRole("button",{name:"Rece",exact:true}).click();
    assert.equal(await page.locator(".gs170-hero").getAttribute("data-hue"),"cool");
    assert.match(await page.locator(".gs170-stage__image").evaluate(el=>getComputedStyle(el).filter),/hue-rotate/);
    await page.getByRole("button",{name:"Efect ON",exact:true}).click();
    assert.equal(await page.locator(".gs170-stage__image").evaluate(el=>getComputedStyle(el).filter),"none");
    await page.locator(".gs170-film-card").first().click();
    const dialog=page.getByRole("dialog");
    await dialog.waitFor();assert.equal(await dialog.locator("iframe").count(),0);
    await page.keyboard.press("Escape");await dialog.waitFor({state:"hidden"});
   }
   assert.deepEqual(errors,[]);
   await page.close(); console.log("PASS",stage,width);
  }
  if(after){
   const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
   await page.goto(url,{waitUntil:"domcontentloaded"});
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="full");
   const signal=page.locator(".gs297-signal svg");
   assert.equal(await signal.evaluate(el=>getComputedStyle(el).animationName),"gs297-signal-in");
   await signal.evaluate(el=>{const a=el.getAnimations()[0];if(!a)throw Error("No signal animation");a.pause();a.currentTime=100;});
   await page.screenshot({path:dir+"/after-motion-start.png",animations:"allow"});
   await signal.evaluate(el=>{el.getAnimations()[0].currentTime=749});
   await page.screenshot({path:dir+"/after-motion-end.png",animations:"allow"});
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
   assert.equal(await signal.evaluate(el=>getComputedStyle(el).animationName),"none");
   await page.close();
   const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
   const nojs=await context.newPage();assert.equal((await nojs.goto(url)).status(),200);
   assert.equal(await nojs.locator(".gs-index__service").count(),8);
   assert.equal(await nojs.locator(".gs170-stage__image").count(),1);
   assert.equal(await nojs.locator(".gs170-final a[href='/contact']").count(),1);
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS294_STAGE==="before"?"before":"after";
const after=stage==="after",dir="screenshots/v294",url="http://127.0.0.1:4175/evenimente/nunti";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try{
  for(const width of (after?[360,390,430,768,1440,1920]:[390,1440])){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   assert.equal((await page.goto(url,{waitUntil:"domcontentloaded"})).status(),200);
   const hero=page.locator(".rs-inner-hero");
   await hero.locator("img").evaluate(async im=>{await im.decode();await document.fonts.ready;});
   assert.equal(await page.locator("main h1").count(),1);
   assert(await hero.locator("img").evaluate(im=>im.naturalWidth>0&&im.naturalHeight>0));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2));
   await page.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
   await hero.screenshot({path:dir+"/"+stage+"-hero-"+width+".png",animations:"disabled"});
   if(after){
    const cta=hero.locator(".gs294-event-primary");
    assert.equal(await cta.count(),1);
    assert.equal(await hero.locator(".gs294-event-quicklinks a").count(),3);
    assert.equal(await cta.evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(200, 237, 153)");
    assert.equal(await hero.locator("img").evaluate(el=>getComputedStyle(el).transitionDuration),"0s");
    await cta.focus();assert(await cta.evaluate(el=>document.activeElement===el));
    await cta.press("Enter");
    assert.equal(await page.evaluate(()=>location.hash),"#oferta-titlu");
    assert.equal(await page.evaluate(()=>document.activeElement.id),"oferta-titlu");
    assert.deepEqual(errors,[]);
   }
   console.log("PASS",stage,width);
   await page.close();
  }
  if(after){
   const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
   await page.goto(url,{waitUntil:"domcontentloaded"});
   const image=page.locator(".rs-inner-hero__image img");
   await image.evaluate(im=>im.decode());
   const before=await image.evaluate(el=>getComputedStyle(el).transform);
   await image.hover();await page.waitForTimeout(1000);
   const hover=await image.evaluate(el=>getComputedStyle(el).transform);
   assert.notEqual(before,hover);
   await page.locator(".rs-inner-hero").screenshot({path:dir+"/after-hover-1440.png",animations:"allow"});
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
   assert.equal(await image.evaluate(el=>getComputedStyle(el).transform),"none");
   assert.equal(await image.evaluate(el=>getComputedStyle(el).transitionDuration),"0s");
   await page.close();
   const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
   const nojs=await context.newPage();
   assert.equal((await nojs.goto(url)).status(),200);
   assert.equal(await nojs.locator(".gs294-event-primary").getAttribute("href"),"#oferta-titlu");
   await nojs.screenshot({path:dir+"/after-nojs-390.png",animations:"disabled"});
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

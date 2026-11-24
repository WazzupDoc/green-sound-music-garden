const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS295_STAGE==="before"?"before":"after";
const after=stage==="after",dir="screenshots/v295",url="http://127.0.0.1:4175/";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try{
  for(const width of (after?[360,390,430,768,1440,1920]:[390,768,1440])){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   assert.equal((await page.goto(url,{waitUntil:"domcontentloaded"})).status(),200);
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   if(width<1024){
    const opener=page.getByRole("button",{name:"Deschide meniul"});
    await opener.click();
    const dialog=page.locator("dialog#atelier-mobile-navigation[open]");
    await dialog.waitFor();
    const links=dialog.locator(".gsm-nav-index__link");
    assert.equal(await links.count(),6);
    if(after){
     const preview=dialog.locator(".gs295-preview");
     await links.nth(1).focus();
     assert.equal(await preview.getAttribute("data-section"),"Evenimente");
     await preview.locator("img").evaluate(im=>im.decode());
     const img=await preview.locator("img").evaluate(im=>({width:im.naturalWidth,url:im.currentSrc}));
     assert(img.width>0&&img.url.includes("/media/greensound/"));
     assert.equal(await preview.locator("img").evaluate(el=>getComputedStyle(el).animationName),"none");
     await page.keyboard.press("ArrowDown");
     assert.equal(await preview.getAttribute("data-section"),"Servicii");
     await preview.locator("img").evaluate(im=>im.decode());
     await page.keyboard.press("ArrowDown");await page.keyboard.press("ArrowDown");
     assert.equal(await preview.getAttribute("data-section"),"Studio");
     assert.equal(await preview.locator("svg.gs295-preview__signal").count(),1);
     await links.nth(1).focus();
     await preview.locator("img").evaluate(im=>im.decode());
    }else await links.nth(1).focus();
    assert(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+2),"Menu horizontal overflow");
    await page.screenshot({path:dir+"/"+stage+"-menu-"+width+".png",animations:"disabled"});
    await page.keyboard.press("Escape");
    await dialog.waitFor({state:"hidden"});
    assert(await opener.evaluate(el=>document.activeElement===el));
    if(after){
     assert.equal(await page.locator(".gs295-preview").count(),0);
     await opener.click();await dialog.waitFor();
     await dialog.locator(".gsm-nav-index__link").nth(1).click();
     await page.waitForURL(/\/evenimente\/?$/);
     await dialog.waitFor({state:"hidden"});
    }
   }else{
    assert(await page.locator(".atelier-header__nav").isVisible());
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2));
    await page.locator(".atelier-header").screenshot({path:dir+"/"+stage+"-header-"+width+".png",animations:"disabled"});
   }
   assert.deepEqual(errors,[]);
   console.log("PASS",stage,width);
   await page.close();
  }
  if(after){
   const page=await browser.newPage({viewport:{width:768,height:900},reducedMotion:"no-preference"});
   await page.goto(url,{waitUntil:"domcontentloaded"});
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="full");
   await page.getByRole("button",{name:"Deschide meniul"}).click();
   const row=page.locator(".gsm-nav-index__entry").first();
   assert.equal(await row.evaluate(el=>getComputedStyle(el).animationName),"gs295-cue-in");
   await page.screenshot({path:dir+"/after-motion-start-768.png",animations:"allow"});
   await page.waitForTimeout(750);
   await page.screenshot({path:dir+"/after-motion-rest-768.png",animations:"allow"});
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
   assert.equal(await row.evaluate(el=>getComputedStyle(el).animationName),"none");
   await page.close();
   const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});
   const nojs=await context.newPage();assert.equal((await nojs.goto(url)).status(),200);
   assert.equal(await nojs.locator(".atelier-header__nav a[href='/evenimente']").count(),1);
   assert.equal(await nojs.locator(".gs295-preview").count(),0);
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

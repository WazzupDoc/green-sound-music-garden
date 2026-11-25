const assert = require("node:assert/strict");
const fs = require("node:fs");
const {chromium} = require("playwright");
const stage = process.env.GS298_STAGE === "before" ? "before" : "after";
const after = stage === "after";
const dir = "screenshots/v298";
const url = "http://127.0.0.1:4175/contact";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try {
  for(const width of after?[360,390,430,768,1440,1920]:[390,1440]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   assert.equal((await page.goto(url,{waitUntil:"domcontentloaded"})).status(),200);
   await page.locator("#cerere-oferta").waitFor();
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator("main h1").count(),1);
   assert.equal(await page.locator(".director-contact-signal__steps li").count(),3);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),"Overflow "+width);
   if(after){
    assert.equal(await page.locator(".gs-contact-v298__icon").count(),3);
    assert.equal(await page.locator(".gs-contact-v298").evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(16, 28, 22)");
    assert.equal(await page.locator(".director-contact-signal__action svg").evaluate(el=>getComputedStyle(el).transitionDuration),"0s");
   }
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:dir+"/"+stage+"-contact-"+width+".png",fullPage:true,animations:"disabled"});
   if(width===390||width===1440)await page.locator(".director-contact-intro").screenshot({path:dir+"/"+stage+"-intro-"+width+".png",animations:"disabled"});
   await page.locator(".director-contact-signal__action").focus();
   await page.keyboard.press("Enter");
   assert.equal(await page.evaluate(()=>document.activeElement.id),"contact-form-title");
   assert.deepEqual(errors,[]);
   await page.close();console.log("PASS",stage,width);
  }
  if(after){
   const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
   await page.goto(url);await page.locator("#cerere-oferta").waitFor();
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="full");
   const arrow=page.locator(".director-contact-signal__action svg");
   await page.locator(".director-contact-signal__action").hover();
   await page.waitForTimeout(260);
   assert.notEqual(await arrow.evaluate(el=>getComputedStyle(el).transform),"none");
   await page.locator(".director-contact-intro").screenshot({path:dir+"/after-hover-1440.png",animations:"allow"});
   await page.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
   assert.equal(await arrow.evaluate(el=>getComputedStyle(el).transform),"none");
   await page.close();
   const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
   const p=await ctx.newPage();assert.equal((await p.goto(url)).status(),200);
   assert.equal(await p.locator(".gs-contact-v298__icon").count(),3);
   assert(await p.getByRole("link",{name:"Deschide WhatsApp pentru ofertă"}).isVisible());
   await p.screenshot({path:dir+"/after-nojs-390.png",fullPage:true});
   await ctx.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

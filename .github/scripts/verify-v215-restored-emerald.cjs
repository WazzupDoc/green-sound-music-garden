// V215 / actual Chromium audit: matched baseline and candidate, no mockup.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const out="screenshots/gs-v215-restored-emerald";
fs.mkdirSync(out,{recursive:true});
const widths=[360,390,430,768,1440,1920];
async function open(browser,port,width,reduce="reduce"){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:reduce});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const response=await page.goto("http://127.0.0.1:"+port+"/",{waitUntil:"domcontentloaded",timeout:45000});
 assert.equal(response.status(),200);
 await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({timeout:20000});
 await page.evaluate(async()=>{await document.fonts.ready});
 const w=await page.evaluate(()=>({s:document.documentElement.scrollWidth,c:document.documentElement.clientWidth}));
 assert(w.s<=w.c+2,"Overflow at "+width+" "+JSON.stringify(w));
 await page.locator(".gs170-stage__image").evaluate(el=>el.decode());
 return {page,errors};
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1440]){
   for(const [label,port] of [["before-v213",4176],["after-v215",4175]]){
    const {page,errors}=await open(browser,port,width);
    await page.screenshot({path:out+"/"+label+"-viewport-"+width+".png",animations:"disabled"});
    await page.locator(".gs170-hero").screenshot({path:out+"/"+label+"-hero-"+width+".png",animations:"disabled"});
    await page.locator(".atelier-header__finder-btn").click();
    const finder=page.locator(".gs-finder");await finder.waitFor({timeout:15000});
    assert(await finder.locator("#gs-finder-input").evaluate(el=>el===document.activeElement));
    await page.screenshot({path:out+"/"+label+"-finder-"+width+".png",animations:"disabled"});
    if(label==="after-v215"){
     assert.equal(await page.locator(".gs170-stage__console").count(),1, "Original mixer is restored");
     assert.equal(await page.locator('[data-artwork="procedural-svg"]').count(),0, "Rejected vector is absent");
     assert.equal(await page.locator(".atelier-header__nav .gs214-nav-code").count(),0, "Rejected numbered header is absent");
     assert.equal(await finder.locator(".gs215-finder__suggestions button").count(),3);
     await finder.getByRole("button",{name:"DJ & MC"}).click();
     assert.equal(await finder.locator("#gs-finder-input").inputValue(),"DJ");
     assert((await finder.locator(".gs-finder__result").count())>0);
     await page.screenshot({path:out+"/after-v215-search-dj-"+width+".png",animations:"disabled"});
    }
    await page.keyboard.press("Escape");await finder.waitFor({state:"hidden",timeout:10000});
    assert.deepEqual(errors,[]);
    await page.close();
   }
  }
  for(const width of widths){
   const {page,errors}=await open(browser,4175,width);
   assert.equal(await page.locator(".gs170-stage__console").count(),1);
   const consoleDisplay=await page.locator(".gs170-stage__console").evaluate(el=>getComputedStyle(el).display);
   assert.equal(consoleDisplay,width<=740?"none":"block","Mobile mixer should not obscure hero controls");
   assert.equal(await page.locator(".gs170-stage__beams i").first().evaluate(el=>getComputedStyle(el).animationName),"none");
   await page.screenshot({path:out+"/after-v215-width-"+width+".png",animations:"disabled"});
   assert.deepEqual(errors,[]);
   await page.close();
  }
  const {page:motion,errors}=await open(browser,4175,1440,"no-preference");
  await motion.evaluate(()=>document.documentElement.removeAttribute("data-gs-performance"));
  await motion.locator('.gs170-hero[data-stage-visible="true"]').waitFor();
  assert.match(await motion.locator(".gs170-stage__beams i").first().evaluate(el=>getComputedStyle(el).animationName),/gs170-beam/);
  await motion.screenshot({path:out+"/motion-active-1.png",animations:"allow"});
  await motion.waitForTimeout(460);
  await motion.screenshot({path:out+"/motion-active-2.png",animations:"allow"});
  await motion.getByRole("button",{name:"Efect ON"}).click();
  assert.equal(await motion.locator(".gs170-hero").getAttribute("data-lights"),"off");
  await motion.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
  await motion.getByRole("button",{name:"Efect OFF"}).click();
  assert.equal(await motion.locator(".gs170-stage__beams i").first().evaluate(el=>getComputedStyle(el).animationName),"none");
  await motion.screenshot({path:out+"/motion-lite.png",animations:"disabled"});
  assert.deepEqual(errors,[]);
  await motion.close();
  console.log("PASS V215 matched Chromium, finder, six widths, motion and Lite");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

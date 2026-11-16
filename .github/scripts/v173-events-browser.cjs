const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const before=process.env.GS173_STAGE==="before";
const mode=before?"before":"after";
const dir="screenshots/v173",base="http://127.0.0.1:4175";
const widths=before?[390,1440]:[360,390,430,768,1440,1920];
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try {
 for(const width of widths) {
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  const response=await page.goto(base+"/evenimente",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response.status(),200);await page.evaluate(async()=>{await document.fonts.ready});
  if(before) {
   await page.locator('[data-hydrated="true"].gs172-programme').waitFor({timeout:18000});
   await page.locator(".gs172-intro__visual img").evaluate(async img=>img.decode());
  }else{
   await page.locator('[data-hydrated="true"].gs173-events').waitFor({timeout:18000});
   assert.equal(await page.locator("main h1").count(),1);
   assert.equal(await page.locator(".gs173-setlist__select").count(),5);
   assert.equal(await page.locator(".gs173-setlist__route").count(),5);
   const photo=await page.locator(".gs173-stage-image img").evaluate(async img=>{await img.decode();return{w:img.naturalWidth,h:img.naturalHeight,src:img.currentSrc}});
   assert(photo.w>0&&photo.h>0&&photo.src.includes("/media/greensound/"));
   const script=await page.locator(".gs173-statement__script").evaluate(el=>({style:getComputedStyle(el).fontStyle,fill:getComputedStyle(el).webkitTextFillColor}));
   assert.equal(script.style,"italic");assert.equal(script.fill,"rgb(183, 255, 135)");
   const still=await page.locator(".gs173-stage-image__gates i").first().evaluate(el=>getComputedStyle(el).animationName);
   assert.equal(still,"none","Reduced motion");
  }
  const d=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert(d.scroll<=d.client+2,mode+" overflow "+width+": "+JSON.stringify(d));
  await page.screenshot({path:dir+"/"+mode+"-full-"+width+".png",fullPage:true,animations:"disabled"});
  if([390,1440].includes(width))await page.screenshot({path:dir+"/"+mode+"-viewport-"+width+".png",animations:"disabled"});
  if(!before){
    const first=page.locator(".gs173-setlist__select").first();await first.focus();await page.keyboard.press("ArrowRight");
    await page.waitForFunction(()=>document.querySelectorAll(".gs173-setlist__select")[1]?.getAttribute("aria-pressed")==="true");
    assert.equal(await page.locator(".gs173-setlist__select").nth(1).evaluate(el=>document.activeElement===el),true);
    assert.match(await page.locator(".gs173-photobox__caption h2").innerText(),/Botezuri/i);
    assert.match(await page.locator(".gs173-cues__eyebrow").innerText(),/Botezuri/i);
    assert.equal(await page.locator(".gs173-cues__moments li").count(),3);
    assert.match(await page.locator(".gs173-cues__contact").getAttribute("href"),/event=Botez.*#contact-form-title/);
    await page.keyboard.press("End");
    await page.waitForFunction(()=>document.querySelectorAll(".gs173-setlist__select")[4]?.getAttribute("aria-pressed")==="true");
    await page.keyboard.press("Home");
    await page.waitForFunction(()=>document.querySelectorAll(".gs173-setlist__select")[0]?.getAttribute("aria-pressed")==="true");
    if([390,1440].includes(width)){await page.locator(".gs173-setlist__select").nth(2).click();
      await page.waitForFunction(()=>document.querySelector(".gs173-photobox__caption h2")?.textContent?.includes("corporate"));
      const decodedThird=await page.locator(".gs173-stage-image img").evaluate(async img=>{await img.decode();return img.naturalWidth});
      assert(decodedThird>0,"Updated selected photo must be decoded");
      await page.screenshot({path:dir+"/after-selected-"+width+".png",fullPage:false,animations:"disabled"})}
  }
  assert.deepEqual(errors,[],mode+" page errors "+width);
  console.log("PASS",mode,width);await page.close();
 }
 if(!before){
  const full=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
  await full.goto(base+"/evenimente",{waitUntil:"domcontentloaded"});
  await full.locator('[data-hydrated="true"].gs173-events').waitFor();
  assert.match(await full.locator(".gs173-stage-image__gates i").first().evaluate(el=>getComputedStyle(el).animationName),/gs173-gate-open/);
  await full.locator(".gs173-setlist__select").nth(3).click();
  await full.waitForFunction(()=>document.querySelector(".gs173-photobox__caption h2")?.textContent?.includes("Concerte"));
  await full.waitForFunction(()=>document.querySelectorAll(".gs173-setlist__select")[3]?.getAttribute("aria-pressed")==="true");
  assert.match(await full.locator(".gs173-stage-image__gates i").first().evaluate(el=>getComputedStyle(el).animationName),/gs173-gate-open/);
  await full.screenshot({path:dir+"/after-motion-1440.png",animations:"allow"});
  await full.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
  assert.equal(await full.locator(".gs173-stage-image__gates i").first().evaluate(el=>getComputedStyle(el).animationName),"none");
  await full.screenshot({path:dir+"/after-lite-1440.png",animations:"disabled"});
  await full.close();
  const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  const nojs=await ctx.newPage();assert.equal((await nojs.goto(base+"/evenimente",{waitUntil:"domcontentloaded"})).status(),200);
  assert.equal(await nojs.locator(".gs173-setlist__route").count(),5);
  assert.equal(await nojs.locator(".gs173-stage-image img").count(),1);
  await nojs.screenshot({path:dir+"/after-nojs-390.png",animations:"disabled"});await ctx.close();
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
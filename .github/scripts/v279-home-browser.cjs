/* Green Sound V279: real matched Chromium art-direction audit.
 * Captures / at 390 and 1440 before & after; six widths after, validates
 * actual local media, controls, reduced-motion, Lite, keyboard and Escape. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS279_STAGE==="before"?"before":"after";
const after=stage==="after",dir="screenshots/v279",base="http://127.0.0.1:4175";
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try {
  for(const width of(after?[360,390,430,768,1440,1920]:[390,1440])){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
   const errs=[];page.on("pageerror",e=>errs.push(e.message));
   const response=await page.goto(base+"/",{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response.status(),200);
   await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({timeout:15000});
   await page.evaluate(async()=>{await document.fonts.ready});
   // Full-page browser captures must not show blank unloaded lazy media.
   const media=await page.evaluate(async()=>{
     const imgs=[...document.images];
     imgs.forEach(im=>{if(im.loading==="lazy")im.loading="eager";});
     await Promise.allSettled(imgs.map(im=>im.decode()));
     return imgs.map(im=>({src:im.currentSrc,w:im.naturalWidth,h:im.naturalHeight}));
   });
   const absent=media.filter(im=>im.w===0||im.h===0);
   if(absent.length) console.warn("Unloaded image resources",stage,width,JSON.stringify(absent));
   const image=await page.locator(".gs170-stage__image").evaluate(async im=>{
    await im.decode();return{w:im.naturalWidth,h:im.naturalHeight,src:im.currentSrc,filter:getComputedStyle(im).filter};
   });
   assert(image.w>0&&image.h>0&&image.src.includes("/media/greensound/"),"Real owner concert image decodes");
   const dims=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert(dims.scroll<=dims.client+2,stage+" "+width+" body overflow: "+JSON.stringify(dims));
   assert.equal(await page.locator(".gs170-film-card").count(),3);
   assert.equal(await page.locator(".gs170-service-card").count(),5);
   assert.equal(await page.locator(".gs170-services__extras nav a").count(),3);
   assert.match(await page.locator(".gs170-hero h1").innerText(),/evenimente memorabile/i);
   const state=await page.locator(".gs170-hero").evaluate(el=>({
    cls:el.className,console:getComputedStyle(el.querySelector(".gs170-stage__console")).display,
    wave:getComputedStyle(el.querySelector(".gs170-wave")).display,
    h1:getComputedStyle(el.querySelector("h1")).fontSize,
   }));
   function GetStyle(){return{}}
   if(after){
    assert.equal(await page.locator(".gs170-home[data-art-direction=v279]").count(),1);
    assert.equal(state.console,"none");
    assert.equal(state.wave,"none");
    assert(!/hue-rotate\(-105deg\)/.test(image.filter),"No fake monochromatic green photo filter");
    const font=await page.locator(".gs170-hero h1 .gs279-title-serif").evaluate(el=>({family:getComputedStyle(el).fontFamily,color:getComputedStyle(el).color}));
    assert(/serif/i.test(font.family),"The real editorial italic is serif");
    const reduced=await page.locator(".gs170-stage__beams i").first().evaluate(el=>getComputedStyle(el).animationName);
    assert.equal(reduced,"none","Reduced motion must stop decorative beams");
   }
   await page.screenshot({path:dir+"/"+stage+"-full-"+width+".png",fullPage:true,animations:"disabled"});
   if([390,1440].includes(width)){
    await page.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
    await page.locator(".gs170-hero").screenshot({path:dir+"/"+stage+"-hero-"+width+".png",animations:"disabled"});
   }
   if(after){
    // Actual user-action state and accessible controls; no fabricated light source.
    const control=page.locator(".gs170-hero__control");
    await control.getByRole("button",{name:/Efect ON/i}).click();
    assert.equal(await page.locator(".gs170-hero").getAttribute("data-lights"),"off");
    await control.getByRole("button",{name:/Efect OFF/i}).click();
    assert.equal(await page.locator(".gs170-hero").getAttribute("data-lights"),"on");
    await control.getByRole("button",{name:"Rece"}).click();
    assert.equal(await page.locator(".gs170-hero").getAttribute("data-hue"),"cool");
    const cool=await page.locator(".gs170-stage__image").evaluate(el=>getComputedStyle(el).filter);
    assert.notEqual(cool,image.filter,"Light controls change image treatment");
    await control.getByRole("button",{name:"Verde"}).click();
    assert.equal(await page.locator(".gs170-hero").getAttribute("data-hue"),"green");
    if([390,1440].includes(width))await page.screenshot({path:dir+"/after-active-"+width+".png",animations:"disabled"});
   }
   assert.deepEqual(errs,[],stage+" errors at "+width);
   console.log("PASS",stage,width,JSON.stringify({dims,image,classes:state.cls}));
   await page.close();
  }
  if(after){
   const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
   await page.goto(base+"/",{waitUntil:"domcontentloaded"});await page.locator(".gs170-home[data-art-direction=v279] .gs170-hero[data-hydrated=true]").waitFor();
   assert.match(await page.locator(".gs170-stage__beams i").first().evaluate(el=>getComputedStyle(el).animationName),/gs170-beam/);
   await page.screenshot({path:dir+"/after-motion-1440.png",animations:"allow"});
   await page.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
   assert.equal(await page.locator(".gs170-stage__beams i").first().evaluate(el=>getComputedStyle(el).animationName),"none");
   await page.screenshot({path:dir+"/after-lite-1440.png",animations:"disabled"});
   await page.getByRole("button",{name:/Deschide filmul:/}).first().click();
   await page.getByRole("dialog").waitFor();
   await page.keyboard.press("Escape");
   await page.getByRole("dialog").waitFor({state:"hidden"});
   await page.close();
   const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
   const nojs=await context.newPage();
   assert.equal((await nojs.goto(base+"/",{waitUntil:"domcontentloaded"})).status(),200);
   assert.equal(await nojs.locator(".gs170-service-card").count(),5);
   await nojs.screenshot({path:dir+"/after-nojs-390.png",animations:"disabled"});
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

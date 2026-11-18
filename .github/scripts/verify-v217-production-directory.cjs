// V217 real Chromium: exact V216 baseline vs V217, same / route + viewport.
// Native keyboard and direct service links. No screenshot mockups or generated media.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const output="screenshots/gs-v217-production-directory";
fs.mkdirSync(output,{recursive:true});
const widths=[360,390,430,768,1440,1920];
async function load(browser,port,width,motion="reduce"){
 const page=await browser.newPage({viewport:{width,height:920},deviceScaleFactor:1,reducedMotion:motion});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const response=await page.goto("http://127.0.0.1:"+port+"/",{waitUntil:"domcontentloaded",timeout:50000});
 assert.equal(response.status(),200);
 await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({timeout:30000});
 await page.evaluate(async()=>document.fonts.ready);
 await page.locator(".gs170-stage__image").evaluate(el=>el.decode());
 const dims=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 assert(dims.scroll<=dims.client+2,"No horizontal overflow at "+width+": "+JSON.stringify(dims));
 return {page,errors};
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 try {
  for(const width of [390,1440]){
   for(const [name,port] of [["before-v216",4176],["after-v217",4175]]){
    const {page,errors}=await load(browser,port,width);
    await page.screenshot({path:output+"/"+name+"-homepage-"+width+".png",fullPage:true,animations:"disabled"});
    await page.locator(".atelier-header").screenshot({path:output+"/"+name+"-header-"+width+".png",animations:"disabled"});
    if(width===1440){
      if(name==="after-v217"){
       const opener=page.getByRole("button",{name:"Deschide catalogul serviciilor"});
       await opener.focus();await page.keyboard.press("Enter");
       const region=page.getByRole("region",{name:"Descoperă serviciile Green Sound Music"});
       await region.waitFor({timeout:9000});
       assert.equal(await region.locator(".gs217-directory__service").count(),8);
       assert.equal(await region.locator(".gs217-service-glyph").count(),8);
       const bounds=await region.boundingBox();
       assert(bounds && bounds.x>=0 && bounds.x+bounds.width<=width+1,"Menu must fit viewport");
       await page.screenshot({path:output+"/after-v217-directory-1440.png",animations:"disabled"});
       const names=await region.locator(".gs217-directory__service").allTextContents();
       assert(names.some(x=>x.includes("DJ & MC")) && names.some(x=>x.includes("Ursitoare")));
       await page.keyboard.press("Escape");await region.waitFor({state:"detached",timeout:5000});
       assert.equal(await opener.evaluate(el=>el===document.activeElement),true,"Escape restores focus");
       await opener.focus();await page.keyboard.press("Space");
       await region.waitFor({timeout:5000});
       await page.mouse.click(10,210); // Outside panel: no accidental route change.
       await region.waitFor({state:"detached",timeout:5000});
       // Explicit keyboard access to real service destination.
       await opener.click();
       const dj=region.getByRole("link",{name:/DJ & MC/});
       assert.match(await dj.getAttribute("href"),/dj-mc/);
      }else{
       await page.locator('.atelier-header__nav a[href="/servicii"]').hover();
       await page.screenshot({path:output+"/before-v216-service-hover-1440.png",animations:"disabled"});
      }
    }else{
      const menu=page.getByRole("button",{name:"Deschide meniul"});
      await menu.click();
      const dialog=page.locator("dialog.atelier-mobile-menu");
      await dialog.waitFor({state:"visible",timeout:5000});
      await page.screenshot({path:output+"/"+name+"-mobile-menu-390.png",animations:"disabled"});
      await page.keyboard.press("Escape");await dialog.waitFor({state:"hidden",timeout:5000});
    }
    assert.deepEqual(errors,[],"No browser JS error "+name+"/"+width);
    await page.close();
   }
  }
  for(const width of widths){
   const {page,errors}=await load(browser,4175,width);
   if(width>=1024){
    await page.getByRole("button",{name:"Deschide catalogul serviciilor"}).click();
    const panel=page.locator(".gs217-directory");
    await panel.waitFor({state:"visible",timeout:5000});
    const b=await panel.boundingBox();
    assert(b && b.x>=0 && b.x+b.width<=width+2,"Panel safe at "+width);
    const anim=await panel.evaluate(el=>getComputedStyle(el).animationName);
    assert.equal(anim,"none","No motion when reduced at "+width);
   }else{
    assert.equal(await page.locator(".gs217-services-wrap").isVisible(),false,"Hide desktop nav at "+width);
   }
   await page.screenshot({path:output+"/candidate-"+width+".png",animations:"disabled"});
   assert.deepEqual(errors,[]);
   await page.close();
  }
  const {page,errors}=await load(browser,4175,1440,"no-preference");
  await page.evaluate(()=>document.documentElement.removeAttribute("data-gs-performance"));
  await page.getByRole("button",{name:"Deschide catalogul serviciilor"}).click();
  const panel=page.locator(".gs217-directory");
  assert.match(await panel.evaluate(el=>getComputedStyle(el).animationName),/gs217-enter/);
  await page.screenshot({path:output+"/full-motion-open-1440.png",animations:"allow"});
  await page.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
  assert.equal(await panel.evaluate(el=>getComputedStyle(el).animationName),"none","Lite disables animation");
  await page.screenshot({path:output+"/lite-open-1440.png",animations:"disabled"});
  assert.deepEqual(errors,[]);
  await page.close();
  console.log("PASS V217: exact V216 baseline vs candidate, real nav, Escape, links, six widths, Lite/reduced/full motion");
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

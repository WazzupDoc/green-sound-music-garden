const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const after=process.env.GS302_STAGE==="after";
const stage=after?"after":"before";
const dir="screenshots/v302";
fs.mkdirSync(dir,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
try{
for(const width of after?[360,390,430,768,1440,1920]:[390,1440]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 assert.equal((await page.goto("http://127.0.0.1:4175/")).status(),200);
 await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();
 await page.evaluate(()=>document.fonts.ready);
 for(const im of await page.locator(".gs170-stage__image,.gs297-portrait img,.gs-index__photo img").all()){await im.scrollIntoViewIfNeeded();assert(await im.evaluate(async e=>{await e.decode();return e.naturalWidth>0}));}
 await page.evaluate(()=>window.scrollTo(0,0));
 assert.equal(await page.locator(".gs-index__service").count(),8);
 assert.equal(await page.locator(".gs170-film-card").count(),3);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),"horizontal overflow "+width);
 if(after){
 const sources=await page.locator(".gs170-hero img,.gs-index__photo img,.gs170-film-card img").evaluateAll(es=>es.map(e=>e.currentSrc||e.src));
 assert.equal(new Set(sources).size,sources.length,"Repeated homepage photograph");
 assert.equal(await page.locator(".gs-live-deck__art").count(),1);
 assert.equal(await page.locator(".gs-live-deck__disc").evaluate(e=>getComputedStyle(e).animationName),"none");
 assert.equal(await page.locator(".gs302-chapter-glyph").count(),3);
 assert.equal(await page.locator("#gs170-title em").evaluate(e=>getComputedStyle(e).color),"rgb(193, 250, 67)");
 assert.equal(await page.locator(".gs300-wave").evaluate(e=>getComputedStyle(e).animationName),"none");
 if(width>=1440){
 const links=page.locator(".atelier-header__nav a:visible");
 assert(await links.count()>=7);
 assert(await links.evaluateAll(es=>es.every(e=>e.querySelector(".gs302-reference-glyph"))));
 const last=await links.last().boundingBox();const actions=await page.locator(".atelier-header__actions").boundingBox();
 assert(last.x+last.width<=actions.x+2,"navigation overlaps controls");
 }
 }
 await page.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
 await page.locator("header.atelier-header").screenshot({path:dir+"/"+stage+"-header-"+width+".png",animations:"disabled"});
 await page.locator("#gs-production-index").screenshot({path:dir+"/"+stage+"-services-"+width+".png",animations:"disabled"});
 if(width<1024){
 const menu=page.locator(".atelier-header__menu-btn");
 await menu.click();await page.locator("dialog.atelier-mobile-menu[open]").waitFor();
 await page.locator('.gsm-nav-index__link[href="/servicii"]').focus();
 assert.equal(await page.locator(".gsm-nav-index__cue strong").innerText(),"Servicii");
 await page.keyboard.press("Escape");await page.locator("dialog.atelier-mobile-menu[open]").waitFor({state:"hidden"});
 await page.waitForFunction(()=>document.activeElement===document.querySelector(".atelier-header__menu-btn"));
 }
 assert.deepEqual(errors,[]);await page.close();
}

if(after){
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:"no-preference"});
 await page.goto("http://127.0.0.1:4175/");
 const hero=page.locator('.gs170-hero[data-hydrated="true"]');
 await hero.waitFor();
 const beam=hero.locator(".gs300-atmosphere i").first();
 const wave=hero.locator(".gs300-wave");
 await page.waitForFunction(()=>getComputedStyle(document.querySelector(".gs300-atmosphere i")).animationName==="gs302-live-sweep");
 await page.waitForTimeout(450);
 const disc=hero.locator(".gs-live-deck__disc");
 assert.equal(await disc.evaluate(e=>getComputedStyle(e).animationName),"gs-live-deck-spin");
 const discA=await disc.evaluate(e=>getComputedStyle(e).transform);
 const a=await beam.evaluate(e=>getComputedStyle(e).transform);
 await page.screenshot({path:dir+"/live-cue-early-1440.png"});
 await page.waitForTimeout(950);
 const b=await beam.evaluate(e=>getComputedStyle(e).transform);
 assert.notEqual(a,b,"stage light must actually move");
 assert.notEqual(discA,await disc.evaluate(e=>getComputedStyle(e).transform),"Deck must rotate");
 await page.screenshot({path:dir+"/live-cue-mid-1440.png"});
 await hero.getByRole("button",{name:"Efect ON"}).click();
 assert.equal(await wave.evaluate(e=>getComputedStyle(e).display),"none");
 assert.equal(await disc.evaluate(e=>getComputedStyle(e).animationName),"none");
 await page.screenshot({path:dir+"/live-cue-off-1440.png"});
 await hero.getByRole("button",{name:"Efect OFF"}).click();
 await hero.getByRole("button",{name:"Rece"}).click();
 assert.equal(await hero.getAttribute("data-hue"),"cool");
 await page.screenshot({path:dir+"/live-cue-cool-1440.png"});
 await page.evaluate(()=>{document.documentElement.dataset.gsPerformance="lite"});
 assert.equal(await beam.evaluate(e=>getComputedStyle(e).animationName),"none");
 assert.equal(await disc.evaluate(e=>getComputedStyle(e).animationName),"none");
 assert.equal(await wave.evaluate(e=>getComputedStyle(e).animationName),"none");
 await page.close();
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});

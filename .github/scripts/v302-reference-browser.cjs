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
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});

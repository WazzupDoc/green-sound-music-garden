const assert=require("node:assert/strict"),fs=require("node:fs"),{chromium}=require("playwright");
const stage=process.env.GS301_STAGE==="before"?"before":"after",after=stage==="after",dir="screenshots/v301";
fs.mkdirSync(dir,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});try{
for(const width of after?[360,390,430,768,1440,1920]:[390,1440]){
 const p=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
 assert.equal((await p.goto("http://127.0.0.1:4175/")).status(),200);
 const section=p.locator("#gs-production-index");await section.waitFor();await p.evaluate(()=>document.fonts.ready);
 const links=section.locator(".gs-index__service");assert.equal(await links.count(),8);assert.equal(await section.locator(".gs-index__chapter").count(),3);
 const hrefs=await links.evaluateAll(es=>es.map(e=>e.getAttribute("href")));assert.equal(new Set(hrefs).size,8);
 for(const im of await section.locator("img").all()){await im.scrollIntoViewIfNeeded();assert(await im.evaluate(async e=>{await e.decode();return e.naturalWidth>0}));}
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 if(after){assert.equal(await section.locator(".gs301-service-glyph").count(),8);assert(await links.evaluateAll(es=>es.every(e=>e.getBoundingClientRect().height>=44)));await links.first().focus();assert(await links.first().evaluate(e=>e===document.activeElement));assert.equal(await section.locator(".gs301-photo-signal i").first().evaluate(e=>getComputedStyle(e).animationName),"none");await links.first().blur();}
 await section.screenshot({path:dir+"/"+stage+"-home-"+width+".png",animations:"disabled"});await p.close();
}
if(after){const p=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});await p.goto("http://127.0.0.1:4175/");await p.evaluate(()=>document.documentElement.dataset.gsPerformance="full");await p.locator(".gs-index__service").first().hover();const bar=p.locator(".gs301-photo-signal i").first();assert.equal(await bar.evaluate(e=>getComputedStyle(e).animationName),"gs301-channel-cue");await bar.evaluate(e=>{const a=e.getAnimations()[0];if(a){a.pause();a.currentTime=190}});await p.locator(".gs-index__chapter").first().screenshot({path:dir+"/channel-active.png",animations:"allow"});await p.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");assert.equal(await bar.evaluate(e=>getComputedStyle(e).animationName),"none");await p.close();}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});

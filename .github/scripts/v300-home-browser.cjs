const assert=require("node:assert/strict"), fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS300_STAGE==="before"?"before":"after", after=stage==="after",dir="screenshots/v300";
fs.mkdirSync(dir,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});try{
for(const width of after?[360,390,430,768,1440,1920]:[390,1440]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 assert.equal((await page.goto("http://127.0.0.1:4175/",{waitUntil:"domcontentloaded"})).status(),200);
 await page.locator('.gs170-hero[data-hydrated="true"]').waitFor();await page.evaluate(()=>document.fonts.ready);
 for(const im of await page.locator(".gs170-stage__image,.gs297-portrait img,.gs-index__photo img,.gs170-film-card__image img").all()){await im.scrollIntoViewIfNeeded();assert(await im.evaluate(async e=>{await e.decode();return e.naturalWidth>0}));}
 await page.evaluate(()=>window.scrollTo(0,0));
 assert.equal(await page.locator("main h1").count(),1);assert.equal(await page.locator(".gs-index__chapter").count(),3);assert.equal(await page.locator(".gs-index__service").count(),8);assert.equal(await page.locator(".gs170-film-card").count(),3);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),"overflow "+width);
 if(after){
 assert.equal(await page.locator(".gs300-wave path").count(),21);assert.equal(await page.locator(".gs300-wave").evaluate(e=>getComputedStyle(e).animationName),"none");
 assert.equal(await page.locator("[data-stage=cinematic]").evaluate(e=>getComputedStyle(e).backgroundColor),"rgb(6, 23, 16)");
 assert(await page.locator("[data-stage=cinematic] h1").evaluate(e=>[...e.children].every(c=>c.getBoundingClientRect().right<=innerWidth+2)),"headline clipped "+width);
 }
 await page.screenshot({path:dir+"/"+stage+"-home-"+width+".png",fullPage:true,animations:"disabled"});
 await page.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
 if(after){await page.getByRole("button",{name:"Vezi showreel"}).click();await page.getByRole("dialog").waitFor();assert.equal(await page.getByRole("dialog").locator("iframe").count(),0);await page.keyboard.press("Escape");await page.getByRole("dialog").waitFor({state:"hidden"});await page.getByRole("button",{name:"Efect ON",exact:true}).click();assert.equal(await page.locator(".gs300-wave").evaluate(e=>getComputedStyle(e).display),"none");}
 assert.deepEqual(errors,[]);await page.close();
}
if(after){const p=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});await p.goto("http://127.0.0.1:4175/");await p.locator('.gs170-hero[data-hydrated="true"]').waitFor();await p.evaluate(()=>document.documentElement.dataset.gsPerformance="full");
const wave=p.locator(".gs300-wave");assert.equal(await wave.evaluate(e=>getComputedStyle(e).animationName),"gs300-wave-cue");
await wave.evaluate(e=>{const a=e.getAnimations()[0];if(a){a.pause();a.currentTime=250}});await p.screenshot({path:dir+"/motion-start.png",animations:"allow"});
await wave.evaluate(e=>{const a=e.getAnimations()[0];if(a)a.currentTime=2000});await p.mouse.move(1000,440);await p.waitForTimeout(300);assert.notEqual(await p.locator("[data-stage=cinematic]").evaluate(e=>e.style.getPropertyValue("--gs300-x")),"");await p.screenshot({path:dir+"/motion-active.png",animations:"allow"});
await p.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");assert.equal(await wave.evaluate(e=>getComputedStyle(e).animationName),"none");await p.close();
const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const n=await ctx.newPage();assert.equal((await n.goto("http://127.0.0.1:4175/")).status(),200);assert.equal(await n.locator(".gs-index__service").count(),8);assert.equal(await n.locator(".gs300-wave path").count(),21);await ctx.close();}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});

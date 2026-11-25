const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const stage=process.env.GS299_STAGE==="before"?"before":"after", after=stage==="after",dir="screenshots/v299";
fs.mkdirSync(dir,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});try{
for(const width of after?[360,390,430,768,1440,1920]:[390,1440]){
const p=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
const errors=[];p.on("pageerror",e=>errors.push(e.message));
assert.equal((await p.goto("http://127.0.0.1:4175/",{waitUntil:"domcontentloaded"})).status(),200);
await p.locator('.gs170-hero[data-hydrated="true"]').waitFor();
await p.evaluate(()=>document.fonts.ready);
const h=p.locator("header.atelier-header");
assert(await h.getByRole("link",{name:"Green Sound Music — pagina principală"}).isVisible());
assert(await p.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),"overflow "+width);
if(after){assert.equal(await h.locator(".gs299-brand__mark").count(),1);assert.equal(await h.locator(".atelier-header__finder-btn .gs299-control-icon").count(),1);assert.equal(await h.locator(".gs299-brand__mark").evaluate(e=>getComputedStyle(e).transitionDuration),"0s");}
await h.screenshot({path:dir+"/"+stage+"-header-"+width+".png",animations:"disabled"});
await p.screenshot({path:dir+"/"+stage+"-viewport-"+width+".png",animations:"disabled"});
if(width<1024){const opener=h.getByRole("button",{name:"Deschide meniul"});await opener.click();await p.locator("dialog[open]").waitFor();await p.screenshot({path:dir+"/"+stage+"-menu-"+width+".png",animations:"disabled"});await p.keyboard.press("Escape");await p.locator("dialog[open]").waitFor({state:"hidden"});assert(await opener.evaluate(e=>e===document.activeElement));}
assert.deepEqual(errors,[]);await p.close();
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});

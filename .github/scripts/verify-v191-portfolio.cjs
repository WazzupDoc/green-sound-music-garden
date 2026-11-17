// V191 visual release gate: compare same real Portfolio route/state on V190 and V191.
// No mockups, no external footage, no autoplay, no design-only assertions.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const {chromium} = require("playwright");
const output = "screenshots/gs-v191-portfolio";
fs.mkdirSync(output,{recursive:true});
const widths=[360,390,430,768,1440,1920];

async function openPortfolio(browser, port, width, reducedMotion="reduce"){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion,deviceScaleFactor:1});
  const errors=[];
  page.on("pageerror",error=>errors.push(error.message));
  const response=await page.goto("http://127.0.0.1:"+port+"/portofoliu",{waitUntil:"domcontentloaded",timeout:50000});
  assert.equal(response.status(),200,"Portfolio HTTP 200 at "+port);
  // V190 baseline has no hydration marker; V191 candidate adds one for interaction QA.
  if (port === 4175) await page.locator('#portfolio-films[data-hydrated="true"]').waitFor({timeout:25000});
  else await page.locator("#portfolio-films").waitFor({timeout:25000});
  await page.evaluate(async()=>{await document.fonts.ready});
  assert.equal(await page.locator("main h1").count(),1);
  const film=page.locator("#portfolio-films");
  await film.evaluate(el=>{window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-75,behavior:"instant"});});
  await page.waitForTimeout(180);
  assert.equal(await page.locator("iframe").count(),0,"No third-party player before user Play");
  return {page,errors};
}
async function capture(page,label){
  await page.screenshot({path:output+"/"+label+".png",fullPage:false,animations:"disabled"});
}
(async()=>{
  const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try{
    for(const width of [390,1440]){
      const before=await openPortfolio(browser,4176,width);
      await capture(before.page,"before-v190-"+width);
      await before.page.close();
      const after=await openPortfolio(browser,4175,width);
      await capture(after.page,"after-v191-"+width);
      const heading=after.page.locator(".gs191-film__currently h3");
      assert((await heading.innerText()).trim().length>1);
      const sectionCss=await after.page.locator(".gs191-film__leader").evaluate(el=>getComputedStyle(el).backgroundColor);
      assert.notEqual(sectionCss,"rgba(0, 0, 0, 0)","New film leader must have computed CSS");
      const titleStyle=await heading.evaluate(el=>getComputedStyle(el).fontSize);
      assert(parseFloat(titleStyle)>=26,"Cinematic selected title must be prominent");
      assert.equal(await after.page.locator(".gs191-film__queue-title").count(),1);
      await after.page.close();
    }

    for(const width of widths){
      const {page,errors}=await openPortfolio(browser,4175,width);
      const dims=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
      assert(dims.scroll<=dims.client+2,"Horizontal overflow "+width+" "+JSON.stringify(dims));
      await capture(page,"after-responsive-"+width);
      // Locate real film direct links; 0 is always chosen in the default All filter.
      const filmLinks=page.locator(".rs-video-library__item");
      const count=await filmLinks.count();
      assert(count>=3,"Expected a real library of existing films");
      await filmLinks.nth(0).focus();
      await page.keyboard.press("End");
      const lastActive=await filmLinks.nth(count-1).evaluate(el=>el===document.activeElement);
      assert.equal(lastActive,true,"End jumps to last film choice");
      await page.keyboard.press("Home");
      assert.equal(await filmLinks.first().evaluate(el=>el===document.activeElement),true);
      await page.keyboard.press("ArrowDown");
      assert.equal(await filmLinks.nth(1).evaluate(el=>el===document.activeElement),true);
      await page.keyboard.press("Enter");
      await page.waitForFunction(()=>new URL(location.href).searchParams.has("film"));
      // Router navigation and React hydration update the DOM asynchronously.
      await page.waitForFunction(() => {
        const selected = document.querySelector(".rs-video-library__player")?.getAttribute("data-selected-film");
        return selected === new URL(location.href).searchParams.get("film");
      }, {timeout: 12000});
      const picked=await page.locator(".rs-video-library__player").getAttribute("data-selected-film");
      assert.equal(picked,new URL(page.url()).searchParams.get("film"),"Shareable URL and selected player match");
      assert.equal(await page.locator("iframe").count(),0,"Film selection must not autoplay");
      const categories=page.locator('.rs-video-library__filters button');
      await categories.filter({hasText:"Studio"}).click();
      // URL filter + React selection are asynchronous; inspect the settled UI.
      await page.waitForFunction(() => {
        const pressed = Array.from(document.querySelectorAll(".rs-video-library__filters button"))
          .some(button => button.textContent?.includes("Studio") && button.getAttribute("aria-pressed") === "true");
        const chosen = document.querySelectorAll(".rs-video-library__item[aria-current=true]").length;
        return pressed && chosen === 1;
      }, undefined, {timeout:12000});
      assert.equal(await page.locator("iframe").count(),0);
      const selected=await page.locator('.rs-video-library__item[aria-current=true]').count();
      assert.equal(selected,1,"One current film after filter");
      const noMotion=await page.locator(".gs191-film__track-copy").first().evaluate(el=>getComputedStyle(el).animationName);
      assert.equal(noMotion,"none");
      assert.deepEqual(errors,[],"Unexpected JS errors "+width);
      await page.close();
    }
    // Motion / Lite gating uses a transform transition on real media, never autoplay.
    const active=await openPortfolio(browser,4175,390,"no-preference");
    await active.page.locator(".rs-video-library__item").first().hover();
    const fullTransition=await active.page.locator(".gs161-film-thumb img").first().evaluate(el=>getComputedStyle(el).transitionDuration);
    assert.notEqual(fullTransition,"0s","Motion mode permits subtle hover");
    await capture(active.page,"full-motion-390");
    await active.page.evaluate(()=>document.documentElement.setAttribute("data-gs-performance","lite"));
    const liteTransition=await active.page.locator(".gs161-film-thumb img").first().evaluate(el=>getComputedStyle(el).transitionDuration);
    assert.equal(liteTransition,"0s","Lite must disable film hover movement");
    await capture(active.page,"lite-390");
    await active.page.close();
    console.log("PASS V191 matched 390/1440 Chromium, six responsive widths, keyboard, filters, URL and Lite");
  } finally {await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

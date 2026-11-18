const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");

const root = "screenshots/gs-v225-navigation";
fs.mkdirSync(root, { recursive: true });

const rootUrl = port => "http://127.0.0.1:" + port;
async function visible(page, selector) {
  return page.locator(selector).evaluate(el => getComputedStyle(el).display !== "none" && getComputedStyle(el).visibility !== "hidden");
}
async function capture(page, prefix, label) {
  await page.screenshot({
    path: root + "/" + prefix + "-" + label + ".png",
    fullPage: false,
    animations: "disabled",
  });
}
async function openSmallMenu(page) {
  const opener = page.locator(".atelier-header__menu-btn");
  assert.equal(await visible(page, ".atelier-header__menu-btn"), true, "small menu opener visible");
  await page.waitForFunction(() => !!document.querySelector("html") && !!document.querySelector(".atelier-header__menu-btn") && !!document.querySelector("dialog#atelier-mobile-navigation") && !!document.querySelector(".atelier-header__menu-btn")?.getAttribute("aria-controls"));
  await page.waitForTimeout(500);
  await opener.click();
  await page.locator("dialog#atelier-mobile-navigation[open]").waitFor({ timeout: 12000 });
  assert.equal(await page.locator("dialog#atelier-mobile-navigation .gsm-nav-index__link").count(), 6);
}

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    for (const width of [360,390,430,768,900,1024,1080,1120,1121,1440,1920]) {
      for (const [kind,port] of [["before",4176],["after",4175]]) {
        const page = await browser.newPage({ viewport: {width,height:900}, deviceScaleFactor:1, reducedMotion:"reduce" });
        try {
          let startWidth = width >= 1024 ? 900 : width;
          if (startWidth !== width) await page.setViewportSize({width:startWidth,height:900});
          const response = await page.goto(rootUrl(port) + "/", {waitUntil:"domcontentloaded",timeout:50000});
          assert.equal(response.status(),200, "home HTTP " + kind + " " + width);
          await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({timeout:20000});
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(650);
          if (width <= 1120) {
            await openSmallMenu(page);
            if (startWidth !== width) {
              await page.setViewportSize({width,height:900});
              await page.waitForTimeout(300);
            }
            const isOpen = await page.locator("dialog#atelier-mobile-navigation[open]").count() === 1;
            if (width >= 1024) {
              assert.equal(isOpen,kind==="after", "1024–1120 responsive handoff " + kind + " " + width);
              assert.equal(await visible(page, ".atelier-header__nav"),false,"desktop navigation hidden " + width);
              assert.equal(await visible(page, ".atelier-header__menu-btn"),true,"small navigation opener available " + width);
              if(kind==="after") {
                const info = page.locator(".gsm189-mobile-current");
                assert.equal(await visible(page,".gsm189-mobile-current"),true,"tablet channel summary visible");
                assert.match(await info.innerText(),/CANAL\s+0[1-6]/);
              }
            } else {
              assert.equal(isOpen,true,"modal at small viewport");
            }
            if ([390,1024,1080,1120].includes(width)) await capture(page,kind,"modal-"+width);
            if (kind==="after" && isOpen) {
              const noOverhang = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1);
              assert(noOverhang,"dialog overflow "+width);
              await page.keyboard.press("Escape");
              assert.equal(await page.locator("dialog#atelier-mobile-navigation[open]").count(),0,"Escape dismiss");
              const focus = await page.evaluate(() => document.activeElement?.classList.contains("atelier-header__menu-btn"));
              assert.equal(focus,true,"Escape should restore menu focus");
            }
          } else {
            await openSmallMenu(page);
            await page.setViewportSize({width,height:900});
            await page.waitForTimeout(300);
            assert.equal(await page.locator("dialog#atelier-mobile-navigation[open]").count(),0,"desktop handoff closes dialog "+width);
            assert.equal(await visible(page,".atelier-header__nav"),true,"desktop navigation visible "+width);
            if(kind==="after"){
              const focusVisible = await page.evaluate(() => {
                const a = document.activeElement;
                return !!a && a.closest(".atelier-header__nav") !== null && getComputedStyle(a).display !== "none";
              });
              assert(focusVisible,"focus must move to visible desktop link");
            }
            if(width===1440){
              const toggle = page.locator(".gs217-services-toggle");
              await toggle.click();
              await page.locator(".gs217-directory").waitFor({state:"visible"});
              await page.locator(".gs217-directory__chapter h2").first().click();
              if(kind==="after"){
                assert.equal(await page.locator(".gs217-directory").count(),1,"non-focusable menu heading must not dismiss");
                assert.equal(await toggle.getAttribute("aria-expanded"),"true");
              }
              await capture(page,kind,"desktop-catalogue-1440");
              if(kind==="after"){
                await page.keyboard.press("Escape");
                assert.equal(await page.locator(".gs217-directory").count(),0,"Escape closes catalogue");
                assert.equal(await toggle.evaluate(el=>el===document.activeElement),true,"Escape refocuses toggle");
                await toggle.click();
                assert.equal(await page.locator(".gs217-directory").count(),1);
                await page.locator(".gs217-directory__chapter h2").first().click();
                assert.equal(await page.locator(".gs217-directory").count(),1);
                await page.locator(".atelier-header__finder-btn").focus();
                assert.equal(await page.locator(".gs217-directory").count(),0,"focus outside closes disclosure");
              }
            }
          }
          console.log(JSON.stringify({kind,width,pass:true,menuBreakpoint:1120}));
        } finally {
          await page.close();
        }
      }
    }

    // Confirm crawlable routes on a real no-JS page, including narrow viewports.
    for(const width of [390,1080,1440]){
      for(const [kind,port] of [["before",4176],["after",4175]]){
        const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:false,reducedMotion:"reduce"});
        const page=await context.newPage();
        try{
          const result=await page.goto(rootUrl(port)+"/",{waitUntil:"domcontentloaded"});
          assert.equal(result.status(),200,"no-JS home returns HTTP 200");
          const fallback=page.locator(".gs225-nojs-nav");
          if(kind==="after"){
            assert.equal(await fallback.locator("a").count(),7);
            assert.equal(await visible(page,".gs225-nojs-nav"),true);
            if(width===390) await capture(page,kind,"nojs-"+width);
            await fallback.locator('a[href="/servicii"]').click();
            await page.waitForURL(/\/servicii\/?$/,{timeout:15000});
            assert.match(await page.locator("h1").first().innerText(),/servicii/i);
          }else{
            assert.equal(await fallback.count(),0);
            if(width===390) await capture(page,kind,"nojs-"+width);
          }
          console.log(JSON.stringify({kind,width,noJS:true}));
        }finally{await context.close()}
      }
    }

    // Live motion state tested separately. No autoplay, only deliberate hover.
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
    try{
      await page.goto(rootUrl(4175)+"/",{waitUntil:"domcontentloaded"});
      await page.locator('.gs170-hero[data-hydrated="true"]').waitFor({timeout:20000});
      const toggle=page.locator(".gs217-services-toggle");
      await toggle.click();
      await page.locator(".gs217-directory").waitFor({state:"visible"});
      await capture(page,"after","desktop-full-motion-1440");
      const animation=await page.locator(".gs217-directory").evaluate(el=>getComputedStyle(el).animationName);
      assert.match(animation,/gs217-enter/,"full motion should retain small enter transition");
      await page.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
      const liteAnimation=await page.locator(".gs217-directory").evaluate(el=>getComputedStyle(el).animationName);
      assert.equal(liteAnimation,"none","Lite disables decorative animation");
    }finally{await page.close()}
  }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
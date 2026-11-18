const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const root = "screenshots/gs-v224-about-score";
fs.mkdirSync(root, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless:true, args:["--no-sandbox","--disable-dev-shm-usage"] });
  try {
    for (const width of [360, 390, 430, 768, 1440, 1920]) {
      for (const version of ["before","after"]) {
        const port = version === "before" ? 4176 : 4175;
        const page = await browser.newPage({viewport:{width,height:900}, deviceScaleFactor:1, reducedMotion:"reduce"});
        try {
          const res = await page.goto(`http://127.0.0.1:${port}/despre-noi`, {waitUntil:"domcontentloaded",timeout:50000});
          assert.equal(res.status(),200,`${version} HTTP ${width}`);
          await page.locator(".gs-about-v95__process").waitFor({state:"visible",timeout:25000});
          await page.evaluate(async () => { await document.fonts.ready });
          const mainCount = await page.locator("main").count();
          assert.equal(mainCount,version==="after" ? 1 : 2,"main landmark regression");
          const copy = await page.locator(".gs-about-v95__process").innerText();
          assert.equal(copy.includes("\\n"),version==="before","stray literal backslash-n regression");
          const bg = await page.locator(".gs-about-v95__process").evaluate(el=>getComputedStyle(el).backgroundColor);
          assert.equal(bg,version==="after" ? "rgb(13, 37, 27)" : "rgb(205, 217, 201)",`process color ${version}`);
          const cues = await page.locator(".gs-about-v95__cue").count();
          assert.equal(cues,version==="after" ? 4 : 0,`waveform cues ${version}`);
          await page.locator(".gs-about-v95__closing-photo img").scrollIntoViewIfNeeded();
          await page.locator(".gs-about-v95__photo-image img").scrollIntoViewIfNeeded();
          const imageState = await page.locator(".gs-about-v95 img").evaluateAll(images=>images.map(img=>({src:img.currentSrc,loaded:img.complete && img.naturalWidth>0})));
          assert.equal(imageState.length,2,"must have the two authorised photos");
          assert(imageState.every(img=>img.loaded),`images failed: ${JSON.stringify(imageState)}`);
          const overflow = await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1);
          assert(!overflow,`horizontal overflow ${version} ${width}`);
          if([390,1440].includes(width)){
            await page.screenshot({path:`${root}/${version}-about-${width}.png`,fullPage:true,animations:"disabled"});
            await page.locator(".gs-about-v95__process").screenshot({path:`${root}/${version}-score-${width}.png`,animations:"disabled"});
          }
          if(version==="after"){
            const transition=await page.locator(".gs-about-v95__cue").first().evaluate(el=>getComputedStyle(el).transitionDuration);
            assert(transition.split(",").every(s=>parseFloat(s)===0),`reduced-motion must suppress decorative transition: ${transition}`);
          }
          console.log(JSON.stringify({version,width,bg,mainCount,cues,imageState,overflow}));
        }finally{await page.close()}
      }
    }
    // Inspect a moving-capable state separately; hover is cosmetic, never autoplay.
    const hoverPage=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
    try {
      await hoverPage.goto("http://127.0.0.1:4175/despre-noi",{waitUntil:"domcontentloaded"});
      const step=hoverPage.locator(".gs-about-v95__steps li").first();
      await step.scrollIntoViewIfNeeded();
      await step.hover();
      await hoverPage.waitForTimeout(350);
      const transform=await step.locator(".gs-about-v95__cue").evaluate(el=>getComputedStyle(el).transform);
      assert(transform!=="none" && transform!=="matrix(1, 0, 0, 1, 0, 0)","full-motion cue should respond to hover");
      await pageCapture(hoverPage,`${root}/after-score-1440-hover.png`,step);
      console.log(JSON.stringify({fullMotionHoverTransform:transform}));
    }finally{await hoverPage.close()}
  }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1});
async function pageCapture(page,path,locator){await locator.screenshot({path,animations:"disabled"})}

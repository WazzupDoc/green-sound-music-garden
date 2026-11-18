const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const dir = "screenshots/gs-v226-services-art";
fs.mkdirSync(dir, {recursive:true});
(async()=>{
  const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try{
    for(const width of [360,390,430,768,1440,1920]){
      for(const [kind,port] of [["before",4176],["after",4175]]){
        const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
        try{
          const response=await page.goto("http://127.0.0.1:"+port+"/servicii",{waitUntil:"domcontentloaded",timeout:50000});
          assert.equal(response.status(),200,"service index HTTP200 "+kind+" "+width);
          const chapters=page.locator(".rs-service-index__group");
          await chapters.first().waitFor({state:"visible",timeout:18000});
          assert.equal(await chapters.count(),3,"three actual service editorial chapters");
          assert.equal(await page.locator(".rs-service-index__group li a").count(),8,"eight actual service routes");
          assert.equal(await page.locator("main h1").count(),1,"one H1");
          await page.evaluate(()=>document.fonts.ready);
          const images=page.locator(".gs226-chapter__figure img");
          assert.equal(await images.count(),kind==="after"?3:0,"generated art integrated only in V226");
          if(kind==="after"){
            for (let i=0;i<3;i++) {
              const node=images.nth(i);
              await node.scrollIntoViewIfNeeded();
              const data=await node.evaluate(async img=>{
                await img.decode();
                return {src:img.currentSrc,w:img.naturalWidth,h:img.naturalHeight,complete:img.complete};
              });
              assert(data.complete && data.w===1152 && data.h===252 && data.src.includes("/media/greensound/v226-concept-"),"actual image decode "+JSON.stringify(data));
              const url=new URL(data.src);
              const check=await page.request.get(url.toString());
              assert.equal(check.status(),200,"local media HTTP200");
              const size=Number(check.headers()["content-length"]||0);
              assert(size>10000 && size<85000, "webp size budget "+size);
            }
            assert.equal(await page.locator(".gs226-chapter__figure figcaption").count(),3,"three honest concept captions");
            assert.equal(await page.locator(".gs226-chapter__mark").count(),3,"three original inline SVG chapter glyphs");
            const css=await page.locator(".gs226-chapter__mark").first().evaluate(el=>getComputedStyle(el).transitionDuration);
            assert(css.split(",").every(x=>parseFloat(x)<=0.001),"reduced-motion static symbols "+css);
          }
          const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
          assert.equal(overflow,false,"horizontal overflow "+kind+" "+width);
          if([390,1440].includes(width)){
            await page.locator(".rs-service-index").scrollIntoViewIfNeeded();
            await page.screenshot({path:dir+"/"+kind+"-services-"+width+".png",fullPage:true,animations:"disabled"});
            const clip=chapters.nth(0);
            await clip.screenshot({path:dir+"/"+kind+"-music-chapter-"+width+".png",animations:"disabled"});
          }
          console.log(JSON.stringify({kind,width,chapters:3,art:await images.count(),links:8,overflow}));
        }finally{await page.close()}
      }
    }
    const active=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"no-preference"});
    try{
      await active.goto("http://127.0.0.1:4175/servicii",{waitUntil:"domcontentloaded"});
      const heading=active.locator(".rs-service-index__group-title").first();
      await heading.scrollIntoViewIfNeeded();
      await heading.hover();
      await active.waitForTimeout(450);
      const transform=await heading.locator(".gs226-chapter__mark").evaluate(el=>getComputedStyle(el).transform);
      assert(transform!=="none" && transform!=="matrix(1, 0, 0, 1, 0, 0)","full motion hover chapter mark moves");
      await heading.screenshot({path:dir+"/after-music-chapter-1440-hover.png",animations:"disabled"});
      await active.evaluate(()=>document.documentElement.dataset.gsPerformance="lite");
      const css=await heading.locator(".gs226-chapter__mark").evaluate(el=>getComputedStyle(el));
      console.log(JSON.stringify({hoverTransform:transform,liteEnabled:true}));
    }finally{await active.close()}
  }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

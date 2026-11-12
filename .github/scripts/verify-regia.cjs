const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const base = "http://127.0.0.1:4175";
const widths = [360, 390, 430, 768, 1024, 1440];
const folder = "screenshots/regia-serii";
fs.mkdirSync(folder, { recursive: true });

async function checkNoOverflow(page, path, width) {
  const data = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  assert(data.scroll <= data.client + 2,
    `Horizontal overflow at ${width}px ${path}: ${JSON.stringify(data)}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox","--disable-dev-shm-usage"] });
  try {
    for (const width of widths) {
      const page = await browser.newPage({viewport:{width,height:width>=1024?900:900}, reducedMotion:"reduce"});
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(base+"/", {waitUntil:"domcontentloaded",timeout:45000});
      await page.locator(".rs-hero h1").waitFor();
      await page.waitForTimeout(450);
      assert.equal(await page.locator("main h1").count(), 1);
      assert.match(await page.locator(".rs-hero h1").innerText(), /Seara începe/i);
      assert.equal(await page.locator(".rs-programme__choice").count(),5);
      assert.equal(await page.locator("main form").count(),0);
      assert.equal(await page.locator(".gs-index__chapter").count(),0);
      assert.equal(await page.locator(".rs-films__item").count(),3);
      assert.match(await page.locator("head meta[name='robots']").first().getAttribute("content"),/noindex/);
      const heroPhoto = await page.locator(".rs-hero__photo img").evaluate(img=>({loaded:img.complete&&img.naturalWidth>0,src:img.getAttribute("src")}));
      assert(heroPhoto.loaded && heroPhoto.src.includes("/media/greensound/"),"Real hero media failed to load");
      await checkNoOverflow(page,"/",width);
      if ([390,1440].includes(width)) {
        await page.screenshot({path:`${folder}/home-${width}.png`,fullPage:true,animations:"disabled"});
      }
      await page.getByRole("button",{name:"Botezuri",exact:true}).click();
      assert.match(await page.locator(".rs-programme__timeline").innerText(),/Ursitoarele/i);
      await checkNoOverflow(page,"/ selector",width);
      assert.deepEqual(errors,[],`Hydration/browser error ${width}px`);
      await page.close();
    }

    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
    const errors=[];
    page.on("pageerror",e=>errors.push(e.message));
    await page.goto(base+"/portofoliu", {waitUntil:"domcontentloaded"});
    await page.locator(".rs-gallery__frame").first().waitFor();
    assert.equal(await page.locator(".rs-gallery__frame").count(),6);
    assert.equal(await page.locator(".rs-gallery__filters button").count(),4);
    assert.equal(await page.locator(".rs-video-library__filters button").count(),5);
    assert.equal(await page.locator(".rs-video-library iframe").count(),0);
    await page.screenshot({path:`${folder}/portfolio-1440.png`,fullPage:true,animations:"disabled"});
    await page.locator(".rs-gallery__frame").first().click();
    await page.waitForURL(url=>url.searchParams.has("photo"));
    assert(await page.locator(".rs-photo-dialog__media img").isVisible(),"Deep link photo lightbox");
    const before=new URL(page.url()).searchParams.get("photo");
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(previous=>new URL(location.href).searchParams.get("photo")!==previous,before);
    await page.keyboard.press("Escape");
    await page.waitForFunction(()=>!new URL(location.href).searchParams.has("photo"));
    await page.goto(base+"/portofoliu?photo=ursitoare",{waitUntil:"domcontentloaded"});
    assert(await page.locator(".rs-photo-dialog__media").isVisible(),"Photo direct-link hydration");
    await page.goto(base+"/servicii",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator(".rs-service-index__group").count(),3);
    assert.equal(await page.locator(".rs-service-index__group li").count(),8);
    await checkNoOverflow(page,"/servicii",1440);
    const services=["dj-mc","trupa","echipamente-de-sunet-si-lumini",
      "masina-fum-greu-cu-gheata-carbonica","studio-inregistrari","hostess","ursitoare-botez","start-veselia"];
    for(const slug of services){
      await page.goto(base+"/"+slug,{waitUntil:"domcontentloaded"});
      assert.equal(await page.locator("main h1").count(),1,`service H1 ${slug}`);
      assert.equal(await page.locator(".rs-service-feature").count(),1,`service signature ${slug}`);
      await checkNoOverflow(page,"/"+slug,1440);
    }
    await page.goto(base+"/evenimente/",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator(".rs-events-index__row").count(),5);
    const events=["nunti","botezuri","evenimente-corporate","concerte-festivaluri","petreceri-private"];
    for(const slug of events){
      await page.goto(base+"/evenimente/"+slug,{waitUntil:"domcontentloaded"});
      assert.equal(await page.locator("main h1").count(),1);
      assert(await page.locator(".rs-event-timeline li").count()>0);
    }
    await page.goto(base+"/despre-noi",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator(".rs-about-copy").count(),1);
    await page.goto(base+"/confidentialitate",{waitUntil:"domcontentloaded"});
    assert.match(await page.locator("main").innerText(),/DE COMPLETAT DE PROPRIETAR/);
    assert.equal(await page.locator("main main").count(),0);
    await page.goto(base+"/contact",{waitUntil:"domcontentloaded"});
    await page.locator("form[aria-label='Cerere de ofertă']").waitFor({timeout:25000});
    assert.match(await page.locator("main").innerText(),/WhatsApp|email/i);
    assert.match(await page.locator("head meta[name='robots']").first().getAttribute("content"),/noindex/);
    await page.goto(base+"/",{waitUntil:"domcontentloaded"});
    const desk=page.getByRole("group",{name:"Temperatura luminii"});
    await desk.getByRole("button",{name:"Cald",exact:true}).click();
    assert.equal(await page.locator("html").getAttribute("data-light"),"cald");
    await page.goto(base+"/despre-noi",{waitUntil:"domcontentloaded"});
    await page.waitForFunction(()=>document.documentElement.dataset.light==="cald");
    const map=await page.request.get(base+"/sitemap.xml");
    assert.equal(map.status(),200);
    assert.equal((await map.text()).match(/<loc>/g)?.length,20);
    assert.deepEqual(errors,[],"Browser errors in page flow");
    console.log("PASS Regia Serii: six viewports, photo + film, eight services, five events, Contact, links, light control, noindex, sitemap");
    await page.close();
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});

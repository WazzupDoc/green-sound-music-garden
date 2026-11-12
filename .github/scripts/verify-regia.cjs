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
      await page.locator(".go-2026").first().waitFor({timeout:30000});
      await page.waitForTimeout(200);
      assert.equal(await page.locator("main h1").count(), 1);
      assert.match(await page.locator(".go-intro h1").innerText(), /O SEARĂ/);
      assert.equal(await page.locator(".rs-hero").count(), 0, "No old Regia homepage should render");
      assert.equal(await page.locator(".gp-opening").count(), 0, "No V57 poster should render");
      assert.equal(await page.locator(".go-scene").count(), 4);
      assert.equal(await page.locator(".go-tech__tabs button").count(), 4);
      assert.equal(await page.locator(".go-cinema__playlist button").count(), 3);
      assert.equal(await page.locator(".go-scene[data-active='true']").count(), 1);
      assert.equal(await page.locator("main form").count(), 0);
      assert.match(await page.locator("head meta[name='robots']").first().getAttribute("content"),/noindex/);
      const photo = await page.locator(".go-scene img").first().evaluate(img => ({
        loaded:img.complete && img.naturalWidth > 0,src:img.getAttribute("src")
      }));
      assert(photo.loaded && photo.src.includes("/media/greensound/"),"Authentic local event photo failed");
      await checkNoOverflow(page,"/",width);
      if ([390,1440].includes(width)) {
        // A screenshot tool does not scroll through a page; real browsers do.
        // Trigger native lazy loading/reveal before taking the full-page frame.
        for (const selector of [".go-manifest", ".go-tech", ".go-cinema__body"]) {
          await page.locator(selector).first().scrollIntoViewIfNeeded();
          await page.waitForTimeout(280);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(220);
        await page.screenshot({path:`${folder}/home-${width}.png`,fullPage:true,animations:"disabled"});
      }
      await page.getByRole("button",{name:"Selectează scena Nunți"}).click();
      assert.equal(await page.locator(".go-scene[data-active='true'] .go-scene__bottom h2").innerText(),"Nunți");
      await page.locator(".go-tech__tabs button").filter({hasText:"Lumini"}).click();
      assert.match(await page.locator(".go-tech__detail").innerText(),/Moving head-uri/i);
      await page.locator(".go-cinema__playlist button").nth(1).click();
      assert.match(await page.locator(".go-cinema__caption strong").innerText(),/Nuntă/i);
      await checkNoOverflow(page,"/ interactive",width);
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
    await page.locator(".rs-gallery__rail").scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await page.locator(".rs-video-library__player").scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({path:`${folder}/portfolio-1440.png`,fullPage:true,animations:"disabled"});
    await page.locator(".rs-gallery__frame").first().click();
    await page.waitForURL(url=>url.searchParams.has("photo"));
    await page.locator(".rs-photo-dialog__media img").waitFor({state:"visible",timeout:10000});
    assert(await page.locator(".rs-photo-dialog__media img").isVisible(),"Deep link photo lightbox");
    const before=new URL(page.url()).searchParams.get("photo");
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(previous=>new URL(location.href).searchParams.get("photo")!==previous,before);
    await page.keyboard.press("Escape");
    await page.waitForFunction(()=>!new URL(location.href).searchParams.has("photo"));
    await page.goto(base+"/portofoliu?photo=ursitoare",{waitUntil:"domcontentloaded"});
    await page.locator(".rs-photo-dialog__media").waitFor({timeout:10000});
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
    // Light Desk reads localStorage on mount; wait for React's effect before clicking.
    await page.waitForFunction(() => document.documentElement.dataset["light"] !== undefined,
      null, {timeout:30000});
    const desk=page.getByRole("group",{name:"Temperatura luminii"});
    await desk.getByRole("button",{name:"Cald",exact:true}).click();
    await page.waitForFunction(() => document.documentElement.dataset["light"] === "cald",
      null, {timeout:10000});
    assert.equal(await page.locator("html").getAttribute("data-light"),"cald");
    await page.goto(base+"/despre-noi",{waitUntil:"domcontentloaded"});
    await page.waitForFunction(()=>document.documentElement.dataset.light==="cald");
    const map=await page.request.get(base+"/sitemap.xml");
    assert.equal(map.status(),200);
    assert.equal((await map.text()).match(/<loc>/g)?.length,20);
    assert.deepEqual(errors,[],"Browser errors in page flow");
    // Keep the old CI artifact path populated while changing the UI assertions.
    fs.cpSync(folder, "screenshots/crafted-atmospheres", {recursive:true});
    console.log("PASS Open House V58: six viewports, photo + film, eight services, five events, Contact, links, light control, noindex, sitemap");
    await page.close();
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});

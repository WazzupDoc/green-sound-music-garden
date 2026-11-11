const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const origin = "http://127.0.0.1:4173/greensound-prototype/";
(async () => {
  const browser = await chromium.launch({ headless:true, args:["--no-sandbox"] });
  try {
    const page = await browser.newPage({ viewport:{width:1440,height:900} });
    await page.goto(origin,{waitUntil:"domcontentloaded"});
    assert.match(await page.locator("h1").innerText(),/SE AUDE.*SE VEDE.*Se simte/is);
    assert.equal(await page.locator(".gs-curation").count(),1);
    assert.equal(await page.locator(".hero--v17 .hero-v17__pointer-light").count(),1);
    assert.equal(await page.locator(".gs-curation .cards .card").count(),3);
    const editorialArrow=await page.locator(".gs-curation .card__more svg").first().boundingBox();
    assert.ok(editorialArrow&&editorialArrow.width<=24&&editorialArrow.height<=24,
      "Curation card arrow must be a small SVG icon, not giant default-size artwork");
    const editorialTitleColor=await page.locator(".gs-curation .card h3").first().evaluate(el=>getComputedStyle(el).color);
    assert.equal(editorialTitleColor,"rgb(255, 255, 255)","Editorial photo card text needs white contrast");

    assert.equal(await page.locator(".gs-strip__item").count(),4);
    assert.equal(await page.locator(".hero-v16__visual").count(),1);
    // V18 original stage additions — no redesign of previous layout.
    assert.equal(await page.locator(".gs18-head").count(),5);
    assert.equal(await page.locator(".gs18-beam").count(),5);
    assert.equal(await page.locator(".gs18-laser").count(),6);
    assert.equal(await page.locator(".gs18-console button").count(),2);
    assert.equal(await page.locator(".gs-strip__item .gs-open-icon").count(),4);
    assert.equal(await page.locator(".gs-curation .card .gs-open-icon").count(),3);
    const iconMask=await page.locator(".gs-strip__item .gs-open-icon").first().evaluate(el=>getComputedStyle(el).getPropertyValue("mask-image")||getComputedStyle(el).getPropertyValue("-webkit-mask-image"));
    assert.ok(iconMask.includes("/assets/icons/"),"Tabler icon mask must load from local project assets");
    assert.equal(await page.locator("[data-party-mode]").getAttribute("aria-pressed"),"false");
    assert.equal(await page.locator("[data-party-audio]").getAttribute("aria-pressed"),"false");
    await page.locator("[data-party-mode]").click();
    assert.equal(await page.locator(".hero--v18").getAttribute("data-party"),"on");
    assert.equal(await page.locator("[data-party-mode]").getAttribute("aria-pressed"),"true");
    await page.locator("[data-party-audio]").click();
    await page.waitForTimeout(170);
    assert.equal(await page.locator("[data-party-audio]").getAttribute("aria-pressed"),"true","Generative demo must start only after explicit click");
    await page.locator("[data-party-audio]").click();
    assert.equal(await page.locator("[data-party-audio]").getAttribute("aria-pressed"),"false");
    await page.locator("[data-party-mode]").click();
    assert.equal(await page.locator(".hero--v18").getAttribute("data-party"),"off");

    assert.equal(await page.locator("h1").count(),1);
    assert.equal(await page.locator(".mood").count(),3);
    await page.locator('[data-mood="wedding"].mood').click();
    assert.equal(await page.locator(".hero").getAttribute("data-mood"),"wedding");
    assert.equal(await page.locator(".mood[data-mood='wedding']").getAttribute("aria-pressed"),"true");
    assert.match(await page.locator(".hero__photo img").getAttribute("src"),/a04c8400/);
    await page.locator(".hero__lights").click();
    assert.equal(await page.locator(".hero").getAttribute("data-lights"),"off");
    await page.locator(".hero__lights").click();
    assert.equal(await page.locator(".hero").getAttribute("data-lights"),"on");
    assert.equal(await page.locator(".gs-reel__tile").count(),3);
    assert.equal(await page.locator(".card").count(),3);
    assert.equal(await page.locator(".card__media--visual").count(),1);
    assert.equal(await page.locator(".hero__video-cta").count(),1);
    await page.locator(".gs-reel__tile[data-play-video='37QlXW3NlxU']").click();
    assert.equal(await page.locator("#video-dialog").evaluate(el=>el.open),true);
    assert.match(await page.locator("#video-player").getAttribute("src"),/37QlXW3NlxU/);
    await page.locator(".dialog__bottom button[data-video='u7EW622vE3Q']").click();
    assert.match(await page.locator("#video-player").getAttribute("src"),/u7EW622vE3Q/);
    await page.locator("[data-close-video]").click();
    assert.equal(await page.locator("#video-dialog").evaluate(el=>el.open),false);
    await page.locator("#showreel").scrollIntoViewIfNeeded();
    require("node:fs").mkdirSync("screenshots",{recursive:true});
    await page.screenshot({path:"screenshots/home-showreel-desktop.png"});
    await page.locator(".gs-curation .card").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await page.screenshot({path:"screenshots/home-editorial-services-desktop.png"});
    await page.locator('.topnav a[href="servicii.html"]').click();
    await page.waitForURL(/servicii\.html$/);
    assert.match(await page.locator("h1").innerText(),/TOT SHOW-UL/);
    assert.equal(await page.locator(".service-card").count(),8);
    assert.equal(await page.locator(".service-card .gs-open-icon").count(),8);
    assert.equal(await page.locator(".service-card__img .gs-service-play").count(),4);
    await page.locator(".service-card__img .gs-service-play").first().click();
    assert.equal(await page.locator("#video-dialog").evaluate(el=>el.open),true);
    await page.locator("[data-close-video]").click();

    await page.locator('.topnav a[href="evenimente.html"]').click();
    await page.waitForURL(/evenimente\.html$/);
    assert.equal(await page.locator(".event-card").count(),6);
    assert.equal(await page.locator(".event-card .gs-open-icon").count(),6);
    assert.equal(await page.locator(".event-card>.gs-service-play").count(),2);
    await page.locator(".event-card>.gs-service-play").first().click();
    assert.equal(await page.locator("#video-dialog").evaluate(el=>el.open),true);
    await page.locator("[data-close-video]").click();

    await page.locator('.event-card a[href*="tip=Nunt"]').first().click();
    await page.waitForURL(/contact\.html/);
    assert.equal(await page.locator('[name="eventType"]').inputValue(),"Nuntă");
    await page.goto(origin+"portofoliu.html",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator(".gallery__item").count(),9);
    await page.locator('.filterbar button[data-filter="stage"]').click();
    assert.equal(await page.locator(".gallery__item:not([hidden])").count(),2);
    await page.locator('[data-play-video="eGLykw1G0EQ"]').click();
    assert.equal(await page.locator("dialog").evaluate(el=>el.open),true);
    assert.match(await page.locator("#video-player").getAttribute("src"),/eGLykw1G0EQ/);
    await page.locator("[data-close-video]").click();
    assert.equal(await page.locator("dialog").evaluate(el=>el.open),false);
    const mobile=await browser.newPage({viewport:{width:390,height:844}});
    await mobile.goto(origin,{waitUntil:"domcontentloaded"});
    const size=await mobile.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
    if(size.content>size.viewport+2){
      const offenders=await mobile.evaluate(()=>[...document.querySelectorAll("body *")].map(el=>{
        const rect=el.getBoundingClientRect();
        return {tag:el.tagName,cls:typeof el.className==="string"?el.className.slice(0,100):"",txt:(el.textContent||"").trim().slice(0,65),left:Math.round(rect.left),right:Math.round(rect.right),width:Math.round(rect.width)};
      }).filter(x=>x.right>innerWidth+4&&x.width>0).slice(0,20));
      console.log("V17 MOBILE OVERFLOW OFFENDERS:",JSON.stringify(offenders));
    }
    assert.ok(size.content <= size.viewport+2, "Unexpected horizontal mobile overflow: "+JSON.stringify(size));
    assert.equal(await mobile.locator(".gs18-console button").count(),2);
    await mobile.locator("[data-party-mode]").click();
    assert.equal(await mobile.locator(".hero--v18").getAttribute("data-party"),"on");
    await mobile.locator("[data-party-mode]").click();
    const small=await browser.newPage({viewport:{width:320,height:700}});
    await small.goto(origin,{waitUntil:"domcontentloaded"});
    const narrow=await small.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.ok(narrow.content<=narrow.viewport+2,"320px device must have no horizontal overflow: "+JSON.stringify(narrow));
    await small.close();

    await mobile.locator("#showreel").scrollIntoViewIfNeeded();
    await mobile.screenshot({path:"screenshots/home-showreel-mobile.png"});
    await mobile.locator(".gs-curation .card").first().scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(650);
    await mobile.screenshot({path:"screenshots/home-editorial-services-mobile.png"});
    assert.equal(await mobile.locator(".topbar__menu").getAttribute("aria-expanded"),"false");
    await mobile.locator(".topbar__menu").click();
    assert.equal(await mobile.locator(".topbar__menu").getAttribute("aria-expanded"),"true");
    await mobile.locator('.mobile-nav a[href="evenimente.html"]').click();
    await mobile.waitForURL(/evenimente\.html$/);
    assert.equal(await mobile.locator("h1").count(),1);
    console.log("PASS: stage presets, lighting toggle, three unique visual cards, homepage event showreel & video switcher, page links, services, events, portfolio filters, responsive navigation and zero mobile overflow");
    await mobile.close();
    await page.close();
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});

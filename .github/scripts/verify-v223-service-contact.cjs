const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");

const root = "screenshots/gs-v223-service-contact";
fs.mkdirSync(root, { recursive: true });
const target = "/echipamente-de-sunet-si-lumini";

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    for (const width of [360, 390, 430, 768, 1440, 1920]) {
      for (const [version, port] of [["before", 4176], ["after", 4175]]) {
        const page = await browser.newPage({
          viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce",
        });
        try {
          const result = await page.goto(`http://127.0.0.1:${port}${target}`, { waitUntil: "domcontentloaded", timeout: 45000 });
          assert.equal(result.status(), 200, `${version} service status ${width}`);
          const section = page.locator(".rs-service-feature--tech");
          await section.waitFor({ state: "visible", timeout: 20000 });
          await page.evaluate(() => document.fonts.ready);
          const sentence = await section.innerText();
          const unfinished = sentence.includes("[DE COMPLETAT DE PROPRIETAR]");
          assert.equal(unfinished, version === "before", `draft text presence ${version} ${width}`);

          const link = section.locator(".rs-inline-link");
          await link.scrollIntoViewIfNeeded();
          if ([390,1440].includes(width)) {
            await page.screenshot({path: `${root}/${version}-service-${width}.png`, fullPage: true, animations: "disabled"});
          }
          await link.click();
          await page.waitForURL(/\/contact(?:\?|#|$)/, { timeout: 15000 });
          if (version === "after") {
            const params = new URL(page.url()).searchParams;
            assert(params.has("services"), `missing selected service in URL ${width}`);
            await page.locator('[aria-label="Selecția preluată din paginile de evenimente și servicii"]').waitFor({ timeout: 15000 });
            assert.equal(await page.locator('[aria-label="Servicii preselectate"] li').count(), 1, "expected exactly one chosen service");
          } else {
            assert.equal(new URL(page.url()).searchParams.has("services"), false, "baseline must show lost selection");
          }
          if ([390,1440].includes(width)) {
            await page.screenshot({path: `${root}/${version}-contact-${width}.png`, fullPage: true, animations: "disabled"});
          }
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
          assert.equal(overflow, false, `horizontal overflow in Contact ${version} ${width}`);
          console.log(JSON.stringify({ version, width, prefill: version === "after", url: page.url(), screenshots: [390, 1440].includes(width) }));
        } finally {
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

# V52 „Regia Serii” — versiunea completă pentru evaluare

## Direcție creativă
Fotografie proprie Green Sound pe primul ecran, nu un titlu decorativ uriaș; selecție după eveniment, desfășurător concret, portofoliu cinematografic cu filtre și linkuri partajabile, opt pagini de servicii cu module distincte, cinci pagini de evenimente, pagină Despre și Confidențialitate cu marcaje juridice vizibile.

## Arhitectură
Se păstrează React + TanStack Start + TypeScript + Tailwind v4 + Vite, datele și adresele din sursele deja verificate. Hanken Grotesk și Instrument Serif sunt găzduite local, cu `bun.lock` actualizat; niciun WebGL, autoplay sau fotografii de stoc. Formularul produce o previzualizare și deschide WhatsApp sau email la alegerea vizitatorului; nu trimite automat.

## Controlul calității
Rulare V52 cu rezultate verificate: [GitHub Actions #43190232547](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43190232547): TypeScript strict, build SSR, 29 de teste unitare, browser Chromium la 360, 390, 430, 768, 1024, 1440 px; linkuri foto cu tastatură și swipe, opt servicii, cinci evenimente, contact, noindex în preview, sitemap de 20 de adrese, preferință lumină între pagini și capturi reale. După sincronizarea `bun.lock` și acest document, este necesară confirmarea unei rulări pe ultimul commit. Nu s-a măsurat LCP real și nu s-a efectuat audit WCAG automat complet.

## Fișierele sursă — cod integral la fiecare legătură
Fiecare legătură deschide **fișierul complet**, direct în ramura V52, nu un fragment. [Etapa 2 — cod integral al fundației V51](./V51_ETAPA2_COD_COMPLET.md). [Diferențele V52](https://github.com/WazzupDoc/green-sound-music-garden/pull/40/files).

### Pagini și rute
- [`src/routes/__root.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/__root.tsx)
- [`src/routes/confidentialitate.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/confidentialitate.tsx)
- [`src/routes/despre-noi.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/despre-noi.tsx)
- [`src/routes/evenimente.index.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/evenimente.index.tsx)
- [`src/routes/index.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/index.tsx)
- [`src/routes/portofoliu.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/portofoliu.tsx)
- [`src/routes/servicii.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/routes/servicii.tsx)

### Componente
- [`src/components/atelier/RegiaHome.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/atelier/RegiaHome.tsx)
- [`src/components/atelier/RegiaPortfolio.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/atelier/RegiaPortfolio.tsx)
- [`src/components/site/BeamPhoto.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/BeamPhoto.tsx)
- [`src/components/site/EventPage.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/EventPage.tsx)
- [`src/components/site/LightDesk.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/LightDesk.tsx)
- [`src/components/site/Logo.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/Logo.tsx)
- [`src/components/site/QuoteForm.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/QuoteForm.tsx)
- [`src/components/site/ServicePage.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/ServicePage.tsx)
- [`src/components/site/ServiceSignature.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/ServiceSignature.tsx)
- [`src/components/site/SiteFooter.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/SiteFooter.tsx)
- [`src/components/site/SiteHeader.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/SiteHeader.tsx)
- [`src/components/site/StageFallback.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/StageFallback.tsx)
- [`src/components/site/VideoLite.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/VideoLite.tsx)
- [`src/components/site/blocks.tsx`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/components/site/blocks.tsx)

### Stiluri și sistem vizual
- [`src/styles.css`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/styles.css)
- [`src/styles/regia-serii-final.css`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/styles/regia-serii-final.css)
- [`src/styles/regia-serii-pages.css`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/styles/regia-serii-pages.css)
- [`src/styles/regia-serii-portfolio.css`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/styles/regia-serii-portfolio.css)
- [`src/styles/regia-serii-site.css`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/styles/regia-serii-site.css)

### Date, SEO și dependențe
- [`bun.lock`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/bun.lock)
- [`src/lib/seo.ts`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/src/lib/seo.ts)

### Teste și configurare CI
- [`.github/scripts/verify-crafted-browser.cjs`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/.github/scripts/verify-crafted-browser.cjs)
- [`.github/scripts/verify-regia.cjs`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/.github/scripts/verify-regia.cjs)
- [`.github/workflows/regia-serii-quality.yml`](https://github.com/WazzupDoc/green-sound-music-garden/blob/design/v52-regia-serii-complete-preview/.github/workflows/regia-serii-quality.yml)

## Protecția publicării
Acest PR este draft, baza sa este V51, iar domeniul oficial `https://greensoundmusic.com` și ramura `main` nu au fost modificate. Preview-ul utilizează `noindex`; activarea `VITE_SITE_ENV=production` necesită aprobare explicită la publicare.

## Înainte de publicarea reală
Confirmarea textelor juridice [DE COMPLETAT DE PROPRIETAR], verificarea informațiilor comerciale și a imaginilor finale, audit WCAG manual și măsurarea Core Web Vitals pe un server public de test. Este obligatorie aprobarea proprietarului înainte de merge și deploy.

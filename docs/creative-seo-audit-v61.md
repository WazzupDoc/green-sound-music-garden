# GREEN SOUND MUSIC — V61 AUDIT UX / SEO LOCAL / GEO / PERFORMANCE

Data: 12 noiembrie 2026. Ramură: `design/v61-signature-navigation-seo`. PR #55 (draft).
Sursă tehnică: codul real din GitHub, nu o estimare bazată pe mockupuri.

## Diagnostic: ce rămânea slab în V60

| Zonă | Constatat în cod | Modificare V61 | Nivel de verificare |
|---|---|---|---|
| Brand | Logo real mic, `/favicon.png` în chenar 40×40 px; text simplu alături | Emblemă 68 px desktop, 48–57 px mobil, nume mare, un scan de lumină și un mic indicator grafic | Browser QA la 360, 390, 430, 768, 1024, 1440 |
| Navigație | Șase linkuri text de aceeași greutate vizuală | Șase canale numerotate, accent la focus/hover, semnal activ, CTA distinct | Rute autentice păstrate |
| Meniu mobil | Design funcțional, dar generic | Meniu editorial full-height cu index, tipografie amplă și bandă de lumină | Focus trap, Escape, teste browser |
| Viteză | Efecte ambientale și CSS acumulat din versiuni experimentale | Logo animat scurt, `prefers-reduced-motion`, fără librărie suplimentară de motion | Nu există încă un scor Lighthouse/RUM de producție |
| Date SEO | Canonical, OG, sitemap, LocalBusiness și Service deja prezente | `WebSite` + `WebPage` cu IDs stabili și catalogul real de 8 servicii | Unit + browser tests |
| SEO local | Pitești/Argeș în metadata și datele companiei | Context descriptiv scurt, vizibil în hero: DJ, MC, trupă, sonorizare, lumini, localitate | Nu pretindem clasări Google |
| „CEO” / GEO | Conținutul era mai greu de asociat semantic cu sursa sa | Relații schema.org `about`, `isPartOf`, `publisher` și `provider` bazate pe fapte | Structură verificabilă, fără promisiuni AI |
| Conversie | Buton simplu „Cere ofertă” | CTA scenic „PLANIFICĂM EVENIMENTUL”, păstrând ruta `/contact` | Verificare navigație și formular existent |
| Identitate | Mențiuni repetitive ale numelui între header și hero | Înlocuit supraeticheta redundantă cu „SUNET / LUMINĂ / EMOȚIE” | Vizual după capturi |

## SEO: ce există și merită păstrat

1. `src/lib/seo.ts`: titluri și descrieri specifice pe rută, canonical normalizat, Open Graph și Twitter previews cu imagini relevante.
2. `public/sitemap.xml`: 20 de URL-uri unice și autentice. Nu sunt create pagini de oraș inventate pentru trafic.
3. `public/robots.txt`: sitemap declarat, fără blocare totală a crawlerelor.
4. `src/data/site.ts`: o singură sursă pentru nume, telefon, adresă, rețele sociale, servicii. Toate informațiile declarate în schema se bazează pe aceleași date vizibile.
5. `VITE_SITE_ENV`: orice preview rămâne `noindex`, ca să nu concureze cu domeniul oficial.
6. `Service` + `BreadcrumbList` + `FAQPage` numai pe paginile relevante. Fără evaluări, prețuri, oferte sau mărturii fabricate.
7. V61: `WebSite` `#website` publicat pe homepage, `WebPage` pentru fiecare pagină, conectate la `LocalBusiness` `#business`. Catalog de 8 servicii reale ca `OfferCatalog`. Nu implementăm un `SearchAction` fals pentru dialogul JS de căutare.

## Atenție la datele structurate

`LocalBusiness` și `OfferCatalog` îmbunătățesc lizibilitatea semantică a datelor. **Nu garantează** rich snippets, AI citations, apariție în Google Maps sau poziții SEO. Google verifică relevanța, accesibilitatea imaginilor, consistența și respectarea politicilor.

Date precum orele de funcționare, punctul Google Maps, latitudine/longitudine, recenzii și statistici sunt lăsate necompletate până la verificare. Referința `logo` folosește faviconul autentic din proiect; dimensiunea imaginii-sursă trebuie validată pentru cerințele Google Organization.

## Performanță

Obiectivele Google pentru trafic real: LCP <= 2,5 s; INP <= 200 ms; CLS <= 0,1.

- **Nu este măsurat:** nu există încă raport CrUX/Search Console din domeniul de producție și nici Lighthouse pe infrastructura finală. Nu afirmați „100/100”.
- **Verificat tehnic:** navigația nu adaugă dependențe JS; logo-ul animă numai transform/opacity și respectă reduce-motion; fotourile au dimensiuni explicite; filmările se încarcă doar la cerere.
- **Risc rămas:** istoricul de stiluri V20–V60 mărește CSS-ul. Eliminarea selectorilor nefolosiți trebuie făcută cu audit de utilizare după ce direcția vizuală este acceptată.
- **Risc rămas:** imaginile fotografice și efectele suprapuse din prima zonă pot crește LCP pe 4G/telefoane mai slabe. De testat cu WebPageTest/Lighthouse înainte de deploy.

## Accesibilitate & experiență mobilă

- Logo învechit de 40 px -> marcă vizibilă, cu nume accesibil de screen reader.
- Meniu mobil cu buton `aria-expanded`, rol dialog, trap de focus, tasta Escape, linkuri cu nume.
- Navigație comutată compact sub 1191px ca să nu se înghesuie „Portofoliu” și „Despre noi”.
- `prefers-reduced-motion` dezactivează animațiile decorative ale logo-ului și navigației.
- Rămâne necesar un audit manual cu VoiceOver/TalkBack și tastatură reală; testul Chromium automat nu înlocuiește toate dispozitivele.

## Audit conversie și credibilitate

- CTA duce la formularul deja existent care pregătește un mesaj pentru WhatsApp/email; nu pretindem trimitere automată.
- Contactul, adresa și rețelele sociale sunt în sursa de date comună.
- Portofoliul afișează evenimente reale, iar grafica originală V59 este marcată conceptual. Nu prezentăm materiale AI drept „concerte făcute de firmă”.
- Pentru TikTok, folosiți embeduri oficiale sau fișiere exportate și furnizate cu drepturi de utilizare; nu extragere prin metode care încalcă termenii platformei.

## Recomandări după aprobarea vizuală

1. Confirmați datele firmei și eventualul Google Business Profile pe sursele oficiale; verificați concordanța NAP.
2. Activați Search Console și monitorizați interogări reale: DJ Pitești, sonorizare Pitești, lumini evenimente Argeș și servicii specifice. Nu produceți pagini artificiale repetând orașul.
3. Verificați faviconul folosit ca logo în schema.org la dimensiune și claritate.
4. Testați LCP, INP și CLS pe staging/producție și corectați assetul LCP, nu urmăriți un scor imaginar.
5. Audit complet de contrast și axe-core pe formulare, navigație, lightbox, modale.
6. Consolidați selectiv CSS istoric, după regresii de vizual/funcție.
7. Înlocuiți eventualele asseturi generice cu propriile filmări și fotografii ale Green Sound, cu acordul proprietarilor.

## Referințe oficiale (consultate 12 nov. 2026)

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- LocalBusiness schema: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Organization schema: https://developers.google.com/search/docs/appearance/structured-data/organization
- Structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Site favicon: https://developers.google.com/search/docs/appearance/favicon-in-search

## Release gate

PR **draft**. Nu se modifică `main` și nu se publică pe greensoundmusic.com fără aprobare. Build, unit tests și Playwright 360–1440 px trebuie să treacă; capturile trebuie revizuite vizual.

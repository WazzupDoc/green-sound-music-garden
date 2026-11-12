# GREEN SOUND MUSIC — AUDIT DE DESIGN ȘI IMPLEMENTARE V60

Data: 12 noiembrie 2026 · Ramură de lucru: `design/v60-complete-interior-redesign`

> Document de audit pentru **proiectul React din GitHub**; nu este un certificat Awwwards și nu pretinde că fiecare efect arată perfect pe fiecare dispozitiv. Nu există publicare pe domeniul oficial.

## Surse și verificări

- Site-ul de referință: `https://greensoundmusic.com/` — serviciile sunt confirmate: DJ/MC, trupă, studio, sonorizare, lumini, LED, fum greu, Start Veselia, hostess, ursitoare; activitate din 2008.
- Codul din ramura V59: homepage-ul avea scenă interactivă, selecție de temperatură a luminii, control de intensitate și fum; toate imaginile de portofoliu provin din setul local de materiale al firmei.
- Analiza de structură a codului V59: `src/components/site/blocks.tsx`, `src/routes/servicii.tsx`, `src/routes/evenimente.index.tsx`, `src/routes/portofoliu.tsx`, `src/routes/despre-noi.tsx`, `src/routes/contact.tsx`, `src/components/site/EventPage.tsx`, `src/components/site/ServicePage.tsx`.
- Referințe de art direction: proiecte de muzică/evenimente premiate (pentru compoziție și principii, **nu cod copiat**). Nivelul vizual rămâne o evaluare editorială subiectivă.

## Probleme prioritizate în codul vechi

| Prioritate | Observație concretă | Impact | Acțiunea V60 |
|---|---|---|---|
| P0 | Toate paginile interioare de servicii/evenimente foloseau același `PageHero`: text stânga, fotografie dreapta | Site repetitiv și necinematografic | Hero full-bleed, tipografie suprapusă, fotografie dominantă, acțiuni delimitate separat |
| P0 | `/servicii` era trei grupe de liste verticale fără experiență foto | Nu arată producția firmei | Catalog foto pentru toate cele 8 servicii și selecție interactivă |
| P0 | `/portofoliu` începea cu un bloc de text fără imagine reprezentativă | Materialele autentice intrau prea târziu | Film-style hero, apoi galeria reală și filmele, fără alterarea sistemului de lightbox |
| P1 | `/evenimente` repeta rânduri cu aceeași structură | Nu arată diferențele de atmosferă | Cinci scene foto cu ritm și format variabile, fiecare cu link către pagina detaliată |
| P1 | Pagini de detaliu cu secțiuni succesive în tonuri asemănătoare | Oboseală vizuală, puțină ierarhie | Ritm cromatic între instrucțiuni, ofertă și conținut foto |
| P1 | Contact și cerere de ofertă au deja validări/semantici importante | Risc de regresie dacă se rescriu inutil | Păstrare logică și îmbunătățire de contrast/estetică în CSS |
| P1 | Efectele vizuale excesive degradează experiența pe mobil | FPS, baterie, accesibilitate | `prefers-reduced-motion`, imagini optimizate, pauză animațiilor din afara viewport-ului |
| P2 | Homepage-ul avea multe variante experimentale și CSS vechi în repository | Mentenanță și cascade greu de controlat | CSS V60 izolat și staged; eliminarea stratului istoric trebuie făcută după aprobarea direcției, nu prin ștergerea oarbă a codului |
| P2 | Calitatea media TikTok e greu de validat automat | Posibile drepturi, recodare, URL-uri instabile | Utilizare doar prin embed/link oficial sau fișiere furnizate și autorizate, fără scraping ori pretinderea descărcării |
| P2 | Grafica digitală ar putea fi confundată cu dovezi ale unui eveniment real | Încredere și autenticitate | Separare expresă: fotografie/video real în portofoliu, SVG/WebP generat doar în compoziția scenică |

## Anti-AI design review — criterii obligatorii

1. **Testul logo-ului ascuns:** fotografia, grila și vocea trebuie să indice o afacere reală de muzică/evenimente.
2. **Fără carduri repetitive:** catalogul, indexul de evenimente, despre noi și portofoliul trebuie să aibă ritm editorial diferit.
3. **Fotografii reale înaintea decorului:** nu înlocui fotografia unei nunți cu un eveniment AI inventat.
4. **Motion with intent:** un singur sistem coerent de mișcare inspirat din lumină și fum; nu salturi de carduri și animații artificiale omniprezente.
5. **Nu se publică mărturii/statistici fabricate** și nici inventare tehnice neverificate.
6. **Mobile is bespoke:** imagine vizibilă, text de minimum 16 px, butoane tactile, fără hover obligatoriu și fără scroll orizontal.
7. **Performanță:** lazy loading sub fold, video la cerere, reduce motion, verificare LCP/CLS după găzduirea finală.
8. **Verificare funcțională:** meniuri, lightbox cu tastatura, deep links, 8 pagini de servicii, 5 evenimente, Contact și date structurale.

## Animații și interacțiuni efective

- V59: scene cu selecție, reflectoare cu intensitate din slider, temperaturi verde/cald/rece, fum comutabil, imagini WebP generate plus SVG în straturi; preview static nu poate demonstra efectele în mișcare.
- V60: hero scenic comun tuturor serviciilor/evenimentelor cu fascicule subtile și fallback reduce-motion; selecție vizuală de servicii; fotografii de eveniment cu zoom controlat la hover; undă decorativă pe portofoliu.
- Nu se afirmă că imaginea generată reprezintă un concert, o nuntă sau un montaj efectiv al Green Sound Music.

## Ce nu am pretins / ce rămâne de realizat

- **Nu am verificat automat videoclipuri TikTok**: accesul platformei la pagina de profil este restricționat. Materialele existente în repo (YouTube, fotografii proprii) rămân baza.
- **Nu am implementat un CMS administrabil**: acum conținutul este în datele React, nu în WordPress.
- **Nu există un audit Lighthouse producție** fără URL de staging stabil și date RUM; targetul 100/100 nu este certificat.
- **Nu am refăcut integral fiecare pagină internă din zero**: infrastructura logică, componentele service/event, formularul, FAQ și SEO sunt păstrate; estetica și structura hero + index au fost reconstruite.
- Performanța, accesibilitatea și rezultatul vizual se verifică în GitHub Actions și în capturi 360/390/430/768/1024/1440; aceste teste nu garantează un design premiabil.

## Criteriu de merge

Nu se face merge în `main` și nu se conectează la `greensoundmusic.com` fără:
- CI verde și capturi revizuite,
- confirmarea proprietarului asupra compoziției,
- confirmarea drepturilor pentru toate materialele media,
- verificarea datelor și contactelor publice.

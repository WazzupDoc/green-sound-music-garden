# GREEN SOUND MUSIC — AUDIT V60
_Data: 12 noiembrie 2026 · Ramura: design/v60-total-experience-system · Statut: versiune de evaluare, NU publicați_

## 1. Rezultate observate în codul V59

| Zonă | Problemă găsită | Intervenție V60 |
| --- | --- | --- |
| Acasă | Hero mare GREEN/SOUND + fotografie deja repetată în V52–V59; singura noutate majoră era butonul de lumină | Componentă NOUĂ `GreenImmersiveHome`; scenă circulară compusă, identitate editorială cu altă ierarhie, cinci acte vizuale |
| Efecte | În principal imagini și transformări CSS; intensitatea vizuală nu era asociată cu o simulare de lumină | `StageLightEngine.tsx`: Canvas 2D cu fascicule proiectate, surse mobile, bloom, particule, parallax la cursor, haze |
| Performanță | Mișcare decorativă în mai multe secțiuni, potențial de lucru offscreen | Canvas maxim 28 fps, DPR maxim 1.5, suspendare când nu e vizibil, tab ascuns sau motion redus |
| Navigare / servicii | Serviciile apăreau în 3 grupuri de rânduri tipografice similare cu versiunile anterioare | `/servicii`: director editorial 8 servicii, fotografie-document schimbată la hover/focus, linkuri reale |
| Evenimente | Index cu 5 rânduri alternante și compoziții aproape identice | `/evenimente`: 5 suprafețe fotografice cu compoziție asimetrică; fiecare intră într-o pagină proprie |
| Detalii servicii | Același PageHero și aceeași paletă, indiferent de serviciu | `PageHero` cu `kind` și `tone` distincte; stiluri pentru 8 servicii și capitole tehnice |
| Detalii evenimente | Același PageHero și timeline vizual generic | Palete diferite pentru nuntă, botez, concert, corporate, petrecere; desfășurător vizual refăcut |
| Portofoliu | Intro cu text, neconectat vizual cu calitatea galeriei | Intro cinematic cu poster real; se păstrează galeria cu deep links, filtre, lightbox și filmări |
| Despre noi | Hero și liste similare cu alte pagini | Compoziție cu identitate, cronologie vizuală mai proeminentă, conținut verificabil |
| Contact | Form logic, dar prezentare repetitivă | Stil de scenă pentru cerere; păstrat comportamentul corect WhatsApp/email, fără confirmări false |
| Footer | Grilă obișnuită, puțin legată de direcția artistică | Retușare editorială, contrast, CTA clar; legături și informații reale conservate |

## 2. Reguli de conținut

- Nu atribuim firmei fotografii generate. Imaginile din `/media/greensound/` și thumbnail-urile videoclipurilor reale rămân dovezile; grafica din `/creative/` este artă digitală de atmosferă.
- Nu inventăm evenimente, clienți, numere de proiecte, recenzii, prețuri, certificate sau specificații tehnice.
- Green Sound Music: activitate din 2008, Pitești, Argeș; serviciile reale sunt cele din `src/data/site.ts`.
- TikTok: se poate lega profilul public `https://www.tiktok.com/@greensoundmusic`. Fișierele video originale se integrează doar după export/permisiune; nu facem scraping sau descărcări neautorizate.
- Nu lansăm audio automat; filmările YouTube se redau la clic.

## 3. Criterii anti-AI design (verificare creativă)

1. **Testul identității**: fără logo, se simte muzica, lumina și spectacolul sau ar putea fi un landing page pentru orice firmă?
2. **Testul compoziției**: fiecare pagină are o compoziție justificată de conținut, nu aceeași structură text stânga / fotografie dreapta.
3. **Testul autenticității**: niciun vizual generat nu pretinde că este dintr-un eveniment real.
4. **Testul mișcării**: efectele au o sursă (reflector, fum, tranziție, deplasare a privirii), nu se mișcă doar pentru spectacol tehnic.
5. **Testul interacțiunilor**: butoanele fac ceva; nu există formulare care declară mesajul trimis fără trimitere.
6. **Testul mobilului**: la 360/390/430 px nu se pierde navigarea, informația sau accesul la controale.
7. **Testul performanței**: la reduced-motion și offscreen efectele se opresc, imaginile de sub fold sunt încărcate lazy; efectul nu trebuie să degradeze LCP.

Aceste criterii sunt o aplicare în proiect a principiilor publice Anti AI Slop și Web Design Guidelines; skill-urile externe nu sunt instalate automat de acest fișier.

## 4. Validare

- TypeScript strict, SSR build, unit tests și test browser: workflow `.github/workflows/regia-serii-quality.yml`.
- Dimensiuni browser acoperite: 360 / 390 / 430 / 768 / 1024 / 1440 px.
- Verificări browser: schimbare scenă/lumină/fum/intensitate, 8 servicii, 5 evenimente, contact funcțional, deep-link la fotografii, sitemap și noindex pe staging.
- Lighthouse / accesibilitate de nivel AA / performanță pe conexiune mobilă reală **neconfirmate fără un audit suplimentar**.
- Nu se modifică `main` și nu se publică pe domeniul real fără acordul proprietarului.

## 5. Sarcini încă deschise

- Înlocuirea imaginii conceptuale / a posterelor cu fotografii și clipuri originale de cea mai bună calitate, după ce proprietarul furnizează exporturile.
- Măsurare manuală LCP, CLS și INP pentru preview-ul final pe conexiune reală.
- Revizuirea vizuală finală a celor 8 detalii de servicii și 5 pagini de evenimente la fiecare dimensiune.
- Confirmarea datelor comerciale curente, inclusiv toate materialele de studio, înainte de publicare.

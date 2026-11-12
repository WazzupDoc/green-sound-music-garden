# Research log — GREEN SOUND MUSIC V60

**Data:** 12 noiembrie 2026.

| Sursă | Utilizare | Licență / limitare |
| --- | --- | --- |
| https://greensoundmusic.com/servicii/ | Inventarul real: DJ/MC, trupă, studio, echipamente, efecte, hostess, ursitoare, Start Veselia | Fapte comerciale de verificat înainte de publicare |
| https://greensoundmusic.com/echipamente-de-sunet-si-lumini/ | Nomenclatorul real de sunet, moving heads, ecrane LED | Nu inventa echipamente suplimentare |
| https://www.awwwards.com/websites/music-sound/ | Referințe pentru ritmul compoziției, video și tipografie | Inspirație, nu copiere de layout |
| https://www.awwwards.com/websites/events/ | Ierarhie de evenimente și galerii cu impact | Inspirație, nu copiere |
| https://www.awwwards.com/websites/responsive-design/ | Comportament mobil separat și recadrare | Inspirație, nu copiere |
| https://www.awwwards.com/sites/fiabamia | Concept de interacțiune legată de poveste | Inspirație, fără preluare de elemente |
| https://www.awwwards.com/sites/chande-bootcamp-2026 | Limbaj vizual legat de experiența evenimentului | Inspirație, fără copiere |
| https://github.com/muris11/anti-ai-slop | Testele purpose / convergence și criterii pentru autenticitate, imagini, mobile, motion | MIT |
| https://github.com/greensock/GSAP | Verificat pentru animații, dar NU adăugat: motorul propriu Canvas și Motion existente evită o dependență nouă | Licență proprie GSAP, nu presupune MIT |
| https://github.com/darkroomengineering/lenis | Bibliotecă de scroll deja prezentă în proiect; păstrează navigarea nativă și accesibilitatea | MIT |
| https://github.com/motiondivision/motion | Animații React deja disponibile; alternativele CSS/Canvas nu adaugă dependențe | MIT, de verificat pentru versiunea instalată |
| https://www.tiktok.com/@greensoundmusic | Profil social oficial din datele proiectului; link spre materialele publicate | Pagina video nu a putut fi inspectată direct din cauza restricțiilor de acces |

### Evaluarea dependențelor
**Nu s-a instalat nicio bibliotecă nouă.** Am analizat GSAP/ScrollTrigger, dar o animație atent limitată poate fi creată în Canvas 2D + CSS + Motion existente, fără a crește bundle-ul. Avantaj: control bun al CPU, DPR, offscreen și reduced-motion.

### Materiale artistice
- `public/creative/stage-aurora.svg`, `velvet-smoke.svg`, `sonic-ribbon.svg` — grafică originală.
- `public/creative/v59/*.webp` — compoziții vizuale generate pentru proiect, folosite doar ca atmosferă / demonstrație; nu sunt fotografii reale.
- `public/media/greensound/*` — fotografii provenite din materialele Green Sound deja selectate în proiect.

import scenaAsset from "@/assets/scena-concert-lumini.webp.asset.json";
import djAsset from "@/assets/dj-mc-green-sound.webp.asset.json";
import concertAsset from "@/assets/concert-public-lumini.webp.asset.json";
import hostessAsset from "@/assets/hostess-evenimente.webp.asset.json";
import ursitoareAsset from "@/assets/ursitoare-botez.webp.asset.json";
import ursitoare2Asset from "@/assets/ursitoare-botez-2.webp.asset.json";
import copiiAsset from "@/assets/animatie-petreceri-copii.webp.asset.json";

/* ------------------------------------------------------------------ */
/* Business facts — verified on greensoundmusic.com. Edit here only.   */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://greensoundmusic.com";

export const business = {
  name: "Green Sound Music",
  tagline: "Culoarea petrecerii tale!",
  founded: 2008,
  phoneDisplay: "0766 566 275",
  phoneHref: "tel:+40766566275",
  whatsappNumber: "40766566275",
  email: "contact@greensoundmusic.com",
  address: {
    street: "Str. Exercițiu nr. 19",
    city: "Pitești",
    postalCode: "110438",
    region: "Argeș",
    country: "RO",
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/greensoundmusic/" },
    { label: "Instagram", href: "https://www.instagram.com/greensoundmusic" },
    { label: "TikTok", href: "https://www.tiktok.com/@greensoundmusic" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCca_bQHe0IjE1KadshHWnuw" },
  ],
} as const;

export const images = {
  scena: { src: scenaAsset.url, alt: "Scenă de concert Green Sound Music cu lasere verzi și moving head-uri", w: 1350, h: 1800 },
  dj: { src: djAsset.url, alt: "DJ Green Sound și MC Dana în fața unui perete de lumini", w: 1350, h: 1800 },
  concert: { src: concertAsset.url, alt: "Public la un concert în aer liber, scenă luminată de Green Sound Music", w: 1800, h: 1350 },
  hostess: { src: hostessAsset.url, alt: "Două hostess Green Sound Music în ținută elegantă", w: 1024, h: 684 },
  ursitoare: { src: ursitoareAsset.url, alt: "Ursitoare Green Sound Music la un botez", w: 810, h: 541 },
  ursitoare2: { src: ursitoare2Asset.url, alt: "Trei ursitoare cu baghete și ramă decorativă", w: 1024, h: 684 },
  copii: { src: copiiAsset.url, alt: "Animatoare pentru petreceri de copii, înconjurate de baloane colorate", w: 1024, h: 684 },
  studio: { src: "https://i.ytimg.com/vi/xN0J8_3GlgY/maxresdefault.jpg", alt: "Cadru din videoclipul „Muzica ne leagă”, produs de Green Sound", w: 1280, h: 720 },
  fum: { src: "https://i.ytimg.com/vi/u7EW622vE3Q/maxresdefault.jpg", alt: "Efect de fum greu cu gheață carbonică la un eveniment Green Sound Music", w: 1280, h: 720 },
} as const;

export type ImageRef = (typeof images)[keyof typeof images];

/* ------------------------------------------------------------------ */
/* Real videos published by Green Sound Music                           */
/* ------------------------------------------------------------------ */

export type Video = { id: string; title: string; caption: string; tags: string[]; start?: number };

export const videos = {
  nuntaRamada: {
    id: "37QlXW3NlxU",
    title: "Nuntă la Ramada Pitești — DJ Green Sound & MC Dana",
    caption: "DJ și MC la o nuntă din Pitești",
    tags: ["nunti", "dj-mc"],
    start: 97,
  },
  showLumini: {
    id: "eGLykw1G0EQ",
    title: "DJ Green Sound, MC Dana & LJ Dom — show de lumini",
    caption: "DJ, MC și show de lumini la evenimente",
    tags: ["dj-mc", "sonorizare", "petreceri-private"],
  },
  neatza: {
    id: "nc_aWk8QPIU",
    title: "Lansarea single-ului „Muzica ne leagă” la Neatza cu Răzvan și Dani",
    caption: "Green Sound Music, alături de Bogdan și Mugurel, la TV",
    tags: ["trupa", "studio"],
  },
  muzicaNeLeaga: {
    id: "xN0J8_3GlgY",
    title: "Green Sound — Muzica ne leagă (lyric video)",
    caption: "Producție realizată în studioul Green Sound Music",
    tags: ["studio"],
  },
  secretOfMyLife: {
    id: "ghCp3g_nn_8",
    title: "Green Sound — Secret of My Life (videoclip oficial)",
    caption: "Producție muzicală Green Sound",
    tags: ["studio"],
  },
  fumGreu: {
    id: "u7EW622vE3Q",
    title: "Fum greu cu gheață carbonică — Pitești",
    caption: "Efect de fum greu la dansul mirilor",
    tags: ["nunti", "fum-greu"],
  },
} satisfies Record<string, Video>;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type ServiceSlug =
  | "dj-mc"
  | "trupa"
  | "echipamente-de-sunet-si-lumini"
  | "masina-fum-greu-cu-gheata-carbonica"
  | "studio-inregistrari"
  | "hostess"
  | "ursitoare-botez"
  | "start-veselia";

export type EventSlug = "nunti" | "botezuri" | "evenimente-corporate" | "concerte-festivaluri" | "petreceri-private";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  formLabel: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  image: ImageRef;
  highlights: { title: string; text: string }[];
  sections: { title: string; paragraphs: string[]; list?: string[] }[];
  videos: Video[];
  gallery?: ImageRef[];
  events: EventSlug[];
  faqs: { q: string; a: string }[];
  external?: { label: string; href: string }[];
};

export const services: Service[] = [
  {
    slug: "dj-mc",
    name: "DJ & MC",
    short: "Muzică mixată live și un MC care ține sala aproape de fiecare moment.",
    formLabel: "DJ & MC",
    seoTitle: "DJ și MC Pitești pentru nunți, botezuri și petreceri | Green Sound Music",
    seoDescription:
      "DJ Green Sound și MC Dana: muzică pentru nunți, botezuri, aniversări, corporate și festivaluri, cu sunet și lumini proprii. Cere o ofertă pentru data ta.",
    eyebrow: "Serviciu · DJ & MC",
    h1: "DJ și MC pentru evenimente care nu se golesc la miezul nopții",
    lead: "DJ Green Sound și MC Dana lucrează în tandem: unul citește ringul, celălalt ține legătura cu invitații. Venim cu sistem de sunet și lumini proprii, deja calibrat pentru sală.",
    image: images.dj,
    highlights: [
      { title: "DJ + MC în echipă", text: "Momentele cheie — intrarea, dansul, tortul — sunt anunțate și ritmate de MC, iar DJ-ul ajustează muzica în timp real." },
      { title: "Sunet și lumini incluse în discuție", text: "Același furnizor pentru muzică, sonorizare și lumini înseamnă mai puțină coordonare pentru tine." },
      { title: "Repertoriu pe gustul invitaților", text: "Stabilim împreună ce trebuie să se audă și ce nu, înainte de eveniment." },
    ],
    sections: [
      {
        title: "Experiență din festivaluri până la petreceri private",
        paragraphs: [
          "Green Sound Music oferă DJ pentru festivaluri, concerte, zile ale orașului, nunți, botezuri, aniversări, majorate și petreceri corporate. Echipamentele profesionale de sunet și lumini asigură o atmosferă potrivită fiecărui spațiu.",
          "MC-ul energic întreține legătura cu publicul și face ca muzica să prindă viață. Cele mai reușite petreceri sunt cele la care DJ-ul și MC-ul lucrează ca o echipă.",
        ],
      },
    ],
    videos: [videos.nuntaRamada, videos.showLumini],
    gallery: [images.dj, images.scena],
    events: ["nunti", "botezuri", "petreceri-private", "evenimente-corporate", "concerte-festivaluri"],
    faqs: [
      { q: "Putem stabili lista de melodii înainte?", a: "Da. Discutăm piesele obligatorii, momentele speciale și genurile pe care vrei să le eviți, iar DJ-ul construiește seara pornind de la ele." },
      { q: "MC-ul vorbește toată seara?", a: "Nu. MC-ul intervine la momentele importante și pentru a anima ringul, în ritmul pe care îl stabilim împreună." },
    ],
  },
  {
    slug: "trupa",
    name: "Trupă live, soliști și instrumentiști",
    short: "Muzicieni profesioniști și un inginer de sunet care mixează live toată seara.",
    formLabel: "Trupă live",
    seoTitle: "Trupă live pentru nunți și evenimente — Pitești | Green Sound Music",
    seoDescription:
      "Trupă live cu soliști și instrumentiști profesioniști, repertoriu de la hit-uri actuale la muzică populară și inginer de sunet dedicat. Cere ofertă.",
    eyebrow: "Serviciu · Trupă live",
    h1: "Muzică live cântată aproape de original, de la disco la populară",
    lead: "Soliști și instrumentiști absolvenți ai școlilor de muzică din țară, cu experiență în emisiuni TV, radio, concursuri și turnee, plus un inginer de sunet care mixează live pe tot parcursul evenimentului.",
    image: images.scena,
    highlights: [
      { title: "Muzicieni full-time", text: "Toți membrii trupei sunt muzicieni profesioniști, atent selecționați." },
      { title: "Inginer de sunet dedicat", text: "După repetiții și probe de sunet, mixul din sală rămâne echilibrat de la primul la ultimul set." },
      { title: "Repertoriu personalizat", text: "Lista de melodii se adaptează dorințelor tale și publicului." },
    ],
    sections: [
      {
        title: "Repertoriu din orice perioadă",
        paragraphs: [
          "Când vine vorba de ultimele hit-uri, disco, funk, reggae, rock, R&B, muzică populară, gipsy sau etno, trupa redă fiecare gen cât mai aproape de original. Lista de mai jos este doar o parte din repertoriu.",
        ],
        list: [
          "Dance / disco clasic",
          "Soul, R&B",
          "Rock clasic",
          "Hit-uri din anii ’60, ’70, ’80, ’90",
          "Balade",
          "Muzică populară din diverse zone ale țării",
          "Reggae, swing",
          "Hit-uri / Top 40 și muzică internațională",
          "Muzică de ascultat / cafe concert",
        ],
      },
      {
        title: "Ce vine cu trupa",
        paragraphs: [
          "Pe parcursul evenimentului asigurăm echipamente profesionale de sunet și schele de lumini cu moving head-uri beam și wash. Un singur furnizor pentru muzică și tehnică înseamnă repetiții, probe și montaj coordonate de aceeași echipă.",
        ],
      },
    ],
    videos: [videos.neatza],
    gallery: [images.scena, images.concert],
    events: ["nunti", "evenimente-corporate", "concerte-festivaluri", "petreceri-private"],
    faqs: [
      { q: "Putem cere piese care nu sunt în repertoriu?", a: "Da. Spune-ne din timp ce melodii îți dorești, iar trupa îți va răspunde ce poate pregăti pentru evenimentul tău." },
      { q: "Trupa poate fi combinată cu DJ?", a: "Da. Cele două se pot completa — de exemplu, trupa pentru seturile live și DJ pentru pauze și finalul petrecerii." },
    ],
  },
  {
    slug: "echipamente-de-sunet-si-lumini",
    name: "Sonorizare, lumini și ecrane LED",
    short: "Sisteme PA, schele de lumini, moving head-uri și ecrane LED pentru interior și exterior.",
    formLabel: "Sonorizare, lumini, ecrane LED",
    seoTitle: "Sonorizare, lumini și ecrane LED evenimente — Pitești | Green Sound Music",
    seoDescription:
      "Închiriere și operare sisteme de sunet TW Audio, DYNACORD, FBT, lumini LS, moving head-uri beam/wash și ecrane LED pentru evenimente, concerte și conferințe.",
    eyebrow: "Serviciu · Scenotehnică",
    h1: "Sunet echilibrat, lumini care construiesc atmosfera, ecrane LED la vedere",
    lead: "O trupă poate fi extraordinară, dar cu echipamente slabe sunetul nu va fi pe măsură. Ne ocupăm de sonorizare de înaltă performanță: niciodată prea tare, niciodată prea încet.",
    image: images.concert,
    highlights: [
      { title: "Branduri profesionale", text: "Sisteme audio TW Audio, DYNACORD, FBT și altele, testate regulat înainte de fiecare eveniment." },
      { title: "Lumini LS și moving head-uri", text: "Schele de lumini, moving head-uri BEAM și WASH, lumini LED și efecte speciale." },
      { title: "Ecrane LED", text: "Mai multe dimensiuni, adaptabile pentru interior și exterior." },
    ],
    sections: [
      {
        title: "Sunet",
        paragraphs: [
          "Suntem specializați în sisteme audio PA, structuri de lumini și echipamente profesionale pentru DJ, trupe live și public. Fie că organizezi o conferință, o expoziție, o serbare, o piesă școlară, o nuntă, un botez sau un festival, asigurăm suportul tehnic complet.",
          "Suntem punctuali și prezenți la ora stabilită, iar echipamentele sunt verificate înainte de fiecare utilizare.",
        ],
      },
      {
        title: "Lumini",
        paragraphs: [
          "Oferim o gamă variată de echipamente profesionale de lumini LS: schele de lumini, moving head-uri (lumini inteligente BEAM și WASH), lumini LED și efecte speciale de iluminat, pentru interior și exterior.",
        ],
      },
      {
        title: "Ecrane LED",
        paragraphs: [
          "Punem la dispoziție ecrane LED de diverse dimensiuni, potrivite pentru prezentări, transmisii live de pe scenă sau conținut vizual la petreceri. Spune-ne dimensiunea sălii sau a scenei și propunem varianta potrivită.",
        ],
      },
    ],
    videos: [videos.showLumini],
    gallery: [images.concert, images.scena],
    events: ["concerte-festivaluri", "evenimente-corporate", "nunti", "petreceri-private"],
    faqs: [
      { q: "Ce informații vă trebuie pentru o ofertă de sonorizare?", a: "Tipul evenimentului, locația (interior sau exterior), numărul aproximativ de participanți și ce urmează să se întâmple pe scenă: DJ, trupă, discursuri sau proiecții." },
      { q: "Operați voi echipamentele?", a: "Da, echipamentele sunt montate și operate de echipa noastră pe durata evenimentului." },
    ],
  },
  {
    slug: "masina-fum-greu-cu-gheata-carbonica",
    name: "Fum greu și baloane cu fum",
    short: "Fum greu cu gheață carbonică pentru dansul mirilor și baloane cu fum pentru intrări de efect.",
    formLabel: "Fum greu / baloane cu fum",
    seoTitle: "Fum greu cu gheață carbonică pentru nunți — Pitești | Green Sound Music",
    seoDescription:
      "Mașină de fum greu cu 18 kg gheață carbonică certificată alimentar și operator, plus mașină de baloane cu fum. Pentru dansul mirilor, tort și momente de efect.",
    eyebrow: "Serviciu · Efecte speciale",
    h1: "Fum greu pentru dansul mirilor, baloane cu fum pentru intrarea perfectă",
    lead: "Pachetul de bază include mașina de fum greu, 18 kg de gheață carbonică și operatorul specializat. Gheața carbonică este certificată alimentar.",
    image: images.scena,
    highlights: [
      { title: "Pachet de bază clar", text: "Mașină de fum greu + 18 kg gheață carbonică + operator." },
      { title: "Lumini arhitecturale opțional", text: "Colorează fumul pentru o atmosferă și mai spectaculoasă." },
      { title: "Sincronizat cu muzica", text: "Operatorii aliniază efectul cu restul spectacolului audio-video." },
    ],
    sections: [
      {
        title: "Fum greu cu gheață carbonică",
        paragraphs: [
          "Efectul se folosește la dansul de deschidere, la întâmpinarea tortului sau pentru efecte speciale la șampanie și cocktailuri. Fumul rămâne jos, la nivelul podelei, și creează impresia de „dans pe nori”.",
          "Pentru un impact vizual deosebit se pot adăuga lumini arhitecturale care colorează fumul.",
        ],
      },
      {
        title: "Mașina de baloane cu fum",
        paragraphs: [
          "Combină efectul baloanelor plutitoare cu un fum fin. Se potrivește la deschiderea evenimentului, intrarea mirilor, momente speciale la aniversări și petreceri corporate, dar și pentru efecte surpriză în concerte și lansări de produse.",
          "Mașina se adaptează spațiului și tematicii evenimentului.",
        ],
      },
    ],
    videos: [videos.fumGreu],
    events: ["nunti", "botezuri", "evenimente-corporate", "petreceri-private"],
    faqs: [
      { q: "Ce include pachetul de bază de fum greu?", a: "Mașina de fum greu, 18 kg de gheață carbonică certificată alimentar și operatorul specializat." },
      { q: "Se poate colora fumul?", a: "Da, cu lumini arhitecturale adăugate la pachet." },
    ],
  },
  {
    slug: "studio-inregistrari",
    name: "Studio de înregistrări",
    short: "Înregistrări, mixaj, mastering, compoziție, aranjamente și producție completă.",
    formLabel: "Studio înregistrări",
    seoTitle: "Studio de înregistrări Pitești — mixaj, mastering, producție | Green Sound Music",
    seoDescription:
      "Studio de înregistrări în Pitești, fondat în 2009: înregistrări, mixaje, mastering, compoziție, aranjamente și producție muzicală completă. Programează o sesiune.",
    eyebrow: "Studio · Producție muzicală",
    h1: "Un studio din Pitești în care piesa ta își găsește sunetul",
    lead: "Studioul Green Sound Music este o cameră multifuncțională de înregistrări, situată central în Pitești. Fondat în 2009 de Cosmin Ivascu, cu gândul la un mediu artistic prietenos în care muzica se poate exprima liber.",
    image: images.dj,
    highlights: [
      { title: "Înregistrări", text: "Voce și instrumente, într-un spațiu pregătit pentru sesiuni relaxate." },
      { title: "Mixaj și mastering", text: "Piesa finalizată, pregătită pentru publicare." },
      { title: "Compoziție și aranjamente", text: "Colaborare cu producători și artiști care te pot ajuta să dai viață melodiei." },
    ],
    sections: [
      {
        title: "Servicii de producție",
        paragraphs: [
          "Oferim înregistrări, mixaje, mastering, scriere de cântece, aranjamente și producție muzicală completă. Un serviciu aparte este colaborarea cu producători și artiști talentați, puși la dispoziția clienților pentru a îmbunătăți sau a construi o piesă.",
          "Mai jos poți asculta câteva producții realizate de Green Sound.",
        ],
      },
    ],
    videos: [videos.muzicaNeLeaga, videos.secretOfMyLife, videos.neatza],
    events: [],
    faqs: [
      { q: "Pot veni doar cu o idee, fără piesa finalizată?", a: "Da. Pe lângă înregistrare, oferim compoziție, aranjamente și producție completă, alături de producători și artiști colaboratori." },
      { q: "Unde se află studioul?", a: "Studioul este într-o locație centrală din Pitești. Detaliile exacte le primești la programarea sesiunii." },
    ],
  },
  {
    slug: "hostess",
    name: "Hostess",
    short: "Echipă tânără pentru primirea invitaților, cu zâmbetul pe buze.",
    formLabel: "Hostess",
    seoTitle: "Hostess pentru evenimente și nunți — Pitești | Green Sound Music",
    seoDescription:
      "Hostess pentru nunți, evenimente corporate, târguri și lansări în Pitești. Primire elegantă a invitaților, coordonată cu restul echipei Green Sound Music.",
    eyebrow: "Serviciu · Hostess",
    h1: "O primire ca la carte, de la prima ușă deschisă",
    lead: "Green Sound Music vă întâmpină cu o echipă tânără și energică, pregătită să vă asculte dorințele și să primească invitații cu brațele deschise.",
    image: images.hostess,
    highlights: [
      { title: "Primirea invitaților", text: "Prima impresie a evenimentului tău, gestionată cu grijă." },
      { title: "Coordonare cu echipa", text: "Hostess, DJ, MC și tehnicieni sub aceeași coordonare." },
      { title: "Ținută adaptată", text: "Discutăm stilul evenimentului înainte." },
    ],
    sections: [
      {
        title: "Pentru ce evenimente",
        paragraphs: [
          "Echipa de hostess se potrivește la nunți, evenimente corporate, târguri, expoziții și lansări de produse — oriunde contează felul în care sunt primiți oaspeții.",
        ],
      },
    ],
    videos: [],
    gallery: [images.hostess],
    events: ["nunti", "evenimente-corporate"],
    faqs: [],
  },
  {
    slug: "ursitoare-botez",
    name: "Ursitoare și animație pentru copii",
    short: "Ursitoare pentru botez, animatori, modelaj de baloane și pictură pe față.",
    formLabel: "Ursitoare / animație copii",
    seoTitle: "Ursitoare botez și animatori petreceri copii — Pitești | Green Sound Music",
    seoDescription:
      "Ursitoare pentru botez și animație pentru petreceri de copii: personaje, modelaj de baloane și pictură pe față. Combină cu DJ și sonorizare. Cere ofertă.",
    eyebrow: "Serviciu · Botez & copii",
    h1: "Ursitoare pentru botez și animație care îi ține pe cei mici în poveste",
    lead: "Pentru un eveniment plin de emoție și distracție: ursitoare la botez și animație cu personaje încântătoare la petrecerile copiilor.",
    image: images.ursitoare2,
    highlights: [
      { title: "Ursitoare", text: "Momentul tradițional al botezului, într-o interpretare elegantă." },
      { title: "Modelaj baloane & pictură pe față", text: "Activități care îi țin pe copii implicați." },
      { title: "Idei creative", text: "Venim cu propuneri pentru ca ziua copilului să fie cu adevărat specială." },
    ],
    sections: [
      {
        title: "Animație pentru petreceri de copii",
        paragraphs: [
          "Ne pricepem la modelaj de baloane, pictură pe față și aducem o atmosferă veselă și magică. Pentru un spectacol complet, cu poveste, muzică și personaje proprii, vezi și Start Veselia.",
        ],
      },
    ],
    videos: [],
    gallery: [images.ursitoare2, images.ursitoare, images.copii],
    events: ["botezuri", "petreceri-private"],
    faqs: [],
  },
  {
    slug: "start-veselia",
    name: "Start Veselia — spectacol pentru copii",
    short: "Spectacol interactiv cu muzică, dans și personaje proprii.",
    formLabel: "Start Veselia",
    seoTitle: "Start Veselia — spectacol interactiv pentru copii | Green Sound Music",
    seoDescription:
      "Start Veselia: spectacol educativ cu muzică, dans și personajele Miraluna, Zâna Rază de Soare, NU Vreau, NU Pot, Zooly și Tărăboi. Pentru 1 Iunie, zilele orașului și sărbători.",
    eyebrow: "Spectacol pentru copii",
    h1: "Start Veselia: o aventură cu muzică, dans și multă voie bună",
    lead: "Cei mici sunt invitați într-o aventură alături de Miraluna, Zâna Rază de Soare și cei trei frați — NU Vreau, NU Pot și Zooly — dar și de mascota veselă, Tărăboi.",
    image: images.copii,
    highlights: [
      { title: "Interacțiune directă", text: "Copiii nu sunt doar spectatori, ci parte din poveste." },
      { title: "Muzică, dans și momente comice", text: "Un show antrenant care captivează și educă în același timp." },
      { title: "Adaptat ocaziei", text: "Paște, 1 Iunie, zilele orașului, sărbătorile de iarnă și alte ocazii." },
    ],
    sections: [
      {
        title: "Magia educației prin muzică și dans",
        paragraphs: [
          "Start Veselia nu este doar un spectacol, ci o aventură educativă și muzicală, în care personajele îi provoacă pe cei mici să fie activi, să își respecte părinții și bunicii și să descopere cât de importantă este responsabilitatea în familie și comunitate.",
        ],
      },
    ],
    videos: [],
    gallery: [images.copii],
    events: ["petreceri-private", "concerte-festivaluri"],
    faqs: [],
    external: [
      { label: "TikTok", href: "https://www.tiktok.com/@startveselia" },
      { label: "Instagram", href: "https://www.instagram.com/startveselia" },
      { label: "Facebook", href: "https://www.facebook.com/startveselia" },
      { label: "YouTube", href: "https://www.youtube.com/@startveselia" },
    ],
  },
];

export const getService = (slug: ServiceSlug) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
};

/* ------------------------------------------------------------------ */
/* Event types                                                         */
/* ------------------------------------------------------------------ */

export type EventType = {
  slug: EventSlug;
  name: string;
  formLabel: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  image: ImageRef;
  moments: { title: string; text: string; service: ServiceSlug }[];
  recommended: { slug: ServiceSlug; why: string }[];
  videos: Video[];
  faqs: { q: string; a: string }[];
};

export const events: EventType[] = [
  {
    slug: "nunti",
    name: "Nunți",
    formLabel: "Nuntă",
    short: "DJ & MC sau trupă live, fum greu la dansul mirilor, lumini pentru sală.",
    seoTitle: "Muzică și efecte pentru nunți în Pitești — DJ, trupă, fum greu | Green Sound Music",
    seoDescription:
      "Tot ce ține de muzică și atmosferă la nuntă: DJ & MC, trupă live, sonorizare, lumini, ecrane LED, fum greu și hostess, de la o singură echipă din Pitești.",
    h1: "Nunta voastră, de la intrarea în sală până la ultimul dans",
    lead: "Muzica, sunetul, luminile și efectele speciale de la aceeași echipă. Voi vă bucurați de seară; noi ne ocupăm de ritm.",
    image: images.scena,
    moments: [
      { title: "Primirea invitaților", text: "Hostess la intrare și muzică de ambient la cocktail.", service: "hostess" },
      { title: "Intrarea mirilor", text: "Anunțată de MC, cu baloane cu fum pentru o intrare de efect.", service: "dj-mc" },
      { title: "Dansul mirilor", text: "Fum greu cu gheață carbonică, colorat cu lumini arhitecturale.", service: "masina-fum-greu-cu-gheata-carbonica" },
      { title: "Petrecerea", text: "Seturi live ale trupei sau DJ, cu lumini care urmăresc ringul.", service: "trupa" },
      { title: "Tortul", text: "Fum greu la întâmpinarea tortului și muzica potrivită momentului.", service: "masina-fum-greu-cu-gheata-carbonica" },
    ],
    recommended: [
      { slug: "dj-mc", why: "Ritmul serii și momentele cheie, ținute împreună de DJ și MC." },
      { slug: "trupa", why: "Pentru o nuntă cu muzică live și repertoriu personalizat." },
      { slug: "masina-fum-greu-cu-gheata-carbonica", why: "Efectul „dans pe nori” la dansul mirilor și la tort." },
      { slug: "echipamente-de-sunet-si-lumini", why: "Sunet echilibrat în sală și lumini care schimbă atmosfera." },
      { slug: "hostess", why: "Primirea invitaților, de la prima impresie." },
    ],
    videos: [videos.nuntaRamada, videos.fumGreu],
    faqs: [
      { q: "Putem avea și trupă, și DJ la aceeași nuntă?", a: "Da. Trupa și DJ-ul se pot completa pe parcursul serii, iar sunetul și luminile rămân coordonate de aceeași echipă." },
      { q: "Ce trebuie să vă trimitem pentru ofertă?", a: "Data, sala sau localitatea, numărul aproximativ de invitați și serviciile care vă interesează. Dacă nu știți încă ce vă trebuie, vă propunem noi o combinație." },
    ],
  },
  {
    slug: "botezuri",
    name: "Botezuri",
    formLabel: "Botez",
    short: "Ursitoare, DJ & MC, animație pentru copii și fum greu.",
    seoTitle: "Ursitoare, DJ și animație pentru botez — Pitești | Green Sound Music",
    seoDescription:
      "Botez organizat cu o singură echipă: ursitoare, DJ & MC, animatori pentru copii, sonorizare, lumini și fum greu. Green Sound Music, Pitești, din 2008.",
    h1: "Un botez cu ursitoare, muzică bună și copii care se distrează",
    lead: "Momentul ursitoarelor, animația pentru cei mici și petrecerea părinților, gândite împreună ca să curgă natural.",
    image: images.ursitoare2,
    moments: [
      { title: "Ursitoarele", text: "Momentul tradițional, cu costume și scenariu.", service: "ursitoare-botez" },
      { title: "Copiii", text: "Animație, modelaj de baloane și pictură pe față.", service: "ursitoare-botez" },
      { title: "Petrecerea", text: "DJ & MC pentru ritmul serii.", service: "dj-mc" },
      { title: "Tortul", text: "Fum greu cu gheață carbonică la întâmpinarea tortului.", service: "masina-fum-greu-cu-gheata-carbonica" },
    ],
    recommended: [
      { slug: "ursitoare-botez", why: "Ursitoare și animatori pentru copii." },
      { slug: "dj-mc", why: "Muzică și un MC care anunță momentele importante." },
      { slug: "start-veselia", why: "Un spectacol complet pentru copii, cu personaje proprii." },
      { slug: "masina-fum-greu-cu-gheata-carbonica", why: "Un efect frumos pentru tort sau intrarea părinților." },
    ],
    videos: [],
    faqs: [
      { q: "Pot rezerva doar ursitoarele?", a: "Da. Fiecare serviciu se poate rezerva separat sau împreună cu celelalte." },
    ],
  },
  {
    slug: "evenimente-corporate",
    name: "Evenimente corporate",
    formLabel: "Eveniment corporate",
    short: "Sonorizare pentru conferințe, ecrane LED, lansări de produse și petreceri de firmă.",
    seoTitle: "Sonorizare, ecrane LED și DJ pentru evenimente corporate | Green Sound Music",
    seoDescription:
      "Conferințe, târguri, expoziții, lansări de produse și petreceri de firmă: sonorizare, lumini, ecrane LED, hostess, DJ și trupă live. Cere ofertă.",
    h1: "Evenimente de firmă care sună clar și arată bine pe scenă",
    lead: "De la microfoane pentru discursuri și ecrane LED pentru prezentări, până la petrecerea de la final, coordonate de o singură echipă tehnică.",
    image: images.concert,
    moments: [
      { title: "Primirea", text: "Hostess pentru înregistrare și orientarea invitaților.", service: "hostess" },
      { title: "Prezentările", text: "Sonorizare pentru discursuri și ecrane LED pentru conținut.", service: "echipamente-de-sunet-si-lumini" },
      { title: "Lansarea", text: "Baloane cu fum sau efecte de lumini pentru momentul cheie.", service: "masina-fum-greu-cu-gheata-carbonica" },
      { title: "Petrecerea", text: "DJ & MC sau trupă live.", service: "dj-mc" },
    ],
    recommended: [
      { slug: "echipamente-de-sunet-si-lumini", why: "Sunet, lumini și ecrane LED pentru scenă și sală." },
      { slug: "hostess", why: "Primire profesionistă la conferințe, târguri și lansări." },
      { slug: "dj-mc", why: "Petrecerea de după program." },
      { slug: "trupa", why: "Muzică live pentru gale și petreceri de firmă." },
    ],
    videos: [videos.showLumini],
    faqs: [
      { q: "Puteți asigura doar partea tehnică?", a: "Da. Sonorizarea, luminile și ecranele LED se pot închiria și opera independent de partea artistică." },
    ],
  },
  {
    slug: "concerte-festivaluri",
    name: "Concerte și festivaluri",
    formLabel: "Concert / festival",
    short: "Scenotehnică pentru exterior, zile ale orașului, festivaluri și concerte.",
    seoTitle: "Scenotehnică pentru concerte, festivaluri și zilele orașului | Green Sound Music",
    seoDescription:
      "Sonorizare PA, schele de lumini, moving head-uri și ecrane LED pentru concerte, festivaluri și zilele orașului. DJ, trupă și spectacol pentru copii.",
    h1: "Scenă, sunet și lumini pentru concerte, festivaluri și zilele orașului",
    lead: "Sisteme PA, schele de lumini și ecrane LED pentru exterior, plus DJ, trupă live și spectacolul Start Veselia pentru programul copiilor.",
    image: images.concert,
    moments: [
      { title: "Scena", text: "Sisteme PA și schele de lumini cu moving head-uri beam și wash.", service: "echipamente-de-sunet-si-lumini" },
      { title: "Artiștii", text: "Trupă live sau DJ & MC în program.", service: "trupa" },
      { title: "Copiii", text: "Spectacolul Start Veselia, adaptat ocaziei.", service: "start-veselia" },
    ],
    recommended: [
      { slug: "echipamente-de-sunet-si-lumini", why: "Sonorizare, lumini și ecrane LED pentru exterior." },
      { slug: "dj-mc", why: "DJ pentru festivaluri și zile ale orașului." },
      { slug: "trupa", why: "Concert live în program." },
      { slug: "start-veselia", why: "Programul pentru copii: 1 Iunie, zilele orașului, sărbători." },
    ],
    videos: [videos.showLumini],
    faqs: [],
  },
  {
    slug: "petreceri-private",
    name: "Petreceri private",
    formLabel: "Petrecere privată",
    short: "Aniversări, majorate și petreceri acasă sau în locații închiriate.",
    seoTitle: "DJ și lumini pentru aniversări, majorate și petreceri private | Green Sound Music",
    seoDescription:
      "Aniversări, majorate și petreceri private în Pitești: DJ & MC, sonorizare, lumini, fum greu, baloane cu fum și animație pentru copii.",
    h1: "Aniversări și majorate cu ring plin și lumini pe măsură",
    lead: "Spune-ne câți invitați aveți și unde, iar noi propunem combinația potrivită de muzică, sunet și efecte.",
    image: images.dj,
    moments: [
      { title: "Muzica", text: "DJ & MC care se adaptează publicului.", service: "dj-mc" },
      { title: "Atmosfera", text: "Lumini și sunet dimensionate pentru spațiu.", service: "echipamente-de-sunet-si-lumini" },
      { title: "Momentul surpriză", text: "Baloane cu fum sau fum greu la tort.", service: "masina-fum-greu-cu-gheata-carbonica" },
    ],
    recommended: [
      { slug: "dj-mc", why: "Muzică și energie pentru ring." },
      { slug: "echipamente-de-sunet-si-lumini", why: "Lumini de club, oriunde ar fi petrecerea." },
      { slug: "masina-fum-greu-cu-gheata-carbonica", why: "Un moment de efect la tort." },
      { slug: "ursitoare-botez", why: "Animație dacă la petrecere sunt și copii." },
    ],
    videos: [videos.showLumini],
    faqs: [],
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

export const people = [
  { name: "DJ Green Sound", role: "DJ" },
  { name: "MC Dana", role: "MC" },
  { name: "LJ Dom", role: "Light jockey · lumini" },
  { name: "Cosmin Ivascu", role: "Fondator studio (2009)" },
];

export const generalFaqs = [
  {
    q: "Ce servicii pot rezerva de la Green Sound Music?",
    a: "DJ & MC, trupă live, soliști și instrumentiști, sonorizare, lumini, ecrane LED, fum greu și baloane cu fum, hostess, ursitoare, animație pentru copii, spectacolul Start Veselia și studio de înregistrări. Se pot rezerva separat sau combinate.",
  },
  {
    q: "Nu știu exact de ce servicii am nevoie. Ce fac?",
    a: "Trimite-ne tipul evenimentului, data, locația și numărul aproximativ de invitați. Pornind de la ele, îți propunem o combinație potrivită.",
  },
  {
    q: "Lucrați doar în Pitești?",
    a: "Sediul nostru este în Pitești, județul Argeș. Pentru evenimente în alte localități, menționează locația în cerere și îți răspundem cu disponibilitatea.",
  },
  {
    q: "Cum aflu prețul?",
    a: "Prețul depinde de dată, locație, durată și serviciile alese, de aceea lucrăm cu oferte personalizate. Completează formularul sau sună-ne la 0766 566 275.",
  },
  {
    q: "Putem personaliza muzica?",
    a: "Da. Atât DJ-ul, cât și trupa pornesc de la dorințele tale: piese obligatorii, genuri preferate și momente speciale.",
  },
];

export const process = [
  { title: "Ne spui despre eveniment", text: "Tipul, data, locația și câți invitați aștepți — prin formular, telefon sau WhatsApp." },
  { title: "Stabilim combinația", text: "Îți propunem serviciile potrivite și răspundem la întrebări." },
  { title: "Primești oferta", text: "O ofertă personalizată pentru data și locația ta." },
  { title: "Ziua evenimentului", text: "Montaj, probe de sunet și o echipă prezentă la ora stabilită." },
];

export const navEvents = events.map((e) => ({ to: `/evenimente/${e.slug}`, label: e.name }));
export const navServices = services.map((s) => ({ to: `/${s.slug}`, label: s.name }));

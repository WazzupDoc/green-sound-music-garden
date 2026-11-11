import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/confidentialitate")({
  head:()=>pageHead({title:"Confidențialitate și date de contact | Green Sound Music",description:"Informații despre datele completate în formularul de ofertă Green Sound Music și utilizarea WhatsApp sau a aplicației de email.",path:"/confidentialitate",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Confidențialitate",path:"/confidentialitate"}])]}),
  component:Privacy,
});
function Privacy(){return <section className="container-site pb-28 pt-44"><span className="crafted-index">INFORMARE / CONTACT</span>
 <h1 className="crafted-heading mt-7">Datele tale. <em>Fără surprize.</em></h1>
 <div className="mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-foreground/85">
 <section><h2 className="font-display text-2xl font-semibold">Cum funcționează formularul</h2>
 <p className="mt-3">Formularul de ofertă din acest website pregătește local un mesaj în WhatsApp sau în aplicația de email aleasă. Nu îl expediază automat. Cererea ajunge la Green Sound Music doar după ce o trimiți explicit în aplicația respectivă.</p></section>
 <section><h2 className="font-display text-2xl font-semibold">Ce date solicităm</h2>
 <p className="mt-3">Nume, telefon și tip de eveniment; opțional data, locația, numărul invitaților, serviciile dorite, emailul și alte detalii. Sunt necesare pentru a discuta o ofertă și pentru a răspunde solicitării.</p></section>
 <section><h2 className="font-display text-2xl font-semibold">Servicii externe</h2>
 <p className="mt-3">Dacă alegi WhatsApp sau email, transmiterea mesajului se desfășoară în serviciul extern selectat, conform politicilor acestuia. Videoclipurile YouTube sunt încărcate doar când alegi să le redai. Website-ul poate încărca fonturi și fotografii de pe domenii externe.</p></section>
 <section><h2 className="font-display text-2xl font-semibold">Contact privind datele</h2>
 <p className="mt-3">Pentru întrebări despre o cerere, corectarea sau ștergerea datelor comunicate firmei, scrie la <a className="underline" href={`mailto:${business.email}`}>{business.email}</a> sau sună la <a className="underline" href={business.phoneHref}>{business.phoneDisplay}</a>.</p></section>
 <p className="text-sm text-muted-foreground">Această informare descrie funcțiile implementate în website. O politică juridică completă necesită verificarea operațiunilor reale de prelucrare, a furnizorilor și a perioadelor de păstrare înainte de publicarea site-ului.</p>
 </div></section>}

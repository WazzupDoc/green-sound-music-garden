import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/confidentialitate")({
 head:()=>pageHead({
  title:"Confidențialitate | Green Sound Music Pitești",
  description:"Cum funcționează formularul de ofertă, preferința de lumină și redarea video pe website-ul Green Sound Music.",
  path:"/confidentialitate",
  jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Confidențialitate",path:"/confidentialitate"}])],
 }),
 component:Privacy,
});
function Privacy(){return <section className="rs-privacy">
 <div className="container-site">
  <p>Informare privind datele</p>
  <h1>Confidențialitate</h1>
  <div className="rs-privacy__copy">
   <section><h2>Operatorul datelor</h2>
    <p>Denumirea juridică: <strong>[DE COMPLETAT DE PROPRIETAR]</strong></p>
    <p>CUI: <strong>[DE COMPLETAT DE PROPRIETAR]</strong></p>
    <p>Adresă de contact: {business.address.street}, {business.address.city}, județul {business.address.region}.</p></section>
   <section><h2>Cererea de ofertă</h2>
    <p>Formularul generează local un mesaj pe care îl poți deschide în WhatsApp, în aplicația de email sau îl poți copia. Website-ul nu transmite automat cererea. Doar tu alegi dacă și unde expediezi mesajul.</p>
    <p>Sunt solicitate numele, telefonul și tipul evenimentului; opțional poți completa adresa de email, data, locația, numărul invitaților și serviciile dorite.</p></section>
   <section><h2>Preferințe vizuale</h2>
    <p>Dacă alegi o temperatură a luminii din controlul site-ului, aceasta este păstrată în browser prin localStorage, sub cheia <code>gsm-light</code>. Nu este o informație personală și poate fi eliminată din datele site-ului din browser.</p></section>
   <section><h2>Conținut extern</h2>
    <p>Videoclipurile YouTube folosesc youtube-nocookie și sunt încărcate după ce alegi explicit redarea. WhatsApp și serviciile de email sunt aplicații externe și aplică propriile politici.</p>
    <p>Fonturile interfeței sunt servite local din pachetele proiectului.</p></section>
   <section><h2>Contact și drepturi</h2>
    <p>Pentru solicitări privind datele comunicate, scrie la <a href={`mailto:${business.email}`}>{business.email}</a> sau sună la <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
    <p>Temeiurile juridice, destinatarii, perioadele de păstrare și datele juridice complete: <strong>[DE COMPLETAT DE PROPRIETAR ÎNAINTE DE PUBLICARE]</strong>.</p></section>
   <p className="rs-privacy__notice">Această informare descrie funcționalitățile website-ului. Conținutul juridic trebuie verificat și completat de operator înainte de publicare.</p>
  </div>
 </div>
 </section>}

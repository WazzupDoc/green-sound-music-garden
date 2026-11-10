import { createFileRoute, Link } from "@tanstack/react-router";
import { business } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/confidentialitate")({
  head: () => pageHead({
    title: "Confidențialitate și date de contact | Green Sound Music",
    description: "Informații despre utilizarea datelor din cererile de ofertă Green Sound Music și comunicarea prin email sau WhatsApp.",
    path: "/confidentialitate",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Confidențialitate", path: "/confidentialitate" }])],
  }),
  component: Page,
});

function Page() {
  return <section className="section min-h-screen pt-36">
    <div className="container-site max-w-4xl">
      <p className="eyebrow">Informații despre confidențialitate</p>
      <h1 className="display-xl mt-6">Cum funcționează cererea de ofertă.</h1>
      <div className="prose-site mt-12 space-y-7 leading-relaxed text-muted-foreground">
        <p>Formularul de pe acest website pregătește un mesaj și deschide WhatsApp sau aplicația de email aleasă de tine. Simplul fapt că apeși butonul din formular nu trimite mesajul către Green Sound Music: pentru expediere trebuie să confirmi trimiterea în aplicația deschisă.</p>
        <p>Poți introduce nume, număr de telefon, adresă de email, informații despre data și locația evenimentului și alte detalii pe care alegi să ni le comunici. Acestea sunt necesare pentru a discuta și pregăti o ofertă.</p>
        <p>Când alegi să contactezi Green Sound Music prin WhatsApp sau email, mesajul circulă și prin furnizorul acelui serviciu, potrivit regulilor și setărilor sale. Videoclipurile YouTube sunt încărcate doar când alegi să le redai.</p>
        <p>Pentru solicitări privind datele comunicate către Green Sound Music, ne poți scrie la <a className="text-primary underline underline-offset-4" href={"mailto:" + business.email}>{business.email}</a> sau suna la <a href={business.phoneHref} className="text-primary underline underline-offset-4">{business.phoneDisplay}</a>.</p>
        <p>Acest text explică funcționalitățile tehnice ale versiunii de preview. Înainte de publicare, documentația legală completă privind operatorul, temeiurile prelucrării, termenele de păstrare, drepturile persoanelor și cookie-urile trebuie validată de companie.</p>
        <Link to="/contact" className="inline-block border-b border-primary pb-2 text-primary">Înapoi la contact</Link>
      </div>
    </div>
  </section>;
}

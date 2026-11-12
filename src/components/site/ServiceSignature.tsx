import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { images, people, videos, type Service, type ServiceSlug } from "@/data/site";
import { VideoLite } from "./VideoLite";
import { BeamPhoto } from "./BeamPhoto";

function SectionLink({slug}: {slug:ServiceSlug}){
  return <Link to="/contact" className="rs-inline-link">
    Întreabă despre acest serviciu <ArrowUpRight size={18} aria-hidden />
  </Link>;
}

/**
 * Each offering uses its own real evidence and content arrangement.
 * Equipment/repertoire lists are read from verified project data, never invented.
 */
export function ServiceSignature({service:s}:{service:Service}){
  const list=s.sections.flatMap(item=>item.list??[]).slice(0,10);
  switch(s.slug){
    case "dj-mc":
      return <section className="rs-service-feature rs-service-feature--dj">
        <div className="container-site rs-service-feature__split">
          <div><p className="rs-service-feature__eyebrow">La pupitru și la microfon</p>
            <h2>Cine ține ritmul serii</h2>
            <div className="rs-service-feature__names">
              {people.filter(person=>person.role==="DJ"||person.role==="MC").map(person=>
                <div key={person.name}><span>{person.role}</span><strong>{person.name}</strong></div>)}
            </div>
            <p>Selecția muzicală și prezentarea momentelor se pregătesc împreună cu organizatorul.</p>
            <SectionLink slug={s.slug}/></div>
          <BeamPhoto image={images.dj} className="rs-service-feature__image"/>
        </div>
      </section>;
    case "trupa":
      return <section className="rs-service-feature rs-service-feature--trupa">
        <div className="container-site">
          <div className="rs-service-feature__head"><p className="rs-service-feature__eyebrow">Muzică live</p>
            <h2>Trupa, repertoriul și publicul</h2>
            <p>Spune-ne ce muzică îți dorești. Repertoriul și programul se stabilesc direct cu echipa, în funcție de eveniment.</p>
          </div>
          <div className="rs-service-feature__trupa-grid">
            <div>{s.videos.length>0?<VideoLite video={s.videos[0]!}/>:<BeamPhoto image={s.image}/>}</div>
            <div><h3>Ce discutăm înainte</h3><ol>{[
              "Genurile și piesele preferate","Momentele în care vrei muzică live",
              "Spațiul și sonorizarea necesară"
            ].map((item,index)=><li key={item}><span>{index+1}</span>{item}</li>)}</ol><SectionLink slug={s.slug}/></div>
          </div>
        </div>
      </section>;
    case "echipamente-de-sunet-si-lumini":
      return <section className="rs-service-feature rs-service-feature--tech">
        <div className="container-site">
          <div className="rs-service-feature__head"><p className="rs-service-feature__eyebrow">Sunet și lumini</p>
            <h2>Ce intră în montaj</h2><p>Echipamentul se stabilește după spațiu, tipul evenimentului și program, nu după un pachet fix.</p>
          </div>
          <div className="rs-service-feature__tech-layout">
            <BeamPhoto image={images.scena} className="rs-service-feature__image"/>
            <div><h3>Din oferta tehnică</h3>
              <ul>{(list.length?list:s.highlights.map(item=>item.title)).map(text=><li key={text}>{text}</li>)}</ul>
              <p>Modelele și cantitățile exacte: [DE COMPLETAT DE PROPRIETAR].</p>
              <SectionLink slug={s.slug}/></div>
          </div>
          <div className="gsx-service-visual gsx-service-visual--lights">
            <img src="/creative/v59/stage-lasers.webp" alt="" width={1120} height={630} loading="lazy" decoding="async"/>
            <div className="gsx-service-visual__copy">
              <span>SCENĂ / LUMINĂ / IMPACT</span>
              <strong>VEZI LUMINA ÎNAINTE<br/>SĂ ÎNCEAPĂ SHOW-UL.</strong>
              <p>Vizual artistic creat digital, pentru a ilustra o atmosferă scenică — nu un montaj documentat al firmei.</p>
              <Link to="/" hash="continut" className="gsx-service-visual__link">
                Intră în Show Control <ArrowUpRight size={20} aria-hidden/>
              </Link>
            </div>
          </div>
        </div>
      </section>;
    case "masina-fum-greu-cu-gheata-carbonica":
      return <section className="rs-service-feature rs-service-feature--effect">
        <div className="container-site">
          <div className="rs-service-feature__head"><p className="rs-service-feature__eyebrow">Efecte pentru momente precise</p>
            <h2>Fumul greu la dans sau la tort</h2><p>Momentul, spațiul și condițiile locației se discută înainte de alegerea efectului.</p></div>
          <div className="rs-service-feature__effect-layout">
            <VideoLite video={videos.fumGreu}/>
            <div><BeamPhoto image={images.fum}/><h3>Ce confirmăm înainte</h3>
              <p>Momentul utilizării, accesul la locație, condițiile de siguranță și compatibilitatea cu spațiul.</p>
              <SectionLink slug={s.slug}/></div>
          </div>
          <div className="gsx-service-visual gsx-service-visual--smoke">
            <img src="/creative/v59/live-lights.webp" alt="" width={1120} height={630} loading="lazy" decoding="async"/>
            <img className="gsx-service-visual__smoke" src="/creative/velvet-smoke.svg" alt="" aria-hidden="true" width={1920} height={800} loading="lazy"/>
            <div className="gsx-service-visual__copy">
              <span>EFECT VIZUAL / PROFUNZIME</span>
              <strong>FUMUL SCHIMBĂ<br/>TOT CADRUL.</strong>
              <p>Ilustrație scenică digitală. Filmarea de mai sus arată separat utilizarea reală a efectului.</p>
            </div>
          </div>
        </div>
      </section>;
    case "studio-inregistrari":
      return <section className="rs-service-feature rs-service-feature--studio">
        <div className="container-site">
          <div className="rs-service-feature__head"><p className="rs-service-feature__eyebrow">Studio de înregistrări</p>
            <h2>Producții publicate de Green Sound</h2>
            <p>Ascultă materialele publicate; pentru detalii despre o înregistrare nouă, contactează studioul.</p></div>
          <div className="rs-service-feature__studio-rail">
            {[videos.muzicaNeLeaga,videos.secretOfMyLife,videos.neatza].map(video=>
              <VideoLite key={video.id} video={video}/>)}
          </div>
        </div>
      </section>;
    case "ursitoare-botez":
      return <section className="rs-service-feature rs-service-feature--ursitoare">
        <div className="container-site rs-service-feature__split">
          <BeamPhoto image={images.ursitoare2} className="rs-service-feature__image"/>
          <div><p className="rs-service-feature__eyebrow">Pentru botez</p><h2>Momentul ursitoarelor</h2>
            <p>Un moment dedicat copilului și familiei. Detaliile scenariului, numărul de personaje și desfășurarea se discută înainte de eveniment.</p>
            <p>Scenariu și personaje exacte: [DE COMPLETAT DE PROPRIETAR].</p>
            <SectionLink slug={s.slug}/></div>
        </div>
      </section>;
    case "start-veselia":
      return <section className="rs-service-feature rs-service-feature--kids">
        <div className="container-site">
          <BeamPhoto image={images.copii} className="rs-service-feature__kids-photo"/>
          <div className="rs-service-feature__kids-text"><p className="rs-service-feature__eyebrow">Pentru cei mici</p>
            <h2>Start Veselia</h2><p>Animație și activități pentru copii, în cadrul petrecerilor și evenimentelor.</p>
            <p>Personajele disponibile pentru data ta: [DE COMPLETAT DE PROPRIETAR].</p>
            <SectionLink slug={s.slug}/></div>
        </div>
      </section>;
    case "hostess":
      return <section className="rs-service-feature rs-service-feature--hostess">
        <div className="container-site rs-service-feature__split">
          <div><p className="rs-service-feature__eyebrow">La sosirea invitaților</p>
            <h2>Primirea și îndrumarea invitaților</h2>
            <p>Discutăm dinainte punctul de acces, programul, sarcinile de întâmpinare și numărul de persoane necesar.</p>
            <SectionLink slug={s.slug}/></div>
          <BeamPhoto image={images.hostess} className="rs-service-feature__image"/>
        </div>
      </section>;
  }
}

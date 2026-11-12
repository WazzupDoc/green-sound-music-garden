import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useHydrated } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Play, Radio, SlidersHorizontal, Sparkles, Volume2 } from "lucide-react";
import { business, events, getService, images, videos, type EventSlug, type Video } from "@/data/site";

type Scene = {
  key: "concert"|"nunta"|"productie";
  label: string;
  eyebrow: string;
  description: string;
  image: {src:string;alt:string;w:number;h:number};
};
const SCENES: readonly Scene[] = [
  { key:"concert", label:"CONCERT", eyebrow:"PUBLICUL FACE ZGOMOT",
    description:"Scenă, lumină, sunet. Exact în ordinea în care trebuie să ajungă la public.",
    image:images.concert },
  { key:"nunta",label:"NUNTĂ",eyebrow:"PRIMUL DANS / ULTIMA PIESĂ",
    description:"O seară a voastră. Noi avem grijă ca fiecare moment să se audă și să se simtă.",
    image:{src:videos.nuntaRamada.poster ?? images.dj.src,alt:"Cadru real din filmarea Green Sound Music la o nuntă din Pitești",w:1280,h:720} },
  { key:"productie",label:"PRODUCȚIE",eyebrow:"DIN CULISE / PE SCENĂ",
    description:"De la montaj și cabluri până la spectacolul de lumină.",
    image:images.scena },
] as const;
const LIGHTS = [
  { id:"green",label:"VERDE",color:"#a6ff5f"},
  { id:"warm",label:"CALD",color:"#ffd3a0"},
  { id:"ice",label:"RECE",color:"#b7e9ff"},
] as const;
type Light = (typeof LIGHTS)[number]["id"];
const departments = [
  {label:"DJ / MC",kicker:"01 / RITM",description:"Cine ține firul serii, anunță momentele și citește ringul.",slug:"dj-mc" as const,image:images.dj},
  {label:"LIVE",kicker:"02 / ENERGIE",description:"Muzica live și prezența artiștilor, în mijlocul petrecerii.",slug:"trupa" as const,image:images.concert},
  {label:"TEHNICĂ",kicker:"03 / PUTERE",description:"Sunet, lumini, ecrane LED și efecte adaptate spațiului.",slug:"echipamente-de-sunet-si-lumini" as const,image:images.scena},
] as const;
const eventSlug:readonly EventSlug[]=["nunti","botezuri","evenimente-corporate","concerte-festivaluri","petreceri-private"];
const SCENE_ART=[
  "/creative/v59/live-lights.webp",
  "/creative/v59/event-moods.webp",
  "/creative/v59/stage-lasers.webp",
] as const;
const EFFECTS=[
  {tag:"01 / REFLECTOARE",name:"LUMINĂ",description:"Fascicule, contrast și culoare. Lumina schimbă întregul cadru, nu doar fundalul.",
    src:"/creative/v59/stage-lasers.webp",service:"echipamente-de-sunet-si-lumini" as const},
  {tag:"02 / ATMOSFERĂ",name:"FUM",description:"Volum în razele reflectoarelor. Fumul creează profunzime pentru scenă și momente speciale.",
    src:"/creative/v59/live-lights.webp",service:"masina-fum-greu-cu-gheata-carbonica" as const},
  {tag:"03 / MIȘCARE",name:"TRANZIȚII",description:"Treceri între atmosfere construite din lumină, textură și ritm vizual. Fără artificii care blochează navigarea.",
    src:"/creative/v59/sonic-waves.webp",service:"echipamente-de-sunet-si-lumini" as const},
] as const;


function StageControls({
  scene,setScene,light,setLight,fog,setFog,power,setPower
}:{
  scene:number;setScene:(n:number)=>void;
  light:Light;setLight:(n:Light)=>void;
  fog:boolean;setFog:(n:boolean)=>void;
  power:number;setPower:(n:number)=>void;
}){
  return <div className="gsx-console" aria-label="Pupitru interactiv de atmosferă">
    <div className="gsx-console__identity">
      <span className="gsx-console__live-dot" aria-hidden="true"/>
      <span>SHOW CONTROL <small>INTERACTIV</small></span>
    </div>
    <div className="gsx-console__group" role="group" aria-label="Alege scena">
      <span className="gsx-console__label">SCENA</span>
      <div className="gsx-console__buttons">
        {SCENES.map((item,i)=><button key={item.key} type="button"
          aria-pressed={scene===i} onClick={()=>setScene(i)}>{item.label}</button>)}
      </div>
    </div>
    <div className="gsx-console__group gsx-console__group--lights" role="group" aria-label="Temperatura luminii">
      <span className="gsx-console__label">LUMINĂ</span>
      <div className="gsx-console__swatches">
        {LIGHTS.map(item=><button key={item.id} type="button"
          style={{"--swatch":item.color} as CSSProperties}
          aria-label={`Lumină ${item.label.toLowerCase()}`}
          title={item.label} aria-pressed={light===item.id}
          onClick={()=>setLight(item.id)}><span/></button>)}
      </div>
    </div>
    <div className="gsx-console__group gsx-console__group--power">
      <label className="gsx-console__label" htmlFor="gsx-power">PUTERE <strong>{power}%</strong></label>
      <input id="gsx-power" type="range" min="15" max="100" step="5"
        value={power} onChange={event=>setPower(Number(event.currentTarget.value))}/>
    </div>
    <button className="gsx-console__fog" type="button"
      aria-pressed={fog} onClick={()=>setFog(!fog)}>
      <Sparkles aria-hidden size={17}/> FUM <strong>{fog?"ON":"OFF"}</strong>
    </button>
  </div>;
}

function Reel({video,poster}:{video:Video;poster:string}){
 const [play,setPlay]=useState(false);
 const params=new URLSearchParams({autoplay:"1",rel:"0"});
 if(video.start)params.set("start",String(video.start));
 return <div className="gsx-reel">
  {play?<iframe title={video.title} src={`https://www.youtube-nocookie.com/embed/${video.id}?${params}`}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>:
    <button type="button" onClick={()=>setPlay(true)} aria-label={`Redă ${video.title}`}>
      <img src={poster} alt="" width={1280} height={720} loading="lazy" decoding="async"/>
      <span className="gsx-reel__play"><Play size={32} fill="currentColor" aria-hidden/></span>
      <span className="gsx-reel__label">VIDEO REAL / APASĂ PLAY</span>
    </button>}
 </div>;
}

/** Distinct creative direction: the visitor controls actual stage atmosphere.
 * Generated SVG stage art remains abstract; real event photography is separate
 * and is never substituted by fabricated "portfolio" imagery.
 */
export function GreenShowHome(){
 const hydrated=useHydrated();
 const hero=useRef<HTMLElement>(null);
 const [scene,setScene]=useState(0);
 const [light,setLight]=useState<Light>("green");
 const [fog,setFog]=useState(true);
 const [power,setPower]=useState(65);
 const [activeDept,setActiveDept]=useState(0);
 const [activeEffect,setActiveEffect]=useState(0);
 const [visible,setVisible]=useState(true);
 const current=SCENES[scene]!;
 const dept=departments[activeDept]!;
 const primaryPoster=videos.showLumini.poster ?? `https://i.ytimg.com/vi/${videos.showLumini.id}/hqdefault.jpg`;
 useEffect(()=>{
   const el=hero.current;
   if(!el)return;
   const observer=new IntersectionObserver(([entry])=>setVisible(Boolean(entry?.isIntersecting)),{threshold:0});
   observer.observe(el);
   return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   if(reduced)return;
   const elements=document.querySelectorAll<HTMLElement>("[data-gsx-reveal]");
   const observer=new IntersectionObserver(entries=>{
     for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("gsx-is-visible");observer.unobserve(entry.target);}
   },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
   elements.forEach(e=>observer.observe(e));
   return()=>observer.disconnect();
 },[]);
 return <div className="gsx" data-hydrated={hydrated?"true":"false"} data-light={light}
    data-fog={fog?"on":"off"} data-active-scene={current.key} style={{"--gsx-power":power/100} as CSSProperties}>
   <section ref={hero} className="gsx-hero" aria-labelledby="gsx-title" data-visible={visible?"true":"false"}>
    <div className="gsx-hero__photo" key={current.key}>
      <img src={current.image.src} alt={current.image.alt} width={current.image.w} height={current.image.h}
        fetchPriority="high" decoding="async"/>
    </div>
    <img className="gsx-hero__aurora" src="/creative/stage-aurora.svg" alt="" aria-hidden="true" width={1920} height={1080}/>
    <img className="gsx-hero__generated" key={current.key} src={SCENE_ART[scene]}
       alt="" aria-hidden="true" width={1120} height={630} decoding="async"/>
    <div className="gsx-hero__dark" aria-hidden="true"/>
    <div className="gsx-hero__lights" aria-hidden="true"><span/><span/><span/></div>
    <div className="gsx-hero__smoke" aria-hidden="true"><img src="/creative/velvet-smoke.svg" alt="" width={1920} height={800}/></div>
    <div className="gsx-hero__topline">
      <span>SUNET / LUMINĂ / EMOȚIE</span><span>PI<span aria-hidden>·</span>TEȘTI / DIN 2008</span>
      <span>MUZICĂ + SCENĂ + LUMINĂ</span>
    </div>
    <div className="gsx-hero__main">
      <div className="gsx-hero__intro"><Radio aria-hidden size={19}/>
        <span>DIN CULISE DIRECT ÎN MIJLOCUL PETRECERII</span></div>
      <h1 id="gsx-title"><span>GREEN</span><span>SOUND</span><small>MUSIC</small></h1>
      <div className="gsx-hero__story">
        <div>
         <strong>Nu organizăm doar muzica.<br/>Construim atmosfera.</strong>
         <p>{current.description}</p>
         <p className="gs61-hero__service-line">DJ &amp; MC · Trupă live · Sonorizare · Lumini · Pitești / Argeș</p>
        </div>
        <Link to="/contact" className="gsx-pill">VREAU UN SHOW <ArrowUpRight aria-hidden size={21}/></Link>
      </div>
    </div>
    <div className="gsx-hero__counter" aria-live="polite">
      <span>{String(scene+1).padStart(2,"0")} / 03</span><strong>{current.eyebrow}</strong>
    </div>
    <StageControls scene={scene} setScene={setScene} light={light} setLight={setLight}
      fog={fog} setFog={setFog} power={power} setPower={setPower}/>
   </section>

   <div className="gsx-stripe" aria-label="Specializări Green Sound Music">
      <div className="gsx-stripe__running" aria-hidden="true">
        {Array.from({length:2}).map((_,i)=><span key={i}>MUSIC <b>✳</b> LIGHT <b>✳</b> LIVE <b>✳</b> SHOW <b>✳</b> MUSIC <b>✳</b> LIGHT <b>✳</b></span>)}
      </div>
   </div>

   <section className="gsx-manifest" aria-labelledby="gsx-manifest-title">
    <div className="gsx-manifest__graphic" aria-hidden="true">
      <img className="gsx-manifest__generated" src="/creative/v59/sonic-waves.webp" alt="" width={1120} height={630} loading="lazy"/>
      <img className="gsx-manifest__ribbon" src="/creative/sonic-ribbon.svg" alt="" width={1600} height={720} loading="lazy"/>
    </div>
    <div className="gsx-micro" data-gsx-reveal><span>01 / CINE SUNTEM</span><span>GREEN SOUND MUSIC · PITESTI</span></div>
    <div className="gsx-manifest__layout" data-gsx-reveal>
      <h2 id="gsx-manifest-title">CE SE VEDE<br/><em>ESTE SHOW.</em><br/>CE NU SE VEDE<br/><em>ESTE MUNCĂ.</em></h2>
      <p>Montaj. Probe. Sunet. Lumini. DJ, MC și artiști live. Lucrurile care fac un eveniment să curgă se pregătesc înainte ca primul invitat să intre în sală.</p>
    </div>
    <div className="gsx-manifest__link" data-gsx-reveal><span>DIN 2008, LA EVENIMENTE</span><Link to="/despre-noi">Cunoaște echipa <ArrowUpRight size={21} aria-hidden/></Link></div>
   </section>

   <section className="gsx-departments" aria-labelledby="gsx-departments-title">
     <div className="gsx-micro gsx-micro--dark" data-gsx-reveal><span>02 / DE CE AI NEVOIE?</span><span>TREI LUMI · O SINGURĂ ECHIPĂ</span></div>
     <header className="gsx-departments__top" data-gsx-reveal>
       <h2 id="gsx-departments-title">SEARA ARE<br/><i>MAI MULTE STRATURI.</i></h2>
       <p>Alege o parte din spectacol. Descoperi oamenii și tehnica din spatele ei.</p>
     </header>
     <div className="gsx-departments__stage">
      <div className="gsx-departments__media">
       <img key={dept.label} src={dept.image.src} alt={dept.image.alt} width={dept.image.w} height={dept.image.h}
         loading="lazy" decoding="async"/>
       <span className="gsx-departments__badge">{dept.kicker}</span>
      </div>
      <div className="gsx-departments__selector">
       {departments.map((item,i)=><button key={item.slug} type="button" onClick={()=>setActiveDept(i)}
         aria-pressed={activeDept===i}><span>0{i+1}</span><strong>{item.label}</strong><ArrowUpRight aria-hidden/></button>)}
       <div className="gsx-departments__selected" key={dept.label}>
        <p>{dept.description}</p>
        <Link to={`/${dept.slug}`}>Explorează {dept.label.toLowerCase()} <ArrowRight aria-hidden size={20}/></Link>
       </div>
      </div>
     </div>
     <div className="gsx-departments__all"><Link to="/servicii">TOATE SERVICIILE <ArrowUpRight aria-hidden size={20}/></Link></div>
   </section>


   <section className="gsx-effects" aria-labelledby="gsx-effects-title">
    <div className="gsx-micro gsx-effects__micro" data-gsx-reveal>
      <span>03 / SHOW VISUALS</span><span>ILUSTRAȚII SCENICE GENERATE ORIGINAL</span>
    </div>
    <div className="gsx-effects__visual" key={activeEffect}>
      <img src={EFFECTS[activeEffect]!.src} alt=""
        width={1120} height={630} loading="lazy" decoding="async"/>
      <div className="gsx-effects__veil" aria-hidden="true"/>
      <div className="gsx-effects__light" aria-hidden="true"/>
      <div className="gsx-effects__content">
       <p>{EFFECTS[activeEffect]!.tag}</p>
       <h2 id="gsx-effects-title">EFECTE CARE<br/><em>AU PREZENȚĂ.</em></h2>
       <strong>{EFFECTS[activeEffect]!.name}</strong>
       <span>{EFFECTS[activeEffect]!.description}</span>
       <Link to={`/${EFFECTS[activeEffect]!.service}`}>DESCOPERĂ SERVICIUL <ArrowUpRight aria-hidden size={20}/></Link>
      </div>
    </div>
    <div className="gsx-effects__tabs" role="group" aria-label="Explorează efectele scenice">
      {EFFECTS.map((effect,i)=><button key={effect.name} type="button" onClick={()=>setActiveEffect(i)}
        aria-pressed={activeEffect===i}>
        <small>0{i+1}</small><strong>{effect.name}</strong><ArrowUpRight aria-hidden size={20}/>
      </button>)}
    </div>
    <p className="gsx-effects__disclaimer">Vizualuri artistice generate pentru conceptul website-ului. Nu sunt fotografii din evenimente reale Green Sound Music.</p>
   </section>

   <section className="gsx-events" aria-labelledby="gsx-events-title">
    <div className="gsx-micro" data-gsx-reveal><span>04 / MOMENTE</span><span>NU EXISTĂ DOUĂ SERI IDENTICE</span></div>
    <div className="gsx-events__head" data-gsx-reveal>
      <h2 id="gsx-events-title">FIECARE<br/><em>ARE RITMUL EI.</em></h2>
      <p>Ce pregătim se schimbă de la eveniment la eveniment. Descoperă ce se potrivește cu al tău.</p>
    </div>
    <div className="gsx-events__lanes">
      {eventSlug.map((slug,i)=>{
       const event=events.find(e=>e.slug===slug)!;
       const portrait=slug==="nunti"?SCENES[1]!.image:event.image;
       return <Link key={slug} to="/evenimente/$slug" params={{slug}} className="gsx-event">
        <img src={portrait.src} alt={portrait.alt} width={portrait.w} height={portrait.h}
          loading="lazy" decoding="async"/>
        <span className="gsx-event__veil" aria-hidden/>
        <span className="gsx-event__no">0{i+1}</span>
        <strong>{event.name}</strong>
        <span className="gsx-event__arrow"><ArrowUpRight aria-hidden size={25}/></span>
       </Link>;
      })}
    </div>
   </section>

   <section className="gsx-film" aria-labelledby="gsx-film-title">
    <div className="gsx-film__heading" data-gsx-reveal>
      <p>05 / DIN EVENIMENTELE REALE</p>
      <h2 id="gsx-film-title">POȚI SĂ<br/><em>VEZI DIFERENȚA.</em></h2>
      <span>Clipurile sunt materiale publicate de Green Sound Music. Elementele scenice abstracte ale site-ului sunt ilustrații, nu fotografii de portofoliu.</span>
    </div>
    <Reel video={videos.showLumini} poster={primaryPoster}/>
    <div className="gsx-film__under"><span>SHOW DE LUMINI / GREEN SOUND MUSIC</span><Link to="/portofoliu">VEZI PORTOFOLIUL <ArrowUpRight aria-hidden size={20}/></Link></div>
   </section>

   <section className="gsx-last" aria-labelledby="gsx-last-title">
    <img src="/creative/sonic-ribbon.svg" width={1600} height={720} alt="" aria-hidden="true"/>
    <div className="gsx-last__heading" data-gsx-reveal>
      <span>ULTIMA PIESĂ ESTE A TA.</span>
      <h2 id="gsx-last-title">HAI SĂ FACEM<br/><em>ZGOMOT.</em></h2>
    </div>
    <div className="gsx-last__bottom">
      <p>Trimite data și locația. Pregătim împreună muzica, atmosfera și partea tehnică.</p>
      <Link to="/contact">CERE O OFERTĂ <ArrowUpRight size={26} aria-hidden/></Link>
      <a href={business.phoneHref}>SAU SUNĂ: {business.phoneDisplay}</a>
    </div>
   </section>
 </div>;
}

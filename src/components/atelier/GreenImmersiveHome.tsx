import { useRef, useState, type CSSProperties } from "react";
import { Link, useHydrated } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Play, SlidersHorizontal, Sparkles } from "lucide-react";
import { images, videos, events, business, type EventSlug } from "@/data/site";
import { StageLightEngine } from "@/components/site/StageLightEngine";
import { VideoLite } from "@/components/site/VideoLite";

type Theme = "live"|"wedding"|"production";
const scenes:{theme:Theme;number:string;title:string;note:string;image:{src:string;alt:string;w:number;h:number};color:string;event:EventSlug}[]=[
  {theme:"live",number:"01",title:"LIVE",note:"Scenă. Public. Energie.",image:images.concert,color:"#9CFFA9",event:"concerte-festivaluri"},
  {theme:"wedding",number:"02",title:"NUNTĂ",note:"Prima piesă. Ultimul dans.",image:{src:videos.nuntaRamada.poster??images.dj.src,alt:"Cadru autentic dintr-o nuntă Green Sound Music la Ramada Pitești",w:1280,h:720},color:"#FFE1A6",event:"nunti"},
  {theme:"production",number:"03",title:"SHOW",note:"Tot ce se pregătește în culise.",image:images.scena,color:"#AFD6FF",event:"evenimente-corporate"},
];
const chapters=[
  { number:"A",kind:"MUSIC",title:"Cine ține ritmul",copy:"DJ, MC și trupe care știu să transforme programul unei seri în muzică.", image:images.dj,slug:"dj-mc" as const },
  { number:"B",kind:"LIGHT",title:"Ce vede publicul",copy:"Moving head-uri, scene și ecrane LED. Lumina poate schimba felul în care simți aceeași piesă.",image:images.scena,slug:"echipamente-de-sunet-si-lumini" as const },
  { number:"C",kind:"MOMENTS",title:"Ce rămâne în amintire",copy:"Ursitoare, animație pentru copii, fum greu și momente pregătite la timpul lor.",image:images.ursitoare2,slug:"ursitoare-botez" as const },
];
const eventSet:readonly EventSlug[]=["nunti","botezuri","concerte-festivaluri","evenimente-corporate","petreceri-private"];

export function GreenImmersiveHome(){
 const hydrated=useHydrated();
 const [selected,setSelected]=useState(0);
 const [color,setColor]=useState<"jade"|"warm"|"ice">("jade");
 const [power,setPower]=useState(75);
 const [fog,setFog]=useState(true);
 const [chapter,setChapter]=useState(0);
 const [eventIndex,setEventIndex]=useState(0);
 const selectedScene=scenes[selected]!;
 const selectedChapter=chapters[chapter]!;
 const selectedEvent=events.find(x=>x.slug===eventSet[eventIndex])!;
 const portalRef=useRef<HTMLDivElement>(null);
 const colorValue=color==="jade"?"#A5FFA0":color==="warm"?"#FFD39F":"#B2DDFF";
 return <div className="v60" data-v60-hydrated={hydrated?"true":"false"} data-v60-scene={selectedScene.theme}
   data-v60-tone={color} data-v60-fog={fog?"on":"off"}>

   <section className="v60-hero" aria-labelledby="v60-title">
     <div className="v60-hero__left-strip" aria-hidden="true">MUSIC / EXPERIENCE / PRODUCTION · SINCE 2008</div>
     <div className="v60-hero__stage" ref={portalRef} style={{"--v60-theme":selectedScene.color} as CSSProperties}>
       <div className="v60-hero__stage-art">
         <img src="/creative/v59/stage-lasers.webp" alt="" width={1120} height={630}
           decoding="async" fetchPriority="high"/>
       </div>
       <div className="v60-hero__stage-photo" key={selectedScene.theme}>
         <img src={selectedScene.image.src} alt={selectedScene.image.alt} width={selectedScene.image.w}
           height={selectedScene.image.h} decoding="async" fetchPriority="high"/>
       </div>
       <div className="v60-hero__floor" aria-hidden="true"/>
       <StageLightEngine tint={colorValue} intensity={power/100} smoke={fog}/>
       <div className="v60-hero__halo" aria-hidden="true">
         <span className="v60-hero__halo-mark v60-hero__halo-mark--top">SHOW CONTROL / GREEN SOUND</span>
         <span className="v60-hero__halo-mark v60-hero__halo-mark--bottom">PITEȘTI · ROMÂNIA</span>
       </div>
       <img className="v60-hero__fog-texture" src="/creative/velvet-smoke.svg" alt="" aria-hidden="true" width={1920} height={800}/>
       <div className="v60-hero__stage-label"><span>LIVE SCENE</span><strong>{selectedScene.number} / 03</strong></div>
     </div>
     <div className="v60-hero__overline">
       <span>GREEN SOUND MUSIC</span><span>DIN 2008, PITEȘTI</span>
     </div>
     <div className="v60-hero__message">
       <div className="v60-hero__message-kicker"><span className="v60-hero__signal" aria-hidden="true"/> CULOAREA PETRECERII TALE</div>
       <h1 id="v60-title">NU ORGANIZĂM<br/><span>DOAR MUZICA.</span><br/><em>FACEM SHOW-UL.</em></h1>
       <p>DJ &amp; MC, trupe live, sonorizare, lumini și momente care fac seara să prindă viață.</p>
       <div className="v60-hero__actions">
         <Link to="/contact">Pregătim evenimentul tău <ArrowUpRight aria-hidden size={21}/></Link>
         <a href="#v60-journey">Descoperă atmosfera <ArrowDownRight aria-hidden size={21}/></a>
       </div>
     </div>
     <div className="v60-hero__console" aria-label="Experimentează cu luminile scenei">
       <div className="v60-hero__console-header">
         <SlidersHorizontal size={16} aria-hidden/><strong>STAGE CONTROL</strong>
         <span>DEMO INTERACTIV</span>
       </div>
       <div className="v60-hero__console-scenes" role="group" aria-label="Tip de spectacol">
         {scenes.map((scene,i)=><button key={scene.theme} type="button"
           aria-pressed={selected===i} onClick={()=>setSelected(i)}>
           <small>{scene.number}</small><strong>{scene.title}</strong>
           <span>{scene.note}</span></button>)}
       </div>
       <div className="v60-hero__console-fx">
         <div role="group" aria-label="Culoarea reflectoarelor" className="v60-tone">
           <span>LUMINĂ</span>
           {([{id:"jade",name:"verde",hex:"#9CFFA9"},{id:"warm",name:"caldă",hex:"#FFD39F"},{id:"ice",name:"rece",hex:"#AFD6FF"}] as const)
             .map(item=><button key={item.id} title={item.name} aria-label={`Lumină ${item.name}`} type="button"
               style={{"--tone-color":item.hex} as CSSProperties}
               aria-pressed={color===item.id} onClick={()=>setColor(item.id)}/>)}
         </div>
         <label className="v60-volume" htmlFor="v60-light-intensity">
           <span>INTENSITATE <b>{power}%</b></span>
           <input id="v60-light-intensity" type="range" min="20" max="100" step="5"
             value={power} onChange={e=>setPower(Number(e.currentTarget.value))}/>
         </label>
         <button type="button" className="v60-fog-toggle" aria-pressed={fog}
           onClick={()=>setFog(!fog)}><Sparkles size={17} aria-hidden/>
           FUM <b>{fog?"ON":"OFF"}</b></button>
       </div>
     </div>
     <div className="v60-hero__bottom-note"><span>FOTOGRAFII REALE + EFECTE SCENICE DIGITALE</span><span>DERULEAZĂ SĂ DESCOPERI <ArrowDownRight size={17} aria-hidden/></span></div>
   </section>

   <section className="v60-intro" id="v60-journey" aria-labelledby="v60-intro-title">
     <div className="v60-intro__orb" aria-hidden="true"><img src="/creative/v59/sonic-waves.webp" alt="" width={1120} height={630} loading="lazy"/></div>
     <span className="v60-index">ACT I / CE SE ÎNTÂMPLĂ ÎNAINTE</span>
     <div className="v60-intro__grid">
       <h2 id="v60-intro-title">ÎNAINTE SĂ SE<br/>APRINDĂ <em>LUMINILE.</em></h2>
       <div><span>01 / NOAPTEA ÎNCEPE DIN CULISE</span>
         <p>Fiecare seară are un ritm al ei. Noi pregătim sunetul, muzica și atmosfera înainte să ajungă primul invitat.</p>
         <Link to="/despre-noi">Cunoaște echipa <ArrowUpRight size={20} aria-hidden/></Link></div>
     </div>
   </section>

   <section className="v60-chapters" aria-labelledby="v60-chapters-title">
     <div className="v60-section-head">
       <span className="v60-index">ACT II / TREI ROLURI ÎN ACELAȘI SPECTACOL</span>
       <h2 id="v60-chapters-title">CE ADUCEM<br/><em>PE SCENĂ.</em></h2>
     </div>
     <div className="v60-chapters__content">
       <div className="v60-chapters__photo">
         <img key={selectedChapter.number} src={selectedChapter.image.src} alt={selectedChapter.image.alt}
           width={selectedChapter.image.w} height={selectedChapter.image.h} loading="lazy" decoding="async"/>
         <span className="v60-chapters__photo-note">{selectedChapter.kind} / ARHIVĂ GREEN SOUND</span>
       </div>
       <div className="v60-chapters__selections">
         {chapters.map((item,i)=><button key={item.number} type="button"
           aria-pressed={chapter===i} onClick={()=>setChapter(i)}>
           <span>{item.number} — {item.kind}</span>
           <strong>{item.title}</strong><ArrowUpRight size={26} aria-hidden/>
         </button>)}
         <div className="v60-chapters__selected">
           <p>{selectedChapter.copy}</p>
           <Link to={`/${selectedChapter.slug}`}>Descoperă serviciul <ArrowRight size={21} aria-hidden/></Link>
         </div>
       </div>
     </div>
     <Link className="v60-chapters__all" to="/servicii">
       VEZI TOATE SERVICIILE <ArrowUpRight aria-hidden size={20}/>
     </Link>
   </section>

   <section className="v60-moment" aria-labelledby="v60-moment-title">
     <img src="/creative/v59/event-moods.webp" width={1120} height={630} alt=""
       aria-hidden="true" loading="lazy" decoding="async"/>
     <div className="v60-moment__inside">
       <span className="v60-index">ACT III / ATMOSFERA</span>
       <h2 id="v60-moment-title">UN SINGUR<br/><em>MOMENT POATE</em><br/>SCHIMBA TOT.</h2>
       <p>La nunți, concerte sau petreceri, imaginea și sunetul trebuie să spună aceeași poveste.</p>
     </div>
   </section>

   <section className="v60-event-chooser" aria-labelledby="v60-events-title">
     <div className="v60-event-chooser__heading">
       <span className="v60-index">ACT IV / EVENIMENTUL TĂU</span>
       <h2 id="v60-events-title">ALEGE-ȚI<br/><em>SCENA.</em></h2>
       <p>Începe cu evenimentul. Îți arătăm ce servicii și momente putem pregăti.</p>
     </div>
     <div className="v60-event-chooser__main">
       <div className="v60-event-chooser__visual">
         <img key={selectedEvent.slug} src={selectedEvent.slug==="nunti"?(videos.nuntaRamada.poster??selectedEvent.image.src):selectedEvent.image.src}
           alt={selectedEvent.image.alt} width={selectedEvent.image.w}
           height={selectedEvent.image.h} loading="lazy" decoding="async"/>
         <div><span>EVENIMENT SELECTAT / 0{eventIndex+1}</span>
           <strong>{selectedEvent.name}</strong>
           <Link to="/evenimente/$slug" params={{slug:selectedEvent.slug}} viewTransition>
             Explorează evenimentul <ArrowUpRight size={22} aria-hidden/>
           </Link></div>
       </div>
       <div className="v60-event-chooser__menu" role="group" aria-label="Selectează tipul evenimentului">
         {eventSet.map((slug,i)=>{
           const e=events.find(it=>it.slug===slug)!;
           return <button key={slug} aria-pressed={eventIndex===i} type="button" onClick={()=>setEventIndex(i)}>
             <span>0{i+1}</span><strong>{e.name}</strong><ArrowRight size={20} aria-hidden/>
           </button>;
         })}
       </div>
     </div>
   </section>

   <section className="v60-film" aria-labelledby="v60-film-title">
     <div className="v60-film__intro">
       <span className="v60-index">ACT V / DIN ARHIVA REALĂ</span>
       <h2 id="v60-film-title">NU DOAR<br/>CĂ ARATĂ BINE.<br/><em>SE ȘI SIMTE.</em></h2>
       <p>O filmare spune mai mult decât o promisiune. Pornește un clip real Green Sound Music.</p>
     </div>
     <div className="v60-film__show">
       <VideoLite video={videos.showLumini}/>
       <div className="v60-film__tag"><span>SHOW / LUMINI</span><span>PORNEȘTE VIDEOCLIPUL <Play size={16} aria-hidden/></span></div>
     </div>
     <Link className="v60-film__more" to="/portofoliu">Intră în arhiva de evenimente <ArrowUpRight size={22} aria-hidden/></Link>
   </section>

   <section className="v60-final" aria-labelledby="v60-final-title">
     <div className="v60-final__ribbon" aria-hidden="true">
       <img src="/creative/sonic-ribbon.svg" width={1600} height={720} alt=""/>
     </div>
     <span className="v60-index">FINAL / DAR NU ULTIMUL DANS</span>
     <h2 id="v60-final-title">CÂND SE<br/>APRIND LUMINILE,<br/><em>NE VEDEM ACOLO.</em></h2>
     <div className="v60-final__links">
       <p>Tu ne spui data și locația. Noi discutăm muzica, luminile și oamenii potriviți.</p>
       <Link to="/contact">Cere o ofertă <ArrowUpRight size={26} aria-hidden/></Link>
       <a href={business.phoneHref}>Sună: {business.phoneDisplay}</a>
     </div>
   </section>
 </div>;
}

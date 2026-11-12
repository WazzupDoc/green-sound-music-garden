import { useState, type CSSProperties } from "react";
import { Link, useHydrated } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Play, Volume2 } from "lucide-react";
import { business, events, images, services, videos, type EventSlug, type Video } from "@/data/site";

type Scene = { name: string; kicker: string; note: string; slug: EventSlug; image: {src:string;alt:string;w:number;h:number}; color: string; };
const scenes: readonly Scene[] = [
  { name:"Concerte", kicker:"01 / ENERGIE", note:"Public, scenă, sunet și lumini într-un singur loc.", slug:"concerte-festivaluri", image:images.concert, color:"#aeeeff" },
  { name:"Nunți", kicker:"02 / EMOȚIE", note:"De la primul dans până la ultima piesă.", slug:"nunti", image:{src:videos.nuntaRamada.poster ?? images.dj.src,alt:"Cadru din filmarea de nuntă Green Sound Music la Ramada Pitești",w:1280,h:720}, color:"#f3b7cd" },
  { name:"Botezuri", kicker:"03 / BUCURIE", note:"Muzică, ursitoare și momente speciale.", slug:"botezuri", image:images.ursitoare2, color:"#e5d4a3" },
  { name:"Copii", kicker:"04 / JOACĂ", note:"Start Veselia pentru cei mici.", slug:"petreceri-private", image:images.copii, color:"#d1ee93" },
];

const tech = [
  { name:"Sunet", small:"SE AUDE", summary:"Dinainte de primul invitat. Sistemul audio se alege după spațiu și program.", image:images.concert },
  { name:"Lumini", small:"SE VEDE", summary:"Moving head-uri, lumină de scenă și atmosferă pentru ring.", image:images.scena },
  { name:"Ecrane LED", small:"SE PREZINTĂ", summary:"Ecrane pentru conferințe, lansări și concerte, adaptate spațiului.", image:images.concert },
  { name:"Fum greu", small:"SE SIMTE", summary:"Efectul de fum greu pentru dansul mirilor și momentele speciale.", image:images.fum },
] as const;

const films: readonly { name:string; description:string; video:Video; poster:string; }[] = [
  {name:"Show de lumini",description:"DJ, MC și lumină de spectacol.",video:videos.showLumini,poster:videos.showLumini.poster ?? `https://i.ytimg.com/vi/${videos.showLumini.id}/hqdefault.jpg`},
  {name:"Nuntă la Ramada",description:"Muzică și momente reale din Pitești.",video:videos.nuntaRamada,poster:videos.nuntaRamada.poster ?? `https://i.ytimg.com/vi/${videos.nuntaRamada.id}/hqdefault.jpg`},
  {name:"Green Sound în studio",description:"Din studio și de pe scena TV.",video:videos.neatza,poster:videos.neatza.poster ?? `https://i.ytimg.com/vi/${videos.neatza.id}/hqdefault.jpg`},
];

function FilmPlayer({ video, poster }: {video:Video;poster:string}) {
  const [play,setPlay] = useState(false);
  const params = new URLSearchParams({autoplay:"1",rel:"0"});
  if (video.start) params.set("start", String(video.start));
  return <div className="go-film-player">
    {play ? <iframe
      title={video.title}
      src={`https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    /> :
    <button type="button" className="go-film-player__play" onClick={()=>setPlay(true)}
      aria-label={`Redă filmarea: ${video.title}`}>
      <img src={poster} alt="" width={1280} height={720} loading="lazy" decoding="async"/>
      <span className="go-film-player__overlay"/>
      <span className="go-film-player__circle"><Play fill="currentColor" size={25} aria-hidden /></span>
      <span className="go-film-player__hint">PORNEȘTE FILMAREA</span>
    </button>}
  </div>;
}

export function OpenHouseHome() {
  const hydrated = useHydrated();
  const [active,setActive] = useState(0);
  const [techTab,setTechTab] = useState(0);
  const [filmTab,setFilmTab] = useState(0);
  const [filmRestart,setFilmRestart] = useState(0);
  const selectedFilm = films[filmTab]!;
  const selectedTech = tech[techTab]!;
  const totalServices = services.length;
  return <div className="go-2026" data-hydrated={hydrated ? "true" : "false"}>
    <section className="go-intro" aria-labelledby="go-title">
      <div className="go-intro__top">
        <span className="go-coordinate">PITEȘTI · ARGEȘ</span>
        <span className="go-coordinate">GREEN SOUND MUSIC · DIN 2008</span>
      </div>
      <div className="go-intro__heading">
        <div className="go-intro__headline">
          <span className="go-intro__asterisk" aria-hidden="true">✳</span>
          <h1 id="go-title">O SEARĂ.<br/><i>O MIE DE STĂRI.</i></h1>
        </div>
        <div className="go-intro__right">
          <p>Muzica, luminile și oamenii care țin petrecerea în mișcare. Alege o scenă și vezi ce pregătim.</p>
          <a href="#alege-scena" className="go-plainlink">Explorează scenele <ArrowDownRight size={22} aria-hidden/></a>
        </div>
      </div>
    </section>

    <section className="go-scenes" id="alege-scena" aria-label="Alege atmosfera evenimentului">
      <div className="go-scenes__label"><span>INTRĂ ÎN ATMOSFERĂ</span><span>SELECTEAZĂ O SCENĂ ↘</span></div>
      <div className="go-scenes__rail">
        {scenes.map((scene,i)=><article key={scene.kicker}
          className="go-scene" data-active={i===active}
          style={{"--go-scene-accent":scene.color} as CSSProperties}>
          <img src={scene.image.src} alt={scene.image.alt} width={scene.image.w} height={scene.image.h}
            loading={i===0?"eager":"lazy"} fetchPriority={i===0?"high":"auto"} decoding="async"/>
          <div className="go-scene__shade" aria-hidden="true"/>
          <button className="go-scene__select" type="button" onClick={()=>setActive(i)}
            aria-pressed={i===active} aria-label={`Selectează scena ${scene.name}`}/>
          <div className="go-scene__content">
            <p className="go-scene__kicker">{scene.kicker}</p>
            <div className="go-scene__bottom">
              <h2>{scene.name}</h2>
              <p className="go-scene__note">{scene.note}</p>
              <Link className="go-scene__link" to="/evenimente/$slug" params={{slug:scene.slug}}>
                Vezi evenimentul <ArrowUpRight size={20} aria-hidden/>
              </Link>
            </div>
          </div>
        </article>)}
      </div>
      <div className="go-scenes__after">
        <span>04 ATMOSFERE / O SINGURĂ ECHIPĂ</span>
        <Link to="/evenimente">Descoperă toate evenimentele <ArrowUpRight size={18} aria-hidden /></Link>
      </div>
    </section>

    <section className="go-manifest" aria-labelledby="go-manifest-title">
      <div className="go-manifest__label">GREEN SOUND / CE FACEM NOI</div>
      <h2 id="go-manifest-title">Nu venim doar<br/>cu muzica.<span> Venim cu tot ce face seara să funcționeze.</span></h2>
      <div className="go-manifest__row">
        <p>DJ &amp; MC · Trupă live · Sunet · Lumini · Ecrane LED · Fum greu · Ursitoare · Animație pentru copii</p>
        <Link to="/servicii" className="go-button-line">Descoperă cele {totalServices} servicii <ArrowUpRight aria-hidden size={22}/></Link>
      </div>
    </section>

    <section className="go-tech" aria-labelledby="go-tech-title">
      <div className="go-tech__visual">
        <img key={techTab} src={selectedTech.image.src} alt={selectedTech.image.alt}
          width={selectedTech.image.w} height={selectedTech.image.h}
          loading="lazy" decoding="async"/>
        <div className="go-tech__corner">
          <span>GREEN SOUND / PRODUCȚIE</span>
          <Volume2 size={26} aria-hidden/>
        </div>
        <div className="go-tech__counter">0{techTab+1} / 04</div>
      </div>
      <div className="go-tech__panel">
        <p className="go-tech__overline">DIN CULISE / PE SCENĂ</p>
        <div className="go-tech__content">
          <h2 id="go-tech-title">TOTUL SE<br/><em>POTRIVEȘTE.</em></h2>
          <p>Patru moduri în care construim atmosfera unui eveniment.</p>
          <div className="go-tech__tabs" role="group" aria-label="Explorează echipamentele și efectele">
            {tech.map((item,i)=><button type="button" key={item.name} onClick={()=>setTechTab(i)}
              aria-pressed={techTab===i}>
              <span>0{i+1}</span><strong>{item.name}</strong><ArrowUpRight aria-hidden size={18}/>
            </button>)}
          </div>
          <p className="go-tech__detail">{selectedTech.summary}</p>
          <Link to="/echipamente-de-sunet-si-lumini" className="go-button-line">
            Vezi partea tehnică <ArrowRight aria-hidden size={19}/>
          </Link>
        </div>
      </div>
    </section>

    <section className="go-cinema" aria-labelledby="go-cinema-title">
      <header className="go-cinema__header">
        <div>
          <p>DIN ARHIVA GREEN SOUND</p>
          <h2 id="go-cinema-title">MAI BINE<br/><em>VEZI.</em></h2>
        </div>
        <Link to="/portofoliu" className="go-button-line">
          Tot portofoliul <ArrowUpRight size={20} aria-hidden/>
        </Link>
      </header>
      <div className="go-cinema__body">
        <div className="go-cinema__screen">
          <FilmPlayer key={filmRestart} video={selectedFilm.video} poster={selectedFilm.poster}/>
          <div className="go-cinema__caption">
            <span>FILM 0{filmTab+1} / 03</span><strong>{selectedFilm.name}</strong>
          </div>
        </div>
        <div className="go-cinema__playlist">
          <p className="go-cinema__playlist-top">ALEGE UN FILM</p>
          {films.map((film,i)=><button type="button" key={film.video.id}
            aria-pressed={filmTab===i} onClick={()=>{
              setFilmTab(i);setFilmRestart(n=>n+1);
            }}>
            <span>0{i+1}</span>
            <span className="go-cinema__playlist-copy"><strong>{film.name}</strong><small>{film.description}</small></span>
            <ArrowUpRight size={18} aria-hidden/>
          </button>)}
          <div className="go-cinema__playlist-end">
            Clipuri reale publicate de Green Sound Music. Redarea pornește numai la cererea ta.
          </div>
        </div>
      </div>
    </section>

    <section className="go-contact" aria-labelledby="go-contact-title">
      <div className="go-contact__lead">
        <p>URMĂTORUL EVENIMENT?</p>
        <span aria-hidden="true">✳</span>
      </div>
      <h2 id="go-contact-title">NE VEDEM<br/><em>PE RING.</em></h2>
      <div className="go-contact__bottom">
        <p>Data, locația și ce ți-ai dori să se întâmple. De aici preluăm noi.</p>
        <div className="go-contact__actions">
          <Link to="/contact">Solicită o ofertă <ArrowUpRight size={25} aria-hidden/></Link>
          <a href={business.phoneHref}>Sună-ne: {business.phoneDisplay} <ArrowUpRight size={18} aria-hidden/></a>
        </div>
      </div>
    </section>
  </div>;
}

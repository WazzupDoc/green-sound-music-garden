import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { images, videos, type ImageRef, type Video } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { VideoLite } from "@/components/site/VideoLite";

export const galleryFrames: ReadonlyArray<{ id:string; title:string; group:"muzica"|"tehnica"|"oameni"; image:ImageRef; context:string }> = [
  { id:"concert", title:"În fața scenei", group:"muzica", image:images.concert, context:"Concert și public" },
  { id:"dj", title:"În ritmul petrecerii", group:"muzica", image:images.dj, context:"DJ & MC" },
  { id:"scena", title:"Lumina pe scenă", group:"tehnica", image:images.scena, context:"Sonorizare și lumini" },
  { id:"ursitoare", title:"La botez", group:"oameni", image:images.ursitoare2, context:"Ursitoare" },
  { id:"hostess", title:"Primirea invitaților", group:"oameni", image:images.hostess, context:"Hostess" },
  { id:"copii", title:"Programul copiilor", group:"oameni", image:images.copii, context:"Start Veselia" },
];
const photoFilters = [
  {id:"toate",label:"Toate"},
  {id:"muzica",label:"Muzică"},
  {id:"tehnica",label:"Tehnică"},
  {id:"oameni",label:"Oameni"},
] as const;
type PhotoFilter = (typeof photoFilters)[number]["id"];

export function RegiaPhotoRail({ activePhoto }: { activePhoto:string|undefined }) {
  const navigate = useNavigate();
  const [filter,setFilter] = useState<PhotoFilter>("toate");
  const frames = galleryFrames.filter(frame => filter === "toate" || frame.group === filter);
  const selected = galleryFrames.find(item => item.id === activePhoto);
  const selectedIndex = selected ? galleryFrames.findIndex(item => item.id === selected.id) : -1;
  const previousPhoto = selectedIndex >= 0 ? galleryFrames[(selectedIndex - 1 + galleryFrames.length) % galleryFrames.length] : undefined;
  const nextPhoto = selectedIndex >= 0 ? galleryFrames[(selectedIndex + 1) % galleryFrames.length] : undefined;
  const pointerX = useRef<number | null>(null);
  const lastPhotoRef = useRef<string | null>(null);
  if (selected) lastPhotoRef.current = selected.id;
  const change = (id?:string) => {
    void navigate({to:"/portofoliu",search:id?{photo:id}:{},replace:true,resetScroll:false});
  };
  const step = (delta:number) => {
    if(!selected)return;
    const pos=galleryFrames.findIndex(x=>x.id===selected.id);
    change(galleryFrames[(pos+delta+galleryFrames.length)%galleryFrames.length]!.id);
  };
  useEffect(() => {
    if (!selected) return;
    const key=(event:KeyboardEvent) => {
      const target = event.target;
      // Never steal arrow keys from editable controls or another dialog.
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
          (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role=slider], [role=spinbutton]")))) return;
      if(event.key==="ArrowRight" || event.key==="ArrowLeft"){
        event.preventDefault();
        const pos=galleryFrames.findIndex(item=>item.id===activePhoto);
        const delta=event.key==="ArrowRight"?1:-1;
        const next=galleryFrames[(pos+delta+galleryFrames.length)%galleryFrames.length];
        if(next)void navigate({to:"/portofoliu",search:{photo:next.id},replace:true,resetScroll:false});
      }
    };
    const dialog = document.querySelector(".rs-photo-dialog");
    if (!dialog) return;
    dialog.addEventListener("keydown", key as EventListener);
    return()=>dialog.removeEventListener("keydown", key as EventListener);
  },[activePhoto,selected,navigate]);
  return (
    <section className="rs-gallery" id="portfolio-photos" aria-labelledby="rs-gallery-title">
      <div className="container-site">
        <div className="rs-gallery__top">
          <div><p>Fotografii reale</p><h2 id="rs-gallery-title" tabIndex={-1}>Oameni, scenă și lumină</h2></div>
          <p>Cadre din arhiva Green Sound Music. Selectează fotografia pentru a o vedea integral.</p>
        </div>
        <div role="group" className="rs-gallery__filters" aria-label="Filtrează fotografiile">
          {photoFilters.map(option=><button type="button" key={option.id}
            aria-pressed={filter===option.id} onClick={()=>setFilter(option.id)}>{option.label}</button>)}
        </div>
        <div className="rs-gallery__rail" aria-label="Fotografii Green Sound Music">
          {frames.map((frame,index)=>(
            <Link key={frame.id} to="/portofoliu" search={{photo:frame.id}}
              data-photo-id={frame.id}
              className={`rs-gallery__frame rs-gallery__frame--${index%3}`}
              aria-label={`Deschide fotografia: ${frame.title}`}>
              <BeamPhoto image={frame.image} className="rs-gallery__media" transitionName={`gs-photo-${frame.id}`} />
              <span className="rs-gallery__label"><small>{frame.context}</small><strong>{frame.title}</strong></span>
            </Link>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={opened=>{if(!opened)change(undefined)}}>
        <DialogContent onCloseAutoFocus={event => {
          // Restore keyboard focus to the originating thumbnail when it is still visible.
          // Deep-linked photos or filtered-out thumbnails fall back to the gallery heading.
          event.preventDefault();
          const thumbnail = Array.from(document.querySelectorAll<HTMLAnchorElement>(".rs-gallery__frame"))
            .find(link => link.dataset["photoId"] === lastPhotoRef.current);
          if (thumbnail) thumbnail.focus();
          else document.getElementById("rs-gallery-title")?.focus();
        }} className="rs-photo-dialog max-h-[95dvh] w-[min(96vw,1200px)] max-w-none overflow-y-auto rounded-none border-[#F3F0E950] bg-[#0A0F15] p-4 sm:p-6">
          <DialogTitle className="text-xl font-semibold text-[#F3F0E9]">{selected?.title ?? "Fotografie"}</DialogTitle>
          <DialogDescription className="text-base text-[#B8BCB9]">
            {selected?.context ?? "Arhiva Green Sound Music"}. Folosește săgețile sau glisează pentru a naviga.
          </DialogDescription>
          {selected && <>
            <div className="rs-photo-dialog__media"
              onTouchStart={event=>{pointerX.current=event.touches[0]?.clientX??null}}
              onTouchEnd={event=>{
                const end=event.changedTouches[0]?.clientX;
                if(pointerX.current!==null && end!==undefined && Math.abs(end-pointerX.current)>55){
                  step(end<pointerX.current?1:-1);
                }
                pointerX.current=null;
              }}>
              <img src={selected.image.src} width={selected.image.w} height={selected.image.h}
                alt={selected.image.alt} decoding="async" />
            </div>
            <div className="rs-photo-dialog__actions">
              <button type="button" onClick={()=>step(-1)} aria-label={`Fotografia anterioară: ${previousPhoto?.title ?? ""}`}><ArrowLeft size={20} aria-hidden /> Anterior</button>
              <span role="status" aria-live="polite" aria-atomic="true">{selectedIndex + 1} din {galleryFrames.length}: {selected.title}</span>
              <button type="button" onClick={()=>step(1)} aria-label={`Fotografia următoare: ${nextPhoto?.title ?? ""}`}>Următor <ArrowRight size={20} aria-hidden /></button>
            </div>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  );
}
const filmCategories=[
  {label:"Toate",tag:""},
  {label:"Nunți",tag:"nunti"},
  {label:"DJ & MC",tag:"dj-mc"},
  {label:"Studio",tag:"studio"},
  {label:"Efecte",tag:"fum-greu"},
] as const;
const videoList: Video[] = Object.values(videos);

export function RegiaFilmArchive({film}: {film:string|undefined}) {
  const [category,setCategory]=useState<string>("");
  useEffect(()=>{ if(film) setCategory(""); },[film]);
  const selectedVideos=videoList.filter(v=>!category||v.tags.includes(category));
  const chosen=selectedVideos.find(v=>v.id===film)??selectedVideos[0];
  return <section className="rs-video-library" id="portfolio-films" aria-labelledby="rs-video-library-title">
    <div className="container-site">
      <div className="rs-video-library__top">
        <div><p>Filmări publicate</p><h2 id="rs-video-library-title">Vezi și ascultă producțiile</h2></div>
        <p>Filmările sunt încărcate de pe YouTube doar după ce apeși redare. Nu pornește nimic automat.</p>
      </div>
      <div role="group" className="rs-video-library__filters" aria-label="Filtrează videoclipurile">
        {filmCategories.map(item=><button type="button" key={item.label} aria-pressed={category===item.tag}
          onClick={()=>setCategory(item.tag)}>{item.label}</button>)}
      </div>
      <div className="rs-video-library__layout">
        <div className="rs-video-library__player">
          {chosen && <VideoLite key={chosen.id} video={chosen} />}
        </div>
        <div className="rs-video-library__list" role="group" aria-label="Alege filmarea">
          {selectedVideos.map((video,index)=>(
            <Link key={video.id} to="/portofoliu" search={{film:video.id}}
              aria-current={chosen?.id===video.id?"true":undefined}
              className="rs-video-library__item">
              <span>{String(index+1).padStart(2,"0")}</span>
              <strong>{video.title}</strong>
              <ArrowUpRight size={19} aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>;
}

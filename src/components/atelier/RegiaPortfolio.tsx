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
  const selected = galleryFrames.find(item => item.id === activePhoto);
  // A direct photo URL outside the active category must remain reachable.
  const visibleFilter = selected && filter !== "toate" && selected.group !== filter ? "toate" : filter;
  const frames = galleryFrames.filter(frame => visibleFilter === "toate" || frame.group === visibleFilter);
  const selectedIndex = selected ? frames.findIndex(item => item.id === selected.id) : -1;
  const previousPhoto = selectedIndex >= 0 ? frames[(selectedIndex - 1 + frames.length) % frames.length] : undefined;
  const nextPhoto = selectedIndex >= 0 ? frames[(selectedIndex + 1) % frames.length] : undefined;
  const pointerX = useRef<number | null>(null);
  const lastPhotoRef = useRef<string | null>(null);
  // Only a user-activated thumbnail establishes a focus-return target.
  // Direct URLs have no originating thumbnail: close returns to the gallery heading.
  const change = (id?:string) => {
    void navigate({to:"/portofoliu",search:id?{photo:id}:{},replace:true,resetScroll:false});
  };
  const step = (delta:number) => {
    if(!selected)return;
    const pos=frames.findIndex(x=>x.id===selected.id);
    const next=frames[(pos+delta+frames.length)%frames.length];
    if(next)change(next.id);
  };
  useEffect(() => {
    if (!selected) return;
    const key=(event:KeyboardEvent) => {
      const target = event.target;
      // Never steal arrow keys from editable controls or another dialog.
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
          (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role=slider], [role=spinbutton]")))) return;
      if(["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)){
        event.preventDefault();
        const pos=frames.findIndex(item=>item.id===activePhoto);
        const delta=event.key==="ArrowRight"?1:-1;
        const next = event.key === "Home" ? frames[0] : event.key === "End" ? frames[frames.length - 1] : frames[(pos+delta+frames.length)%frames.length];
        if(next)void navigate({to:"/portofoliu",search:{photo:next.id},replace:true,resetScroll:false});
      }
    };
    const dialog = document.querySelector(".rs-photo-dialog");
    if (!dialog) return;
    dialog.addEventListener("keydown", key as EventListener);
    return()=>dialog.removeEventListener("keydown", key as EventListener);
  },[activePhoto,selected,navigate,frames]);
  return (
    <section className="rs-gallery" id="portfolio-photos" aria-labelledby="rs-gallery-title">
      <div className="container-site">
        <div className="rs-gallery__top">
          <div><p>Fotografii reale</p><h2 id="rs-gallery-title" tabIndex={-1}>Oameni, scenă și lumină</h2></div>
          <p>Cadre din arhiva Green Sound Music. Selectează fotografia pentru a o vedea integral.</p>
        </div>
        <div role="group" className="rs-gallery__filters" aria-label="Filtrează fotografiile">
          {photoFilters.map(option=><button type="button" key={option.id}
            aria-pressed={visibleFilter===option.id} onClick={()=>setFilter(option.id)}>{option.label}</button>)}
        </div>
        <div className="rs-gallery__rail" aria-label="Fotografii Green Sound Music">
          {frames.map((frame,index)=>(
            <Link key={frame.id} to="/portofoliu" search={{photo:frame.id}}
              data-photo-id={frame.id}
              onClick={()=>{lastPhotoRef.current=frame.id}}
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
            .find(link => link.dataset['photoId'] === lastPhotoRef.current);
          if (thumbnail) thumbnail.focus();
          else document.getElementById("rs-gallery-title")?.focus();
          lastPhotoRef.current = null;
        }} className="rs-photo-dialog max-h-[95dvh] w-[min(96vw,1200px)] max-w-none overflow-y-auto rounded-none border-[#F3F0E950] bg-[#0A0F15] p-4 sm:p-6">
          <DialogTitle className="text-xl font-semibold text-[#F3F0E9]">{selected?.title ?? "Fotografie"}</DialogTitle>
          <DialogDescription className="text-base text-[#B8BCB9]">
            {selected?.context ?? "Arhiva Green Sound Music"}. Folosește săgețile, Home/End sau glisează pentru a naviga.
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
              <span role="status" aria-live="polite" aria-atomic="true">{selectedIndex + 1} din {frames.length}: {selected.title}</span>
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
  const navigate = useNavigate();
  const [category,setCategory]=useState<string>("");
  const selectCategory = (tag:string) => {
    setCategory(tag);
    const firstMatching = videoList.find(video => !tag || video.tags.includes(tag));
    // Keep the shareable URL in sync with the player shown after filtering.
    void navigate({to:"/portofoliu",search:firstMatching?{film:firstMatching.id}:{},replace:true,resetScroll:false});
  };
  // URL navigation can select a film outside the previous local category.
  // Derive a visible category instead of resetting state in an effect (which
  // could race with a filter click before the router updates the URL).
  const visibleCategory = film && category && !videoList.some(v=>v.id===film && v.tags.includes(category)) ? "" : category;
  const selectedVideos=videoList.filter(v=>!visibleCategory||v.tags.includes(visibleCategory));
  const chosen=selectedVideos.find(v=>v.id===film)??selectedVideos[0];
  return <section className="rs-video-library" id="portfolio-films" aria-labelledby="rs-video-library-title">
    <div className="container-site">
      <div className="rs-video-library__top">
        <div><p>Filmări publicate</p><h2 id="rs-video-library-title">Vezi și ascultă producțiile</h2><p role="status" aria-live="polite" aria-atomic="true">{chosen ? `Selectat: ${chosen.title} · ${selectedVideos.findIndex(video => video.id === chosen.id) + 1} din ${selectedVideos.length}` : "Nicio filmare în această categorie"}</p></div>
        <p>Filmările sunt încărcate de pe YouTube doar după ce apeși redare. Nu pornește nimic automat.</p>
      </div>
      <div role="group" className="rs-video-library__filters" aria-label="Filtrează videoclipurile">
        {filmCategories.map(item=><button type="button" key={item.label} aria-pressed={visibleCategory===item.tag}
          onClick={()=>selectCategory(item.tag)}>{item.label}</button>)}
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

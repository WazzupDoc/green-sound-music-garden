/* Green Sound Music V14 — small progressive-enhancement script. No libraries. */
(() => {
  "use strict";
  const doc = document;
  const root = doc.documentElement;
  const qs = (s,p=doc)=>p.querySelector(s);
  const qsa = (s,p=doc)=>[...p.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const topbar = qs(".topbar");
  const menuBtn = qs(".topbar__menu");
  const menu = qs(".mobile-nav");
  const updateTopbar = () => topbar?.classList.toggle("is-scrolled",scrollY>28);
  addEventListener("scroll",updateTopbar,{passive:true});
  updateTopbar();
  if (menuBtn && menu) {
    const toggle = (state) => {
      const open = Boolean(state);
      menu.classList.toggle("open",open);
      topbar?.classList.toggle("menu-open",open);
      menuBtn.setAttribute("aria-expanded",String(open));
      menuBtn.setAttribute("aria-label",open?"Închide meniul":"Deschide meniul");
      menuBtn.textContent=open?"✕":"☰";
      if(open) qs("a",menu)?.focus();
    };
    menuBtn.addEventListener("click",()=>toggle(!menu.classList.contains("open")));
    qsa("a",menu).forEach(a=>a.addEventListener("click",()=>toggle(false)));
    addEventListener("keydown",event=>{if(event.key==="Escape")toggle(false)});
    addEventListener("resize",()=>{if(innerWidth>990)toggle(false)});
  }
  const hero = qs(".hero[data-mood]");
  if (hero) {
    const photo = qs(".hero__photo img",hero);
    const moods = qsa(".mood[data-mood]",hero);
    const sources = {
      concert: {
        src:"https://green-sound-music-garden.lovable.app/__l5e/assets-v1/1abc50fa-ea8d-4ab4-9360-53942b5154c8/concert-public-lumini.webp",
        alt:"Public la concert și luminile scenei Green Sound Music"
      },
      wedding: {
        src:"https://green-sound-music-garden.lovable.app/__l5e/assets-v1/a04c8400-b8c8-471d-bd65-0b858130c1d6/dj-mc-green-sound.webp",
        alt:"DJ Green Sound și MC Dana într-o atmosferă de eveniment"
      },
      corporate: {
        src:"https://green-sound-music-garden.lovable.app/__l5e/assets-v1/7a207982-2b53-4e43-a6ca-6f6da88605c2/scena-concert-lumini.webp",
        alt:"Scenă, echipamente profesionale și lumini Green Sound Music"
      }
    };
    moods.forEach(btn=>btn.addEventListener("click",()=>{
      const mood=btn.dataset.mood;
      if(!mood || !sources[mood] || !photo)return;
      hero.dataset.mood=mood;
      moods.forEach(it=>it.setAttribute("aria-pressed",String(it===btn)));
      photo.src=sources[mood].src;photo.alt=sources[mood].alt;
      if(!reduced.matches){photo.classList.remove("is-changing");void photo.offsetWidth;photo.classList.add("is-changing")}
      const tag=qs(".hero__scene-info",hero);
      if(tag)tag.textContent=mood==="concert"?"01 / LIVE STAGE":mood==="wedding"?"02 / WEDDING EXPERIENCE":"03 / EVENT PRODUCTION";
    }));
    const lightsBtn=qs(".hero__lights",hero);
    lightsBtn?.addEventListener("click",()=>{
      const next=hero.dataset.lights==="off"?"on":"off";
      hero.dataset.lights=next;
      lightsBtn.setAttribute("aria-pressed",String(next==="on"));
      lightsBtn.textContent=next==="on"?"✦ LUMINI ON":"◯ LUMINI OFF";
    });
  }
  const filterButtons=qsa(".filterbar button[data-filter]");
  const galleryItems=qsa(".gallery__item[data-tags]");
  if(filterButtons.length && galleryItems.length) {
    filterButtons.forEach(button=>button.addEventListener("click",()=>{
      const tag=button.dataset.filter;
      filterButtons.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      galleryItems.forEach(item=>{item.hidden=tag!=="all"&&!(item.dataset.tags||"").split(" ").includes(tag)});
      const status=qs("#filter-status");
      if(status)status.textContent="Se afișează "+galleryItems.filter(it=>!it.hidden).length+" fotografii";
    }));
  }
  const dialog=qs("#video-dialog");
  const player=qs("#video-player");
  if(dialog&&player) {
    const filmButtons=qsa("[data-play-video]");
    const tabs=qsa(".dialog__bottom button[data-video]");
    const known=new Set(["37QlXW3NlxU","eGLykw1G0EQ","u7EW622vE3Q","xN0J8_3GlgY"]);
    const play=id=>{
      if(!known.has(id))return;
      player.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&rel=0";
      tabs.forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.video===id)));
    };
    filmButtons.forEach(button=>button.addEventListener("click",()=>{
      if(!dialog.open)dialog.showModal();play(button.dataset.playVideo||"37QlXW3NlxU");
    }));
    tabs.forEach(btn=>btn.addEventListener("click",()=>play(btn.dataset.video)));
    qs("[data-close-video]",dialog)?.addEventListener("click",()=>dialog.close());
    dialog.addEventListener("close",()=>{player.src="about:blank"});
    dialog.addEventListener("click",ev=>{if(ev.target===dialog)dialog.close()});
  }
  const form=qs("#offer-form");
  if(form) {
    const params=new URLSearchParams(location.search);
    const type=qs('[name="eventType"]',form);
    const requested=params.get("tip");
    if(type&&requested&&[...type.options].some(o=>o.value===requested))type.value=requested;
    const requestedService=params.get("serviciu");
    const serviceInput=qs('[name="services"]',form);
    if(serviceInput&&requestedService)serviceInput.value=requestedService;
    const date=qs('[name="date"]',form);
    if(date)date.min=new Date().toISOString().slice(0,10);
    form.addEventListener("submit",ev=>{
      ev.preventDefault();
      if(!form.reportValidity())return;
      const data=new FormData(form);
      const val=(key)=>String(data.get(key)||"").trim();
      const message=[
        "Bună ziua! Aș dori o ofertă Green Sound Music.",
        "",
        "Nume: "+val("name"),
        "Tip eveniment: "+val("eventType"),
        "Data: "+(val("date")||"De stabilit"),
        "Localitate / locație: "+val("location"),
        "Servicii dorite: "+val("services"),
        "Telefon de contact: "+val("phone"),
        "Detalii: "+(val("details")||"—")
      ].join("\n");
      const link="https://wa.me/40766566275?text="+encodeURIComponent(message);
      window.open(link,"_blank","noopener,noreferrer");
      const status=qs("#offer-status");
      if(status)status.textContent="Se deschide WhatsApp cu mesajul pregătit. Apasă Trimite pentru a expedia solicitarea.";
    });
  }
  qsa("[data-current-year]").forEach(el=>el.textContent=String(new Date().getFullYear()));
  if("IntersectionObserver" in window && !reduced.matches) {
    const reveal=qsa(".reveal");
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.dataset.inview="true";observer.unobserve(entry.target)}});
    },{threshold:.07,rootMargin:"0px 0px -12px 0px"});
    reveal.forEach(el=>{el.dataset.inview="false";observer.observe(el)});
  }
})();

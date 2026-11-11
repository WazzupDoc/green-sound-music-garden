/* GREEN SOUND MUSIC V19 optimized preview JavaScript. Sources remain editable. */

/* --- v17.js --- */
/* Green Sound Music V17: restrained interactive stage light.
   No tracking, no audio, no third-party scripts, no persistent state. */
(() => {
 "use strict";
 const stage=document.querySelector(".hero--v17 .hero-v16__visual");
 if (!stage || !matchMedia("(hover: hover) and (pointer: fine)").matches ||
     matchMedia("(prefers-reduced-motion: reduce)").matches) return;
 let raf=0,x=50,y=50;
 const paint=()=>{
   raf=0;stage.style.setProperty("--stage-x",x.toFixed(2)+"%");
   stage.style.setProperty("--stage-y",y.toFixed(2)+"%");
 };
 stage.addEventListener("pointerenter",()=>{stage.dataset.pointer="active"},{passive:true});
 stage.addEventListener("pointermove",event=>{
    const box=stage.getBoundingClientRect();
    x=Math.min(100,Math.max(0,(event.clientX-box.left)*100/box.width));
    y=Math.min(100,Math.max(0,(event.clientY-box.top)*100/box.height));
    if(!raf)raf=requestAnimationFrame(paint);
 },{passive:true});
 stage.addEventListener("pointerleave",()=>{
   stage.removeAttribute("data-pointer");
   if(raf){cancelAnimationFrame(raf);raf=0}
 },{passive:true});
})();


/* --- v18.js --- */
/* GREEN SOUND V18 — original party stage controller and generative demo groove.
 * No external library, no copyrighted audio sample and no autoplay.
 * The music is synthesized in-browser only after a direct sound-button click.
 * Beat: 112 BPM, original 4/4 drums+bass, explicitly marked as DEMO.
 */
(() => {
 "use strict";
 const hero=document.querySelector(".hero--v18");
 const visual=hero?.querySelector(".hero-v16__visual");
 const partyButton=hero?.querySelector("[data-party-mode]");
 const audioButton=hero?.querySelector("[data-party-audio]");
 if(!hero||!visual||!partyButton||!audioButton)return;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 const AC=window.AudioContext||window.webkitAudioContext;
 let party=false,playing=false,ctx=null,master=null,noise=null,schedulerId=0,pulseId=0,pulseOffId=0;
 let stepIndex=0,nextTime=0;
 const BPM=112,STEP=60/BPM/2,LOOKAHEAD=.11;
 const updateUI=()=>{
   hero.dataset.party=party?"on":"off";
   visual.dataset.party=party?"on":"off";
   partyButton.setAttribute("aria-pressed",String(party));
   const partyLabel=partyButton.querySelector(".gs18-control__text");
   if(partyLabel)partyLabel.textContent=party?"PARTY ON":"PARTY MODE";
   audioButton.setAttribute("aria-pressed",String(playing));
   audioButton.innerHTML=playing?'<span class="gs18-control__icon" aria-hidden="true">♫</span> SUNET ON':'<span class="gs18-control__icon" aria-hidden="true">♫</span> SUNET OFF';
   audioButton.title=playing?"Oprește ritmul electronic original de demonstrație":"Pornește un ritm electronic original de demonstrație. Nu este o înregistrare Green Sound.";
 };
 const pulse=()=>{
   if(!party||reduced.matches||document.hidden)return;
   hero.classList.add("gs18-onbeat");
   clearTimeout(pulseOffId);
   pulseOffId=setTimeout(()=>hero.classList.remove("gs18-onbeat"),110);
 };
 const visualTick=()=>{clearInterval(pulseId);pulseId=setInterval(pulse,Math.round(60_000/BPM));pulse()};
 const stopAudio=()=>{
   if(schedulerId){clearInterval(schedulerId);schedulerId=0}
   const previous=ctx;ctx=null;noise=null;master=null;playing=false;
   if(previous&&previous.state!=="closed"){try{previous.close().catch(()=>{})}catch{}}
   updateUI();
 };
 const setParty=(enabled)=>{
   party=Boolean(enabled);
   if(party&&hero.dataset.lights==="off"){
     const light=hero.querySelector(".hero__lights");
     light?.click(); // existing scene control owns aria-pressed / text
   }
   if(!party){clearInterval(pulseId);pulseId=0;clearTimeout(pulseOffId);hero.classList.remove("gs18-onbeat");if(playing)stopAudio()}
   else if(!pulseId)visualTick();
   updateUI();
 };
 function makeNoiseBuffer(context){
   const count=Math.round(context.sampleRate*.32);
   const buffer=context.createBuffer(1,count,context.sampleRate);
   const channel=buffer.getChannelData(0);
   let seed=3281169;
   for(let i=0;i<count;i++){seed=(1664525*seed+1013904223)>>>0;channel[i]=(seed/2147483648)-1}
   return buffer;
 }
 function envelope(node,time,peak,decay){
   node.gain.setValueAtTime(.0001,time);
   node.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),time+.008);
   node.gain.exponentialRampToValueAtTime(.0001,time+decay);
 }
 function drum(time,type){
   if(!ctx||!master)return;
   if(type==="kick"){
     const osc=ctx.createOscillator(),gain=ctx.createGain();
     osc.type="sine";
     osc.frequency.setValueAtTime(145,time);
     osc.frequency.exponentialRampToValueAtTime(47,time+.17);
     envelope(gain,time,.55,.24);
     osc.connect(gain);gain.connect(master);
     osc.start(time);osc.stop(time+.25);
   } else {
     const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
     src.buffer=noise;
     filter.type="highpass";filter.frequency.value=type==="hat"?6500:1250;
     envelope(gain,time,type==="hat"?.043:.16,type==="hat"?.058:.125);
     src.connect(filter);filter.connect(gain);gain.connect(master);
     src.start(time);src.stop(time+(type==="hat"?.065:.135));
   }
 }
 function bass(time,note){
   if(!ctx||!master)return;
   const osc=ctx.createOscillator(),low=ctx.createBiquadFilter(),gain=ctx.createGain();
   osc.type="triangle";osc.frequency.setValueAtTime(note,time);
   low.type="lowpass";low.frequency.setValueAtTime(700,time);
   envelope(gain,time,.16,.30);
   osc.connect(low);low.connect(gain);gain.connect(master);
   osc.start(time);osc.stop(time+.31);
 }
 function sparkle(time,note){
   if(!ctx||!master)return;
   const osc=ctx.createOscillator(),g=ctx.createGain();
   osc.type="sine";osc.frequency.value=note;
   envelope(g,time,.017,.20);
   osc.connect(g);g.connect(master);osc.start(time);osc.stop(time+.22);
 }
 const roots=[110,130.81,146.83,98]; // A2 C3 D3 G2, original demonstration phrase
 const schedule=()=>{
   if(!playing||!ctx)return;
   while(nextTime<ctx.currentTime+LOOKAHEAD){
     const inBar=stepIndex%8,phrase=Math.floor(stepIndex/8)%4;
     if(inBar%2===0){drum(nextTime,"kick");bass(nextTime,roots[phrase])}
     if(inBar===2||inBar===6)drum(nextTime,"clap");
     drum(nextTime,"hat");
     if(inBar===7)sparkle(nextTime,roots[phrase]*4);
     stepIndex++;nextTime+=STEP;
   }
 };
 async function startAudio(){
   if(!AC){audioButton.disabled=true;audioButton.title="Browserul nu acceptă audio de demonstrație";return}
   if(document.hidden)return;
   if(!party)setParty(true);
   try{
     // AudioContext created/resumed directly from a click, not on page load.
     const active=new AC({latencyHint:"interactive"});
     ctx=active;
     master=active.createGain();master.gain.value=.12;master.connect(active.destination);
     noise=makeNoiseBuffer(active);
     stepIndex=0;nextTime=active.currentTime+.035;
     playing=true;updateUI();
     await active.resume();
     if(ctx!==active)return;
     schedule();schedulerId=setInterval(schedule,25);
   }catch(error){
     console.warn("[Green Sound] Demo groove not available",error);
     stopAudio();
     audioButton.title="Nu s-a putut porni demonstrația audio în acest browser.";
   }
 }
 partyButton.addEventListener("click",()=>{
   setParty(!party);
 });
 audioButton.addEventListener("click",()=>{
   if(playing)stopAudio();else startAudio();
 });
 hero.querySelector(".hero__lights")?.addEventListener("click",()=>{
   if(hero.dataset.lights==="off"&&party)setParty(false);
 });
 // Let the actual video be heard clearly instead of playing over the demo beat.
 document.querySelectorAll("[data-play-video]").forEach(b=>b.addEventListener("click",()=>{
   if(playing)stopAudio();
 }));
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&playing)stopAudio()});
 window.addEventListener("pagehide",()=>{if(playing)stopAudio();clearInterval(pulseId);clearTimeout(pulseOffId)});
 if(!AC){audioButton.disabled=true;audioButton.setAttribute("aria-label","Demo audio indisponibil în acest browser")}
 updateUI();
})();


/* --- site.js --- */
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


/* --- v19.js --- */
/* GREEN SOUND MUSIC V19 — premium motion, naturally fast by default.
 * No dependency, no network requests, no synthetic navigation intercept,
 * no autoplay, all decorative and respectful of reduced motion.
 */
(() => {
 "use strict";
 const doc=document,root=doc.documentElement;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 const fine=matchMedia("(hover: hover) and (pointer: fine)");
 const narrow=matchMedia("(max-width: 480px)");
 const conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 const lite=Boolean(conn?.saveData || (navigator.deviceMemory && navigator.deviceMemory<=4) ||
             (navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4) || narrow.matches);
 if(lite)root.dataset.gs19Tier="lite";
 const hero=doc.querySelector(".hero--v18");
 const reel=doc.querySelector(".gs-reel-section");
 const curated=doc.querySelector(".gs-curation");
 const canObserve="IntersectionObserver" in window;
 // Pausing invisible motion, rather than simply hiding its pixels, saves work.
 if(canObserve){
   const motionTargets=[hero,reel,curated].filter(Boolean);
   const motionIO=new IntersectionObserver(entries=>{
     for(const e of entries){
       e.target.dataset.stageVisible=String(!doc.hidden&&e.isIntersecting);
     }
   },{rootMargin:"80px 0px 100px 0px",threshold:0});
   for(const target of motionTargets)motionIO.observe(target);
   const setVisibility=()=>{
     if(doc.hidden){motionTargets.forEach(el=>el.dataset.stageVisible="false")}
     else for(const target of motionTargets){
       const rect=target.getBoundingClientRect();
       target.dataset.stageVisible=String(rect.bottom>=-80&&rect.top<=innerHeight+100);
     }
   };
   doc.addEventListener("visibilitychange",setVisibility,{passive:true});
   addEventListener("pageshow",setVisibility,{passive:true});
 }
 // Cinematic editorial chapters: transform/opacity only, visible by default
 // if JavaScript or IntersectionObserver is unavailable.
 if(canObserve&&!reduced.matches){
   const chapters=[...doc.querySelectorAll(".gs-curation .section-heading,.gs-reel__header,.section-heading:not(.gs-curation .section-heading),.studio-feature>div:last-child")];
   const io=new IntersectionObserver(entries=>{
     for(const e of entries){if(e.isIntersecting){e.target.classList.add("gs19-visible");io.unobserve(e.target)}}
   },{rootMargin:"0px 0px -25px 0px",threshold:.06});
   for(const el of chapters){
     el.classList.add("gs19-chapter");
     const rect=el.getBoundingClientRect();
     if(rect.top<innerHeight+50&&rect.bottom>=-50)el.classList.add("gs19-visible");
     else io.observe(el);
   }
   root.classList.add("gs19-enhanced");
 }
 // Motion follows the pointer with an rAF-capped compositor-only update.
 // Event readers/cache are attached to just three selected cards.
 if(fine.matches&&!reduced.matches&&!lite){
   const targets=doc.querySelectorAll(".gs-curation .card,.gs-reel__tile");
   for(const card of targets){
     let rect=null,raf=0,px=0,py=0;
     const paint=()=>{raf=0;card.style.setProperty("--gs19-card-x",px.toFixed(1)+"px");
       card.style.setProperty("--gs19-card-y",py.toFixed(1)+"px")};
     card.addEventListener("pointerenter",()=>{rect=card.getBoundingClientRect()},{passive:true});
     card.addEventListener("pointermove",event=>{
       if(!rect)return;
       px=Math.max(-7,Math.min(7,(event.clientX-rect.left-rect.width/2)/rect.width*14));
       py=Math.max(-5,Math.min(5,(event.clientY-rect.top-rect.height/2)/rect.height*10));
       if(!raf)raf=requestAnimationFrame(paint);
     },{passive:true});
     card.addEventListener("pointerleave",()=>{
       rect=null;if(raf){cancelAnimationFrame(raf);raf=0}
       card.style.removeProperty("--gs19-card-x");card.style.removeProperty("--gs19-card-y");
     },{passive:true});
   }
   for(const btn of doc.querySelectorAll(".hero__buttons .btn,.footer__top .btn")){
     btn.classList.add("gs19-magnetic");
     let rect=null,raf=0,px=0,py=0;
     btn.addEventListener("pointerenter",()=>{rect=btn.getBoundingClientRect()},{passive:true});
     btn.addEventListener("pointermove",event=>{
       if(!rect)return;
       px=Math.max(-4,Math.min(4,(event.clientX-rect.left-rect.width/2)/rect.width*8));
       py=Math.max(-3,Math.min(3,(event.clientY-rect.top-rect.height/2)/rect.height*6));
       if(!raf)raf=requestAnimationFrame(()=>{
         raf=0;btn.style.setProperty("--gs19-mx",px.toFixed(1)+"px");
         btn.style.setProperty("--gs19-my",py.toFixed(1)+"px");
       });
     },{passive:true});
     btn.addEventListener("pointerleave",()=>{
       rect=null;if(raf)cancelAnimationFrame(raf);raf=0;
       btn.style.removeProperty("--gs19-mx");btn.style.removeProperty("--gs19-my");
     },{passive:true});
   }
 }
})();

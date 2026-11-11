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

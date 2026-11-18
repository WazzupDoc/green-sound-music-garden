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

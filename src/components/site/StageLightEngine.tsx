import { useEffect, useRef } from "react";

/**
 * SHOWLIGHT / ORIGINAL LIGHT ENGINE
 *
 * Actual 2D volumetric light simulation: oscillating articulated heads,
 * soft cones, additive spot flares and particles with depth/parallax.
 *
 * Runs at <= 28fps, DPR capped at 1.5, only while visible and tab active.
 * No audio, scroll hijacking, network or GPU-heavy WebGL. The semantic scene
 * photo remains underneath if canvas is unsupported or motion is reduced.
 */
export function StageLightEngine({
  tint = "#ACFF8A", intensity = 0.75, smoke = true, className = "",
}:{
  tint?:string;intensity?:number;smoke?:boolean;className?:string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const input = useRef({ tint, intensity, smoke, px:0.5, py:0.5 });
  input.current.tint=tint;
  input.current.intensity=intensity;
  input.current.smoke=smoke;

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas) return;
    const ctx=canvas.getContext("2d",{alpha:true});
    if(!ctx) return;
    const el=canvas.parentElement;
    if(!el) return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    let running=true, visible=false, raf=0, last=0, time=0;
    let width=1,height=1,dpr=1;
    const random=(seed:number)=>{
      const v=Math.sin(seed*91.711+11.22)*43758.5453;
      return v-Math.floor(v);
    };
    const motes=Array.from({length:34},(_,i)=>({
      x:random(i+1),y:random(i+73),speed:0.25+random(i+123)*0.5,
      size:0.35+random(i+217)*1.35,phase:random(i+391)*Math.PI*2,
    }));
    function sizeCanvas(){
      const rect=canvas!.getBoundingClientRect();
      width=Math.max(1,rect.width);
      height=Math.max(1,rect.height);
      dpr=Math.min(window.devicePixelRatio||1,1.5);
      canvas!.width=Math.round(width*dpr);
      canvas!.height=Math.round(height*dpr);
      ctx!.setTransform(dpr,0,0,dpr,0,0);
    }
    const toRgb=(hex:string)=>{
      const match=/^#?([0-9a-fA-F]{6})$/.exec(hex);
      if(!match)return [180,255,170] as const;
      const v=parseInt(match[1]!,16);
      return [(v>>16)&255,(v>>8)&255,v&255] as const;
    };
    const draw=(now:number)=>{
      raf=0;
      if(!running||!visible||document.hidden||reduced.matches)return;
      if(now-last<1000/28){raf=requestAnimationFrame(draw);return;}
      const delta=Math.min((now-last)/1000,0.05);
      last=now;time+=delta;
      ctx!.clearRect(0,0,width,height);
      const state=input.current;
      const [r,g,b]=toRgb(state.tint);
      const power=Math.max(0,Math.min(1,state.intensity));
      const px=state.px-0.5, py=state.py-0.5;
      ctx!.save();
      // Soft volumetric beams: top-rig origin, slowly oscillating floor target.
      const lights=[
        {ox:.06,oy:.07,tx:.54,phase:0,spread:.14},
        {ox:.86,oy:.04,tx:.47,phase:1.8,spread:.16},
        {ox:.46,oy:.01,tx:.39,phase:3.2,spread:.11},
        {ox:.66,oy:.10,tx:.75,phase:4.5,spread:.1},
      ];
      ctx!.globalCompositeOperation="screen";
      for(const l of lights){
        const ox=l.ox*width,oy=l.oy*height;
        const targetX=(l.tx+Math.sin(time*.22+l.phase)*.14+px*.1)*width;
        const targetY=(.9+Math.sin(time*.15+l.phase)*.04+py*.06)*height;
        const span=l.spread*width;
        ctx!.beginPath();
        ctx!.moveTo(ox,oy);
        ctx!.quadraticCurveTo((ox+targetX-span)/2,targetY*.45,targetX-span,targetY);
        ctx!.quadraticCurveTo(targetX,targetY+height*.08,targetX+span,targetY);
        ctx!.quadraticCurveTo((ox+targetX+span)/2,targetY*.45,ox,oy);
        ctx!.closePath();
        const grad=ctx!.createLinearGradient(ox,oy,targetX,targetY);
        grad.addColorStop(0,`rgba(${r},${g},${b},${0.28*power})`);
        grad.addColorStop(.18,`rgba(${r},${g},${b},${0.10*power})`);
        grad.addColorStop(.72,`rgba(${r},${g},${b},${0.035*power})`);
        grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
        ctx!.fillStyle=grad;
        ctx!.fill();
        // Actual source bloom, synchronized with a moving fixture.
        const halo=ctx!.createRadialGradient(ox,oy,0,ox,oy,width*.058);
        halo.addColorStop(0,`rgba(249,255,250,${.6*power})`);
        halo.addColorStop(.1,`rgba(${r},${g},${b},${.35*power})`);
        halo.addColorStop(1,`rgba(${r},${g},${b},0)`);
        ctx!.fillStyle=halo;
        ctx!.beginPath();
        ctx!.arc(ox,oy,width*.058,0,Math.PI*2);
        ctx!.fill();
      }
      // Scattered haze reacts to stage intensity; no flat repeated fog cards.
      if(state.smoke){
        for(let j=0;j<5;j++){
          const x=(j/4+.075*Math.sin(time*.11+j))*width;
          const y=(.72+.085*Math.sin(time*.09+j*1.1))*height;
          const rx=width*(.22+.08*random(j+31));
          const haze=ctx!.createRadialGradient(x,y,0,x,y,rx);
          haze.addColorStop(0,`rgba(${r},${g},${b},${.038*power})`);
          haze.addColorStop(.55,"rgba(212,237,220,0.018)");
          haze.addColorStop(1,"rgba(212,237,220,0)");
          ctx!.fillStyle=haze;ctx!.beginPath();ctx!.arc(x,y,rx,0,Math.PI*2);ctx!.fill();
        }
      }
      for(const m of motes){
        const x=(m.x+.01*Math.sin(time*.13+m.phase))*width;
        const y=((m.y-time*m.speed*.012)%1+1)%1*height;
        const alpha=(.1+.13*Math.sin(time*.35+m.phase)**2)*power;
        ctx!.fillStyle=`rgba(${r},${g},${b},${alpha})`;
        ctx!.beginPath();ctx!.arc(x,y,m.size,0,Math.PI*2);ctx!.fill();
      }
      ctx!.restore();
      raf=requestAnimationFrame(draw);
    };
    const schedule=()=>{
      cancelAnimationFrame(raf);raf=0;
      if(visible&&!document.hidden&&!reduced.matches){
        last=performance.now();raf=requestAnimationFrame(draw);
      }else ctx!.clearRect(0,0,width,height);
    };
    const io=new IntersectionObserver(([entry])=>{visible=Boolean(entry?.isIntersecting);schedule();},{threshold:0});
    io.observe(el);
    const ro=new ResizeObserver(()=>{sizeCanvas();});
    ro.observe(canvas);
    const move=(e:PointerEvent)=>{
      if(e.pointerType!=="mouse")return;
      const rect=el.getBoundingClientRect();
      input.current.px=Math.min(1,Math.max(0,(e.clientX-rect.left)/rect.width));
      input.current.py=Math.min(1,Math.max(0,(e.clientY-rect.top)/rect.height));
    };
    const reset=()=>{input.current.px=.5;input.current.py=.5;};
    const visibility=()=>schedule();
    el.addEventListener("pointermove",move,{passive:true});
    el.addEventListener("pointerleave",reset);
    document.addEventListener("visibilitychange",visibility);
    reduced.addEventListener("change",schedule);
    sizeCanvas();schedule();
    return ()=>{
      running=false;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
      el.removeEventListener("pointermove",move);
      el.removeEventListener("pointerleave",reset);
      document.removeEventListener("visibilitychange",visibility);
      reduced.removeEventListener("change",schedule);
    };
  },[]);
  return <canvas ref={canvasRef} className={`v60-light-engine ${className}`} aria-hidden="true"/>;
}

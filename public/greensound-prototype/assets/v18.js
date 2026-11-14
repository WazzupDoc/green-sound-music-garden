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

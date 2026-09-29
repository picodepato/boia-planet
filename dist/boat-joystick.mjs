// A single captured pointer steers from the exact point where the boat was held.
export function attachBoatJoystick({surface,overlay,thumb,canStart,hitBoat,onStart,onInput,onTap,radius=42}){
 let pointerId=null,origin=null,tap=null;
 const release=id=>{if(surface.hasPointerCapture(id))surface.releasePointerCapture(id);};
 function stop(){
  const tapId=tap?.id;tap=null;
  if(tapId!==undefined)release(tapId);
  if(pointerId===null)return;
  const id=pointerId;pointerId=null;origin=null;
  overlay.hidden=true;thumb.style.transform='';
  onInput({x:0,y:0,active:false});
  release(id);
 }
 surface.addEventListener('pointerdown',e=>{
  if(pointerId!==null||tap!==null||e.button!==0||!canStart())return;
  if(!hitBoat(e)){tap={id:e.pointerId,x:e.clientX,y:e.clientY};surface.setPointerCapture(e.pointerId);return;}
  e.preventDefault();
  pointerId=e.pointerId;origin={x:e.clientX,y:e.clientY};
  surface.setPointerCapture(pointerId);
  overlay.style.left=origin.x+'px';overlay.style.top=origin.y+'px';
  thumb.style.transform='';overlay.hidden=false;
  onStart();onInput({x:0,y:0,active:true});
 });
 surface.addEventListener('pointermove',e=>{
  if(e.pointerId!==pointerId){
   if(tap?.id===e.pointerId&&Math.hypot(e.clientX-tap.x,e.clientY-tap.y)>12)tap.moved=true;
   return;
  }
  e.preventDefault();
  const dx=e.clientX-origin.x,dy=e.clientY-origin.y,limit=Math.max(radius,Math.hypot(dx,dy));
  const x=dx/limit,y=dy/limit;
  thumb.style.transform=`translate(${x*radius}px,${y*radius}px)`;
  onInput({x,y,active:true});
 });
 surface.addEventListener('pointerup',e=>{
  if(e.pointerId===pointerId){e.preventDefault();stop();return;}
  if(e.pointerId!==tap?.id)return;
  const start=tap;tap=null;release(e.pointerId);
  if(!start.moved&&Math.hypot(e.clientX-start.x,e.clientY-start.y)<=12&&canStart())onTap(e);
 });
 for(const event of ['pointercancel','lostpointercapture'])surface.addEventListener(event,e=>{
  if(e.pointerId===pointerId)stop();
  else if(e.pointerId===tap?.id){tap=null;release(e.pointerId);}
 });
 surface.addEventListener('contextmenu',e=>{if(pointerId!==null)e.preventDefault();});
 return {stop,get active(){return pointerId!==null;}};
}

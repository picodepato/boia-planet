import test from 'node:test';
import assert from 'node:assert/strict';
import {attachBoatJoystick} from '../dist/boat-joystick.mjs';

function setup(){
 const handlers=new Map(),captures=new Set(),overlay={hidden:true,style:{}},thumb={style:{}};
 const values=[];let starts=0,taps=0,allowed=true;
 const surface={
  addEventListener(name,fn){handlers.set(name,fn);},
  setPointerCapture(id){captures.add(id);},hasPointerCapture:id=>captures.has(id),
  releasePointerCapture(id){captures.delete(id);emit('lostpointercapture',{pointerId:id});}
 };
 function emit(name,overrides={}){
  const e={pointerId:1,button:0,clientX:160,clientY:240,onBoat:true,preventDefault(){this.prevented=true;},...overrides};
  handlers.get(name)?.(e);return e;
 }
 const controls=attachBoatJoystick({surface,overlay,thumb,canStart:()=>allowed,hitBoat:e=>e.onBoat,
  onStart:()=>starts++,onInput:value=>values.push(value),onTap:()=>taps++});
 return {emit,controls,overlay,thumb,captures,values,get starts(){return starts;},get taps(){return taps;},disable(){allowed=false;}};
}

test('boat hold anchors at the touch, scales the throttle and releases without autopilot',()=>{
 const h=setup();
 assert.equal(h.emit('pointerdown').prevented,true);
 assert.equal(h.overlay.hidden,false);assert.equal(h.overlay.style.left,'160px');assert.equal(h.overlay.style.top,'240px');
 assert.deepEqual(h.values.at(-1),{x:0,y:0,active:true});assert.equal(h.starts,1);
 h.emit('pointermove',{clientX:181,clientY:240});
 assert.deepEqual(h.values.at(-1),{x:.5,y:0,active:true});
 h.emit('pointermove',{clientX:460,clientY:-160});
 assert.deepEqual(h.values.at(-1),{x:.6,y:-.8,active:true});
 assert.equal(h.overlay.style.left,'160px');assert.equal(h.overlay.style.top,'240px');
 h.emit('pointerup',{clientX:460,clientY:-160});
 assert.equal(h.controls.active,false);assert.equal(h.overlay.hidden,true);assert.equal(h.captures.size,0);
 assert.deepEqual(h.values.at(-1),{x:0,y:0,active:false});assert.equal(h.taps,0);
});

test('secondary fingers cannot move, cancel or recenter the steering finger',()=>{
 const h=setup();h.emit('pointerdown');
 h.emit('pointerdown',{pointerId:2,clientX:400});h.emit('pointermove',{pointerId:2,clientX:450});h.emit('pointerup',{pointerId:2});
 assert.equal(h.starts,1);assert.equal(h.controls.active,true);assert.equal(h.values.length,1);
 h.emit('pointerup');assert.equal(h.taps,0);
 h.emit('pointerdown',{pointerId:3,clientX:90,clientY:120});
 assert.equal(h.overlay.style.left,'90px');assert.equal(h.overlay.style.top,'120px');
});

test('cancellation, lost capture and interruption each neutralize input and allow a new gesture',()=>{
 for(const ending of ['pointercancel','lostpointercapture','stop']){
  const h=setup();h.emit('pointerdown');h.emit('pointermove',{clientX:200});
  if(ending==='stop')h.controls.stop();else h.emit(ending);
  assert.equal(h.controls.active,false);assert.equal(h.overlay.hidden,true);assert.equal(h.captures.size,0);
  assert.deepEqual(h.values.at(-1),{x:0,y:0,active:false});
  h.emit('pointerup');assert.equal(h.taps,0);
  h.emit('pointerdown');assert.equal(h.controls.active,true);
 }
});

test('a sea tap activates autopilot, while a drag returning to its start does not',()=>{
 const h=setup();h.emit('pointerdown',{onBoat:false});h.emit('pointerup',{onBoat:false});
 assert.equal(h.taps,1);assert.equal(h.starts,0);assert.equal(h.captures.size,0);
 h.emit('pointerdown',{onBoat:false});h.emit('pointermove',{clientX:230});h.emit('pointerup');
 assert.equal(h.taps,1);assert.equal(h.captures.size,0);
 h.emit('pointerdown',{onBoat:false});h.controls.stop();h.emit('pointerup');assert.equal(h.taps,1);
});

test('paused or unavailable controls and secondary mouse buttons cannot start steering',()=>{
 const h=setup();h.emit('pointerdown',{button:2});assert.equal(h.controls.active,false);
 h.disable();h.emit('pointerdown');h.emit('pointerup');
 assert.equal(h.starts,0);assert.equal(h.taps,0);assert.equal(h.captures.size,0);
});

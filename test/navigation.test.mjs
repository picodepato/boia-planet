import test from 'node:test';
import assert from 'node:assert/strict';
import {STATIONS,OBSTACLES,planRoute,followRoute,stepBoat,distance} from '../dist/navigation.mjs';
test('every destination is reachable from home and from every other buoy',()=>{
 for(const from of [{x:-3,z:8},...STATIONS])for(const target of STATIONS){
  if(from===target)continue;
  const state={x:from.x,z:from.z,heading:-.4,speed:0},route=planRoute(state,target);
  assert.ok(route.length,`No route to ${target.id}`);
  for(let n=0;n<18000&&route.length;n++){
   followRoute(state,route,1/60);
   assert.ok(Number.isFinite(state.x)&&Number.isFinite(state.z));
   assert.ok(OBSTACLES.every(o=>distance(state,o)>=o.r+1.39));
  }
  assert.equal(route.length,0,`Route did not finish: ${target.id}`);
  assert.ok(distance(state,target)<1.5);
 }
});
test('releasing the throttle slows the boat and collisions keep it out of land',()=>{
 const state={x:-3,z:8,heading:0,speed:0};
 for(let i=0;i<60;i++)stepBoat(state,{throttle:1,turn:0},1/60);
 const moving=state.speed;
 for(let i=0;i<120;i++)stepBoat(state,{throttle:0,turn:0},1/60);
 assert.ok(state.speed<moving*.1);
 state.x=-39;state.z=1;stepBoat(state,{throttle:0,turn:0},1/60);
 assert.ok(distance(state,OBSTACLES[0])>=12.09);
});

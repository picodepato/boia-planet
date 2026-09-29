import {channelAt,raceBanksAt} from './expedition.mjs';
export const EVENTS=[
 {id:'halloween',name:'Halloween',en:'Halloween',title:'HALLO\nWEEN',x:-24,z:0,r:11,color:'#f57a37',dock:{x:-11,z:8},code:'DEMO-HALLOW10',label:'01',tag:'THE HAUNTED ISLAND',genres:'HOUSE · TECHNO · LIVE'},
 {id:'christmas',name:'Navidad',en:'Christmas',title:'NAVIDAD\nA LA DERIVA',x:25,z:-33,r:11,color:'#7db39b',dock:{x:13,z:-22},code:'DEMO-NAVIDAD10',label:'02',tag:'THE WINTER ISLAND',genres:'HOUSE · REGGAETÓN · ROCK'},
 {id:'newyear',name:'Nochevieja',en:'New Year’s Eve',title:'EL ÚLTIMO\nBAILE',x:-7,z:-74,r:13,color:'#d9c68d',dock:{x:2,z:-57},code:'DEMO-NOCHE10',label:'03',tag:'THE LAST DANCE',genres:'ALL SOUNDS. ONE PLANET.'}
];
export const NODES=[{id:'artists',kind:'artists',x:-47,z:-209,es:'El barco del sonido',en:'The sound boat',color:'#ff622e'},
 {id:'history',x:-6,z:32,color:'#f96e37',kind:'buoy',es:'El origen de BOIA',en:'The BOIA story'},
 {id:'music',x:8,z:26,color:'#74e0d2',kind:'buoy',es:'Radio BOIA',en:'BOIA Radio'},
 {id:'castaway',x:-8,z:20,color:'#ebdeba',kind:'rescue',es:'Un náufrago con prisa',en:'A castaway in a hurry'},
 {id:'treasure',x:-20,z:21,color:'#c8a075',kind:'treasure',es:'Restos de un tesoro',en:'A drifting treasure'},
 {id:'fiestera',x:2,z:10,color:'#ff642d',kind:'buoy',es:'La BOIA fiestera',en:'The party BOIA'},
 {id:'christmas-discount',x:8,z:-12,color:'#dc7dac',kind:'buoy',es:'Una señal de Navidad',en:'A Christmas signal'},
 {id:'whatsapp',x:36,z:-12,color:'#9ce9a4',kind:'buoy',es:'La comunidad BOIA',en:'The BOIA community'},
 {id:'newyear-discount',x:-6,z:-44,color:'#fbe596',kind:'buoy',es:'Rumbo al último baile',en:'The last dance awaits'},
 {id:'gallery',x:-38,z:-32,color:'#f58caf',kind:'harbor',es:'El puerto de los recuerdos',en:'Memory harbour'},
 {id:'lighthouse',x:43,z:-68,color:'#d0dfdb',kind:'lighthouse',es:'El faro de batalla',en:'Battle lighthouse'}
];
Object.assign(EVENTS[0],{x:-25,z:-20,r:14,dock:{x:-8,z:-6}});
Object.assign(EVENTS[1],{x:-5,z:-115,r:16,dock:{x:15,z:-102}});
Object.assign(EVENTS[2],{x:-24,z:-241,r:18,dock:{x:-2,z:-222}});
const places={history:[0,28],artists:[-47,-209],music:[18,33],castaway:[-17,23],treasure:[-38,31],fiestera:[11,-40],'christmas-discount':[-22,-73],whatsapp:[22,-153],'newyear-discount':[-7,-194],gallery:[-46,-146],lighthouse:[43,-271]};
for(const n of NODES){[n.x,n.z]=places[n.id];}
NODES.push({id:'shop',x:-46,z:-182,color:'#ff8246',kind:'shop',es:'El muelle de la tienda',en:'The shop dock'},{id:'race',x:46,z:-1,color:'#f2c969',kind:'race',es:'La ruta del cocodrilo',en:'The crocodile run'});
export const COLLIDERS=[...EVENTS.map(e=>({x:e.x,z:e.z,r:e.r*.9})),{x:-50,z:-151,r:6},{x:-50,z:-187,r:6},{x:48,z:-275,r:5}];
export const COLORS=['#ff622e','#20a5c3','#ecd5a0','#79b68c','#c092d0'];
export function initialProgress(){return {version:1,nickname:'',genres:'',artist:'',memory:'',message:'',color:COLORS[0],flag:false,trail:false,coins:0,points:0,discovered:[],rewards:[],owned:[],activeSeconds:0,lang:'es',survey:null,selectedEvent:'halloween'};}
export function loadProgress(storage){try{const raw=JSON.parse(storage.getItem('boia.planet.pilot.v1')||'null');if(!raw||raw.version!==1)return initialProgress();const p={...initialProgress(),...raw};p.discovered=Array.isArray(p.discovered)?[...new Set(p.discovered.filter(x=>typeof x==='string'))]:[];p.rewards=Array.isArray(p.rewards)?[...new Set(p.rewards.filter(x=>typeof x==='string'))]:[];p.owned=Array.isArray(p.owned)?p.owned.filter(x=>typeof x==='string'):[];p.coins=Math.max(0,Number(p.coins)||0);p.points=Math.max(0,Number(p.points)||0);p.activeSeconds=Math.max(0,Number(p.activeSeconds)||0);return p;}catch{return initialProgress();}}
export function grant(p,id,points){if(p.rewards.includes(id))return false;p.rewards.push(id);p.points+=points;p.coins+=points;return true;}
export function discover(p,id){if(p.discovered.includes(id))return false;p.discovered.push(id);grant(p,'find-'+id,20);return true;}
export function buy(p,id,cost){if(p.owned.includes(id))return true;if(p.coins<cost)return false;p.coins-=cost;p.owned.push(id);return true;}
export function rank(p,lang='es'){const ranks=lang==='en'?['Deckhand','Sailor','Buccaneer','Corsair','Captain','BOIA Legend']:['Grumete','Marinero','Bucanero','Corsario','Capitán','Leyenda BOIA'];const thresholds=[0,60,140,240,360,500];let idx=0;for(let i=1;i<thresholds.length;i++)if(p.points>=thresholds[i])idx=i;return ranks[idx];}
export function angleDelta(a,b){return Math.atan2(Math.sin(b-a),Math.cos(b-a));}
export function moveBoat(s,input,dt,colliders=COLLIDERS){
 dt=Math.max(0,Math.min(.04,dt));const drift=!!input.drift;
 if(input.targetHeading!==undefined){const diff=angleDelta(s.heading,input.targetHeading);s.heading+=Math.max(-(drift?4.3:2.5)*dt,Math.min((drift?4.3:2.5)*dt,diff));}
 else s.heading+=(input.turn||0)*dt*(drift?3.5:1.9)*(.35+Math.min(1,Math.hypot(s.vx,s.vz)/4));
 const targetSpeed=(input.throttle||0)*(input.boost?12:8.6);
 const targetX=Math.sin(s.heading)*targetSpeed,targetZ=Math.cos(s.heading)*targetSpeed;
 const grip=1-Math.exp(-(drift?1.1:4.4)*dt);
 s.vx+=(targetX-s.vx)*grip;s.vz+=(targetZ-s.vz)*grip;
 const previousX=s.x,previousZ=s.z;s.x+=s.vx*dt;s.z+=s.vz*dt;
 for(const o of colliders){let dx=s.x-o.x,dz=s.z-o.z,d=Math.hypot(dx,dz),min=o.r+1.4;if(d<min){if(d<.001){dx=1;dz=0;d=1;}s.x=o.x+dx/d*min;s.z=o.z+dz/d*min;s.vx*=.35;s.vz*=.35;}}
 if(s.z < -12 && s.z > -229){const banks=raceBanksAt(s.z);for(const bank of banks){const before=previousX-bank,after=s.x-bank;if(Math.abs(after)<1.4){s.x=bank+(before<0?-1.4:1.4);s.vx*=.2;}}}
 const shore=78+Math.sin(s.z*.039)*5+Math.sin(s.z*.09)*2.5;
 s.x=Math.max(-shore+1.8,Math.min(shore-1.8,s.x));s.z=Math.min(65,s.z);
 return s;
}

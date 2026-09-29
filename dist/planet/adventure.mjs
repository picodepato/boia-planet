// Shared, serialisable progression: fixed discoveries and repeatable sea finds are separate.
export const SEA_VALUES={wood:3,chest:18,dolphin:12,whirlpool:1};
export const MISSION_STATES=['lost','aboard','delivered'];
export function mergeSea(a={},b={}){const out={};for(const id of [...new Set([...Object.keys(a||{}),...Object.keys(b||{})])].slice(0,64)){if(!/^[a-zA-Z0-9-]{8,64}$/.test(id))continue;out[id]={};for(const key of Object.keys(SEA_VALUES))out[id][key]=Math.max(0,Math.min(100000,Math.floor(Math.max(Number(a?.[id]?.[key])||0,Number(b?.[id]?.[key])||0))));}return out;}
export function seaScore(ledger){return Object.values(mergeSea(ledger)).reduce((sum,counts)=>sum+Object.entries(SEA_VALUES).reduce((s,[k,v])=>s+counts[k]*v,0),0);}
export function missionMerge(a,b){return MISSION_STATES[Math.max(0,MISSION_STATES.indexOf(a),MISSION_STATES.indexOf(b))];}
export function arrived(s,node){return Math.hypot(s.x-node.x,s.z-node.z)<(node.r?node.r+12:['harbor','shop'].includes(node.kind)?10:node.id==='history'?12:node.id==='fiestera'?12:6.5);}
export function addSeaFind(p,device,type,amount=1){if(!Object.hasOwn(SEA_VALUES,type))return 0;p.seaLedger=mergeSea(p.seaLedger);p.seaLedger[device]??={};p.seaLedger[device][type]=(p.seaLedger[device][type]||0)+Math.min(12,Math.max(1,Math.floor(amount)));return SEA_VALUES[type]*Math.min(12,Math.max(1,Math.floor(amount)));}

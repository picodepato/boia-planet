// Package a self-contained, downloadable game for review before publication.
import fs from 'node:fs';
const base=new URL('./dist/',import.meta.url),read=f=>fs.readFileSync(new URL(f,base),'utf8');
const image=(file,mime)=>`data:${mime};base64,${fs.readFileSync(new URL(file,base)).toString('base64')}`;
const assets={'assets/logo.jpeg':image('assets/logo.jpeg','image/jpeg'),'assets/mascot.jpeg':image('assets/mascot.jpeg','image/jpeg'),'assets/hero.webp':image('assets/hero.webp','image/webp'),'assets/beach-demo.webp':image('assets/beach-demo.webp','image/webp'),'assets/decks-demo.webp':image('assets/decks-demo.webp','image/webp')};
const embedAssets=s=>{for(const [k,v]of Object.entries(assets))s=s.replaceAll(k,v);return s;};
const inlineModule=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const modules={'boia-three':read('three.module.min.js'),'boia-nav':read('navigation.mjs'),'boia-joystick':read('boat-joystick.mjs'),'boia-ocean':read('ocean.mjs').replaceAll("'./three.module.min.js'","'boia-three'"),'boia-content':embedAssets(read('content.mjs').replaceAll("'./navigation.mjs'","'boia-nav'")),'boia-world':read('sea-world.mjs').replaceAll("'./ocean.mjs'","'boia-ocean'").replaceAll("'./three.module.min.js'","'boia-three'").replaceAll("'./navigation.mjs'","'boia-nav'")};
let main=read('sea.js').replaceAll("'./three.module.min.js'","'boia-three'").replaceAll("'./navigation.mjs'","'boia-nav'").replaceAll("'./content.mjs'","'boia-content'").replaceAll("'./boat-joystick.mjs'","'boia-joystick'").replaceAll("'./sea-world.mjs'","'boia-world'");
// The standard festival page is embedded too, retaining its working gallery.
let festival=embedAssets(read('festival.html')).replace('<link rel="stylesheet" href="style.css">','<style>'+read('style.css')+'</style>').replace('<script src="app.js"></script>','<script>'+read('app.js')+'</script>');
main+='\nconst festivalBlob=new Blob(['+JSON.stringify(festival)+'],{type:"text/html"});const festivalUrl=URL.createObjectURL(festivalBlob);document.addEventListener("click",e=>{const a=e.target.closest("a[href^=\\"festival.html\\"]");if(!a)return;e.preventDefault();window.open(festivalUrl,"_blank","noopener");});';
const importmap=JSON.stringify({imports:Object.fromEntries(Object.entries(modules).map(([k,v])=>[k,inlineModule(v)]))});
let html=embedAssets(read('index.html')).replace('<link rel="stylesheet" href="sea.css">','<style>'+read('sea.css')+'</style>').replace('<link rel="stylesheet" href="portal.css">','<style>'+embedAssets(read('portal.css'))+'</style>').replace('<script type="module" src="sea.js"></script>','<script type="importmap">'+importmap+'</script><script type="module">'+main.replaceAll('</script','<\\/script')+'</script>');
const out=new URL('./review/',import.meta.url);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(new URL('BOIA-Sea-Explorer.html',out),html);console.log('Self-contained game ready: '+Buffer.byteLength(html)+' bytes');

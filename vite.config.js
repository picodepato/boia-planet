import {defineConfig} from 'vite';
import {readFileSync} from 'node:fs';
import {localDatabase} from './scripts/local-db.mjs';
import {api} from './worker/api.mjs';
export default defineConfig({root:'dist',server:{host:'0.0.0.0',allowedHosts:['terminal.local']},plugins:[{
 name:'boia-responsive-check',configureServer(server){const DB=localDatabase();server.httpServer?.once('close',()=>DB.close());server.middlewares.use('/api',async(req,res)=>{try{let body='';for await(const part of req){body+=part;if(body.length>250000){res.statusCode=413;res.end();return;}}const headers={'Content-Type':'application/json'};const request=new Request('http://terminal.local:4173/api'+req.url,{method:req.method,headers,...(req.method!=='GET'&&req.method!=='HEAD'?{body}: {})});const result=await api(request,{DB});res.statusCode=result.status;result.headers.forEach((value,key)=>res.setHeader(key,value));res.end(await result.text());}catch{res.statusCode=503;res.end(JSON.stringify({error:'Local community service unavailable'}));}});server.middlewares.use('/__qa/mobile',(_req,res)=>{
  res.setHeader('Content-Type','text/html');res.end(readFileSync(new URL('./test/mobile.html',import.meta.url),'utf8'));
 });server.middlewares.use('/__qa/planet',(_req,res)=>{
  res.setHeader('Content-Type','text/html');res.end(readFileSync(new URL('./test/planet-mobile.html',import.meta.url),'utf8'));
 });}
}]});

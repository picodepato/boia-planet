import fs from 'node:fs/promises';
import path from 'node:path';
import {build} from 'vite';
const root=process.cwd(),dist=path.join(root,'dist');
const files={};async function walk(folder){for(const entry of await fs.readdir(folder,{withFileTypes:true})){if(entry.name.startsWith('.')||entry.name==='server')continue;const file=path.join(folder,entry.name);if(entry.isDirectory())await walk(file);else{const ext=path.extname(file);const type={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpeg':'image/jpeg','.webp':'image/webp','.txt':'text/plain; charset=utf-8'}[ext]||'application/octet-stream';files['/'+path.relative(dist,file).split(path.sep).join('/')]=[type,(await fs.readFile(file)).toString('base64')];}}}await walk(dist);
await fs.mkdir(path.join(root,'build'),{recursive:true});await fs.writeFile(path.join(root,'build/assets.mjs'),'export default '+JSON.stringify(files)+';\n');
await build({configFile:false,build:{target:'es2022',outDir:'dist/server',emptyOutDir:true,minify:true,lib:{entry:'worker/index.mjs',formats:['es'],fileName:()=> 'index.js'},rollupOptions:{output:{inlineDynamicImports:true}}},logLevel:'warn'});
await fs.mkdir(path.join(dist,'.openai'),{recursive:true});await fs.copyFile('.openai/hosting.json','dist/.openai/hosting.json');console.log('BOIA worker and '+Object.keys(files).length+' public assets built.');

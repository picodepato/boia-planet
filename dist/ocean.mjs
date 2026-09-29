import * as T from './three.module.min.js';

// Lit wave normals, shallow-water colour and moving surf, with no render targets.
export function createOcean(scene){
 const shores=[[-39,1,10], [42,37,8.5], [-12,44,10], [-38,-40,9], [62,-47,7], [9,-47,4], [-57,27,4]];
 const uniforms={time:{value:0},shores:{value:shores.map(s=>new T.Vector3(...s))},
  deep:{value:new T.Color('#075077')},shallow:{value:new T.Color('#39c6bb')}};
 const geometry=new T.PlaneGeometry(1500,1500);geometry.rotateX(-Math.PI/2);
 const material=new T.ShaderMaterial({uniforms,vertexShader:`
  varying vec3 vWorld;
  void main(){vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}
 `,fragmentShader:`
  uniform float time;
  uniform vec3 deep,shallow,shores[7];
  varying vec3 vWorld;
  void main(){
   vec2 p=vWorld.xz;float t=time*.65;
   float a=p.x*.31+p.y*.18-t,b=p.x*-.19+p.y*.43+t*.73;
   float c=p.x*.83+p.y*.67-t*1.6,d=p.x*-1.21+p.y*.89+t*1.1;
   vec2 slope=vec2(.31,.18)*cos(a)*.23+vec2(-.19,.43)*cos(b)*.16
    +vec2(.83,.67)*cos(c)*.06+vec2(-1.21,.89)*cos(d)*.025;
   vec3 normal=normalize(vec3(-slope.x,1.,-slope.y));
   vec3 viewDir=normalize(cameraPosition-vWorld);
   vec3 sunDir=normalize(vec3(-.55,.8,-.65));
   float fresnel=pow(1.-max(0.,dot(normal,viewDir)),3.);
   float shine=pow(max(0.,dot(normal,normalize(sunDir+viewDir))),80.);
   float shore=1000.;
   for(int i=0;i<7;i++){
    vec2 q=p-shores[i].xy;float angle=atan(q.y,q.x);
    float edge=shores[i].z*(1.+sin(angle*5.+.5)*.08+cos(angle*3.)*.09);
    shore=min(shore,length(q)-edge);
   }
   float shallows=exp(-max(shore,0.)*.17);
   float ripple=sin(a)*sin(b)*.5+.5;
   vec3 colour=mix(deep,shallow,shallows*.86+ripple*.065);
   float caustic=pow(1.-abs(sin(c+sin(d)*.7)),7.);
   colour+=vec3(.09,.17,.13)*caustic*shallows*.36;
   colour=mix(colour,vec3(.26,.61,.76),fresnel*.45);
   colour+=vec3(.85,.85,.68)*shine*.32;
   float surf=1.-smoothstep(.08,.39,abs(sin(shore*1.45-t*1.7+sin(a)*.35)));
   float coast=(1.-smoothstep(.7,3.8,shore))*smoothstep(-.4,.35,shore);
   colour=mix(colour,vec3(.67,.89,.84),surf*coast*.66);
   float crest=pow(max(0.,sin(c+sin(b)*.5)*sin(d*.65)),15.);
   colour+=vec3(.10,.16,.18)*crest*(1.-shallows*.6);
   float horizon=smoothstep(85.,320.,length(p));
   colour=mix(colour,deep*.82,horizon);
   gl_FragColor=vec4(colour,1.);
   #include <tonemapping_fragment>
   #include <colorspace_fragment>
  }
 `});
 const water=new T.Mesh(geometry,material);water.position.y=-.08;scene.add(water);
 return {water,uniforms};
}

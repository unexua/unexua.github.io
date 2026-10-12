(() => {
 const video=document.getElementById('project-video'),panel=document.getElementById('panorama-player');
 const canvas=document.getElementById('panorama-canvas'),play=document.getElementById('panorama-play');
 const seek=document.getElementById('panorama-seek'),time=document.getElementById('panorama-time');
 const volume=document.getElementById('panorama-volume'),mute=document.getElementById('panorama-mute');
 const loading=document.getElementById('panorama-loading');
 let active=false,gl=null,program=null,texture=null,uniforms={},raf=0,frameCallback=null;
 let yaw=0,pitch=.85,fov=75,viewDirty=true,textureDirty=true,drag=null;
 const radians=Math.PI/180;
 const clock=value=>{value=Math.max(0,Math.floor(Number.isFinite(value)?value:0));return `${Math.floor(value/60)}:${String(value%60).padStart(2,'0')}`;};
 function showState(){
  play.textContent=video.paused?'[ PLAY ▶ ]':'[ PAUSE Ⅱ ]';
  play.setAttribute('aria-label',video.paused?'Воспроизвести панораму':'Пауза');
  time.textContent=`${clock(video.currentTime)} / ${clock(video.duration)}`;
  if(Number.isFinite(video.duration)){seek.max=video.duration;seek.value=video.currentTime;}
  volume.value=video.muted?0:video.volume;mute.textContent=video.muted||video.volume===0?'[ SOUND OFF ]':'[ SOUND ON ]';
 }
 function fail(message){
  setActive(false);
  const status=document.getElementById('video-status');status.textContent=message;status.hidden=false;
 }
 function initialize(){
  gl=canvas.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true});
  if(!gl)return false;
  function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
  const vertex=shader(gl.VERTEX_SHADER,'attribute vec2 position;varying vec2 screen;void main(){screen=position;gl_Position=vec4(position,0.0,1.0);}');
  const fragment=shader(gl.FRAGMENT_SHADER,`
   precision highp float;
   varying vec2 screen;
   uniform sampler2D panorama;
   uniform float aspect,yaw,pitch,fov;
   void main(){
    float lens=tan(fov*.5);
    vec3 ray=normalize(vec3(screen.x*aspect*lens,screen.y*lens,-1.0));
    ray=vec3(ray.x,ray.y*cos(pitch)-ray.z*sin(pitch),ray.y*sin(pitch)+ray.z*cos(pitch));
    ray=vec3(ray.x*cos(yaw)+ray.z*sin(yaw),ray.y,-ray.x*sin(yaw)+ray.z*cos(yaw));
    vec2 uv=vec2(fract(.5+atan(ray.x,-ray.z)/6.28318530718),.5+asin(clamp(ray.y,-1.0,1.0))/3.14159265359);
    gl_FragColor=texture2D(panorama,uv);
   }`);
  program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
  gl.deleteShader(vertex);gl.deleteShader(fragment);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  for(const name of ['aspect','yaw','pitch','fov'])uniforms[name]=gl.getUniformLocation(program,name);
  gl.uniform1i(gl.getUniformLocation(program,'panorama'),0);
  texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
  return true;
 }
 function render(){
  if(!active)return;
  const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(1,Math.round(canvas.clientWidth*dpr)),h=Math.max(1,Math.round(canvas.clientHeight*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);viewDirty=true;}
  if(!video.requestVideoFrameCallback&&!video.paused)textureDirty=true;
  if(textureDirty&&video.readyState>=2&&!video.seeking){
   try{gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video);}
   catch(e){fail('360°-просмотр недоступен. Ролик можно посмотреть в обычном плеере.');return;}
   textureDirty=false;viewDirty=true;loading.hidden=true;
  }
  if(viewDirty){
   gl.uniform1f(uniforms.aspect,w/h);gl.uniform1f(uniforms.yaw,yaw);gl.uniform1f(uniforms.pitch,pitch);gl.uniform1f(uniforms.fov,fov*radians);
   gl.drawArrays(gl.TRIANGLES,0,6);viewDirty=false;
   canvas.dataset.yaw=yaw;canvas.dataset.pitch=pitch;canvas.dataset.fov=fov;
  }
  raf=requestAnimationFrame(render);
 }
 function watchFrames(){
  if(!active||!video.requestVideoFrameCallback)return;
  frameCallback=video.requestVideoFrameCallback(()=>{textureDirty=true;watchFrames();});
 }
 function setActive(enabled){
  active=!!enabled;cancelAnimationFrame(raf);
  if(frameCallback!==null&&video.cancelVideoFrameCallback)video.cancelVideoFrameCallback(frameCallback);
  frameCallback=null;drag=null;
  panel.hidden=!active;video.classList.toggle('panorama-source',active);video.controls=!active;
  if(active){
   try{if(!gl&&!initialize()){fail('360°-просмотр недоступен. Ролик можно посмотреть в обычном плеере.');return false;}}
   catch(e){fail('360°-просмотр недоступен. Ролик можно посмотреть в обычном плеере.');return false;}
   yaw=0;pitch=.85;fov=75;viewDirty=true;textureDirty=true;loading.hidden=false;showState();watchFrames();render();
  }else if(document.fullscreenElement===panel)document.exitFullscreen().catch(()=>{});
  return active;
 }
 function updateView(){pitch=Math.max(-1.48,Math.min(1.48,pitch));yaw%=Math.PI*2;viewDirty=true;}
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY};});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;yaw+=(e.clientX-drag.x)*.004;pitch+=(e.clientY-drag.y)*.004;drag={x:e.clientX,y:e.clientY};updateView();});
 canvas.addEventListener('pointerup',()=>{drag=null;});canvas.addEventListener('pointercancel',()=>{drag=null;});
 canvas.addEventListener('wheel',e=>{e.preventDefault();fov=Math.max(35,Math.min(100,fov+e.deltaY*.04));viewDirty=true;},{passive:false});
 canvas.addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))return;
  e.preventDefault();e.stopPropagation();
  if(e.key===' ')togglePlay();else{if(e.key==='ArrowLeft')yaw+=.08;if(e.key==='ArrowRight')yaw-=.08;if(e.key==='ArrowUp')pitch+=.08;if(e.key==='ArrowDown')pitch-=.08;updateView();}
 });
 function togglePlay(){if(video.paused)video.play().catch(()=>{});else video.pause();}
 play.addEventListener('click',togglePlay);
 seek.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=Number(seek.value);});
 volume.addEventListener('input',()=>{video.volume=Number(volume.value);video.muted=video.volume===0;});
 mute.addEventListener('click',()=>{video.muted=!video.muted;});
 document.getElementById('panorama-reset').addEventListener('click',()=>{yaw=0;pitch=.85;fov=75;viewDirty=true;});
 document.getElementById('panorama-fullscreen').addEventListener('click',()=>{if(document.fullscreenElement===panel)document.exitFullscreen().catch(()=>{});else panel.requestFullscreen().catch(()=>{});});
 for(const name of ['loadedmetadata','timeupdate','play','pause','ended','volumechange'])video.addEventListener(name,showState);
 for(const name of ['loadeddata','seeked'])video.addEventListener(name,()=>{textureDirty=true;});
 video.addEventListener('waiting',()=>{if(active)loading.hidden=false;});video.addEventListener('playing',()=>{if(active)loading.hidden=true;});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();gl=null;fail('360°-просмотр прерван. Ролик доступен в обычном плеере.');});
 window.portfolioPanorama={setActive};
})();

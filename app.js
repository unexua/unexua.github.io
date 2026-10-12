const projects = [
 {id:'kizhi',previewOnly:true,title:'Кижи',category:'projection',format:'PROJECTION',year:'2026',team:'Sila Sveta'},
 {id:'coal',title:'История угля',category:'installation',format:'INSTALLATION',year:'2025',team:'Radugadesign × Meshsplash',behance:'https://www.behance.net/gallery/251910929/Museum-of-the-Siberian-Heat'},
 {id:'sovremennik',title:'Современник',category:'projection',format:'PROJECTION',year:'2025',team:'Dreamlaser × Meshsplash'},
 {id:'space-odyssey',title:'Space Odyssey',category:'dome',format:'FULLDOME',year:'2026',team:'Meshsplash',behance:'https://www.behance.net/gallery/248894075/PROJECT-RESONANCE'},
 {id:'vozok',tags:['AI'],title:'Возок',category:'projection',format:'PROJECTION',year:'2026',team:'Meshsplash'},
 {id:'moskino',title:'Москино',category:'projection',format:'PROJECTION',year:'2025',team:'Dreamlaser × Meshsplash'},
 {id:'samosura',videoSrc:'media/samosura-restored.mp4',title:'Samosura',category:'dome',format:'FULLDOME',year:'2024',team:'Meshsplash',client:'Intervals 2024',behance:'https://www.behance.net/gallery/230852961/SAMOSURA'},
 {id:'bosideng',previewOnly:true,videoSrc:'media/bosideng-restored.mp4',tags:['AI'],title:'Bosideng',category:'projection',format:'PROJECTION',year:'2026',team:'Radugadesign × Meshsplash'},
 {id:'sevastopol',hidden:true,title:'Севастополь',category:'dome',format:'FULLDOME',year:'2026',team:'Meshsplash',previewOnly:true}
].filter(project=>!project.hidden);
const contributions={
 bosideng:{role:'CG Generalist',cardRole:'CG Generalist · Full cycle',scope:'FULL CYCLE / AI → ASSEMBLY',scenes:'full',contribution:'Полное производство ролика: генерация с помощью нейросетей и последующая сборка.'},
 kizhi:{role:'CG Generalist',cardRole:'CG Generalist · Full cycle',scenes:'full'},
 samosura:{role:'CG Generalist',scenes:'01:50–03:15'},
 sovremennik:{role:'CG Generalist',scenes:'00:00–00:20 / 00:42–01:07 / 01:32–02:00'},
 vozok:{role:'CG Generalist',cardRole:'CG Generalist · Full cycle',scope:'FULL CYCLE / AI → ASSEMBLY',scenes:'full',contribution:'Полное производство ролика: генерация с помощью нейросетей и последующая сборка.'},
 'space-odyssey':{role:'CG Supervisor / Compositor',scenes:'full',contribution:'Композитинг и супервайзинг.'},
 moskino:{role:'CG Generalist',scenes:'00:15–00:30 / 01:30–01:45'},
 coal:{role:'CG Generalist',cardRole:'CG Generalist · Full cycle',scope:'FULL CYCLE / 3D → COMPOSITING',scenes:'full',contribution:'Полная сборка: от 3D до композитинга.'},
 sevastopol:{role:'CG Generalist / CG Supervisor'}
};
projects.forEach(p=>{Object.assign(p,contributions[p.id]||{});p.videoSrc=`https://storage.yandexcloud.net/unexua-portfolio-media/20261012-media-originals-${p.id}.mp4`;});
const compactMedia=()=>matchMedia('(max-width: 800px)').matches||!!navigator.connection?.saveData||/^(slow-2g|2g|3g)$/.test(navigator.connection?.effectiveType||'');
const coverDimensions={"sovremennik":{"height":1920,"width":3780},"vozok":{"height":2160,"width":3840},"kizhi":{"height":2048,"width":6824},"showreel":{"height":900,"width":1600},"bosideng":{"height":2350,"width":4000},"samosura":{"height":4096,"width":4096},"coal":{"height":1308,"width":1988},"space-odyssey":{"height":4096,"width":4096},"moskino":{"height":2160,"width":3660}};
const grid=document.getElementById('project-grid');
const coverNames={bosideng:'BOSIDENG',kizhi:'KIZHI',samosura:'SAMOSURA',sovremennik:'SOVREMENNIK',vozok:'VOZOK','space-odyssey':'SPACE ODYSSEY',moskino:'MOSKINO',coal:'HISTORY OF COAL',sevastopol:'SEVASTOPOL'};
grid.innerHTML=projects.map((p,i)=>`<article class="project" data-category="${p.category}" data-id="${p.id}" data-glitch="${['bands','scan'][i%2]}"><button class="project-link" type="button" data-open="${p.id}" aria-label="Открыть проект ${p.title}"><div class="project-image cover" style="--poster-large:url(https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-cover-${p.id}${p.id==='kizhi'?'-master':''}-1600.webp);--poster-small:url(https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-cover-${p.id}${p.id==='kizhi'?'-master':''}-1600.webp)"><img class="cover-art" src="https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-cover-${p.id}${p.id==='kizhi'?'-master':''}-1024.webp" srcset="https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-cover-${p.id}${p.id==='kizhi'?'-master':''}-1024.webp 1024w, https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-cover-${p.id}${p.id==='kizhi'?'-master':''}-1600.webp 1600w" sizes="(max-width: 650px) 50vw, 25vw" decoding="async" alt="Обложка проекта ${p.title}" loading="lazy" width="${coverDimensions[p.id].width}" height="${coverDimensions[p.id].height}"><span class="project-glitch slice-one" aria-hidden="true"></span><span class="project-glitch slice-two" aria-hidden="true"></span><span class="media-grain" aria-hidden="true"></span><span class="media-scanline" aria-hidden="true"></span><div class="cover-header" aria-hidden="true"><span class="cover-id">[ ${String(i+1).padStart(3,'0')} ]</span><span class="cover-format">${p.format.replace(' ','_')}</span>${(p.tags||[]).map(tag=>`<span class="cover-format cover-tag">/ ${tag}</span>`).join('')}<span class="cover-year">${p.year}</span></div><div class="cover-guide" aria-hidden="true"><span>+</span><span>+</span></div><div class="cover-caption"><span class="cover-file" aria-hidden="true">ID /</span><h3 class="glitch-text" aria-label="${p.title}" data-text="${coverNames[p.id]}">${coverNames[p.id]}</h3><div class="cover-bottom" aria-hidden="true"><span class="cover-bars"></span><span class="cover-play">${['space-odyssey','samosura'].includes(p.id)?'[ 360° PREVIEW ↗ ]':p.previewOnly?'[ PREVIEW ↗ ]':'[ PLAY ↗ ]'}</span></div></div></div></button><div class="project-meta"><span class="project-team">${p.team}${p.client?` × ${p.client}`:""}</span>${p.role?`<span class="project-role">${p.cardRole||p.role}</span>`:""}</div>${p.behance?`<div class="project-resources"><a class="project-behance" href="${p.behance}" target="_blank" rel="noopener noreferrer" aria-label="${p.title} на Behance"><svg aria-hidden="true"><use href="#icon-behance"></use></svg><span>Behance ↗</span></a></div>`:""}</article>`).join('');

const dialog=document.getElementById('project-dialog'),video=document.getElementById('project-video'),heroVideo=document.getElementById('hero-video'),motionToggle=document.getElementById('motion-toggle');
const qualityControl=document.getElementById('video-quality'),qualitySelect=document.getElementById('video-quality-select');
const showreelQualitySources={'2160-max':'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-showreel-master-max.mp4','2160':'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-showreel-master-4k.mp4','1080':'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-showreel-master-1080.mp4','720':'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-showreel-master-720.mp4'};
let qualityChangeController=null,activeQualitySources={};
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
heroVideo.src=heroVideo.clientWidth*devicePixelRatio>1920?'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-hero-master-2560.mp4':'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-hero-master-1080.mp4';
heroVideo.poster='https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-showreel-master-poster.webp';
let activeId=null,lastTrigger=null,backgroundPaused=reduced.matches||!!navigator.connection?.saveData,heroVisible=true,hoverActive=false;
function syncMotion(){motionToggle.setAttribute('aria-pressed',String(backgroundPaused));motionToggle.textContent=backgroundPaused?'PLAY ▶':'PAUSE Ⅱ';if(backgroundPaused||dialog.open||document.hidden||!heroVisible||hoverActive)heroVideo.pause();else heroVideo.play().catch(()=>{});}
syncMotion();
motionToggle.addEventListener('click',()=>{backgroundPaused=!backgroundPaused;syncMotion();});
reduced.addEventListener('change',e=>{backgroundPaused=e.matches;syncMotion();});
document.addEventListener('visibilitychange',syncMotion);
const heroObserver=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncMotion();},{threshold:.08});heroObserver.observe(document.querySelector('.hero'));
function openProject(id,trigger,updateUrl=true){
 stopPreview();
 const p=id==='showreel'?{id:'showreel',title:'Showreel 2026',format:'CG / 3D MOTION',year:'2026',team:'Alexander Fedosov',videoSrc:showreelQualitySources['2160']}:projects.find(p=>p.id===id);
 if(!p)return;
 qualityChangeController?.abort();qualityChangeController=null;
 const choices=p.previewOnly?[]:id==='showreel'?[{value:'2160',label:'4K / web',src:showreelQualitySources['2160']},{value:'2160-max',label:'4K / max quality',src:showreelQualitySources['2160-max']},{value:'1080',label:'1080p',src:showreelQualitySources['1080']},{value:'720',label:'720p',src:showreelQualitySources['720']}]:window.PORTFOLIO_VIDEO_QUALITIES?.[id]||[];
 activeQualitySources=Object.fromEntries(choices.map(choice=>[choice.value,choice.src]));
 qualitySelect.replaceChildren(...choices.map(choice=>new Option(choice.label,choice.value)));
 qualityControl.hidden=p.previewOnly||choices.length<2;
 if(choices.length){qualitySelect.value=choices[0].value;p.videoSrc=choices[0].src;}
 if(['space-odyssey','samosura'].includes(id))video.crossOrigin='anonymous';else video.removeAttribute('crossorigin');
 if(updateUrl&&location.hash!==`#project/${id}`)history.pushState(null,'',`#project/${id}`);
 activeId=id;if(trigger)lastTrigger=trigger;
 video.pause();video.removeAttribute('src');video.hidden=!!p.previewOnly;
 const placeholder=document.getElementById('project-placeholder');placeholder.hidden=!p.previewOnly;
 const poster=id==='kizhi'?'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-cover-kizhi-native-master.webp':id==='showreel'?'https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-showreel-master-poster.webp':`https://storage.yandexcloud.net/unexua-portfolio-media/20261012-cases-hq-${p.id}.webp`;
 if(p.previewOnly){placeholder.src=poster;placeholder.alt=`Обложка проекта ${p.title}`;}
 else{placeholder.removeAttribute('src');video.src=p.videoSrc||`https://storage.yandexcloud.net/unexua-portfolio-media/${p.id}.mp4`;video.poster=poster;}
 document.getElementById('video-status').hidden=true;video.load();
 document.getElementById('dialog-title').textContent=p.title;
 document.getElementById('dialog-description').textContent=[`format: ${p.format.toLowerCase().replaceAll(' ','_')} / year: ${p.year}`,p.client?`client: ${p.client}`:'',p.role?`role: ${p.role}`:'',p.contribution?`work: ${p.contribution}`:'',p.scenes?`scenes: ${p.scenes}`:''].filter(Boolean).join('\n');
 document.getElementById('dialog-category').textContent=p.format;
 document.getElementById('dialog-year').textContent=`year: ${p.year}`;
 document.getElementById('dialog-team').textContent=`studio: ${p.team}`;
 document.getElementById('dialog-position').textContent=id==='showreel'?'SHOWREEL / 00:29':`${String(projects.indexOf(p)+1).padStart(3,'0')} / ${String(projects.length).padStart(3,'0')}`;
 document.getElementById('share-project').dataset.share=id;
 document.getElementById('project-navigation').hidden=id==='showreel';
 if(!dialog.open){dialog.showModal();document.body.style.overflow='hidden';}heroVideo.pause();
 window.portfolioPanorama?.setActive(['space-odyssey','samosura'].includes(id));
}
qualitySelect.addEventListener('change',()=>{
 if(!dialog.open)return;
 const projectId=activeId,source=activeQualitySources[qualitySelect.value];if(!source)return;
 const position=qualityChangeController?.position??video.currentTime,wasPlaying=qualityChangeController?.wasPlaying??(!video.paused&&!video.ended),rate=qualityChangeController?.rate??video.playbackRate;
 qualityChangeController?.abort();
 const controller=new AbortController();controller.wasPlaying=wasPlaying;controller.position=position;controller.rate=rate;qualityChangeController=controller;
 video.pause();document.getElementById('video-status').hidden=true;
 video.addEventListener('loadedmetadata',()=>{
  if(controller.signal.aborted||activeId!==projectId||!dialog.open)return;
  video.playbackRate=rate;
  const resume=()=>{if(!controller.signal.aborted&&activeId===projectId&&dialog.open){qualityChangeController=null;if(wasPlaying)video.play().catch(()=>{});}};
  const target=Math.min(position,Math.max(0,video.duration-.05));
  if(target>.01){video.addEventListener('seeked',resume,{once:true,signal:controller.signal});video.currentTime=target;}else resume();
 },{once:true,signal:controller.signal});
 video.src=source;video.load();
});
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-open]');if(trigger)openProject(trigger.dataset.open,trigger);});
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{qualityChangeController?.abort();qualityChangeController=null;window.portfolioPanorama?.setActive(false);if(location.hash.startsWith('#project/'))history.replaceState(null,'','#work');video.pause();video.removeAttribute('src');video.load();document.body.style.overflow='';syncMotion();lastTrigger?.focus({preventScroll:true});});
function stepProject(direction){const index=projects.findIndex(p=>p.id===activeId);if(index<0)return;openProject(projects[(index+direction+projects.length)%projects.length].id);}
document.getElementById('previous-project').addEventListener('click',()=>stepProject(-1));
document.getElementById('next-project').addEventListener('click',()=>stepProject(1));
dialog.addEventListener('keydown',e=>{if(!dialog.open||activeId==='showreel'||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable]'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();if(!e.repeat)stepProject(e.key==='ArrowLeft'?-1:1);}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;let count=0;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('.project').forEach(p=>{p.hidden=filter!=='all'&&p.dataset.category!==filter;if(!p.hidden)count++;});
 grid.classList.toggle('filtered',filter!=='all');document.querySelector('.filter-count').textContent=`${String(count).padStart(2,'0')} FILES`;
}));
const fxToggle=document.getElementById('fx-toggle');
fxToggle.addEventListener('click',()=>{const off=document.body.classList.toggle('fx-off');fxToggle.setAttribute('aria-pressed',String(!off));document.getElementById('fx-state').textContent=off?'OFF':'ON';});

const coverToggle=document.getElementById('cover-toggle');
coverToggle.addEventListener('click',()=>{const color=document.body.classList.toggle('color-covers');coverToggle.setAttribute('aria-pressed',String(!color));coverToggle.textContent=color?'COVER: COLOR':'COVER: MONO';});

// Stable, subtle presets rather than random distortions on each entry.
document.querySelector('.reel-screen').dataset.glitch='bands';
function syncAmbient(){document.body.classList.toggle('effects-paused',document.hidden||dialog.open);}
document.addEventListener('visibilitychange',syncAmbient);
dialog.addEventListener('close',syncAmbient);
new MutationObserver(syncAmbient).observe(dialog,{attributes:true,attributeFilter:['open']});

// One shared decoder; short, silent previews load only on deliberate hover/focus.
const previewPointer=matchMedia('(any-hover: hover) and (any-pointer: fine)');
const hoverPreview=document.createElement('video');
hoverPreview.className='hover-preview';hoverPreview.muted=true;hoverPreview.defaultMuted=true;
hoverPreview.playsInline=true;hoverPreview.preload='auto';hoverPreview.setAttribute('aria-hidden','true');hoverPreview.setAttribute('tabindex','-1');
let previewSurface=null,previewDelay=null,previewGeneration=0;
function stopPreview(resumeHero=true){
 previewGeneration++;hoverActive=false;
 clearTimeout(previewDelay);previewDelay=null;
 previewSurface?.classList.remove('previewing');previewSurface=null;
 hoverPreview.pause();hoverPreview.removeAttribute('src');hoverPreview.load();hoverPreview.remove();
 if(resumeHero)syncMotion();
}
function startPreview(surface){
 if(navigator.connection?.saveData||!previewPointer.matches||dialog.open||document.hidden||previewSurface===surface)return;
 stopPreview(false);previewSurface=surface;hoverActive=true;syncMotion();
 const generation=previewGeneration;
 previewDelay=setTimeout(()=>{
  if(previewSurface!==surface||generation!==previewGeneration)return;
  surface.querySelector('.project-image').append(hoverPreview);
  hoverPreview.src=`https://storage.yandexcloud.net/unexua-portfolio-media/20261012-opt-preview-${surface.dataset.id}${surface.dataset.id==='kizhi'?'-master':''}.mp4`;
  hoverPreview.play().catch(()=>{if(previewSurface===surface&&generation===previewGeneration)stopPreview();});
 },180);
}
hoverPreview.addEventListener('playing',()=>{if(hoverPreview.readyState>=2)previewSurface?.classList.add('previewing');});
hoverPreview.addEventListener('ended',stopPreview);
hoverPreview.addEventListener('error',()=>{if(hoverPreview.error)stopPreview();});
document.querySelectorAll('.project').forEach(surface=>{
 surface.addEventListener('pointerenter',()=>startPreview(surface));
 surface.addEventListener('pointerleave',()=>{if(previewSurface===surface)stopPreview();});
 surface.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))startPreview(surface);});
 surface.addEventListener('focusout',e=>{if(!surface.contains(e.relatedTarget)&&previewSurface===surface)stopPreview();});
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPreview();});
// Deliberate hover previews remain available; reduced motion still pauses ambient effects.
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',stopPreview));

video.addEventListener('error',()=>{const status=document.getElementById('video-status');status.textContent='Не удалось загрузить видео. Проверь соединение и открой проект ещё раз.';status.hidden=false;});

// Project URLs remain local in the sandbox and use the same routes when published.
function syncProjectRoute(){
 const match=location.hash.match(/^#project\/([a-z0-9-]+)$/);
 if(match&&(match[1]==='showreel'||projects.some(p=>p.id===match[1]))){
  if(!dialog.open||activeId!==match[1])openProject(match[1],document.querySelector(`[data-open="${match[1]}"]`),false);
 }else if(dialog.open)dialog.close();
}
window.addEventListener('hashchange',syncProjectRoute);
window.addEventListener('popstate',syncProjectRoute);
syncProjectRoute();
let feedbackTimer;
async function copyValue(value,button){
 const status=document.getElementById('copy-feedback');
 const field=document.createElement('textarea');field.value=value;field.className='clipboard-fallback';
 (dialog.open?dialog:document.body).append(field);field.select();
 let copied=false;
 try{copied=document.execCommand('copy');}catch{}
 field.remove();button.focus({preventScroll:true});
 if(!copied){try{await navigator.clipboard.writeText(value);copied=true;}catch{}}
 status.textContent=copied?'Скопировано':'Не удалось скопировать';
 const original=button.dataset.originalLabel||button.textContent;button.dataset.originalLabel=original;
 button.textContent=copied?'[ COPIED ]':'[ RETRY ]';
 clearTimeout(button.copyTimer);button.copyTimer=setTimeout(()=>button.textContent=original,2200);
 status.hidden=false;clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>status.hidden=true,2200);
}

document.addEventListener('click',e=>{
 const button=e.target.closest('[data-copy],[data-share]');if(!button)return;
 const url=new URL(location.href);url.hash=`project/${button.dataset.share}`;
 copyValue(button.dataset.copy||url.href,button);
});

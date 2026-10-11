const projects = [
 {id:'kizhi',title:'Кижи',category:'projection',format:'PROJECTION',year:'2026',team:'Sila Sveta'},
 {id:'samosura',previewOnly:true,title:'Samosura',category:'dome',format:'FULL DOME',year:'2024',team:'Meshsplash',client:'Intervals 2024',behance:'https://www.behance.net/gallery/230852961/SAMOSURA'},
 {id:'sovremennik',title:'Современник',category:'projection',format:'PROJECTION',year:'2025',team:'Dreamlaser × Meshsplash'},
 {id:'vozok',title:'Возок',category:'projection',format:'PROJECTION',year:'2026',team:'Meshsplash'},
 {id:'space-odyssey',title:'Space Odyssey',category:'dome',format:'FULL DOME',year:'2026',team:'Meshsplash',behance:'https://www.behance.net/gallery/248894075/PROJECT-RESONANCE'},
 {id:'moskino',title:'Москино',category:'projection',format:'PROJECTION',year:'2025',team:'Dreamlaser × Meshsplash'},
 {id:'coal',title:'История угля',category:'installation',format:'INSTALLATION',year:'2025',team:'Radugadesign × Meshsplash',behance:'https://www.behance.net/gallery/251910929/Museum-of-the-Siberian-Heat'},
 {id:'sevastopol',title:'Севастополь',category:'dome',format:'FULL DOME',year:'2026',team:'Meshsplash',previewOnly:true},
 {id:'bosideng',previewOnly:true,title:'Bosideng',category:'projection',format:'PROJECTION',year:'2026',team:'Radugadesign × Meshsplash'}
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
projects.forEach(p=>Object.assign(p,contributions[p.id]||{}));
const compactMedia=()=>matchMedia('(max-width: 800px)').matches||!!navigator.connection?.saveData||/^(slow-2g|2g|3g)$/.test(navigator.connection?.effectiveType||'');
const coverDimensions={"bosideng":{"width":1600,"height":940},"kizhi":{"width":1600,"height":480},"samosura":{"width":1600,"height":1600},"sovremennik":{"width":1600,"height":813},"vozok":{"width":1600,"height":900},"space-odyssey":{"width":1600,"height":1600},"moskino":{"width":1600,"height":944},"coal":{"width":1600,"height":1053},"sevastopol":{"width":1600,"height":1600},"showreel":{"width":1600,"height":900}};
const grid=document.getElementById('project-grid');
const coverNames={bosideng:'BOSIDENG',kizhi:'KIZHI',samosura:'SAMOSURA',sovremennik:'SOVREMENNIK',vozok:'VOZOK','space-odyssey':'SPACE ODYSSEY',moskino:'MOSKINO',coal:'HISTORY OF COAL',sevastopol:'SEVASTOPOL'};
grid.innerHTML=projects.map((p,i)=>`<article class="project" data-category="${p.category}" data-id="${p.id}" data-glitch="${['bands','scan'][i%2]}"><button class="project-link" type="button" data-open="${p.id}" aria-label="Открыть проект ${p.title}"><div class="project-image cover" style="--poster-large:url(assets/${p.id}.webp);--poster-small:url(assets/${p.id}-small.webp)"><img class="cover-art" src="assets/${p.id}-small.webp" srcset="assets/${p.id}-small.webp 800w, assets/${p.id}.webp 1600w" sizes="(min-width:900px) 33vw, (min-width:371px) 50vw, 100vw" decoding="async" alt="Обложка проекта ${p.title}" loading="lazy" width="${coverDimensions[p.id].width}" height="${coverDimensions[p.id].height}"><span class="project-glitch slice-one" aria-hidden="true"></span><span class="project-glitch slice-two" aria-hidden="true"></span><span class="media-grain" aria-hidden="true"></span><span class="media-scanline" aria-hidden="true"></span><div class="cover-header" aria-hidden="true"><span class="cover-id">[ ${String(i+1).padStart(3,'0')} ]</span><span class="cover-format">${p.format.replace(' ','_')}</span><span class="cover-year">${p.year}</span></div><div class="cover-guide" aria-hidden="true"><span>+</span><span>+</span></div><div class="cover-caption"><span class="cover-file" aria-hidden="true">ID /</span><h3 class="glitch-text" aria-label="${p.title}" data-text="${coverNames[p.id]}">${coverNames[p.id]}</h3><div class="cover-bottom" aria-hidden="true"><span class="cover-bars"></span><span class="cover-play">[ PLAY ↗ ]</span></div></div></div></button><div class="project-meta"><span class="project-team">${p.team}${p.client?` × ${p.client}`:""}</span>${p.role?`<span class="project-role">${p.cardRole||p.role}</span>`:""}</div>${p.behance?`<div class="project-resources"><a class="project-behance" href="${p.behance}" target="_blank" rel="noopener noreferrer" aria-label="${p.title} на Behance"><svg aria-hidden="true"><use href="#icon-behance"></use></svg><span>Behance ↗</span></a></div>`:""}</article>`).join('');

const dialog=document.getElementById('project-dialog'),video=document.getElementById('project-video'),heroVideo=document.getElementById('hero-video'),motionToggle=document.getElementById('motion-toggle');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
heroVideo.src=(matchMedia('(max-width: 800px)').matches||navigator.connection?.saveData)?'assets/hero-mobile.mp4':'https://storage.yandexcloud.net/unexua-portfolio-media/hero-hq-4k.mp4';
heroVideo.poster=`assets/showreel${compactMedia()?'-small':''}.webp`;
let activeId=null,lastTrigger=null,backgroundPaused=reduced.matches||!!navigator.connection?.saveData,heroVisible=true;
function syncMotion(){motionToggle.setAttribute('aria-pressed',String(backgroundPaused));motionToggle.textContent=backgroundPaused?'PLAY ▶':'PAUSE Ⅱ';if(backgroundPaused||dialog.open||document.hidden||!heroVisible)heroVideo.pause();else heroVideo.play().catch(()=>{});}
syncMotion();
motionToggle.addEventListener('click',()=>{backgroundPaused=!backgroundPaused;syncMotion();});
reduced.addEventListener('change',e=>{backgroundPaused=e.matches;syncMotion();});
document.addEventListener('visibilitychange',syncMotion);
const heroObserver=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncMotion();},{threshold:.08});heroObserver.observe(document.querySelector('.hero'));
function openProject(id,trigger,updateUrl=true){
 stopPreview();
 const p=id==='showreel'?{id:'showreel',title:'Showreel 2025',format:'CG / 3D MOTION',year:'2025',team:'Alexander Fedosov'}:projects.find(p=>p.id===id);
 if(!p)return;
 if(updateUrl&&location.hash!==`#project/${id}`)history.pushState(null,'',`#project/${id}`);
 activeId=id;if(trigger)lastTrigger=trigger;
 video.pause();video.removeAttribute('src');video.hidden=!!p.previewOnly;
 const placeholder=document.getElementById('project-placeholder');placeholder.hidden=!p.previewOnly;
 const poster=`assets/${p.id}${compactMedia()?'-small':''}.webp`;
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
}
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-open]');if(trigger)openProject(trigger.dataset.open,trigger);});
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(location.hash.startsWith('#project/'))history.replaceState(null,'','#work');video.pause();video.removeAttribute('src');video.load();document.body.style.overflow='';syncMotion();lastTrigger?.focus({preventScroll:true});});
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
const previewPointer=matchMedia('(hover: hover) and (pointer: fine)');
const hoverPreview=document.createElement('video');
hoverPreview.className='hover-preview';hoverPreview.muted=true;hoverPreview.defaultMuted=true;
hoverPreview.playsInline=true;hoverPreview.preload='none';hoverPreview.setAttribute('aria-hidden','true');hoverPreview.setAttribute('tabindex','-1');
let previewSurface=null,previewDelay=null;
function stopPreview(){
 clearTimeout(previewDelay);previewDelay=null;
 previewSurface?.classList.remove('previewing');previewSurface=null;
 hoverPreview.pause();hoverPreview.removeAttribute('src');hoverPreview.load();hoverPreview.remove();
}
function startPreview(surface){
 if(navigator.connection?.saveData||!previewPointer.matches||reduced.matches||dialog.open||document.hidden||previewSurface===surface)return;
 stopPreview();previewSurface=surface;
 previewDelay=setTimeout(()=>{
  if(previewSurface!==surface)return;
  surface.querySelector('.project-image').append(hoverPreview);
  hoverPreview.src=`assets/previews/${surface.dataset.id}.mp4`;
  hoverPreview.play().catch(()=>{if(previewSurface===surface)stopPreview();});
 },180);
}
hoverPreview.addEventListener('playing',()=>previewSurface?.classList.add('previewing'));
hoverPreview.addEventListener('ended',stopPreview);
hoverPreview.addEventListener('error',stopPreview);
document.querySelectorAll('.project').forEach(surface=>{
 surface.addEventListener('pointerenter',()=>startPreview(surface));
 surface.addEventListener('pointerleave',()=>{if(previewSurface===surface)stopPreview();});
 surface.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))startPreview(surface);});
 surface.addEventListener('focusout',e=>{if(!surface.contains(e.relatedTarget)&&previewSurface===surface)stopPreview();});
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPreview();});
reduced.addEventListener('change',()=>{if(reduced.matches)stopPreview();});
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

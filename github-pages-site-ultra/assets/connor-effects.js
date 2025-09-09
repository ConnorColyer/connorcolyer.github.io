
/* ===== Connor Effects — MAX edition ===== */
(() => {
  if (window.__connorFX) return; window.__connorFX = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { document.documentElement.insertAdjacentHTML('beforeend', '<style>body,*{cursor:auto!important}</style>'); } catch {}

  // Loader kill switch
  const hideLoader = () => { const l=document.getElementById('loader'); if(!l) return; l.style.transition='opacity .35s ease'; l.style.opacity='0'; setTimeout(()=>{ try{ l.remove(); }catch{} },420); };
  const onReady = () => hideLoader();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady); else onReady();
  setTimeout(hideLoader, 1500);

  // Scroll progress + BackToTop
  try { const bar = document.getElementById('scrollProgress'); if (bar && !reduce) { const upd=()=>{ const d=document.documentElement; const m=d.scrollHeight-d.clientHeight; bar.style.transform=`scaleX(${m>0?(d.scrollTop/m):0})`; }; document.addEventListener('scroll',upd,{passive:true}); upd(); } } catch {}
  try { const t=document.getElementById('backToTop'); if(t){ const v=()=>t.classList.toggle('show',(window.scrollY||document.documentElement.scrollTop)>500); document.addEventListener('scroll',v,{passive:true}); v(); t.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})); } } catch {}

  // Intersection reveal + stagger
  try {
    const obs=new IntersectionObserver((ents)=>{
      ents.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target;
          el.classList.add('visible');
          if (el.hasAttribute('data-stagger')) {
            Array.from(el.children).forEach(ch => ch.classList.add('reveal-child'));
          }
          obs.unobserve(el);
        }
      });
    },{threshold:.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('[data-stagger], .reveal, .timeline-item, .project-card').forEach(el=>{
      el.classList.add('reveal'); obs.observe(el);
    });
  } catch {}

  // Ripple
  document.addEventListener('click',(e)=>{
    const btn=e.target && e.target.closest ? e.target.closest('button, .submit-btn, .skill-chip, a.button, .btn, .magnetic') : null;
    if(!btn) return;
    btn.classList.add('fx-rip-wrap');
    const r=btn.getBoundingClientRect(); const s=Math.max(r.width,r.height);
    const span=document.createElement('span'); span.className='fx-ripple';
    span.style.width=span.style.height=s+'px'; span.style.left=(e.clientX-r.left-s/2)+'px'; span.style.top=(e.clientY-r.top-s/2)+'px';
    btn.appendChild(span); span.addEventListener('animationend',()=>span.remove());
  }, {passive:true});

  // Particles — 2 layers (depth effect) on #particles
  try {
    const c = document.getElementById('particles');
    if (c && !reduce) {
      const ctx = c.getContext('2d');
      let dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
      let w=0,h=0, near=[], far=[];
      const cfg = { count: 70, speed:.18, connect: 130, radius:[1,2.4] };
      const rnd=(a,b)=> a + Math.random()*(b-a);
      const resize = () => {
        const r = c.getBoundingClientRect();
        w = r.width||window.innerWidth; h = r.height||300;
        c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr);
        ctx.setTransform(dpr,0,0,dpr,0,0);
        const n = Math.max(34, Math.round(cfg.count * (w/1200)));
        near = Array.from({length:n}, ()=>({x:rnd(0,w), y:rnd(0,h), vx:rnd(-cfg.speed,cfg.speed), vy:rnd(-cfg.speed,cfg.speed), r:rnd(1.3,2.6)}));
        far = Array.from({length:Math.round(n*0.6)}, ()=>({x:rnd(0,w), y:rnd(0,h), vx:rnd(-cfg.speed*.6,cfg.speed*.6), vy:rnd(-cfg.speed*.6,cfg.speed*.6), r:rnd(.8,1.6)}));
      };
      const drawLayer = (pts, color, connect) => {
        for(let i=0;i<pts.length;i++){
          const p=pts[i];
          p.x+=p.vx; p.y+=p.vy;
          if(p.x<-50) p.x=w+50; if(p.x>w+50) p.x=-50;
          if(p.y<-50) p.y=h+50; if(p.y>h+50) p.y=-50;
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=color; ctx.fill();
          for(let j=i+1;j<pts.length;j++){
            const q=pts[j]; const dx=p.x-q.x, dy=p.y-q.y; const dist=Math.hypot(dx,dy);
            if(dist<connect){ const a=1-(dist/connect); ctx.strokeStyle=`rgba(155,140,255,${0.16*a})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke(); }
          }
        }
      };
      const tick = () => {
        ctx.clearRect(0,0,w,h);
        drawLayer(far, 'rgba(99,102,241,.35)', cfg.connect*0.9);
        drawLayer(near,'rgba(99,102,241,.65)', cfg.connect*1.1);
        requestAnimationFrame(tick);
      };
      if ('ResizeObserver' in window) new ResizeObserver(resize).observe(c.parentElement||document.body);
      else window.addEventListener('resize', resize);
      resize(); tick();
    }
  } catch {}

  // 3D tilt + glare (rAF + lerp; disable on coarse pointer / reduced motion)
  try {
    const coarse = matchMedia('(pointer: coarse)').matches;
    if (!coarse && !reduce) {
      const LERP=.18, MAX=8; // degrees
      const els = document.querySelectorAll('.tilt-3d');
      els.forEach(el => {
        let tx=0, ty=0, cx=0, cy=0, raf=null;
        const inner = el.querySelector('.tilt-inner') || el;
        let glare = el.querySelector('.tilt-glare');
        if (!glare) { glare = document.createElement('div'); glare.className='tilt-glare'; el.appendChild(glare); }
        const step=()=>{
          cx += (tx - cx) * LERP; cy += (ty - cy) * LERP;
          inner.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
          if (raf) raf = requestAnimationFrame(step); else inner.style.transform = '';
        };
        const queue=(x,y)=>{ tx=Math.max(-MAX,Math.min(MAX,x)); ty=Math.max(-MAX,Math.min(MAX,y)); if(!raf) raf=requestAnimationFrame(step); };
        el.addEventListener('pointermove', (e)=>{
          const r=el.getBoundingClientRect();
          const x=(e.clientX - r.left)/r.width - .5;
          const y=(e.clientY - r.top)/r.height - .5;
          el.style.setProperty('--mx', (x*100+50)+'%');
          el.style.setProperty('--my', (y*100+50)+'%');
          queue(x*MAX*2, -y*MAX*2);
        });
        el.addEventListener('pointerleave', ()=> { queue(0,0); });
      });
    }
  } catch {}

  // Magnetic buttons (follow cursor a few px)
  try {
    const coarse = matchMedia('(pointer: coarse)').matches;
    if (!coarse && !reduce) {
      const els = document.querySelectorAll('.magnetic');
      els.forEach(el => {
        let tx=0, ty=0, cx=0, cy=0, raf=null;
        const LERP=.2, MAX=10;
        const step=()=>{ cx += (tx-cx)*LERP; cy += (ty-cy)*LERP; el.style.transform=`translate(${cx}px,${cy}px)`; raf=requestAnimationFrame(step); };
        el.addEventListener('pointermove', (e)=>{
          const r=el.getBoundingClientRect();
          const x=(e.clientX-r.left)/r.width - .5;
          const y=(e.clientY-r.top)/r.height - .5;
          el.style.setProperty('--mx', (x*100+50)+'%'); el.style.setProperty('--my', (y*100+50)+'%');
          tx = x*MAX; ty = y*MAX; if(!raf) raf=requestAnimationFrame(step);
        });
        el.addEventListener('pointerleave', ()=> { tx=0; ty=0; });
        if (!el.querySelector('.magnet-ink')) { const m=document.createElement('span'); m.className='magnet-ink'; el.appendChild(m); }
      });
    }
  } catch {}

  // Lazyload + shimmer
  document.querySelectorAll('img').forEach(img => {
    img.loading='lazy'; img.decoding='async';
    if (!img.complete) {
      img.classList.add('fx-skeleton');
      const clear = () => img.classList.remove('fx-skeleton');
      img.addEventListener('load', clear, {once:true});
      img.addEventListener('error', clear, {once:true});
    }
  });
})();

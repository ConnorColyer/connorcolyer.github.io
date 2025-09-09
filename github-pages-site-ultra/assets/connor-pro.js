
/* ===== Connor Pro (Robust) ===== */
(() => {
  if (window.__connorPro) return; window.__connorPro = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const qs = (s, r=document)=>r.querySelector(s);
  const qsa = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (n,a,b)=> Math.min(b, Math.max(a,n));

  try {
    if (!qs('#scrollProgress')) { const d=document.createElement('div'); d.id='scrollProgress'; document.body.prepend(d); }
    if (!qs('#backToTop')) { const b=document.createElement('button'); b.id='backToTop'; b.textContent='↑'; b.setAttribute('aria-label','Back to top'); document.body.appendChild(b); }
    const hero = qs('.hero, .hero-content, header, .title, .masthead');
    if (hero && !qs('#particles', hero)) { const c=document.createElement('canvas'); c.id='particles'; c.setAttribute('aria-hidden','true'); hero.prepend(c); }
    if (!qs('.modal-root')) { const r=document.createElement('div'); r.className='modal-root'; r.innerHTML=`
      <div class="modal-scrim" data-close></div>
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-head"><div id="modalTitle" class="modal-title">Preview</div><button class="modal-close" data-close>Close</button></div>
        <div class="modal-body"><div class="carousel"><div class="nav"><button class="prev" aria-label="Previous">‹</button><button class="next" aria-label="Next">›</button></div><div class="slides"></div></div></div>
        <div class="modal-footer"></div>
      </div>`; document.body.appendChild(r); }
    if (!qs('#commandPalette')) { const d=document.createElement('div'); d.id='commandPalette'; document.body.appendChild(d); }
    if (!qs('.toast-wrap')) { const t=document.createElement('div'); t.className='toast-wrap'; document.body.appendChild(t); }
  } catch {}

  // Filters
  try {
    const grid = qs('#portfolioGrid, .portfolio-grid');
    if (grid) {
      let barEl = qs('.filter-bar');
      if (!barEl) {
        barEl = document.createElement('div'); barEl.className='filter-bar';
        ['all','development','research'].forEach(c => {
          const b = document.createElement('button'); b.className='filter-btn'; b.dataset.filter=c; b.textContent=c[0].toUpperCase()+c.slice(1);
          if (c==='all') b.classList.add('active'); barEl.appendChild(b);
        });
        grid.parentElement && grid.parentElement.insertBefore(barEl, grid);
      }
      const buttons = qsa('.filter-btn', barEl);
      const items = qsa('.portfolio-item, .project-card, [data-category]', grid);
      const apply = (filter) => {
        buttons.forEach(b => b.classList.toggle('active', b.dataset.filter===filter));
        items.forEach(it => {
          const cat = (it.dataset.category||'').toLowerCase();
          const ok = filter==='all' || cat===filter;
          if (ok) {
            it.style.display='';
            if (!reduce && it.animate) it.animate([{opacity:0, transform:'scale(.98)'},{opacity:1, transform:'scale(1)'}], {duration:220, fill:'forwards'});
          } else {
            if (!reduce && it.animate) {
              const a = it.animate([{opacity:1, transform:'scale(1)'},{opacity:0, transform:'scale(.98)'}], {duration:160, fill:'forwards'});
              a.addEventListener('finish', ()=> it.style.display='none');
            } else { it.style.display='none'; }
          }
        });
      };
      buttons.forEach(b => b.addEventListener('click', ()=> apply(b.dataset.filter)));
    }
  } catch {}

  // Modal + carousel
  try {
    const modalRoot = qs('.modal-root');
    const scrim = modalRoot ? qs('.modal-scrim', modalRoot) : null;
    const dlg = modalRoot ? qs('.modal-dialog', modalRoot) : null;
    const slides = modalRoot ? qs('.slides', modalRoot) : null;
    const titleEl = modalRoot ? qs('.modal-title', modalRoot) : null;
    const prev = modalRoot ? qs('.prev', modalRoot) : null;
    const next = modalRoot ? qs('.next', modalRoot) : null;
    let current = 0;
    const show=(i)=>{ if(!slides) return; const kids=qsa('img,video',slides); if(!kids.length) return; current=(i+kids.length)%kids.length; kids.forEach((k,idx)=>k.style.display=idx===current?'block':'none'); };
    const openModal=(title,media)=>{
      if(!modalRoot||!slides) return; if(titleEl) titleEl.textContent=title||'Preview'; slides.innerHTML='';
      media.forEach(m=>{ let node; if((m.type||'').includes('video')||/\.mp4$/i.test(m.src||'')){ node=document.createElement('video'); node.src=m.src; node.muted=true; node.autoplay=true; node.loop=true; node.playsInline=true; node.controls=true; } else { node=document.createElement('img'); node.src=m.src; node.alt=m.alt||title||''; } node.style.display='none'; slides.appendChild(node); });
      current=0; show(current); modalRoot.classList.add('show'); if(dlg&&dlg.focus) dlg.focus({preventScroll:true});
    };
    const closeModal=()=>{ if(!modalRoot) return; modalRoot.classList.remove('show'); if(slides) qsa('video',slides).forEach(v=>{ try{ v.pause(); }catch{} }); };
    if(prev) prev.addEventListener('click',()=>show(current-1));
    if(next) next.addEventListener('click',()=>show(current+1));
    if(scrim) scrim.addEventListener('click', closeModal);
    if(modalRoot) qsa('[data-close]', modalRoot).forEach(b=>b.addEventListener('click', closeModal));
    document.addEventListener('keydown', e=>{ if(!modalRoot||!modalRoot.classList.contains('show')) return; if(e.key==='Escape') closeModal(); if(e.key==='ArrowLeft') show(current-1); if(e.key==='ArrowRight') show(current+1); });
    qsa('.project-card, .portfolio-item').forEach(card=>{
      const tnode = qs('h3, .title, .card-title', card); const title = tnode ? (tnode.textContent||'').trim() : 'Project';
      const ma = card.getAttribute('data-media'); if(!ma) return;
      try { const media=JSON.parse(ma); card.addEventListener('click',(e)=>{ const tgt=e.target; if(tgt&&tgt.closest&&tgt.closest('a,button')) return; openModal(title, media); }); card.style.cursor='pointer'; } catch {}
    });
  } catch {}

  // Command palette
  try {
    const palette = qs('#commandPalette');
    if (palette) {
      const input=document.createElement('input'); input.id='commandInput'; input.placeholder='Jump to…  (⌘K / Ctrl+K)';
      const results=document.createElement('div'); results.id='commandResults';
      const panel=document.createElement('div'); panel.className='panel';
      const head=document.createElement('header'); head.appendChild(input); panel.appendChild(head); panel.appendChild(results); palette.innerHTML=''; palette.appendChild(panel);
      const index=[]; 
      qsa('h1, h2, h3, nav a[href^="#"], section[id]').forEach(el=>{ const txt=(el.textContent||'').trim(); if(!txt) return; let href='#'; if(el.getAttribute&&el.getAttribute('href')) href=el.getAttribute('href'); else if(el.id) href='#'+el.id; else { const sec = el.closest? el.closest('section') : null; if(sec){ if(!sec.id) sec.id = txt.toLowerCase().replace(/\s+/g,'-'); href='#'+sec.id; } } index.push([txt, href]); });
      const ext = qsa('a[href^="http"]').slice(0,10).map(a=>[(a.textContent||'').trim()||a.href, a.href]); index.push(...ext);
      let sel=0; const render=(q='')=>{ const terms=q.toLowerCase().split(/\s+/).filter(Boolean); const hits=index.filter(([t])=>terms.every(s=>t.toLowerCase().includes(s))).slice(0,30); results.innerHTML=''; hits.forEach(([t,href],i)=>{ const d=document.createElement('div'); d.className='command-item'+(i===sel?' active':''); d.textContent=t; d.dataset.href=href; results.appendChild(d); }); };
      const open=()=>{ palette.classList.add('show'); input.value=''; sel=0; render(''); input.focus(); };
      const close=()=>{ palette.classList.remove('show'); };
      document.addEventListener('keydown',(e)=>{ const k=e.key.toLowerCase(); if((e.metaKey||e.ctrlKey)&&k==='k'){ e.preventDefault(); open(); } if(k==='escape'&&palette.classList.contains('show')) close(); if(!palette.classList.contains('show')) return; if(k==='arrowdown'){ e.preventDefault(); sel=Math.min(sel+1, results.children.length-1); render(input.value);} if(k==='arrowup'){ e.preventDefault(); sel=Math.max(sel-1, 0); render(input.value);} if(k==='enter'){ e.preventDefault(); const a=results.querySelector('.command-item.active'); if(a){ const href=a.dataset.href||''; close(); if(href.startsWith('#')){ const t=document.querySelector(href); if(t) t.scrollIntoView({behavior: reduce?'auto':'smooth'});} else window.open(href,'_blank'); } } });
      input.addEventListener('input',()=>{ sel=0; render(input.value); });
      results.addEventListener('click',(e)=>{ const el=e.target&&e.target.closest?e.target.closest('.command-item'):null; if(!el) return; const href=el.dataset.href||''; close(); if(href.startsWith('#')){ const t=document.querySelector(href); if(t) t.scrollIntoView({behavior: reduce?'auto':'smooth'});} else window.open(href,'_blank'); });
    }
  } catch {}

  // Toast helper
  try { window.connorToast=(m,t='')=>{ const w=document.querySelector('.toast-wrap'); if(!w) return; const n=document.createElement('div'); n.className='toast '+t; n.textContent=m; w.appendChild(n); setTimeout(()=>n.remove(), 2600); }; } catch {}
})();

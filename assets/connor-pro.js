
/* ===== Connor Pro (advanced UX, no libs) ===== */
(() => {
  if (window.__connorPro) return; window.__connorPro = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const clamp = (n,a,b)=> Math.min(b, Math.max(a,n));

  // 0) Ensure essential scaffolding
  const ensure = {
    scrollBar(){ if (!qs('#scrollProgress')) { const d=document.createElement('div'); d.id='scrollProgress'; document.body.prepend(d);} },
    backToTop(){ if (!qs('#backToTop')) { const b=document.createElement('button'); b.id='backToTop'; b.textContent='↑'; b.setAttribute('aria-label','Back to top'); document.body.appendChild(b);} },
    particles(){ const hero = qs('.hero, .hero-content, header, .title, .masthead'); if (hero && !qs('#particles', hero)) { const c=document.createElement('canvas'); c.id='particles'; hero.prepend(c);} },
    modal(){ if (!qs('.modal-root')) { const r=document.createElement('div'); r.className='modal-root'; r.innerHTML=`<div class="modal-scrim" data-close></div><div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-head"><div id="modalTitle" class="modal-title">Preview</div><button class="modal-close" data-close>Close</button></div>
      <div class="modal-body"><div class="carousel"><div class="nav"><button class="prev" aria-label="Previous">‹</button><button class="next" aria-label="Next">›</button></div><div class="slides"></div></div></div>
      <div class="modal-footer"></div></div>`; document.body.appendChild(r);} },
    cmd(){ if (!qs('#commandPalette')) { const d=document.createElement('div'); d.id='commandPalette'; d.innerHTML=`<div class="panel"><header><input id="commandInput" placeholder="Jump to…  (⌘K / Ctrl+K)" /></header><div id="commandResults"></div></div>`; document.body.appendChild(d);} },
    toasts(){ if (!qs('.toast-wrap')) { const t=document.createElement('div'); t.className='toast-wrap'; document.body.appendChild(t);} }
  };
  ensure.scrollBar(); ensure.backToTop(); ensure.particles(); ensure.modal(); ensure.cmd(); ensure.toasts();

  // 1) Scroll progress + back-to-top behavior
  const bar = qs('#scrollProgress');
  const topBtn = qs('#backToTop');
  if (!reduce) {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max>0 ? (doc.scrollTop / max) : 0;
      bar.style.transform = `scaleX(${p})`;
      topBtn.classList.toggle('show', doc.scrollTop > 500);
    };
    document.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }
  topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior: reduce ? 'auto':'smooth'}));

  // 2) Portfolio filter with animation
  const grid = qs('#portfolioGrid, .portfolio-grid');
  if (grid) {
    // Create filter bar if missing
    let barEl = qs('.filter-bar');
    if (!barEl) {
      barEl = document.createElement('div'); barEl.className='filter-bar';
      const cats = ['all','development','research'];
      cats.forEach(c => {
        const b = document.createElement('button'); b.className='filter-btn'; b.dataset.filter=c; b.textContent=c[0].toUpperCase()+c.slice(1);
        if (c==='all') b.classList.add('active'); barEl.appendChild(b);
      });
      grid.parentElement?.insertBefore(barEl, grid);
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
          if (!reduce) it.animate([{opacity:0, transform:'scale(.98)'},{opacity:1, transform:'scale(1)'}], {duration:220, fill:'forwards'});
        } else {
          if (!reduce) {
            const a = it.animate([{opacity:1, transform:'scale(1)'},{opacity:0, transform:'scale(.98)'}], {duration:160, fill:'forwards'});
            a.addEventListener('finish', ()=> it.style.display='none');
          } else it.style.display='none';
        }
      });
    };
    buttons.forEach(b => b.addEventListener('click', ()=> apply(b.dataset.filter)));
  }

  // 3) Modal Lightbox + carousel for project previews
  const modalRoot = qs('.modal-root');
  const scrim = qs('.modal-scrim', modalRoot);
  const dlg = qs('.modal-dialog', modalRoot);
  const slides = qs('.slides', modalRoot);
  const titleEl = qs('.modal-title', modalRoot);
  const prev = qs('.prev', modalRoot);
  const next = qs('.next', modalRoot);
  let current = 0;

  const openModal = (title, media) => {
    titleEl.textContent = title || "Preview";
    slides.innerHTML = '';
    media.forEach(m => {
      let node;
      if (/\.mp4$|video/.test(m.type||'')) {
        node = document.createElement('video'); node.src = m.src; node.muted = true; node.autoplay = true; node.loop = true; node.playsInline = true; node.controls = true;
      } else {
        node = document.createElement('img'); node.src = m.src; node.alt = m.alt || title || '';
      }
      node.style.display='none'; slides.appendChild(node);
    });
    current = 0; show(current);
    modalRoot.classList.add('show');
    dlg.focus({preventScroll:true});
  };
  const closeModal = () => {
    modalRoot.classList.remove('show');
    qsa('video', slides).forEach(v => { try { v.pause(); } catch{} });
  };
  const show = (i) => {
    const kids = qsa('img,video', slides);
    if (!kids.length) return;
    current = (i + kids.length) % kids.length;
    kids.forEach((k, idx) => k.style.display = idx===current ? 'block' : 'none');
  };
  prev.addEventListener('click', ()=> show(current-1));
  next.addEventListener('click', ()=> show(current+1));
  scrim.addEventListener('click', closeModal);
  qsa('[data-close]', modalRoot).forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (!modalRoot.classList.contains('show')) return;
    if (e.key==='Escape') closeModal();
    if (e.key==='ArrowLeft') show(current-1);
    if (e.key==='ArrowRight') show(current+1);
  });

  // Bind project cards: data-media='[{"src":"...","type":"image"}]'
  qsa('.project-card, .portfolio-item').forEach(card => {
    const title = qs('h3, .title, .card-title', card)?.textContent?.trim() || 'Project';
    const mediaAttr = card.getAttribute('data-media');
    if (mediaAttr) {
      try {
        const media = JSON.parse(mediaAttr);
        card.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).closest('a,button')) return;
          openModal(title, media);
        });
        card.style.cursor = 'pointer';
      } catch {}
    }
  });

  // 4) Command Palette (⌘K / Ctrl+K)
  const palette = qs('#commandPalette');
  const input = document.createElement('input'); input.id='commandInput'; input.placeholder='Jump to…  (⌘K / Ctrl+K)';
  const results = document.createElement('div'); results.id='commandResults';
  const panel = document.createElement('div'); panel.className='panel';
  const head = document.createElement('header'); head.appendChild(input);
  panel.appendChild(head); panel.appendChild(results); palette.innerHTML=''; palette.appendChild(panel);

  const index = [];
  qsa('h1, h2, h3, nav a[href^="#"], section[id]').forEach(el => {
    const txt = (el.textContent||'').trim(); if (!txt) return;
    let href = '#';
    if (el.getAttribute && el.getAttribute('href')) href = el.getAttribute('href');
    else if (el.id) href = `#${el.id}`;
    else {
      const sec = el.closest('section'); if (sec) { if (!sec.id) sec.id = txt.toLowerCase().replace(/\s+/g,'-'); href = `#${sec.id}`; }
    }
    index.push([txt, href]);
  });
  const ext = qsa('a[href^="http"]').slice(0,10).map(a => [a.textContent.trim()||a.href, a.href]);
  index.push(...ext);

  let sel = 0;
  const render = (q='') => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = index.filter(([t]) => terms.every(s => t.toLowerCase().includes(s))).slice(0,30);
    results.innerHTML = '';
    hits.forEach(([t,href],i)=> {
      const d=document.createElement('div');
      d.className='command-item'+(i===sel?' active':'');
      d.textContent=t; d.dataset.href=href; results.appendChild(d);
    });
  };
  const open = () => { palette.classList.add('show'); input.value=''; sel=0; render(''); input.focus(); };
  const close = () => { palette.classList.remove('show'); };
  document.addEventListener('keydown', (e)=> {
    const k = e.key.toLowerCase();
    if ((e.metaKey||e.ctrlKey) && k==='k'){ e.preventDefault(); open(); }
    if (k==='escape' && palette.classList.contains('show')) close();
    if (!palette.classList.contains('show')) return;
    if (k==='arrowdown'){ e.preventDefault(); sel++; }
    if (k==='arrowup'){ e.preventDefault(); sel--; }
    if (k==='enter'){ e.preventDefault(); const a = qs('.command-item.active', results); if (a){ const href = a.dataset.href||''; close(); if (href.startsWith('#')) qs(href)?.scrollIntoView({behavior: reduce?'auto':'smooth'}); else window.open(href,'_blank'); } }
    sel = clamp(sel, 0, results.children.length-1); render(input.value);
  });
  input.addEventListener('input', ()=> { sel=0; render(input.value); });
  results.addEventListener('click', (e)=> {
    const el = (e.target).closest('.command-item'); if (!el) return;
    const href = el.dataset.href||''; close(); if (href.startsWith('#')) qs(href)?.scrollIntoView({behavior: reduce?'auto':'smooth'}); else window.open(href,'_blank');
  });

  // 5) Tiny toast API
  window.connorToast = (msg, type='') => {
    const wrap = qs('.toast-wrap'); const t = document.createElement('div'); t.className='toast '+type; t.textContent = msg; wrap.appendChild(t);
    setTimeout(()=> t.remove(), 2600);
  };
})();

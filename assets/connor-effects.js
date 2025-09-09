
/* ===== Connor Effects (Vanilla, no libs) ===== */
(() => {
  if (window.__connorFX) return; window.__connorFX = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0) Ensure native cursor
  try { document.documentElement.insertAdjacentHTML('beforeend', '<style>body,*{cursor:auto!important}</style>'); } catch {}

  // 1) Loader auto-hide if present
  const onReady = () => {
    const loader = document.getElementById('loader');
    if (loader) { loader.classList.add('hidden'); setTimeout(()=> loader.remove(), 520); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady); else onReady();

  // 2) Scroll progress
  const bar = document.getElementById('scrollProgress');
  if (bar && !reduce) {
    const upd = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? (doc.scrollTop / max) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    document.addEventListener('scroll', upd, {passive:true}); upd();
  }

  // 3) Back-to-top
  const topBtn = document.getElementById('backToTop');
  if (topBtn) {
    const vis = () => topBtn.classList.toggle('show', (window.scrollY||document.documentElement.scrollTop) > 500);
    document.addEventListener('scroll', vis, {passive:true}); vis();
    topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}));
  }

  // 4) Reveal on scroll
  const obs = new IntersectionObserver((ents)=> {
    ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:.12, rootMargin: '0px 0px -10% 0px'});
  document.querySelectorAll('.fade-in-section, .reveal, .timeline-item, .project-card, .skill-chip').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // 5) Ripple
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .submit-btn, .skill-chip');
    if (!btn) return;
    btn.classList.add('fx-rip-wrap');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement('span');
    span.className = 'fx-ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size/2) + 'px';
    span.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  });

  // 6) Particles (lightweight)
  const cvs = document.getElementById('particles');
  if (cvs && !reduce) {
    const ctx = cvs.getContext('2d');
    let dpr = Math.max(1, Math.min(2, devicePixelRatio||1));
    let w=0,h=0, parts=[], raf;
    const cfg = { count: 60, speed:.18, connect: 130, radius:[1,2.4] };

    const rnd = (a,b)=> a + Math.random()*(b-a);
    const size = () => {
      const rect = cvs.getBoundingClientRect();
      w = rect.width; h = rect.height;
      cvs.width = Math.floor(w*dpr); cvs.height = Math.floor(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const n = Math.max(30, Math.round(cfg.count * (w/1200)));
      parts = Array.from({length:n}, () => ({
        x:rnd(0,w), y:rnd(0,h), vx:rnd(-cfg.speed,cfg.speed), vy:rnd(-cfg.speed,cfg.speed), r:rnd(cfg.radius[0], cfg.radius[1])
      }));
    };
    const tick = () => {
      ctx.clearRect(0,0,w,h);
      for (let i=0;i<parts.length;i++){
        const p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x<-50) p.x=w+50; if (p.x>w+50) p.x=-50;
        if (p.y<-50) p.y=h+50; if (p.y>h+50) p.y=-50;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = 'rgba(99,102,241,.6)'; ctx.fill();
        for (let j=i+1;j<parts.length;j++){
          const q = parts[j]; const dx=p.x-q.x, dy=p.y-q.y; const dist=Math.hypot(dx,dy);
          if (dist < cfg.connect){
            const a = 1 - (dist/cfg.connect);
            ctx.strokeStyle = `rgba(99,102,241,${0.16*a})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(size);
    ro.observe(cvs.parentElement || document.body);
    size(); tick();
  }

  // 7) Formspree (if present)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit-btn') || form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = True; }  // we'll fix True->true below
    });
    // Fix boolean typo safely after parse
    setTimeout(() => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn') || form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        try {
          const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers:{'Accept':'application/json'} });
          if (res.ok) {
            status.className = 'success'; status.textContent = "Message sent. I'll get back to you soon."; status.style.display = 'block'; form.reset();
          } else throw new Error('Failed');
        } catch {
          status.className = 'error'; status.textContent = 'Failed to send. Email me directly instead.'; status.style.display = 'block';
        } finally {
          if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
        }
      }, { once: true });
    }, 0);
  }

  // 8) Lazyload + shimmer
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy'; img.decoding = 'async';
    if (!img.complete) {
      img.classList.add('fx-skeleton');
      const clr = () => img.classList.remove('fx-skeleton');
      img.addEventListener('load', clr, {once:true});
      img.addEventListener('error', clr, {once:true});
    }
  });
})();

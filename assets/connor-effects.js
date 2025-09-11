
/* ===== Connor Effects (Robust) ===== */
(() => {
  if (window.__connorFX) return; window.__connorFX = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const apply = (t) => {
      root.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
      if (btn) btn.classList.toggle('active', t === 'light');
    };
    const stored = localStorage.getItem('theme');
    const pref = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    apply(stored || pref);
    if (btn) btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
    });
  } catch {}
  try { document.documentElement.insertAdjacentHTML('beforeend', '<style>body,*{cursor:auto!important}</style>'); } catch {}
  const hideLoader = () => { const loader = document.getElementById('loader'); if (!loader) return; loader.style.transition='opacity .35s ease'; loader.style.opacity='0'; setTimeout(()=>{ try{ loader.remove(); }catch{} },420); };
  const onReady = () => hideLoader();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady); else onReady();
  setTimeout(hideLoader, 1500);
  try { const bar = document.getElementById('scrollProgress'); if (bar && !reduce) { const upd=()=>{const doc=document.documentElement; const max=doc.scrollHeight-doc.clientHeight; const p=max>0?(doc.scrollTop/max):0; bar.style.transform=`scaleX(${p})`;}; document.addEventListener('scroll',upd,{passive:true}); upd(); } } catch {}
  try { const topBtn=document.getElementById('backToTop'); if (topBtn){ const vis=()=> topBtn.classList.toggle('show',(window.scrollY||document.documentElement.scrollTop)>500); document.addEventListener('scroll',vis,{passive:true}); vis(); topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})); } } catch {}
  try { const obs=new IntersectionObserver((ents)=>{ ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target);} }); },{threshold:.12, rootMargin:'0px 0px -10% 0px'}); document.querySelectorAll('.fade-in-section, .reveal, .timeline-item, .project-card, .skill-chip').forEach(el=>{ el.classList.add('reveal'); obs.observe(el); }); } catch {}
  document.addEventListener('click',(e)=>{ const btn=e.target&&e.target.closest?e.target.closest('button, .submit-btn, .skill-chip, a.button, .btn'):null; if(!btn) return; btn.classList.add('fx-rip-wrap'); const rect=btn.getBoundingClientRect(); const size=Math.max(rect.width,rect.height); const span=document.createElement('span'); span.className='fx-ripple'; span.style.width=span.style.height=size+'px'; span.style.left=(e.clientX-rect.left-size/2)+'px'; span.style.top=(e.clientY-rect.top-size/2)+'px'; btn.appendChild(span); span.addEventListener('animationend',()=>span.remove()); }, {passive:true});
    /* particle background removed to allow WebGPU renderer */
  try { const form=document.getElementById('contactForm'); const status=document.getElementById('formStatus')||document.getElementById('contactStatus'); if(form && status){ form.addEventListener('submit', async (e)=>{ e.preventDefault(); const btn=form.querySelector('.submit-btn')||form.querySelector('button[type="submit"]'); if(btn){ btn.disabled=true; btn.textContent='Sending…'; } try{ const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}}); if(res.ok){ status.className='success'; status.textContent="Message sent. I'll get back to you soon."; status.style.display='block'; form.reset(); } else { throw new Error('Failed'); } } catch { status.className='error'; status.textContent='Failed to send. Email me directly instead.'; status.style.display='block'; } finally { if(btn){ btn.disabled=false; btn.textContent='Send Message'; } } }); } } catch {}
})();

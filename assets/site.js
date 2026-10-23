/* Make Merry Events — shared behaviour. Page-specific code runs from body[data-page]. */
(() => {
const C = window.CONFIG, B = C.business;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const page = document.body.dataset.page;
const el = (tag, attrs = {}, ...kids) => { const n = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (v == null) continue; if (k === 'class') n.className = v; else if (k === 'text') n.textContent = v; else if (k === 'html') n.innerHTML = v; else n.setAttribute(k, v); } kids.flat().forEach(k => k != null && k !== '' && n.append(k)); return n; };
const store = { get(k){ try { return JSON.parse(sessionStorage.getItem(k)); } catch(e){ return null; } }, set(k,v){ try { sessionStorage.setItem(k, JSON.stringify(v)); } catch(e){} }, del(k){ try { sessionStorage.removeItem(k); } catch(e){} } };

/* ---------- generated mood art: stands in for photography until real photos are supplied ---------- */
const PAL = {
  elegant:{bg:['#120e09','#2c2217'],glow:'#f0cf92',acc:['#f3dfb4','#d9b26f','#fff4dc','#b88d4a'],flo:['#f4ead8','#e9d6b4','#d3bf96'],sw:['#f4ead8','#cdb27e','#2c2217']},
  romantic:{bg:['#170b0e','#3b1d25'],glow:'#f5beb4',acc:['#f7cfc7','#e89b97','#fff0e6','#d8a46c'],flo:['#f6d4d0','#e9aaa9','#fbe9e2'],sw:['#f6d4d0','#e89b97','#3b1d25']},
  traditional:{bg:['#06120d','#14291f'],glow:'#efb85e',acc:['#e9b45c','#e86a4a','#f6dfa8','#2f9e6e'],flo:['#e86a4a','#f2c46d','#3fae7c'],sw:['#e86a4a','#e9b45c','#2f9e6e']},
  vibrant:{bg:['#12081a','#2c0f2e'],glow:'#ffa45e',acc:['#ff5e8a','#ffb347','#3ad0c4','#ffe066'],flo:['#ff6f91','#ffc75f','#4fd1c5'],sw:['#ff5e8a','#ffb347','#3ad0c4']},
  modern:{bg:['#0b0d10','#1d232b'],glow:'#d4def0',acc:['#e8eef7','#9fb3cc','#ffffff','#c9b37e'],flo:['#e6e9ee','#c4ccd8','#ffffff'],sw:['#ffffff','#9fb3cc','#1d232b']},
  minimalist:{bg:['#121211','#262624'],glow:'#f1ece2',acc:['#f2efe8','#d8d3c8','#ffffff','#bfb7a6'],flo:['#f5f2ec','#e2ddd2','#cfc8ba'],sw:['#f5f2ec','#bfb7a6','#262624']}
};
function rng(seed){ let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const pick = (a, R) => a[Math.floor(R() * a.length)];
const rgba = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${n>>16},${n>>8&255},${n&255},${a})`; };
function glow(c,x,y,r,col,a){ if (r <= 0) return; const g = c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0, rgba(col,a)); g.addColorStop(1, rgba(col,0)); c.fillStyle = g; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
function sizeCanvas(cv){ const r = cv.getBoundingClientRect(); const w = Math.max(2, r.width), h = Math.max(2, r.height); const d = Math.min(window.devicePixelRatio || 1, 1.5); cv.width = Math.round(w*d); cv.height = Math.round(h*d); const c = cv.getContext('2d'); c.setTransform(d,0,0,d,0,0); return [c,w,h]; }
const MOTIF = {
  hall(c,w,h,P,R,S){ const vx=w*.5,vy=h*.44; let g=c.createLinearGradient(0,vy,0,h); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,rgba(P.glow,.1)); c.fillStyle=g; c.fillRect(0,vy,w,h-vy);
    [-1,1].forEach(side=>{ const fx=vx+side*w*.04,nx=vx+side*w*.34,y0=vy+h*.03,y1=h*1.05; const cx=t=>fx+(nx-fx)*t, cy=t=>y0+(y1-y0)*t, hw=t=>S*(.008+.13*t);
      c.beginPath(); for(let i=0;i<=20;i++){const t=i/20;c.lineTo(cx(t)-hw(t),cy(t));} for(let i=20;i>=0;i--){const t=i/20;c.lineTo(cx(t)+hw(t),cy(t));}
      g=c.createLinearGradient(0,y0,0,y1); g.addColorStop(0,rgba(P.flo[0],.06)); g.addColorStop(1,rgba(P.flo[0],.24)); c.fillStyle=g; c.fill();
      c.globalCompositeOperation='lighter';
      for(let k=0;k<16;k++){ const t=Math.pow((k+1)/17,1.7); [-.45,.45].forEach(o=>{ const x=cx(t)+o*hw(t),y=cy(t)-S*.004-S*.03*t; glow(c,x,y,S*(.012+.07*t),P.glow,.5); glow(c,x,y,S*(.002+.006*t),'#ffffff',.85); }); glow(c,cx(t),cy(t)-S*.01*t,S*(.01+.045*t),pick(P.flo,R),.3); }
      c.globalCompositeOperation='source-over'; });
    c.globalCompositeOperation='lighter';
    [-1,0,1].forEach(j=>{ const x=vx+j*w*.3,y=h*.15,r=S*(j?.07:.1); c.strokeStyle=rgba(P.glow,.22); c.lineWidth=1; c.beginPath(); c.moveTo(x,0); c.lineTo(x,y-r); c.stroke(); glow(c,x,y,r*2.6,P.glow,.14);
      for(let i=0;i<70;i++){ const a=R()*Math.PI*2,rr=r*Math.sqrt(R()); const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr*1.25+(rr/r)*r*.3; glow(c,px,py,S*.012,P.glow,.55); glow(c,px,py,S*.0025,'#ffffff',.9); } });
    c.globalCompositeOperation='source-over'; },
  arch(c,w,h,P,R,S){ const cx=w/2,cy=h*.6,r=Math.min(S*.36,w*.42),foot=h*.97;
    let g=c.createLinearGradient(0,cy,0,h); g.addColorStop(0,rgba(P.flo[2],0)); g.addColorStop(1,rgba(P.flo[2],.14)); c.fillStyle=g; c.beginPath(); c.moveTo(cx-S*.05,cy+S*.05); c.lineTo(cx+S*.05,cy+S*.05); c.lineTo(cx+w*.3,h); c.lineTo(cx-w*.3,h); c.fill();
    c.globalCompositeOperation='lighter';
    for(let i=0;i<22;i++){ const x=cx-r*.85+i*(r*1.7/21); const top=cy-Math.sqrt(Math.max(0,r*r-(x-cx)**2))*.95; const len=S*(.12+R()*.32); for(let y=top;y<top+len;y+=S*.022){ glow(c,x+Math.sin(y*.05)*2,y,S*.014,P.glow,.42); glow(c,x,y,S*.0025,'#fff',.85); } }
    c.globalCompositeOperation='source-over';
    const flower=(x,y,s)=>{ const col=pick(P.flo,R); glow(c,x,y,s*1.8,col,.22); c.fillStyle=rgba(col,.85); c.beginPath(); c.arc(x,y,s,0,7); c.fill(); c.fillStyle=rgba('#ffffff',.25); c.beginPath(); c.arc(x-s*.3,y-s*.3,s*.45,0,7); c.fill(); };
    for(let k=0;k<70;k++){ c.fillStyle=rgba('#3d5a40',.55); c.save(); const a=Math.PI+R()*Math.PI; c.translate(cx+Math.cos(a)*(r+(R()-.5)*S*.07),cy+Math.sin(a)*(r+(R()-.5)*S*.07)); c.rotate(R()*6); c.beginPath(); c.ellipse(0,0,S*.03,S*.01,0,0,7); c.fill(); c.restore(); }
    for(let k=0;k<160;k++){ const a=Math.PI+R()*Math.PI,rr=r+(R()-.5)*S*.07; flower(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,S*(.01+R()*.024)); }
    [-1,1].forEach(s=>{ for(let k=0;k<40;k++) flower(cx+s*r+(R()-.5)*S*.06,cy+R()*(foot-cy),S*(.01+R()*.022)); });
    for(let k=0;k<40;k++){ const t=R(); const x=cx+(R()-.5)*(S*.1+w*.55*t),y=cy+S*.08+t*(h-cy); c.fillStyle=rgba(pick(P.flo,R),.7); c.save(); c.translate(x,y); c.rotate(R()*6); c.beginPath(); c.ellipse(0,0,S*.008*(1+t),S*.004*(1+t),0,0,7); c.fill(); c.restore(); } },
  confetti(c,w,h,P,R,S){
    for(let i=0;i<8;i++){ const x=w*(.08+R()*.84),y=h*(.12+R()*.42),rx=S*(.05+R()*.045),ry=rx*1.18,col=pick(P.acc,R);
      c.strokeStyle=rgba('#ffffff',.22); c.lineWidth=1; c.beginPath(); c.moveTo(x,y+ry); c.bezierCurveTo(x-10,y+ry+S*.1,x+12,y+ry+S*.2,x,h); c.stroke();
      const g=c.createRadialGradient(x-rx*.35,y-ry*.4,rx*.1,x,y,ry*1.1); g.addColorStop(0,rgba('#ffffff',.8)); g.addColorStop(.25,rgba(col,.9)); g.addColorStop(1,rgba(col,.3)); c.fillStyle=g; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill(); }
    for(let i=0;i<140;i++){ c.save(); c.translate(R()*w,R()*h); c.rotate(R()*6); c.fillStyle=rgba(pick(P.acc,R),.5+R()*.4); const s=S*(.006+R()*.012); c.fillRect(-s,-s*.4,s*2,s*.8); c.restore(); }
    c.globalCompositeOperation='lighter';
    for(let i=0;i<10;i++){ const x=R()*w,y=R()*h*.7,s=S*(.01+R()*.02); glow(c,x,y,s*2.5,P.glow,.3); c.strokeStyle=rgba('#ffffff',.75); c.lineWidth=1; c.beginPath(); c.moveTo(x-s,y); c.lineTo(x+s,y); c.moveTo(x,y-s); c.lineTo(x,y+s); c.stroke(); }
    c.globalCompositeOperation='source-over'; },
  stage(c,w,h,P,R,S){ const fy=h*.66;
    let g=c.createLinearGradient(0,h*.16,0,h*.48); g.addColorStop(0,rgba(P.acc[1],.32)); g.addColorStop(1,rgba(P.acc[0],.1)); c.fillStyle=g; c.fillRect(w*.26,h*.16,w*.48,h*.3); c.strokeStyle=rgba(P.acc[2],.35); c.strokeRect(w*.26,h*.16,w*.48,h*.3);
    c.fillStyle=rgba(P.acc[2],.75); c.font=`italic 300 ${Math.round(Math.min(S*.05,w*.06))}px Fraunces,Georgia,serif`; c.textAlign='center'; c.fillText('Welcome',w/2,h*.33);
    c.globalCompositeOperation='lighter';
    for(let i=0;i<5;i++){ const x0=w*(.1+i*.2)+(R()-.5)*w*.05,x1=w*(.18+R()*.64); const g2=c.createLinearGradient(0,0,0,fy); g2.addColorStop(0,rgba(P.glow,.28)); g2.addColorStop(1,rgba(P.glow,0)); c.fillStyle=g2; c.beginPath(); c.moveTo(x0-4,0); c.lineTo(x0+4,0); c.lineTo(x1+S*.12,fy); c.lineTo(x1-S*.12,fy); c.fill(); glow(c,x1,fy,S*.14,P.glow,.18); }
    c.globalCompositeOperation='source-over';
    c.fillStyle='rgba(0,0,0,.4)'; c.fillRect(0,fy,w,h*.08);
    c.globalCompositeOperation='lighter'; c.fillStyle=rgba(P.acc[3]||P.glow,.8); c.fillRect(0,fy,w,1.5); glow(c,w/2,fy,w*.5,P.acc[3]||P.glow,.1); c.globalCompositeOperation='source-over';
    for(let row=0;row<3;row++){ const y=h*(.84+row*.07),n=10+row*2,rr=S*(.025+row*.008); for(let i=0;i<n;i++){ const x=(i+.5+(row%2)*.5)*w/n; c.fillStyle='rgba(6,8,7,.9)'; c.beginPath(); c.arc(x,y,rr,0,7); c.fill(); c.beginPath(); c.ellipse(x,y+rr*2.2,rr*2,rr*1.3,0,Math.PI,0); c.fill(); } } },
  candles(c,w,h,P,R,S){ const ty=h*.72;
    let g=c.createLinearGradient(0,ty,0,h); g.addColorStop(0,rgba(P.flo[1],.2)); g.addColorStop(1,'rgba(0,0,0,.35)'); c.fillStyle=g; c.fillRect(0,ty,w,h-ty); c.fillStyle=rgba(P.glow,.45); c.fillRect(0,ty,w,1);
    const n=Math.max(5,Math.min(9,Math.round(w/S*7))); for(let i=0;i<n;i++){ const x=w*.5+(i-(n-1)/2)*S*.085+(R()-.5)*S*.03,ch=S*(.08+R()*.22),cw=S*(.032+R()*.018),top=ty-ch-(i%3)*S*.012;
      c.globalCompositeOperation='lighter'; glow(c,x,top-cw*.6,S*(.12+R()*.06),P.glow,.3); glow(c,x,ty+S*.05,S*.08,P.glow,.13); c.globalCompositeOperation='source-over';
      g=c.createLinearGradient(x-cw/2,0,x+cw/2,0); g.addColorStop(0,rgba(P.flo[1],.9)); g.addColorStop(.4,rgba('#fffaf0',.95)); g.addColorStop(1,rgba(P.flo[2],.75)); c.fillStyle=g; c.fillRect(x-cw/2,top,cw,ty-top+(i%3)*S*.012);
      c.fillStyle=rgba('#fff3d6',.95); c.beginPath(); c.ellipse(x,top-cw*.55,cw*.18,cw*.45,0,0,7); c.fill();
      c.globalCompositeOperation='lighter'; glow(c,x,top-cw*.55,cw*.9,P.glow,.75); c.globalCompositeOperation='source-over'; }
    for(let k=0;k<26;k++){ const x=w*(.15+R()*.7),y=ty+S*(.01+R()*.04),s=S*(.012+R()*.02); glow(c,x,y,s*1.6,pick(P.flo,R),.28); c.fillStyle=rgba(pick(P.flo,R),.8); c.beginPath(); c.arc(x,y,s,0,7); c.fill(); } },
  florals(c,w,h,P,R,S){
    for(let k=0;k<44;k++){ c.save(); c.translate(R()*w,h*(.25+R()*.8)); c.rotate(R()*6); c.fillStyle=rgba(k%2?'#2c4a37':'#3f6248',.75); c.beginPath(); c.ellipse(0,0,S*(.05+R()*.05),S*(.014+R()*.012),0,0,7); c.fill(); c.restore(); }
    for(let k=0;k<16;k++){ const x=R()*w,y=h*(.18+R()*.85),r=S*(.05+R()*.08),col=pick(P.flo,R),np=7+Math.floor(R()*4),rot=R()*6;
      c.globalCompositeOperation='lighter'; glow(c,x,y,r*1.9,col,.16); c.globalCompositeOperation='source-over';
      for(let layer=0;layer<2;layer++){ const rr=r*(layer?.62:1); for(let p=0;p<np;p++){ const a=rot+p*Math.PI*2/np+layer*.3; c.save(); c.translate(x+Math.cos(a)*rr*.5,y+Math.sin(a)*rr*.5); c.rotate(a); const g=c.createLinearGradient(-rr*.5,0,rr*.5,0); g.addColorStop(0,rgba(col,.6)); g.addColorStop(1,rgba(layer?'#ffffff':col,.92)); c.fillStyle=g; c.beginPath(); c.ellipse(0,0,rr*.55,rr*.3,0,0,7); c.fill(); c.restore(); } }
      c.fillStyle=rgba(P.acc[0],.9); c.beginPath(); c.arc(x,y,r*.14,0,7); c.fill(); } },
  rentals(c,w,h,P,R,S){
    for(let i=0;i<6;i++){ const x0=i*w/6,x1=(i+1)*w/6; const g=c.createLinearGradient(0,0,0,h*.3); g.addColorStop(0,rgba(P.flo[0],.28)); g.addColorStop(1,rgba(P.flo[0],0)); c.fillStyle=g; c.beginPath(); c.moveTo(x0,0); c.quadraticCurveTo((x0+x1)/2,h*.3,x1,0); c.fill(); }
    c.globalCompositeOperation='lighter'; for(let i=0;i<7;i++) glow(c,(i+.5)*w/7,h*.05,S*.05,P.glow,.45); c.globalCompositeOperation='source-over';
    const chair=(x,y,s)=>{ c.strokeStyle=rgba(P.acc[1],.85); c.lineWidth=Math.max(1,s*.035); c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-s*.95); c.moveTo(x+s*.42,y); c.lineTo(x+s*.42,y-s*.95); c.moveTo(x,y-s*.95); c.lineTo(x+s*.42,y-s*.95); c.moveTo(x,y-s*.45); c.lineTo(x+s*.42,y-s*.45); for(let k=1;k<5;k++){ const xx=x+k*s*.42/5; c.moveTo(xx,y-s*.45); c.lineTo(xx,y-s*.95); } c.moveTo(x,y); c.lineTo(x-s*.04,y+s*.6); c.moveTo(x+s*.42,y); c.lineTo(x+s*.46,y+s*.6); c.stroke(); c.fillStyle=rgba(P.flo[0],.82); c.fillRect(x-s*.04,y-s*.04,s*.5,s*.07); };
    [[.48,.12,.06],[.62,.17,.08],[.82,.24,.105]].forEach(([yy,sz,gap])=>{ const s=S*sz,y=h*yy,step=s*.42+S*gap; for(let x=-(step*.3);x<w;x+=step) chair(x,y,s); }); }
};
function paint(cv, scene, style, seed){
  const [c,w,h] = sizeCanvas(cv), P = PAL[style] || PAL.elegant, R = rng(seed || 7), S = Math.min(w,h)*.9 + Math.max(w,h)*.1;
  let g = c.createRadialGradient(w*.5,h*.42,0,w*.5,h*.5,Math.max(w,h)*.8); g.addColorStop(0,P.bg[1]); g.addColorStop(1,P.bg[0]); c.fillStyle = g; c.fillRect(0,0,w,h);
  c.globalCompositeOperation='lighter'; for(let i=0;i<30;i++) glow(c,R()*w,R()*h*.85,S*(.03+R()*.1),pick(P.acc,R),.04+R()*.09); c.globalCompositeOperation='source-over';
  (MOTIF[scene] || MOTIF.hall)(c,w,h,P,R,S);
  c.globalCompositeOperation='lighter'; for(let i=0;i<6;i++) glow(c,R()*w,R()*h,S*(.12+R()*.12),pick(P.acc,R),.045); c.globalCompositeOperation='source-over';
  g = c.createRadialGradient(w/2,h/2,S*.32,w/2,h/2,Math.hypot(w,h)*.62); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,.55)'); c.fillStyle = g; c.fillRect(0,0,w,h);
}
const painted = new WeakSet();
const paintIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const cv = e.target; paint(cv, cv.dataset.scene, cv.dataset.style, +cv.dataset.seed); painted.add(cv); paintIO.unobserve(cv); } }), { rootMargin: '300px' });
const watch = cv => paintIO.observe(cv);
const art = (scene, style, seed, cls = 'arch', ar, tagText = 'Illustration') => {
  const cv = el('canvas', { 'data-scene': scene, 'data-style': style, 'data-seed': seed, 'aria-hidden': 'true' }); watch(cv);
  return el('div', { class: 'frame ' + cls, style: ar ? `aspect-ratio:${ar}` : null }, cv, C.conceptMode && tagText ? el('span', { class: 'tag', text: tagText }) : null);
};
const resizeHooks = [];
let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { $$('canvas[data-scene]').forEach(cv => { if (painted.has(cv)) paint(cv, cv.dataset.scene, cv.dataset.style, +cv.dataset.seed); }); resizeHooks.forEach(f => f()); }, 250); });
$$('canvas[data-scene]').forEach(watch);
if (!C.conceptMode) $$('[data-concept]').forEach(n => n.hidden = true);

/* ---------- business details, footer, nav ---------- */
$$('[data-biz]').forEach(n => { const v = B[n.dataset.biz]; if (v) n.textContent = v; });
$$('[data-year]').forEach(n => n.textContent = new Date().getFullYear());
const waDigits = (B.whatsapp || '').replace(/\D/g, '');
const waLink = text => `https://wa.me/${waDigits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
if (waDigits) { const f = $('#waFloat'); if (f) { f.href = waLink(`Hello ${B.name}, I'd like to talk about an event.`); f.hidden = false; } }
const contactItems = () => [waDigits && ['WhatsApp', '+' + waDigits, waLink('')], B.phone && ['Phone', B.phone], B.email && ['Email', B.email], B.address && ['Address', B.address], B.hours && ['Hours', B.hours]].filter(Boolean);
(() => {
  const fc = $('#footContact'); if (!fc) return; const items = contactItems();
  if (items.length) items.forEach(([k, v, href]) => fc.append(el('li', {}, href ? el('a', { href, target: '_blank', rel: 'noopener', text: v }) : el('span', { class: 'muted', text: v }))));
  else fc.append(el('li', {}, el('a', { href: 'contact.html', text: 'Send an enquiry' })), el('li', {}, el('a', { href: 'plan.html', text: 'Build your event brief' })));
  const fs = $('#footSocial'); const soc = Object.entries(B.social || {}).filter(([, u]) => u);
  if (soc.length) soc.forEach(([k, u]) => fs.append(el('li', {}, el('a', { href: u, target: '_blank', rel: 'noopener', text: k[0].toUpperCase() + k.slice(1) }))));
  else fs.closest('div').hidden = true;
  const dc = $('#drawerContact'); if (dc && items.length) dc.textContent = items.slice(0, 2).map(i => i[1]).join(' · ');
})();
const header = $('.site-header'); const onScroll = () => header.classList.toggle('scrolled', scrollY > 10); addEventListener('scroll', onScroll, { passive: true }); onScroll();
const drawer = $('#drawer'), menuBtn = $('#menuBtn');
const setMenu = open => { drawer.classList.toggle('open', open); drawer.inert = !open; menuBtn.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; if (open) $('#closeMenu').focus(); else menuBtn.focus({ preventScroll: true }); };
menuBtn.onclick = () => setMenu(true); $('#closeMenu').onclick = () => setMenu(false);
addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) setMenu(false); });

/* ---------- page transitions (internal links only) ---------- */
const MARK = '<svg viewBox="0 0 260 24" aria-hidden="true"><path d="M2 14 C 40 2, 70 24, 110 12 S 170 2, 200 12 S 240 20, 258 8"/></svg>';
if (!reduce && store.get('mm-transition')) { store.del('mm-transition'); const cu = el('div', { class: 'curtain leave', html: MARK, 'aria-hidden': 'true' }); document.body.append(cu); cu.addEventListener('animationend', () => cu.remove()); }
document.addEventListener('click', e => {
  const pa = e.target.closest('a[href^="plan.html"]'); if (pa) { const q = new URLSearchParams(pa.getAttribute('href').split('?')[1] || ''); store.set('mm-prefill', Object.fromEntries(q)); }
  const a = e.target.closest('a[href]'); if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
  const href = a.getAttribute('href'); if (!/^[\w-]+\.html(\?[^#]*)?(#.*)?$/.test(href)) return;
  e.preventDefault(); store.set('mm-transition', 1);
  const cu = el('div', { class: 'curtain enter', html: MARK, 'aria-hidden': 'true' }); document.body.append(cu);
  setTimeout(() => { location.href = href; }, 420);
});
addEventListener('pageshow', e => { if (e.persisted) $$('.curtain').forEach(n => n.remove()); });

/* ---------- scroll reveal (starts from a visible state) ---------- */
if (!reduce) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  requestAnimationFrame(() => $$('[data-reveal]').forEach(n => { if (n.getBoundingClientRect().top > innerHeight) { n.classList.add('pre'); io.observe(n); } })); }

/* ---------- planner prefill hand-off ---------- */
const goPlan = (pref = {}) => { const q = new URLSearchParams(Object.entries(pref).filter(([, v]) => v)).toString(); return 'plan.html' + (q ? '?' + q : ''); };

/* ---------- submission (shared by planner and contact form) ---------- */
const phoneOk = v => { const d = v.replace(/\D/g, ''); return d.length >= 7 && d.length <= 15 && /^[+\d][\d\s().-]*$/.test(v.trim()); };
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function setErr(id, msg){ const i = document.getElementById(id), e = document.getElementById('e-' + id); if (msg) { i.setAttribute('aria-invalid', 'true'); e.textContent = msg; } else { i.removeAttribute('aria-invalid'); e.textContent = ''; } return !msg; }
function clearOnInput(form){ form.addEventListener('input', e => { const t = e.target; if (t.hasAttribute('aria-invalid')) { t.removeAttribute('aria-invalid'); const er = document.getElementById('e-' + t.id); if (er) er.textContent = ''; } }); }
function validateContact(ids, emailRequired){
  const v = id => document.getElementById(id).value.trim(); const n = v(ids.name), p = v(ids.phone), m = ids.email ? v(ids.email) : '';
  const checks = [[ids.name, n.length < 2 ? 'Please tell us your name.' : ''],
    [ids.phone, !p ? 'Add a phone or WhatsApp number so we can reply.' : !phoneOk(p) ? 'That number looks incomplete. Try 0803 000 0000 or +234 803 000 0000.' : ''],
    ids.email && [ids.email, emailRequired && !m ? 'You chose email, so please add an email address.' : m && !emailOk(m) ? 'Check the email address, for example name@example.com.' : '']].filter(Boolean);
  const bad = checks.filter(([id, msg]) => !setErr(id, msg)); if (bad.length) { document.getElementById(bad[0][0]).focus(); return false; } return true;
}
function briefText(d){
  return [`New event enquiry for ${B.name} (${d.source})`, '', d.summary || '',
    ['Name', d.name], ['Phone/WhatsApp', d.phone], ['Email', d.email], ['Preferred contact', d.method], ['Event type', d.type], ['When', d.when], ['Guests', d.guests], ['Style', d.style], ['Budget', d.budget], ['Services', d.services], ['Message', d.message]]
    .map(x => Array.isArray(x) ? (x[1] ? `${x[0]}: ${x[1]}` : null) : x).filter(x => x !== null).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
function copyBlock(text){
  const ta = el('textarea', { readonly: '', 'aria-label': 'Your enquiry text' }); ta.value = text;
  const msg = el('span', { role: 'status', style: 'font-size:.88rem;color:var(--muted-l)' }); const btn = el('button', { type: 'button', class: 'btn' }, 'Copy text');
  btn.onclick = async () => { try { await navigator.clipboard.writeText(text); msg.textContent = 'Copied.'; } catch (e) { ta.focus(); ta.select(); msg.textContent = 'Selected. Use copy on your keyboard or phone.'; } };
  return [ta, el('div', { class: 'row' }, btn, msg)];
}
async function submitEnquiry(data, out, trigger){
  const text = briefText(data); out.innerHTML = '';
  const box = (cls, title, ...kids) => out.append(el('div', { class: 'outcome ' + cls }, el('h4', { text: title }), ...kids));
  if (C.formEndpoint) {
    trigger.disabled = true; const prev = trigger.innerHTML; trigger.textContent = 'Sending…';
    try {
      const r = await fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...data, brief: text, _subject: `Event enquiry: ${data.type || 'event'} – ${data.name}` }) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      box('ok', 'Thank you. Your details have been sent.', el('p', { text: `${B.name} has received them and will reply${data.method ? ' by ' + data.method.toLowerCase() : ''}.` }));
    } catch (err) {
      box('bad', "Your message didn't send.", el('p', { text: 'Something went wrong on the way. Your details are still here, so try again in a moment' + (waDigits ? ' or send them on WhatsApp.' : ', or copy them below.') }),
        waDigits ? el('a', { class: 'btn solid', href: waLink(text), target: '_blank', rel: 'noopener' }, 'Send on WhatsApp') : null, ...copyBlock(text));
    } finally { trigger.disabled = false; trigger.innerHTML = prev; }
  } else if (waDigits) {
    box('', 'Send it on WhatsApp', el('p', { text: 'Tap below to open WhatsApp with your message already written. It is sent only when you press send in WhatsApp.' }),
      el('a', { class: 'btn solid', href: waLink(text), target: '_blank', rel: 'noopener' }, 'Open WhatsApp', el('span', { class: 'arr', text: '→' })), el('p', { style: 'margin-top:14px', text: `WhatsApp number: +${waDigits}` }), ...copyBlock(text));
  } else {
    box('bad', "Online sending isn't switched on yet", el('p', { text: "This website doesn't have a form service or WhatsApp number connected yet, so nothing has been sent. Your message is ready below to copy." }), ...copyBlock(text));
  }
  out.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
}

/* ---------- chips helper ---------- */
function chips(name, opts, { kind = 'radio', grid = false, checked = () => false } = {}){
  return el('div', { class: 'chips' + (grid ? ' grid' : ''), role: kind === 'radio' ? 'radiogroup' : 'group' }, ...opts.map(o => {
    const val = typeof o === 'string' ? o : o.id, lab = typeof o === 'string' ? o : o.label;
    const inp = el('input', { type: kind, name, value: val, id: `${name}-${val}`.replace(/[^\w-]/g, '_') }); if (checked(val)) inp.checked = true;
    return el('label', { class: 'chip' }, inp, el('span', {}, o.swatch || null, lab, o.note ? el('small', { text: o.note }) : null));
  }));
}
const swatch = id => el('span', { class: 'swatch', 'aria-hidden': 'true' }, ...PAL[id].sw.map(col => el('i', { style: `background:${col}` })));
const typeById = id => C.eventTypes.find(t => t.id === id);
const fmtDate = d => { try { return new Date(d + 'T12:00').toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return d; } };

/* ================= PAGES ================= */
const PAGES = {
home(){
  // hero art + floating light
  const hc = $('#heroScene'); paint(hc, 'hall', 'elegant', 3); resizeHooks.push(() => paint(hc, 'hall', 'elegant', 3));
  if (!reduce) { let tk = false; addEventListener('scroll', () => { if (tk) return; tk = true; requestAnimationFrame(() => { hc.style.transform = `translate3d(0,${Math.min(scrollY, innerHeight)*.18}px,0)`; tk = false; }); }, { passive: true }); }
  if (!reduce) { const fx = $('#heroFx'); let parts = [], c, w, h, on = true, raf;
    const init = () => { [c, w, h] = sizeCanvas(fx); const R = rng(9); parts = Array.from({ length: 26 }, () => ({ x: R()*w, y: R()*h, r: 1 + R()*2.4, v: .08 + R()*.22, p: R()*6, col: R() < .7 ? '#efcf96' : '#fff4dc' })); };
    const tick = t => { c.clearRect(0,0,w,h); c.globalCompositeOperation = 'lighter'; parts.forEach(q => { q.y -= q.v; q.x += Math.sin(t/2400 + q.p)*.15; if (q.y < -10) q.y = h + 10; const a = .25 + .35*(.5 + .5*Math.sin(t/700 + q.p)); glow(c,q.x,q.y,q.r*6,q.col,a*.5); glow(c,q.x,q.y,q.r,'#ffffff',a); }); if (on) raf = requestAnimationFrame(tick); };
    init(); resizeHooks.push(init); new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); } }).observe(fx); }
  // marquee
  const words = C.marquee.map(w => el('span', { text: w })); const tr = $('#marqueeTrack'); tr.append(...words, ...C.marquee.map(w => el('span', { text: w, 'aria-hidden': 'true' })));
  // three featured experiences
  $('#featured').append(...C.categories.slice(0, 3).map(cat => el('a', { class: 'tile', href: goPlan({ type: cat.builderType, service: cat.service }) }, art(cat.scene, cat.style, cat.seed, '', null, ''), C.conceptMode ? el('span', { class: 'tag', text: 'Illustration' }) : null, el('div', { class: 'body' }, el('h3', { text: cat.title }), el('p', { text: cat.line }), el('span', { class: 'go' }, cat.cta, el('span', { 'aria-hidden': 'true', text: '→' }))))));
  // mini planner
  const mini = { type: 'wedding', style: 'romantic' }; const host = $('#miniQs'), cv = $('#miniScene'), cap = $('#miniCap'), go = $('#miniGo');
  host.append(el('div', { class: 'q' }, el('span', { text: 'I\'m planning a…' }), chips('m-type', C.eventTypes.slice(0, 5), { checked: v => v === mini.type })),
              el('div', { class: 'q' }, el('span', { text: 'It should feel…' }), chips('m-style', Object.entries(C.styles).map(([id, s]) => ({ id, label: s.label })), { checked: v => v === mini.style })));
  const upd = () => { const t = typeById(mini.type), s = C.styles[mini.style]; paint(cv, t.scene, mini.style, mini.type.length*13 + mini.style.length*7);
    if (!reduce && cv.animate) cv.animate([{ opacity: .3, transform: 'scale(1.04)' }, { opacity: 1, transform: 'none' }], { duration: 800, easing: 'cubic-bezier(.2,.7,.1,1)' });
    cap.textContent = `A ${s.label.toLowerCase()} ${t.label.split(' /')[0].toLowerCase()}`; go.href = goPlan({ type: mini.type, style: mini.style }); };
  host.addEventListener('change', e => { mini[e.target.name.slice(2)] = e.target.value; upd(); });
  upd(); resizeHooks.push(upd);
  // gallery strip
  $('#strip').append(...C.portfolio.slice(0, 4).map((p, i) => art(p.scene, p.style, p.seed, '', null, i === 0 ? 'Illustration' : '')));
},
experiences(){
  $('#xpList').append(...C.categories.map(cat => el('article', { class: 'xp', id: cat.id, 'data-reveal': '' },
    art(cat.scene, cat.style, cat.seed),
    el('div', {}, el('p', { class: 'eyebrow', text: cat.short }), el('h2', { text: cat.title }), el('p', { text: cat.body }),
      el('ul', { 'aria-label': 'Can include' }, ...cat.includes.map(i => el('li', { text: i }))),
      el('a', { class: 'btn solid', href: goPlan({ type: cat.builderType, service: cat.service }) }, cat.cta, el('span', { class: 'arr', text: '→' }))))));
  if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 60);
},
portfolio(){
  let filter = 'all'; const items = C.portfolio;
  const shots = items.map((p, i) => { const fr = art(p.scene, p.style, p.seed, 'soft', p.ar, p.image ? '' : 'Illustration');
    if (p.image) fr.append(el('img', { src: p.image, alt: p.alt || p.title, loading: 'lazy', decoding: 'async' }));
    const b = el('button', { class: 'shot', type: 'button', 'data-cat': p.cat, 'aria-label': `View larger: ${p.title}` }, fr, el('div', { class: 'cap' }, el('span', { text: p.title }), el('span', { text: (C.portfolioFilters.find(f => f[0] === p.cat) || ['', ''])[1] })));
    b.onclick = () => openLb(i); return b; });
  $('#masonry').append(...shots);
  $('#filters').append(...C.portfolioFilters.map(([id, lab]) => { const b = el('button', { type: 'button', 'aria-pressed': String(id === 'all'), text: lab });
    b.onclick = () => { filter = id; $$('#filters button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); shots.forEach(s => { s.hidden = !(id === 'all' || s.dataset.cat === id); if (!s.hidden) { s.style.animation = 'none'; void s.offsetWidth; s.style.animation = ''; } }); }; return b; }));
  if (!C.conceptMode) $('#pfNote').hidden = true;
  const lb = $('#lightbox'); let cur = 0;
  const vis = () => items.map((p, i) => i).filter(i => filter === 'all' || items[i].cat === filter);
  const show = () => { const p = items[cur]; $('#lbTitle').textContent = p.title; $('#lbSub').textContent = p.caption || (p.image ? '' : 'Illustration of the setting this frame will hold.');
    const img = $('#lbImg'); if (p.image) { img.src = p.image; img.alt = p.alt || p.title; img.hidden = false; } else img.hidden = true;
    requestAnimationFrame(() => { const cv = $('#lbScene'); paint(cv, p.scene, p.style, p.seed); if (!reduce) cv.animate([{ opacity: 0, transform: 'scale(1.03)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.2,.7,.1,1)' }); }); };
  const openLb = i => { cur = i; lb.showModal(); show(); };
  const step = d => { const v = vis(), k = v.indexOf(cur); cur = v[(k + d + v.length) % v.length]; show(); };
  $('#lbPrev').onclick = () => step(-1); $('#lbNext').onclick = () => step(1); $('#lbClose').onclick = () => lb.close();
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  let sx = null; lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true }); lb.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); sx = null; });
},
plan(){
  const state = { type: '', timeframe: '', date: '', guests: '', style: '', budget: '', services: [], name: '', phone: '', email: '', method: 'WhatsApp' };
  const qs = new URLSearchParams(location.search), pre = store.get('mm-prefill') || {}; store.del('mm-prefill');
  const pt = qs.get('type') || pre.type, ps = qs.get('style') || pre.style, sv = qs.get('service') || pre.service;
  if (typeById(pt)) state.type = pt; if (C.styles[ps]) state.style = ps; if (sv && C.services.some(s => s.id === sv)) state.services.push(sv);
  const svcLabel = id => (C.services.find(s => s.id === id) || {}).label;
  const summary = () => { const t = typeById(state.type), st = C.styles[state.style];
    let s = `A${st && /^[aeiou]/i.test(st.label) ? 'n' : ''} ${st ? st.label.toLowerCase() + ' ' : ''}${t ? (t.id === 'other' ? 'celebration' : t.label.toLowerCase()) : 'celebration'}`;
    if (state.guests && !/not sure/i.test(state.guests)) s += ` for ${state.guests.toLowerCase()} guests`;
    if (state.date) s += `, on ${fmtDate(state.date)}`; else if (state.timeframe && !/not decided/i.test(state.timeframe)) s += /^within|more/i.test(state.timeframe) ? `, ${state.timeframe.toLowerCase()} from now` : `, in ${state.timeframe} time`;
    s += '.'; if (state.services.length) s += ` You'd like help with ${state.services.map(id => svcLabel(id).toLowerCase()).join(', ')}.`;
    if (state.budget) s += /not sure/i.test(state.budget) ? ' Budget still to be decided.' : ` Budget around ${state.budget}.`; return s; };
  const STEPS = [
    { name: 'Occasion', render: () => [el('legend', { text: 'What are we celebrating?' }), el('p', { class: 'hint', text: 'Choose the closest match.' }), chips('type', C.eventTypes, { grid: true, checked: v => v === state.type })], valid: () => state.type ? '' : 'Choose an occasion to continue.' },
    { name: 'Timing', render: () => [el('legend', { text: 'When is the big day?' }), el('p', { class: 'hint', text: 'An exact date or a rough idea both help.' }), chips('timeframe', C.timeframes, { checked: v => v === state.timeframe }),
      el('div', { class: 'sub-q' }, el('label', { for: 'b-date', text: 'Exact date, if you have one' }), el('input', { type: 'date', id: 'b-date', value: state.date }))] },
    { name: 'Guests', render: () => [el('legend', { text: 'How many guests are you expecting?' }), el('p', { class: 'hint', text: 'A rough number is fine.' }), chips('guests', C.guestRanges, { checked: v => v === state.guests })] },
    { name: 'Style', render: () => [el('legend', { text: 'What should it feel like?' }), el('p', { class: 'hint', text: 'Watch the preview change as you choose.' }),
      chips('style', Object.entries(C.styles).map(([id, s]) => ({ id, label: s.label, note: s.mood, swatch: swatch(id) })), { grid: true, checked: v => v === state.style })] },
    { name: 'Budget', render: () => [el('legend', { text: 'Roughly what budget do you have in mind?' }), el('p', { class: 'hint', text: 'It helps us suggest ideas that fit. "Not sure yet" is a fine answer.' }), chips('budget', C.budgets, { checked: v => v === state.budget })] },
    { name: 'Services', render: () => [el('legend', { text: 'Where would you like help?' }), el('p', { class: 'hint', text: 'Choose as many as you like.' }), chips('services', C.services, { kind: 'checkbox', grid: true, checked: v => state.services.includes(v) })] },
    { name: 'Your details', render: () => [el('legend', { text: 'Where should we reply?' }), el('p', { class: 'hint', text: 'Just your name and a number. Email is optional.' }),
      el('div', { class: 'fields' },
        el('div', { class: 'field' }, el('label', { for: 'b-name', text: 'Your name' }), el('input', { type: 'text', id: 'b-name', autocomplete: 'name', value: state.name, 'aria-describedby': 'e-b-name' }), el('div', { class: 'err', id: 'e-b-name' })),
        el('div', { class: 'field' }, el('label', { for: 'b-phone', text: 'Phone or WhatsApp' }), el('input', { type: 'tel', id: 'b-phone', autocomplete: 'tel', inputmode: 'tel', value: state.phone, placeholder: 'e.g. 0803 000 0000', 'aria-describedby': 'e-b-phone' }), el('div', { class: 'err', id: 'e-b-phone' })),
        el('div', { class: 'field full' }, el('label', { for: 'b-email', html: 'Email <span class="opt">(optional)</span>' }), el('input', { type: 'email', id: 'b-email', autocomplete: 'email', value: state.email, 'aria-describedby': 'e-b-email' }), el('div', { class: 'err', id: 'e-b-email' }))),
      el('div', { class: 'sub-q' }, el('span', { text: 'Best way to reach you' }), chips('method', C.contactMethods, { checked: v => v === state.method }))],
      valid: () => validateContact({ name: 'b-name', phone: 'b-phone', email: 'b-email' }, state.method === 'Email') ? '' : true },
    { name: 'Your brief', render: () => [el('legend', { text: 'Here is your event brief.' }), el('p', { class: 'hint', text: 'Check it over, then send it. Nothing is booked or charged; it starts the conversation.' }),
      el('div', { class: 'brief' }, el('p', { class: 'sum', text: summary() }), el('p', { text: `Reply to ${state.name} by ${state.method.toLowerCase()}${state.phone ? ' on ' + state.phone : ''}${state.email ? ' · ' + state.email : ''}.` }))] }
  ];
  let step = state.type ? (state.style ? 1 : 1) : 0;
  const host = $('#stepHost'), next = $('#nextBtn'), back = $('#backBtn'), out = $('#builderOutcome');
  const render = focus => { host.innerHTML = ''; const fs = el('fieldset', { class: 'step' }, ...STEPS[step].render()); host.append(fs);
    $('#stepLabel').textContent = `Step ${step + 1} of ${STEPS.length}`; $('#stepName').textContent = STEPS[step].name; $('#barFill').style.width = `${(step + 1) / STEPS.length * 100}%`;
    back.style.visibility = step ? 'visible' : 'hidden'; next.innerHTML = step === STEPS.length - 1 ? 'Send My Event Brief <span class="arr">→</span>' : 'Continue <span class="arr">→</span>'; out.innerHTML = '';
    if (focus) { const l = $('legend', fs); l.setAttribute('tabindex', '-1'); l.focus({ preventScroll: true }); } };
  host.addEventListener('change', e => { const t = e.target;
    if (t.type === 'radio') state[t.name] = t.value; else if (t.type === 'checkbox') { const s = new Set(state.services); t.checked ? s.add(t.value) : s.delete(t.value); state.services = [...s]; } else if (t.id === 'b-date') state.date = t.value; update(); });
  host.addEventListener('input', e => { const map = { 'b-name': 'name', 'b-phone': 'phone', 'b-email': 'email' }; const k = map[e.target.id]; if (k) { state[k] = e.target.value.trim(); e.target.removeAttribute('aria-invalid'); const er = $('#e-' + e.target.id); if (er) er.textContent = ''; update(); } });
  next.onclick = () => { const v = STEPS[step].valid ? STEPS[step].valid() : ''; if (v) { if (typeof v === 'string') { out.innerHTML = ''; out.append(el('p', { class: 'err', text: v })); } return; }
    if (step < STEPS.length - 1) { step++; render(true); $('#consult').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    else { const t = typeById(state.type); submitEnquiry({ source: 'Event planner', name: state.name, phone: state.phone, email: state.email, method: state.method, type: t ? t.label : '', when: [state.timeframe, state.date && fmtDate(state.date)].filter(Boolean).join(' · '), guests: state.guests, style: (C.styles[state.style] || {}).label || '', budget: state.budget, services: state.services.map(svcLabel).join(', '), summary: summary() }, out, next); } };
  back.onclick = () => { if (step) { step--; render(true); } };
  const pv = $('#pvScene'); let key = '';
  const paintPv = () => { const t = typeById(state.type); paint(pv, t ? t.scene : 'hall', state.style || 'elegant', (state.type.length*13 + (state.style || 'x').length*7) || 5); };
  function update(){ const t = typeById(state.type), st = C.styles[state.style]; const k = state.type + '|' + state.style;
    if (k !== key) { key = k; if (!reduce && pv.animate) pv.animate([{ opacity: .2, transform: 'scale(1.04)' }, { opacity: 1, transform: 'none' }], { duration: 900, easing: 'cubic-bezier(.2,.7,.1,1)' }); paintPv(); }
    const title = $('#pvTitle'); title.innerHTML = ''; const noun = t ? (t.id === 'other' ? 'celebration' : t.label.split(' /')[0].toLowerCase()) : 'celebration';
    title.append(...['Your ', st ? el('em', { text: st.label.toLowerCase() + ' ' }) : null, st ? noun : el('em', { text: noun })].filter(Boolean));
    $('#pvMood').textContent = st ? st.mood : t ? 'Now choose a style and watch the picture change.' : 'Choose an occasion to begin. The picture and summary update as you go.';
    const rows = [['Occasion', t && t.label], ['When', [state.timeframe, state.date && fmtDate(state.date)].filter(Boolean).join(' · ')], ['Guests', state.guests], ['Style', st && st.label], ['Budget', state.budget], ['Help with', state.services.map(svcLabel).join(', ')], ['Reply by', state.name ? `${state.method} · ${state.name}` : '']];
    const dl = $('#pvList'); dl.innerHTML = ''; rows.forEach(([k, v]) => dl.append(el('dt', { text: k }), el('dd', { class: v ? '' : 'empty', text: v || 'Not chosen yet' }))); }
  resizeHooks.push(paintPv); render(false); update();
},
about(){
  if (B.about) $('#aboutText').textContent = B.about;
  const facts = [['Based in', `${B.city}, ${B.country}`], B.hours && ['Hours', B.hours], B.address && ['Studio', B.address]].filter(Boolean);
  $('#facts').append(...facts.map(([k, v]) => el('div', {}, el('dt', { text: k }), el('dd', { text: v }))));
  const ICON = { idea: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 5a10 10 0 0 0-6 18v5h12v-5a10 10 0 0 0-6-18zM15 32h10M17 36h6"/></svg>', scope: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 36V16a12 12 0 0 1 24 0v20z"/><path d="M14 22h12M14 28h8"/></svg>', coord: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="14"/><path d="M20 10v10l7 5"/></svg>', style: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6c5 6 5 12 0 16-5-4-5-10 0-16zM20 22c6-4 12-3 14 2-6 4-12 3-14-2zM20 22c-6-4-12-3-14 2 6 4 12 3 14-2zM20 22v12"/></svg>' };
  $('#values').append(...[['idea', 'Your ideas, organised', 'Saved pictures, scattered thoughts and a guest list become one clear plan you can make decisions about.'], ['scope', 'A scope you can understand', 'See what your event involves, what matters most to you, and where your budget is best spent.'], ['coord', 'The details, coordinated', 'Timings, suppliers and the small moving parts are tracked so nothing important slips.'], ['style', 'A look that feels like you', 'Explore colours, florals, lighting and layouts that suit your occasion and your taste.']]
    .map(([i, h, p]) => el('div', { class: 'value', 'data-reveal': '' }, el('span', { html: ICON[i] }), el('div', {}, el('h3', { text: h }), el('p', { text: p })))));
  $('#faqList').append(...C.faq.map(([q, a]) => el('details', {}, el('summary', { text: q }), el('p', { text: a }))));
},
contact(){
  const sel = $('#c-type'); sel.append(el('option', { value: '', text: 'Choose one' }), ...C.eventTypes.map(t => el('option', { value: t.label, text: t.label })));
  const items = contactItems(), d = $('#direct');
  if (items.length) items.forEach(([k, v, href]) => d.append(el('div', {}, el('div', { class: 'k', text: k }), href ? el('a', { class: 'v', href, target: '_blank', rel: 'noopener', text: v }) : el('div', { class: 'v', text: v }))));
  else d.append(el('p', { class: 'muted', style: 'margin:0', text: 'Phone, WhatsApp and email details will appear here once they are confirmed. For now, the form is the quickest way to reach us.' }));
  const f = $('#contactForm'); clearOnInput(f);
  f.addEventListener('submit', e => { e.preventDefault();
    if (!validateContact({ name: 'c-name', phone: 'c-phone' })) return;
    if (!setErr('c-type', sel.value ? '' : 'Choose the type of event, or "Something else".')) { sel.focus(); return; }
    const g = id => document.getElementById(id).value.trim();
    submitEnquiry({ source: 'Contact form', name: g('c-name'), phone: g('c-phone'), type: g('c-type'), when: g('c-date'), message: g('c-msg') }, $('#contactOutcome'), f.querySelector('[type=submit]')); });
}
};
(PAGES[page] || (() => {}))();
})();

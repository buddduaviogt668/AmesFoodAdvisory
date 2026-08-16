const NAV_HTML = `
<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <div class="nav-logo-name">AMES <span class="nav-logo-adv">Food Advisory</span></div>
    <div class="nav-logo-tag">NSW&nbsp;&middot;&nbsp;HACCP&nbsp;&middot;&nbsp;FOOD CONSULTANTS</div>
  </a>
  <ul class="nav-links">
    <li>
      <a href="/food-safety-consulting-sydney">Services <span class="nav-arrow">▼</span></a>
      <div class="nav-drop">
        <a href="/haccp-plan-development">HACCP Plan Development</a>
        <a href="/food-safety-consulting-sydney">Food Safety Consulting</a>
        <a href="/food-safety-training-sydney">Staff Training</a>
        <a href="/sop-writing-food-businesses">SOP Writing</a>
        <a href="/internal-auditing-services">Compliance Readiness</a>
        <div class="drop-divider"></div>
        <a href="/food-manufacturer-consulting">Manufacturer Consulting</a>
        <a href="/cafe-restaurant-food-safety">Cafe &amp; Restaurant</a>
        <a href="/food-business-startup-package">Start-Up Package</a>
      </div>
    </li>
    <li>
      <a href="/food-safety-training-sydney">Training <span class="nav-arrow">▼</span></a>
      <div class="nav-drop">
        <a href="/food-safety-training-sydney">Food Safety Training</a>
        <a href="/food-safety-supervisor-requirements-nsw">FSS Certification</a>
        <a href="/food-industry-workers-training">Industry Workers</a>
        <a href="/online-food-safety-courses">Online Courses</a>
        <a href="/lab-skills-training">Lab Skills</a>
        <div class="drop-divider"></div>
        <a href="/rto-resource-development">RTO Resource Development</a>
      </div>
    </li>
    <li>
      <a href="/blog">Blog <span class="nav-arrow">▼</span></a>
      <div class="nav-drop">
        <a href="/blog/haccp">HACCP Deep-Dive</a>
        <a href="/blog">All Articles</a>
        <div class="drop-divider"></div>
        <a href="/nsw-food-authority-registration-guide">Registration Guide</a>
        <a href="/haccp-simplified">HACCP Simplified</a>
        <a href="/free-resources">Free Resources</a>
        <a href="/free-compliance-checklist-nsw">NSW Compliance Checklist</a>
        <div class="drop-divider"></div>
        <a href="/food-safety-faq-nsw">Food Safety FAQ</a>
      </div>
    </li>
    <li>
      <a href="/recent-projects">Recent Work</a>
    </li>
    <li>
      <a href="/pricing">Pricing</a>
    </li>
    <li>
      <a href="/suburb-directory">Locations <span class="nav-arrow">▼</span></a>
      <div class="nav-drop">
        <a href="/suburb-directory">All Sydney</a>
        <a href="/food-safety-consultant-surry-hills">CBD</a>
        <a href="/food-safety-consultant-marrickville">Inner West</a>
        <a href="/food-safety-consultant-parramatta">Parramatta</a>
        <a href="/food-safety-consultant-chatswood">North Shore</a>
        <a href="/food-safety-consultant-hornsby">Hornsby</a>
      </div>
    </li>
    <li><a href="/#about">About</a></li>
    <li><button type="button" class="nav-ai" onclick="openAmesAssistant()" aria-haspopup="dialog"><span class="nav-ai-mark" aria-hidden="true">◉</span> Talk to AMES</button></li>
    <li><a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="nav-cta">Book Call</a></li>
  </ul>
</nav>
<button class="ham-btn" aria-label="Toggle navigation" aria-expanded="false" onclick="toggleMobNav(this)">
  <span></span><span></span><span></span>
</button>
<div class="mob-nav" id="mobNav">
  <span class="mob-section">Services</span>
  <a href="/haccp-plan-development">HACCP Plan Development</a>
  <a href="/food-safety-consulting-sydney">Food Safety Consulting</a>
  <a href="/food-safety-training-sydney">Staff Training</a>
  <a href="/sop-writing-food-businesses">SOP Writing</a>
  <a href="/internal-auditing-services">Compliance Readiness</a>
  <a href="/food-manufacturer-consulting">Manufacturer Consulting</a>
  <a href="/cafe-restaurant-food-safety">Cafe &amp; Restaurant</a>
  <a href="/food-business-startup-package">Start-Up Package</a>
  <span class="mob-section">Training</span>
  <a href="/food-safety-training-sydney">Food Safety Training</a>
  <a href="/food-safety-supervisor-requirements-nsw">FSS Certification</a>
  <a href="/food-industry-workers-training">Industry Workers</a>
  <a href="/online-food-safety-courses">Online Courses</a>
  <a href="/lab-skills-training">Lab Skills</a>
  <a href="/rto-resource-development">RTO Resource Development</a>
  <span class="mob-section">Resources</span>
  <a href="/blog">Blog</a>
  <a href="/nsw-food-authority-registration-guide">Registration Guide</a>
  <a href="/haccp-simplified">HACCP Simplified</a>
  <a href="/free-resources">Free Resources</a>
  <a href="/free-compliance-checklist-nsw">NSW Compliance Checklist</a>
  <a href="/food-safety-faq-nsw">Food Safety FAQ</a>
  <span class="mob-section">Company</span>
  <a href="/recent-projects">Recent Work</a>
  <a href="/pricing">Pricing</a>
  <a href="/suburb-directory">Locations</a>
  <a href="/#about">About AMES</a>
  <button type="button" class="mob-ai" onclick="openAmesAssistant()" aria-haspopup="dialog">◉&nbsp; Talk to AMES</button>
  <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="mob-cta">Book Scoping Call</a>
</div>
<div class="ames-assistant-backdrop" id="ames-assistant" role="presentation" onclick="closeAmesAssistant(event)">
  <section class="ames-assistant-dialog" role="dialog" aria-modal="true" aria-labelledby="ames-assistant-title" onclick="event.stopPropagation()">
    <button type="button" class="ames-assistant-close" aria-label="Close Talk to AMES assistant" onclick="closeAmesAssistant()">&times;</button>
    <div class="ames-assistant-kicker">AMES AI enquiry assistant</div>
    <h2 id="ames-assistant-title">A clearer place<br><em>to start.</em></h2>
    <p>I’m AMES Food Advisory’s AI enquiry assistant. I can help gather a few details about your business and point you to the right next step.</p>
    <p class="ames-assistant-disclosure"><span aria-hidden="true">&#10003;</span><span>I’m an AI assistant, not a food-safety consultant. For detailed advice, you can speak with the AMES team during a free 20-minute scoping call.</span></p>
    <div class="ames-assistant-actions">
      <button type="button" class="ames-assistant-primary" onclick="startAmesVoice()">Start a voice chat &#127908;</button>
      <a class="ames-assistant-secondary" href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener">Book the free 20-minute call &#8599;</a>
      <a class="ames-assistant-secondary" href="/contact">Send an enquiry &#8599;</a>
      <a class="ames-assistant-secondary" href="tel:+61278220109">Call AMES on (02) 7822 0109</a>
    </div>
    <p id="ames-voice-status" class="ames-assistant-status" role="status" aria-live="polite"></p>
    <a class="ames-assistant-note" href="mailto:ames.food.adv@gmail.com">Prefer email? ames.food.adv@gmail.com</a>
  </section>
</div>
`;

const NAV_JS = `
function toggleMobNav(btn){
  btn.classList.toggle('open');
  var nav=document.getElementById('mobNav');
  nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}
document.addEventListener('click',function(e){
  var nav=document.getElementById('mobNav');
  var btn=document.querySelector('.ham-btn');
  if(nav && btn && nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)){
    nav.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }
});
function openAmesAssistant(){
  var panel=document.getElementById('ames-assistant');
  if(!panel) return;
  panel.classList.add('is-open');
  document.body.classList.add('ames-assistant-open');
  var close=panel.querySelector('.ames-assistant-close');
  if(close) close.focus();
}
function closeAmesAssistant(event){
  if(event && event.target!==event.currentTarget) return;
  var panel=document.getElementById('ames-assistant');
  if(!panel) return;
  panel.classList.remove('is-open');
  document.body.classList.remove('ames-assistant-open');
}
function startAmesVoice(){
  var status=document.getElementById('ames-voice-status');
  if(status) status.textContent='Voice chat is not connected yet. Please book the free 20-minute call, send an enquiry, or call AMES directly.';
}
document.addEventListener('keydown',function(event){ if(event.key==='Escape') closeAmesAssistant(); });
`;

const NAV_CSS = `
  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(19,30,40,0.97); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(212,117,31,0.15);
    padding: 0 2rem; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display: flex; flex-direction: column; justify-content: center; text-decoration: none; gap: 1px; }
  .nav-logo-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--white); letter-spacing: 0.01em; line-height: 1.1; }
  .nav-logo-adv { color: var(--amber); font-style: italic; font-weight: 400; }
  .nav-logo-tag { font-size: 0.55rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.35); font-family: 'Inter', sans-serif; line-height: 1; }
  .nav-links { display: flex; gap: 0; align-items: center; list-style: none; }
  .nav-links > li { position: relative; }
  .nav-links > li > a {
    text-decoration: none; font-size: 0.82rem; font-weight: 400;
    color: rgba(255,255,255,0.6); letter-spacing: 0.01em; transition: color 0.2s;
    padding: 0 0.85rem; height: 58px; display: flex; align-items: center; gap: 0.25rem;
  }
  .nav-links > li > a:hover, .nav-links > li:hover > a { color: var(--white); }
  .nav-arrow { font-size: 0.55rem; opacity: 0.5; transition: transform 0.2s; }
  .nav-links > li:hover > a .nav-arrow { transform: rotate(180deg); opacity: 1; }
  .nav-drop {
    position: absolute; top: 58px; left: 0; min-width: 210px;
    background: rgba(19,30,40,0.98); border: 1px solid rgba(212,117,31,0.15);
    border-top: 2px solid var(--amber); border-radius: 0 0 8px 8px;
    padding: 0.5rem 0; opacity: 0; visibility: hidden;
    transform: translateY(-6px); transition: all 0.18s ease; z-index: 999;
  }
  .nav-links > li:hover .nav-drop { opacity: 1; visibility: visible; transform: translateY(0); }
  .nav-drop a {
    display: block; padding: 0.55rem 1.1rem; font-size: 0.8rem;
    color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.15s, background 0.15s;
  }
  .nav-drop a:hover { color: var(--amber); background: rgba(212,117,31,0.06); }
  .drop-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0.35rem 0; }
  .nav-cta {
    background: var(--amber) !important; color: var(--navy) !important;
    padding: 0.45rem 1.1rem !important; border-radius: 5px !important;
    font-weight: 600 !important; font-size: 0.8rem !important; margin-left: 0.5rem;
    transition: background 0.2s !important;
  }
  .nav-cta:hover { background: var(--amber-light) !important; color: var(--navy) !important; }
  /* Talk to AMES: optional, transparent AI entry point preserving existing lead routes. */
  .nav-ai { display:flex; align-items:center; gap:.35rem; background:transparent; border:1px solid rgba(232,145,58,.42); color:var(--amber-light); border-radius:5px; padding:.4rem .8rem; font-size:.78rem; cursor:pointer; transition:background .2s,color .2s,border-color .2s; white-space:nowrap; }
  .nav-ai:hover { background:rgba(232,145,58,.12); border-color:var(--amber-light); color:var(--white); }
  .nav-ai-mark { font-size:.78rem; line-height:1; }
  .mob-ai { display:block; width:calc(100% - 3rem); margin:1rem 1.5rem 0; padding:.85rem 1rem; color:var(--amber-light); background:transparent; border:1px solid rgba(232,145,58,.42); border-radius:6px; text-align:center; font-size:.95rem; cursor:pointer; }
  .ames-assistant-backdrop { position:fixed; inset:0; z-index:2000; display:none; align-items:center; justify-content:center; padding:1.25rem; background:rgba(9,17,27,.74); backdrop-filter:blur(7px); }
  .ames-assistant-backdrop.is-open { display:flex; }
  .ames-assistant-dialog { width:min(100%,470px); position:relative; background:var(--stone); color:var(--ink); border-top:3px solid var(--amber); border-radius:8px; box-shadow:0 24px 90px rgba(0,0,0,.4); padding:2rem; }
  .ames-assistant-close { position:absolute; top:.85rem; right:.9rem; border:0; background:transparent; color:var(--ink-soft); font-size:1.4rem; line-height:1; cursor:pointer; }
  .ames-assistant-kicker { color:var(--amber-dim); font-size:.68rem; font-weight:700; letter-spacing:.13em; text-transform:uppercase; margin-bottom:.7rem; }
  .ames-assistant-dialog h2 { font-family:'Playfair Display',serif; font-weight:400; font-size:clamp(1.85rem,5vw,2.5rem); line-height:1.1; margin-bottom:.8rem; color:var(--navy-deep); }
  .ames-assistant-dialog h2 em { color:var(--amber-dim); }
  .ames-assistant-dialog p { color:var(--ink-mid); font-size:.9rem; line-height:1.65; }
  .ames-assistant-disclosure { display:flex; align-items:flex-start; gap:.6rem; background:var(--amber-pale); border-left:3px solid var(--amber); padding:.75rem .85rem; margin:1rem 0 1.2rem; font-size:.78rem !important; }
  .ames-assistant-actions { display:grid; gap:.6rem; margin-top:1.2rem; }
  .ames-assistant-actions a,.ames-assistant-actions button { display:flex; align-items:center; justify-content:center; gap:.45rem; min-height:2.7rem; border-radius:5px; padding:.7rem 1rem; font-size:.83rem; font-weight:600; text-decoration:none; cursor:pointer; }
  .ames-assistant-primary { background:var(--amber); color:var(--navy-deep); border:1px solid var(--amber); }
  .ames-assistant-secondary { background:transparent; color:var(--navy); border:1px solid var(--border-navy); }
  .ames-assistant-secondary:hover { background:rgba(28,43,58,.06); }
  .ames-assistant-note { display:block; text-align:center; color:var(--amber-dim); margin-top:1rem; font-size:.76rem; text-decoration:none; }
  .ames-assistant-status { display:block; min-height:0; margin-top:.8rem; padding:.65rem .75rem; background:var(--amber-pale); border-left:3px solid var(--amber); color:var(--ink-mid); font-size:.76rem; line-height:1.5; }
  body.ames-assistant-open { overflow:hidden; }

  /* ── HAMBURGER MOBILE MENU ── */
  .ham-btn{display:none;flex-direction:column;justify-content:space-between;width:26px;height:19px;background:none;border:none;cursor:pointer;padding:0;margin-left:auto;z-index:10001;position:fixed;right:2rem;top:19.5px;}
  .ham-btn span{display:block;width:100%;height:2px;background:rgba(255,255,255,0.85);border-radius:2px;transition:all 0.25s ease;}
  .ham-btn.open span:nth-child(1){transform:translateY(8.5px) rotate(45deg);}
  .ham-btn.open span:nth-child(2){opacity:0;}
  .ham-btn.open span:nth-child(3){transform:translateY(-8.5px) rotate(-45deg);}
  .mob-nav{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(14,22,30,0.98);z-index:9998;overflow-y:auto;padding:58px 0 3rem;}
  .mob-nav.open{display:block;}
  .mob-nav a{display:block;padding:0.85rem 1.5rem;color:rgba(255,255,255,0.80);font-size:0.95rem;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.05);font-family:'Inter',sans-serif;transition:color 0.15s,background 0.15s;}
  .mob-nav a:hover{color:#E8913A;background:rgba(232,145,58,0.06);}
  .mob-nav .mob-section{padding:0.55rem 1.5rem 0.25rem;font-size:0.65rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.28);font-family:'Inter',sans-serif;margin-top:0.5rem;}
  .mob-nav .mob-cta{background:#E8913A!important;color:#fff!important;margin:1.2rem 1.5rem 0;border-radius:6px;text-align:center;font-weight:600;border-bottom:none!important;}
  .mob-nav .mob-cta:hover{background:#d47a25!important;}
  @media(max-width:900px){.ham-btn{display:flex;}.nav-links{display:none!important;}}
`;

module.exports = { NAV_HTML, NAV_JS, NAV_CSS };

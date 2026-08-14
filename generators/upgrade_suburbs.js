const fs = require('fs');
const path = require('path');
const { NAV_HTML, NAV_JS, NAV_CSS } = require('../templates/nav-master.js');

const OUTPUT_DIR = path.join(__dirname, '..');

// --- Helper to get base template ---
function getBaseHTML(title, desc, kw, ogTitle, ogDesc, ogUrl, schemaData, heroEyebrow, heroTitle, heroSub, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${kw}">
<meta name="robots" content="index, follow">
<meta name="author" content="AMES Food Advisory">
<link rel="canonical" href="${ogUrl}">
<meta property="og:type" content="website">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:url" content="${ogUrl}">
<meta property="og:image" content="https://www.amesfoodadvisory.com.au/assets/og-image-default.png">
<meta property="og:site_name" content="AMES Food Advisory">
<meta property="og:locale" content="en_AU">
<script type="application/ld+json">
${JSON.stringify(schemaData, null, 2)}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --navy:        #1C2B3A;
    --navy-deep:   #131E28;
    --navy-mid:    #243548;
    --navy-lift:   #2E4460;
    --amber:       #D4751F;
    --amber-light: #D4751F;
    --amber-pale:  #FEF3E8;
    --amber-dim:   #B05E10;
    --stone:       #F5F1EB;
    --stone-mid:   #EDE7DE;
    --stone-dark:  #DDD4C6;
    --ink:         #1A1C1E;
    --ink-mid:     #3C4048;
    --ink-soft:    #6B7280;
    --ink-muted:   #9CA3AF;
    --white:       #FFFFFF;
    --border-navy: rgba(28,43,58,0.12);
    --border-amber:rgba(212,117,31,0.28);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--stone);
    color: var(--ink);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }
  ${NAV_CSS}
  
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  
  .page-hero {
    background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%);
    color: var(--white);
    padding: 120px 2rem 60px;
    margin-top: 58px;
    position: relative;
    overflow: hidden;
  }
  .page-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212,117,31,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .page-hero-inner {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .page-eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .page-eyebrow::before {
    content: '';
    width: 20px;
    height: 2px;
    background: var(--amber);
    border-radius: 1px;
  }
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 1.2rem;
  }
  h1 em {
    font-style: italic;
    color: var(--amber);
  }
  .page-hero-sub {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.75;
    margin-bottom: 2rem;
    max-width: 700px;
    font-weight: 300;
  }
  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .btn-primary, .btn-outline {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .btn-primary {
    background: var(--amber);
    color: var(--navy-deep);
  }
  .btn-primary:hover {
    background: var(--amber-dim);
  }
  .btn-outline {
    background: transparent;
    color: var(--white);
    border: 2px solid var(--amber);
  }
  .btn-outline:hover {
    background: var(--amber);
    color: var(--navy-deep);
  }
  
  .creds-bar {
    background: var(--white);
    border-bottom: 1px solid var(--border-navy);
    overflow: hidden;
  }
  .creds-track {
    display: flex;
    gap: 2rem;
    padding: 1.2rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    overflow-x: auto;
  }
  .cred-pill {
    font-size: 0.8rem;
    color: var(--ink-soft);
    white-space: nowrap;
    font-weight: 500;
  }
  
  section {
    padding: 4.5rem 2rem;
  }
  
  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 1rem;
  }
  .section-eyebrow::before {
    content: '';
    width: 20px;
    height: 2px;
    background: var(--amber);
    border-radius: 1px;
  }
  
  h2.display {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 3.2vw, 2.6rem);
    font-weight: 400;
    line-height: 1.18;
    color: var(--navy);
    margin-bottom: 1.25rem;
  }
  h2.display em {
    font-style: italic;
    color: var(--amber-dim);
  }
  
  .body-lead {
    font-size: 1.05rem;
    color: var(--ink-mid);
    line-height: 1.8;
    font-weight: 300;
    max-width: 680px;
    margin-bottom: 2rem;
  }
  
  .includes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 2.5rem 0;
  }
  .include-item {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    background: var(--white);
    border: 1px solid var(--border-navy);
    border-radius: 10px;
    padding: 1.25rem 1.35rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .include-item:hover {
    border-color: var(--border-amber);
    box-shadow: 0 4px 16px rgba(28,43,58,0.06);
  }
  .include-icon {
    width: 32px;
    height: 32px;
    border-radius: 7px;
    background: var(--amber-pale);
    color: var(--amber-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .include-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 0.25rem;
  }
  .include-desc {
    font-size: 0.82rem;
    color: var(--ink-soft);
    line-height: 1.55;
    font-weight: 300;
  }
  
  .hub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
  .hub-card { background: var(--white); border: 1px solid var(--border-navy); padding: 1.5rem; border-radius: 8px; transition: all 0.2s; text-decoration: none; display: flex; flex-direction: column; }
  .hub-card:hover { border-color: var(--amber); box-shadow: 0 5px 20px rgba(0,0,0,0.05); transform: translateY(-2px); }
  .hub-card-cat { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--amber); letter-spacing: 0.1em; margin-bottom: 0.5rem; }
  .hub-card-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--navy); margin-bottom: 0.5rem; line-height: 1.3; }
  .hub-card-desc { font-size: 0.85rem; color: var(--ink-soft); line-height: 1.5; margin-bottom: 1rem; flex-grow: 1; }
  .hub-card-link { font-size: 0.8rem; font-weight: 600; color: var(--navy-deep); display: flex; align-items: center; gap: 0.3rem; }

  footer {
    background: var(--navy-deep);
    border-top: 1px solid rgba(212,117,31,0.12);
    padding: 2.5rem 2rem;
  }
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-logo { display: flex; flex-direction: column; gap: 2px; text-decoration: none; }
  .footer-logo-name { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.7); line-height: 1.1; }
  .footer-logo-adv { color: rgba(212,117,31,0.8); font-style: italic; font-weight: 400; }
  .footer-logo-tag { font-size: 0.55rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.22); font-family: 'Inter', sans-serif; line-height: 1; }
  .footer-copy {
    font-size: 0.76rem;
    color: rgba(255,255,255,0.28);
  }
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  .footer-links a {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover {
    color: var(--amber);
  }
  
  @media(max-width: 768px) {
    .nav-links { display: none; }
    section { padding: 2.5rem 1rem; }
    h1 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); }
    .includes-grid { grid-template-columns: 1fr; }
  }
</style>
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WE0FLYZLBP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "G-WE0FLYZLBP");
</script>
</head>
<body>

${NAV_HTML}

<div class="page-hero">
  <div class="page-hero-inner">
    <div class="page-eyebrow">${heroEyebrow}</div>
    <h1>${heroTitle}</h1>
    <p class="page-hero-sub">${heroSub}</p>
    <div class="hero-actions">
      <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="btn-primary">Book a free consultation ↗</a>
      <a href="/free-compliance-checklist-nsw" class="btn-outline resource-btn">Free Compliance Checklist</a>
    </div>
  </div>
</div>

<div class="creds-bar"><div class="creds-track">
  <span class="cred-pill">11+ Years Food Quality Experience</span>
  <span class="cred-pill">National Manufacturer QA Background</span>
  <span class="cred-pill">TAE-Qualified Trainer</span>
  <span class="cred-pill">TAFE NSW Lecturer</span>
  <span class="cred-pill">HACCP &amp; SQF Specialist</span>
  <span class="cred-pill">NSW Food Authority Compliance</span>
  <span class="cred-pill">Food Technology Diploma</span>
  <span class="cred-pill">Serving All of NSW</span>
</div></div>

${bodyContent}

<footer>
  <div class="footer-inner">
    <a href="/" class="footer-logo">
    <span class="footer-logo-name">AMES <span class="footer-logo-adv">Food Advisory</span></span>
    <span class="footer-logo-tag">NSW&nbsp;·&nbsp;HACCP&nbsp;·&nbsp;FOOD CONSULTANTS</span>
  </a>
    <div class="footer-copy">© 2026 AMES Food Advisory. Serving all of NSW. Confidential &amp; ethical food safety consulting.</div>
    <div class="footer-links">
      <a href="/pricing">Pricing</a>
      <a href="/suburb-directory">Locations</a>
      <a href="/free-resources">Free Resources</a>
      <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener">Book Call</a>
    </div>
  </div>
</footer>

<script>
  ${NAV_JS}
</script>
</body>
</html>`;
}

const suburbs = [
  // Inner West
  { name: 'Ashfield', region: 'Inner West', landmark: 'Liverpool Road dining precinct' }, 
  { name: 'Burwood', region: 'Inner West', landmark: 'Burwood Road cafes and Westfield eateries' }, 
  { name: 'Concord', region: 'Inner West', landmark: 'Majors Bay Road strip' },
  { name: 'Croydon', region: 'Inner West', landmark: 'The Strand' }, 
  { name: 'Drummoyne', region: 'Inner West', landmark: 'Victoria Road commercial hub' }, 
  { name: 'Dulwich Hill', region: 'Inner West', landmark: 'Marrickville Road cafes' },
  { name: 'Earlwood', region: 'Inner West', landmark: 'Homer Street restaurants' }, 
  { name: 'Enfield', region: 'Inner West', landmark: 'local commercial areas' }, 
  { name: 'Enmore', region: 'Inner West', landmark: 'Enmore Road dining strip' },
  { name: 'Erskineville', region: 'Inner West', landmark: 'Erskineville Road cafes' }, 
  { name: 'Glebe', region: 'Inner West', landmark: 'Glebe Point Road' }, 
  { name: 'Haberfield', region: 'Inner West', landmark: 'Ramsay Street Italian precinct' },
  { name: 'Lewisham', region: 'Inner West', landmark: 'local businesses' }, 
  { name: 'Petersham', region: 'Inner West', landmark: 'New Canterbury Road Portuguese precinct' }, 
  { name: 'Stanmore', region: 'Inner West', landmark: 'Percival Road' },
  { name: 'Strathfield', region: 'Inner West', landmark: 'The Boulevard and Strathfield Plaza' }, 
  { name: 'Summer Hill', region: 'Inner West', landmark: 'Lackey Street' }, 
  { name: 'Sydenham', region: 'Inner West', landmark: 'Sydenham industrial bakeries' },
  { name: 'Newtown', region: 'Inner West', landmark: 'King Street dining precinct' }, 
  { name: 'Marrickville', region: 'Inner West', landmark: 'Marrickville Road and industrial breweries' },
  
  // North Shore
  { name: 'Cammeray', region: 'North Shore', landmark: 'Miller Street cafes' }, 
  { name: 'Gordon', region: 'North Shore', landmark: 'Pacific Highway commercial center' }, 
  { name: 'Killara', region: 'North Shore', landmark: 'local cafes' },
  { name: 'Lane Cove', region: 'North Shore', landmark: 'Lane Cove Plaza' }, 
  { name: 'Lindfield', region: 'North Shore', landmark: 'Lindfield shopping village' }, 
  { name: 'North Sydney', region: 'North Shore', landmark: 'Mount Street CBD' },
  { name: 'Pymble', region: 'North Shore', landmark: 'Pacific Highway businesses' }, 
  { name: 'Roseville', region: 'North Shore', landmark: 'Roseville station precinct' }, 
  { name: 'Waitara', region: 'North Shore', landmark: 'local commercial zones' },
  { name: 'Willoughby', region: 'North Shore', landmark: 'Willoughby Road' }, 
  { name: 'Artarmon', region: 'North Shore', landmark: 'Wilkes Avenue' }, 
  { name: 'Cremorne', region: 'North Shore', landmark: 'Military Road' },
  { name: 'Crows Nest', region: 'North Shore', landmark: 'Willoughby Road dining hub' }, 
  { name: 'Hornsby', region: 'North Shore', landmark: 'Westfield Hornsby' }, 
  { name: 'Mosman', region: 'North Shore', landmark: 'Military Road boutiques' },
  { name: 'Neutral Bay', region: 'North Shore', landmark: 'Military Road restaurants' }, 
  { name: 'St Leonards', region: 'North Shore', landmark: 'Pacific Highway tech hub' }, 
  { name: 'Turramurra', region: 'North Shore', landmark: 'Rohini Street' },
  { name: 'Wahroonga', region: 'North Shore', landmark: 'Wahroonga Village' }, 
  { name: 'Chatswood', region: 'North Shore', landmark: 'Victoria Avenue and Westfield Chatswood' },
  
  // Western Sydney
  { name: 'Auburn', region: 'Western Sydney', landmark: 'Auburn Road' }, 
  { name: 'Bankstown', region: 'Western Sydney', landmark: 'Bankstown CBD and Saigon Place' }, 
  { name: 'Granville', region: 'Western Sydney', landmark: 'South Street' },
  { name: 'Harris Park', region: 'Western Sydney', landmark: 'Wigram Street Indian precinct' }, 
  { name: 'Lidcombe', region: 'Western Sydney', landmark: 'John Street' }, 
  { name: 'Mount Druitt', region: 'Western Sydney', landmark: 'Westfield Mount Druitt' },
  { name: 'Punchbowl', region: 'Western Sydney', landmark: 'The Boulevarde' }, 
  { name: 'Richmond', region: 'Western Sydney', landmark: 'Windsor Street' }, 
  { name: 'Rooty Hill', region: 'Western Sydney', landmark: 'Rooty Hill Road North' },
  { name: 'Seven Hills', region: 'Western Sydney', landmark: 'Seven Hills Plaza' }, 
  { name: 'St Marys', region: 'Western Sydney', landmark: 'Queen Street' }, 
  { name: 'Westmead', region: 'Western Sydney', landmark: 'Hawkesbury Road hospital precinct' },
  { name: 'Windsor', region: 'Western Sydney', landmark: 'George Street historical precinct' }, 
  { name: 'Blacktown', region: 'Western Sydney', landmark: 'Main Street and Westpoint' }, 
  { name: 'Cabramatta', region: 'Western Sydney', landmark: 'John Street Asian precinct' },
  { name: 'Fairfield', region: 'Western Sydney', landmark: 'Smart Street' }, 
  { name: 'Liverpool', region: 'Western Sydney', landmark: 'Macquarie Street' }, 
  { name: 'Merrylands', region: 'Western Sydney', landmark: 'Merrylands Road' },
  { name: 'Parramatta', region: 'Western Sydney', landmark: 'Church Street (Eat Street) and Parramatta Square' }, 
  { name: 'Penrith', region: 'Western Sydney', landmark: 'High Street and Westfield Penrith' },
  
  // South Sydney & Sutherland
  { name: 'Alexandria', region: 'South Sydney', landmark: 'Mitchell Road and the Grounds' }, 
  { name: 'Botany', region: 'South Sydney', landmark: 'Botany Road' }, 
  { name: 'Caringbah', region: 'Sutherland Shire', landmark: 'Kingsway' },
  { name: 'Cronulla', region: 'Sutherland Shire', landmark: 'Cronulla Mall' }, 
  { name: 'Engadine', region: 'Sutherland Shire', landmark: 'Princes Highway' }, 
  { name: 'Gymea', region: 'Sutherland Shire', landmark: 'Gymea Bay Road' },
  { name: 'Hurstville', region: 'South Sydney', landmark: 'Forest Road' }, 
  { name: 'Kogarah', region: 'South Sydney', landmark: 'Railway Parade' }, 
  { name: 'Mascot', region: 'South Sydney', landmark: 'Botany Road and Airport precinct' },
  { name: 'Menai', region: 'Sutherland Shire', landmark: 'Menai Marketplace' }, 
  { name: 'Miranda', region: 'Sutherland Shire', landmark: 'Westfield Miranda' }, 
  { name: 'Oatley', region: 'South Sydney', landmark: 'Oatley Avenue' },
  { name: 'Peakhurst', region: 'South Sydney', landmark: 'Boundary Road' }, 
  { name: 'Redfern', region: 'South Sydney', landmark: 'Redfern Street' }, 
  { name: 'Rockdale', region: 'South Sydney', landmark: 'Princes Highway' },
  { name: 'Sans Souci', region: 'South Sydney', landmark: 'Rocky Point Road' }, 
  { name: 'Sutherland', region: 'Sutherland Shire', landmark: 'Flora Street' }, 
  { name: 'Sylvania', region: 'Sutherland Shire', landmark: 'Southgate Shopping Centre' },
  { name: 'Waterloo', region: 'South Sydney', landmark: 'Danks Street' }, 
  { name: 'Zetland', region: 'South Sydney', landmark: 'East Village' }
];

suburbs.forEach(sub => {
  const slug = 'food-safety-consultant-' + sub.name.toLowerCase().replace(/\s+/g, '-');
  const fileName = slug + '.html';
  
  const title = 'Food Safety Consultant ' + sub.name + ' | ' + sub.region + ' Hub | AMES Food Advisory';
  const desc = 'Local food safety and HACCP consultant for ' + sub.name + '. Comprehensive compliance support for cafes and restaurants near ' + sub.landmark + ' in ' + sub.region + '.';
  const kw = 'food safety consultant ' + sub.name + ', HACCP consultant ' + sub.region + ', ' + sub.name + ' food compliance, ' + sub.landmark;
  const url = 'https://www.amesfoodadvisory.com.au/' + slug;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": sub.name + ' & ' + sub.region + ' Food Safety Services',
    "description": desc,
    "provider": { "@type": "LocalBusiness", "name": "AMES Food Advisory" }
  };

  const bodyContent = `
  <section style="background:var(--white);">
    <div class="container">
      <div class="section-eyebrow">Local Expertise</div>
      <h2 class="display">Compliance in the heart of <em>${sub.name}</em></h2>
      <p class="body-lead">Navigating the local council regulations around ${sub.landmark} requires more than just generic templates. AMES Food Advisory brings 11+ years of Tier-1 manufacturing experience (including national food manufacturing) and real-world TAFE NSW lecturing expertise directly to the food businesses of ${sub.name}.</p>
      
      <p style="margin-bottom: 2rem; color: var(--ink-mid); max-width: 800px; line-height: 1.8;">
        Whether you run a fast-paced cafe, an artisanal bakery, or a massive commercial kitchen, our customized systems are designed specifically for the ${sub.region} landscape. We do not operate as an RTO; rather, we provide highly specialized consulting, SOP writing, and bespoke internal training that physically prepares your team for NSW Food Authority and local council inspections.
      </p>

      <div class="includes-grid">
          <div class="include-item">
            <div class="include-icon">🏛</div>
            <div>
              <div class="include-title">NSW Food Authority Audit Prep</div>
              <div class="include-desc">Mock inspections and gap analysis reports aligned to inspection criteria to ensure your ${sub.name} business passes without stress.</div>
            </div>
          </div>
          <div class="include-item">
            <div class="include-icon">📋</div>
            <div>
              <div class="include-title">Bespoke HACCP Programs</div>
              <div class="include-desc">Custom food safety programs built specifically for the operational flows of your kitchen in the ${sub.region}.</div>
            </div>
          </div>
      </div>
    </div>
  </section>

  <section style="background:var(--stone);">
    <div class="container">
      <div class="section-eyebrow">The Knowledge Hub</div>
      <h2 class="display">Local Food Safety <em>Resources</em></h2>
      <p class="body-lead">We believe in empowering ${sub.name} businesses with the knowledge to succeed. Explore our latest compliance guides and standard operating procedures below.</p>
      
      <div class="hub-grid">
        <a href="/blog/training/why-food-safety-training-is-critical-for-sydney-cafes" class="hub-card">
          <div class="hub-card-cat">Training Guide</div>
          <div class="hub-card-title">Why Food Safety Training is Critical for Sydney Cafes</div>
          <div class="hub-card-desc">Understand exactly what the NSW Food Authority requires from your staff and how to meet it.</div>
          <div class="hub-card-link">Read Article ↗</div>
        </a>
        
        <a href="/blog/sop/the-ultimate-guide-to-sop-writing-for-food-businesses" class="hub-card">
          <div class="hub-card-cat">SOP Guide</div>
          <div class="hub-card-title">The Ultimate Guide to SOP Writing</div>
          <div class="hub-card-desc">Learn how to document temperature controls, cleaning protocols, and daily prep.</div>
          <div class="hub-card-link">Read Article ↗</div>
        </a>
        
        <a href="/blog/startup/the-complete-startup-checklist-for-nsw" class="hub-card">
          <div class="hub-card-cat">Startup Guide</div>
          <div class="hub-card-title">The Complete Startup Checklist for NSW</div>
          <div class="hub-card-desc">Opening a new venue near ${sub.landmark}? Don't miss these critical compliance steps.</div>
          <div class="hub-card-link">Read Article ↗</div>
        </a>
        
        <a href="/blog/allergens/mastering-allergen-management-in-a-commercial-kitchen" class="hub-card">
          <div class="hub-card-cat">Allergen Safety</div>
          <div class="hub-card-title">Mastering Allergen Management</div>
          <div class="hub-card-desc">Protect your customers and your business with airtight cross-contamination prevention.</div>
          <div class="hub-card-link">Read Article ↗</div>
        </a>

        <a href="/case-studies/case-study-1" class="hub-card">
          <div class="hub-card-cat">Case Study</div>
          <div class="hub-card-title">Audit Turnaround in the Inner West</div>
          <div class="hub-card-desc">How we helped a local bakery go from a warning notice to a 5-star rating in 14 days.</div>
          <div class="hub-card-link">Read Article ↗</div>
        </a>

        <a href="/faq/faq-1" class="hub-card">
          <div class="hub-card-cat">FAQ</div>
          <div class="hub-card-title">Local Council Inspections</div>
          <div class="hub-card-desc">Everything you need to know about unannounced health inspections in ${sub.name}.</div>
          <div class="hub-card-link">Read Article ↗</div>
        </a>
      </div>
    </div>
  </section>
  `;

  const html = getBaseHTML(
    title, desc, kw, title, desc, url, schema, 
    'Local Compliance Hub: ' + sub.name + ' & ' + sub.region,
    'Food Safety Consultant <em>' + sub.name + '</em>',
    'Serving food businesses in ' + sub.name + ' near ' + sub.landmark + ' to ensure compliant, audit-ready food safety programs aligned to NSW Food Authority standards.',
    bodyContent
  );

  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), html);
});

console.log('Successfully upgraded 80 Suburb Pages into Hyper-Local Monolith Hubs.');

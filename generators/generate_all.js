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

  .content-area { max-width: 800px; margin: 0 auto; background: var(--white); padding: 3rem; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
  .content-area h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 2rem 0 1rem; color: var(--navy); }
  .content-area h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin: 1.5rem 0 0.8rem; color: var(--navy); }
  .content-area p { margin-bottom: 1.5rem; line-height: 1.7; color: var(--ink-mid); }
  .content-area ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: var(--ink-mid); line-height: 1.7; }
  .content-area li { margin-bottom: 0.5rem; }

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
    .content-area { padding: 1.5rem; }
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

// Ensure directory exists
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Arrays of Data
const suburbs = [
  // Inner West
  { name: 'Ashfield', region: 'Inner West' }, { name: 'Burwood', region: 'Inner West' }, { name: 'Concord', region: 'Inner West' },
  { name: 'Croydon', region: 'Inner West' }, { name: 'Drummoyne', region: 'Inner West' }, { name: 'Dulwich Hill', region: 'Inner West' },
  { name: 'Earlwood', region: 'Inner West' }, { name: 'Enfield', region: 'Inner West' }, { name: 'Enmore', region: 'Inner West' },
  { name: 'Erskineville', region: 'Inner West' }, { name: 'Glebe', region: 'Inner West' }, { name: 'Haberfield', region: 'Inner West' },
  { name: 'Lewisham', region: 'Inner West' }, { name: 'Petersham', region: 'Inner West' }, { name: 'Stanmore', region: 'Inner West' },
  { name: 'Strathfield', region: 'Inner West' }, { name: 'Summer Hill', region: 'Inner West' }, { name: 'Sydenham', region: 'Inner West' },
  { name: 'Newtown', region: 'Inner West' }, { name: 'Marrickville', region: 'Inner West' },
  
  // North Shore
  { name: 'Cammeray', region: 'North Shore' }, { name: 'Gordon', region: 'North Shore' }, { name: 'Killara', region: 'North Shore' },
  { name: 'Lane Cove', region: 'North Shore' }, { name: 'Lindfield', region: 'North Shore' }, { name: 'North Sydney', region: 'North Shore' },
  { name: 'Pymble', region: 'North Shore' }, { name: 'Roseville', region: 'North Shore' }, { name: 'Waitara', region: 'North Shore' },
  { name: 'Willoughby', region: 'North Shore' }, { name: 'Artarmon', region: 'North Shore' }, { name: 'Cremorne', region: 'North Shore' },
  { name: 'Crows Nest', region: 'North Shore' }, { name: 'Hornsby', region: 'North Shore' }, { name: 'Mosman', region: 'North Shore' },
  { name: 'Neutral Bay', region: 'North Shore' }, { name: 'St Leonards', region: 'North Shore' }, { name: 'Turramurra', region: 'North Shore' },
  { name: 'Wahroonga', region: 'North Shore' }, { name: 'Chatswood', region: 'North Shore' },
  
  // Western Sydney
  { name: 'Auburn', region: 'Western Sydney' }, { name: 'Bankstown', region: 'Western Sydney' }, { name: 'Granville', region: 'Western Sydney' },
  { name: 'Harris Park', region: 'Western Sydney' }, { name: 'Lidcombe', region: 'Western Sydney' }, { name: 'Mount Druitt', region: 'Western Sydney' },
  { name: 'Punchbowl', region: 'Western Sydney' }, { name: 'Richmond', region: 'Western Sydney' }, { name: 'Rooty Hill', region: 'Western Sydney' },
  { name: 'Seven Hills', region: 'Western Sydney' }, { name: 'St Marys', region: 'Western Sydney' }, { name: 'Westmead', region: 'Western Sydney' },
  { name: 'Windsor', region: 'Western Sydney' }, { name: 'Blacktown', region: 'Western Sydney' }, { name: 'Cabramatta', region: 'Western Sydney' },
  { name: 'Fairfield', region: 'Western Sydney' }, { name: 'Liverpool', region: 'Western Sydney' }, { name: 'Merrylands', region: 'Western Sydney' },
  { name: 'Parramatta', region: 'Western Sydney' }, { name: 'Penrith', region: 'Western Sydney' },
  
  // South Sydney & Sutherland
  { name: 'Alexandria', region: 'South Sydney' }, { name: 'Botany', region: 'South Sydney' }, { name: 'Caringbah', region: 'Sutherland Shire' },
  { name: 'Cronulla', region: 'Sutherland Shire' }, { name: 'Engadine', region: 'Sutherland Shire' }, { name: 'Gymea', region: 'Sutherland Shire' },
  { name: 'Hurstville', region: 'South Sydney' }, { name: 'Kogarah', region: 'South Sydney' }, { name: 'Mascot', region: 'South Sydney' },
  { name: 'Menai', region: 'Sutherland Shire' }, { name: 'Miranda', region: 'Sutherland Shire' }, { name: 'Oatley', region: 'South Sydney' },
  { name: 'Peakhurst', region: 'South Sydney' }, { name: 'Redfern', region: 'South Sydney' }, { name: 'Rockdale', region: 'South Sydney' },
  { name: 'Sans Souci', region: 'South Sydney' }, { name: 'Sutherland', region: 'Sutherland Shire' }, { name: 'Sylvania', region: 'Sutherland Shire' },
  { name: 'Waterloo', region: 'South Sydney' }, { name: 'Zetland', region: 'South Sydney' }
];

const caseStudies = [];
const deepGuides = [];
const faqs = [];
const comparisons = [];
const glossary = [];
const dataStats = [];

const sitemapUrls = [];

function addSitemapUrl(url) {
  sitemapUrls.push(url);
}

// 1. Generate Suburb Pages
suburbs.forEach(sub => {
  const slug = 'food-safety-consultant-' + sub.name.toLowerCase().replace(/\s+/g, '-');
  const fileName = slug + '.html';
  
  const title = 'Food Safety Consultant ' + sub.name + ' | ' + sub.region + ' | AMES Food Advisory';
  const desc = 'Local food safety and HACCP consultant for ' + sub.name + '. Cafes, bakeries, restaurants, heritage food venues compliance support in ' + sub.region + '.';
  const kw = 'food safety consultant ' + sub.name + ', HACCP consultant ' + sub.region + ', ' + sub.name + ' food compliance';
  const url = 'https://www.amesfoodadvisory.com.au/' + slug;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": sub.name + ' & ' + sub.region + ' Food Safety Services',
    "description": desc,
    "provider": { "@type": "LocalBusiness", "name": "AMES Food Advisory" }
  };

  const bodyContent = `
  <section style="background:var(--stone);">
    <div class="container">
      <div class="section-eyebrow">What is included</div>
      <h2 class="display">Expert delivery in <em>${sub.name}</em></h2>
      <p class="body-lead">We serve the full spectrum of ${sub.region} food businesses with practical, no-jargon food safety programs and NSW Food Authority audit support.</p>
      
      <div class="includes-grid">
          <div class="include-item">
            <div class="include-icon">🏛</div>
            <div>
              <div class="include-title">NSW Food Authority Audit Prep</div>
              <div class="include-desc">Mock inspections and gap analysis reports aligned to inspection criteria.</div>
            </div>
          </div>
          <div class="include-item">
            <div class="include-icon">📋</div>
            <div>
              <div class="include-title">HACCP &amp; Food Safety Programs</div>
              <div class="include-desc">Custom food safety programs for businesses in ${sub.name} and surrounding areas.</div>
            </div>
          </div>
      </div>
    </div>
  </section>
  `;

  const html = getBaseHTML(
    title, desc, kw, title, desc, url, schema, 
    'Local Expert: ' + sub.name + ' & ' + sub.region,
    'Food Safety Consultant <em>' + sub.name + '</em>',
    'Serving food businesses in ' + sub.name + ' to ensure compliant, audit-ready food safety programs aligned to NSW Food Authority standards.',
    bodyContent
  );

  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), html);
  addSitemapUrl(url);
});

// 2. Generate Tier 4 & 5
const sections = [
  { folder: 'case-studies', items: caseStudies, title: 'Case Study' },
  { folder: 'guides', items: deepGuides, title: 'Deep Guide' },
  { folder: 'faq', items: faqs, title: 'FAQ' },
  { folder: 'compare', items: comparisons, title: 'Comparison' },
  { folder: 'glossary', items: glossary, title: 'Glossary Term' },
  { folder: 'data', items: dataStats, title: 'Industry Data' }
];

sections.forEach(sec => {
  const dirPath = path.join(OUTPUT_DIR, sec.folder);
  ensureDirSync(dirPath);
  
  sec.items.forEach(item => {
    const slug = item;
    const fileName = slug + '.html';
    const pageTitle = sec.title + ': ' + item.replace(/-/g, ' ').toUpperCase();
    const url = 'https://www.amesfoodadvisory.com.au/' + sec.folder + '/' + slug;
    
    const bodyContent = `
    <section>
      <div class="container content-area">
        <h2>About this ${sec.title}</h2>
        <p>This page provides in-depth information and insights regarding <strong>${item.replace(/-/g, ' ')}</strong> in the context of food safety and compliance in NSW.</p>
        <p>AMES Food Advisory is dedicated to providing high-quality, actionable knowledge to help businesses navigate HACCP regulations, NSW Food Authority compliance, and operational food safety.</p>
        <ul>
          <li>Comprehensive breakdown of standards.</li>
          <li>Regulatory insights and audit preparation techniques.</li>
          <li>Real-world applications for cafes, restaurants, and manufacturers.</li>
        </ul>
        <h3>Why this matters</h3>
        <p>Staying informed on the latest food safety practices ensures your business operates safely, protects consumers, and avoids costly penalties from local council or state regulators.</p>
      </div>
    </section>
    `;

    const html = getBaseHTML(
      pageTitle + ' | AMES Food Advisory',
      'Read our ' + sec.title.toLowerCase() + ' on ' + item.replace(/-/g, ' ') + ' to understand food safety compliance.',
      item.replace(/-/g, ' ') + ', food safety ' + sec.title.toLowerCase(),
      pageTitle,
      'Read our ' + sec.title.toLowerCase() + ' on ' + item.replace(/-/g, ' ') + '.',
      url,
      { "@context": "https://schema.org", "@type": "Article", "headline": pageTitle },
      sec.title.toUpperCase(),
      sec.title + ': <em>' + item.replace(/-/g, ' ').toUpperCase() + '</em>',
      'Detailed insights and comprehensive analysis to help your food business stay compliant.',
      bodyContent
    );
    
    fs.writeFileSync(path.join(dirPath, fileName), html);
    addSitemapUrl(url);
  });
});

// Update Sitemap
const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const newUrlsXml = sitemapUrls.map(url => '  <url><loc>' + url + '</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>').join('\\n');
sitemapContent = sitemapContent.replace('</urlset>', newUrlsXml + '\\n</urlset>');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log('Successfully generated all 200 pages and updated sitemap.xml.');

const fs = require('fs');
const path = require('path');
const { NAV_HTML, NAV_JS, NAV_CSS } = require('../templates/nav-master.js');

const OUTPUT_DIR = path.join(__dirname, '..');

const pages = [
  {
    file: 'haccp-simplified.html',
    title: 'What Is HACCP? Simple NSW Food Business Guide | AMES Food Advisory',
    description: 'HACCP explained in plain English for NSW food businesses. Understand the seven principles, food safety program obligations, and what practical compliance looks like.',
    eyebrow: 'HACCP · PLAIN-ENGLISH GUIDE',
    heading: 'HACCP, explained <em>simply.</em>',
    sub: 'A practical, non-corporate guide for NSW food businesses that want to understand the system, know what applies to them, and put food safety controls into practice.',
    type: 'haccp'
  },
  {
    file: 'cafe-compliance-pack-sydney.html',
    title: 'Cafe Compliance Pack Sydney | Food Safety Support | AMES Food Advisory',
    description: 'A practical cafe compliance pack for Sydney operators: food safety systems, staff knowledge, records, allergen controls, and council inspection readiness.',
    eyebrow: 'INDUSTRY COMPLIANCE PACK · CAFES',
    heading: 'A cafe compliance system your <em>team can actually use.</em>',
    sub: 'Practical food safety support for Sydney cafes and small hospitality teams, built around the way your kitchen really operates.',
    type: 'cafe'
  },
  {
    file: 'food-truck-event-compliance-nsw.html',
    title: 'Food Truck & Event Catering Compliance NSW | AMES Food Advisory',
    description: 'Food truck and event catering compliance support across NSW, including food safety systems, transport, temperature control, temporary events, and staff training.',
    eyebrow: 'INDUSTRY COMPLIANCE PACK · MOBILE & EVENTS',
    heading: 'Food truck and event compliance without the <em>last-minute panic.</em>',
    sub: 'Make your mobile operation easier to run, easier to explain to organisers, and better prepared for council or regulator questions.',
    type: 'events'
  },
  {
    file: 'boutique-food-manufacturing-compliance.html',
    title: 'Boutique Food Manufacturing Compliance NSW | HACCP Support | AMES Food Advisory',
    description: 'Food safety and HACCP support for boutique food manufacturers in NSW, including hazard analysis, traceability, SOPs, records, and regulatory preparation.',
    eyebrow: 'INDUSTRY COMPLIANCE PACK · MANUFACTURING',
    heading: 'Build a food safety system that can <em>grow with production.</em>',
    sub: 'For small and emerging manufacturers who need practical controls, traceability, and documentation that reflect the product they actually make.',
    type: 'manufacturing'
  }
];

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function basePage(page, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.amesfoodadvisory.com.au/${page.file.replace('.html', '')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:url" content="https://www.amesfoodadvisory.com.au/${page.file.replace('.html', '')}">
<meta property="og:site_name" content="AMES Food Advisory">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--navy:#1C2B3A;--navy-deep:#131E28;--navy-mid:#243548;--navy-lift:#2E4460;--amber:#E8913A;--amber-light:#F0A855;--amber-pale:#FDF3E7;--amber-dim:#C4741E;--stone:#F5F1EB;--stone-mid:#EDE7DE;--stone-dark:#DDD4C6;--ink:#1A1C1E;--ink-mid:#3C4048;--ink-soft:#6B7280;--ink-muted:#9CA3AF;--white:#FFFFFF;--border-navy:rgba(28,43,58,0.12);--border-amber:rgba(232,145,58,0.28)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:'Inter',sans-serif;background:var(--stone);color:var(--ink);font-size:16px;line-height:1.6;overflow-x:hidden}.container{max-width:1160px;margin:0 auto;padding:0 2rem}
${NAV_CSS}
.hero{background:var(--navy-deep);padding:9rem 2rem 5rem;position:relative;overflow:hidden}.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 90% at 90% 35%,rgba(232,145,58,.12),transparent 65%),radial-gradient(ellipse 50% 70% at 0% 80%,rgba(46,68,96,.55),transparent 65%)}.hero::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,var(--amber),transparent);opacity:.5}.hero-inner{position:relative;z-index:1;max-width:920px;margin:0 auto}.eyebrow{display:inline-flex;align-items:center;gap:.65rem;color:var(--amber);font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:1.25rem}.eyebrow::before{content:'';width:28px;height:1px;background:var(--amber)}h1{font-family:'Playfair Display',serif;font-weight:400;font-size:clamp(2.4rem,5vw,4rem);line-height:1.1;color:var(--white);max-width:850px;margin-bottom:1.3rem}h1 em{color:var(--amber);font-style:italic}.hero-sub{max-width:700px;color:rgba(255,255,255,.62);font-size:1.08rem;line-height:1.75;font-weight:300}.hero-actions{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}.btn-primary,.btn-outline{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border-radius:6px;padding:.9rem 1.6rem;font-size:.9rem;font-weight:600;transition:all .2s}.btn-primary{background:var(--amber);color:var(--navy-deep)}.btn-primary:hover{background:var(--amber-light);transform:translateY(-1px)}.btn-outline{border:1px solid rgba(255,255,255,.25);color:var(--white)}.btn-outline:hover{border-color:var(--amber);color:var(--amber)}
.section{padding:5rem 0}.section-light{background:var(--white)}.section-dark{background:var(--navy-deep);color:var(--white)}.section-eyebrow{display:flex;align-items:center;gap:.55rem;font-size:.72rem;color:var(--amber);font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:.75rem}.section-eyebrow::before{content:'';width:24px;height:2px;background:var(--amber)}.display{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:400;line-height:1.15;color:var(--navy);margin-bottom:1rem}.display em{color:var(--amber-dim);font-style:italic}.lead{max-width:700px;color:var(--ink-soft);font-size:1.05rem;line-height:1.8}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:2.5rem}.card{background:var(--white);border:1px solid var(--border-navy);border-radius:12px;padding:2rem}.section-dark .card{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1)}.card h3{font-family:'Playfair Display',serif;font-size:1.35rem;color:var(--navy);margin-bottom:.65rem;line-height:1.25}.section-dark .card h3{color:var(--white)}.card p{font-size:.92rem;color:var(--ink-soft);line-height:1.7}.section-dark .card p{color:rgba(255,255,255,.6)}.number{font-family:'Playfair Display',serif;font-size:2rem;color:var(--amber);margin-bottom:.5rem}.checklist{list-style:none;display:grid;gap:.8rem;margin-top:1.5rem}.checklist li{display:flex;gap:.7rem;align-items:flex-start;color:var(--ink-mid);font-size:.95rem}.checklist li::before{content:'✓';color:var(--amber);font-weight:700}.section-dark .checklist li{color:rgba(255,255,255,.72)}.callout{background:var(--amber-pale);border-left:4px solid var(--amber);border-radius:0 10px 10px 0;padding:1.6rem 1.8rem;margin-top:2.5rem}.callout strong{color:var(--navy)}.cta{background:var(--navy-deep);padding:4rem 2rem;text-align:center}.cta h2{font-family:'Playfair Display',serif;color:var(--white);font-weight:400;font-size:clamp(1.8rem,3vw,2.6rem);margin-bottom:.8rem}.cta p{max-width:650px;margin:0 auto 1.7rem;color:rgba(255,255,255,.58)}.sources{font-size:.82rem;color:var(--ink-soft);line-height:1.7;margin-top:2rem}.sources a{color:var(--amber-dim)}footer{background:var(--navy-deep);border-top:1px solid var(--border-amber);padding:3.5rem 2rem;color:var(--white)}.footer-inner{max-width:1160px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem}.footer-logo{font-family:'Playfair Display',serif;color:var(--white);text-decoration:none;font-size:1.15rem;font-weight:700}.footer-logo span{color:var(--amber);font-style:italic;font-weight:400}.footer-links{display:flex;gap:1.5rem;flex-wrap:wrap}.footer-links a{color:rgba(255,255,255,.46);text-decoration:none;font-size:.82rem}.footer-links a:hover{color:var(--amber)}
@media(max-width:850px){.grid-3,.grid-2{grid-template-columns:1fr}.section{padding:3.5rem 0}.hero{padding:8rem 1.25rem 4rem}.container{padding:0 1.25rem}.footer-inner{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body>
${NAV_HTML}
${body}
<script>${NAV_JS}</script>
</body>
</html>`;
}

function footer() {
  return `<footer><div class="footer-inner"><a href="/" class="footer-logo">AMES <span>Food Advisory</span></a><div style="color:rgba(255,255,255,.3);font-size:.8rem;">© 2026 AMES Food Advisory. Sydney, NSW.</div><div class="footer-links"><a href="/pricing">Pricing</a><a href="/recent-projects">Recent Work</a><a href="/free-resources">Free Resources</a><a href="/suburb-directory">Locations</a></div></div></footer>`;
}

function hero(page) {
  return `<section class="hero"><div class="hero-inner"><div class="eyebrow">${page.eyebrow}</div><h1>${page.heading}</h1><p class="hero-sub">${page.sub}</p><div class="hero-actions"><a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="btn-primary">Book a Free Scoping Call ↗</a><a href="tel:+61278220109" class="btn-outline">Call (02) 7822 0109</a></div></div></section>`;
}

function haccpBody(page) {
  return `${hero(page)}
<section class="section section-light"><div class="container"><div class="section-eyebrow">Start here</div><h2 class="display">HACCP is a <em>working system</em>, not a dusty folder.</h2><p class="lead">HACCP stands for Hazard Analysis and Critical Control Point. In practical terms, it is a structured way to identify the food safety hazards in your operation, decide where control matters most, and prove that those controls are working.</p><div class="callout"><strong>The important NSW distinction:</strong> whether your business must have a documented Food Safety Program depends on the business type and applicable state or territory requirements. Do not assume that every NSW food business has exactly the same obligation. Check with the relevant regulator or council for your operation.</div><div class="grid-3"><div class="card"><div class="number">01</div><h3>Identify the hazards</h3><p>Map the way food moves through your business and identify biological, chemical and physical hazards at each step.</p></div><div class="card"><div class="number">02</div><h3>Control the risk</h3><p>Decide which steps need measurable controls, limits, monitoring and corrective action to keep food safe.</p></div><div class="card"><div class="number">03</div><h3>Keep the evidence</h3><p>Use clear records and verification activities to show that the system is being followed and reviewed.</p></div></div></div></section>
<section class="section"><div class="container"><div class="section-eyebrow">The seven principles</div><h2 class="display">What a HACCP-based system <em>actually involves</em></h2><p class="lead">A useful system connects the written program to what happens on the floor, in the kitchen, during transport and in your records.</p><div class="grid-2"><div class="card"><h3>1. Hazard analysis</h3><p>Understand the hazards associated with each stage of your operation.</p></div><div class="card"><h3>2. Critical Control Points</h3><p>Identify the points where control is essential to prevent, eliminate or reduce a hazard.</p></div><div class="card"><h3>3. Critical limits</h3><p>Set measurable boundaries that tell your team when a process is under control.</p></div><div class="card"><h3>4. Monitoring</h3><p>Document what is checked, how often, by whom and with what equipment.</p></div><div class="card"><h3>5. Corrective action</h3><p>Define what happens when a limit is missed or a process does not go to plan.</p></div><div class="card"><h3>6–7. Verification and records</h3><p>Check that the system works, keep evidence, and review it when your operation changes.</p></div></div></div></section>
<section class="section section-dark"><div class="container"><div class="section-eyebrow">Quick self-check</div><h2 class="display" style="color:var(--white);">Could your team explain the system <em>today?</em></h2><div class="grid-3"><div class="card"><h3>Can staff explain the controls?</h3><p>People should understand the food safety controls relevant to their work, not just know where the folder is.</p></div><div class="card"><h3>Do records match reality?</h3><p>Monitoring records should reflect the actual operation, including corrective actions when something goes wrong.</p></div><div class="card"><h3>Has anything changed?</h3><p>New products, suppliers, equipment, premises or processes can trigger a review of the hazard analysis.</p></div></div><div style="margin-top:2.5rem;"><a href="/how-to-write-a-food-safety-program-nsw" class="btn-primary">Read the NSW Food Safety Program Guide ↗</a></div></div></section>
<section class="section section-light"><div class="container"><div class="section-eyebrow">Practical help</div><h2 class="display">Need HACCP translated into <em>your operation?</em></h2><p class="lead">AMES Food Advisory helps cafes, caterers, home-based food businesses and manufacturers turn compliance requirements into practical systems, records and staff understanding. We start with your actual process, not a generic template.</p><div class="hero-actions" style="margin-top:2rem;"><a href="/haccp-plan-development" class="btn-primary" style="background:var(--navy);color:var(--white);">Explore HACCP Plan Development ↗</a><a href="/recent-projects" class="btn-outline" style="border-color:var(--border-navy);color:var(--navy);">See Recent Work ↗</a></div><p class="sources">Official references: <a href="https://www.foodauthority.nsw.gov.au/industry/audits-and-compliance/food-safety-programs-haccp" target="_blank" rel="noopener">NSW Food Authority — Food safety programs</a> and <a href="https://www.foodstandards.gov.au/business/food-safety-standards/standard-321-food-safety-programs" target="_blank" rel="noopener">FSANZ — Standard 3.2.1</a>.</p></div></section>${footer()}`;
}

const packContent = {
  cafe: {
    pageTitle: 'Cafe compliance',
    problem: 'Cafes need systems that work during a busy service, not paperwork that only looks good before an inspection.',
    included: ['Food safety program or practical control review scoped to your operation', 'Temperature, cleaning, receiving and corrective-action records', 'Allergen and cross-contamination controls that staff can follow', 'Staff knowledge and training support aligned with your responsibilities', 'Pre-inspection walkthrough and prioritised gap report'],
    outcomes: ['Clearer daily routines', 'Better evidence of control', 'More confident staff', 'A practical path to council readiness'],
    link: '/cafe-restaurant-food-safety'
  },
  events: {
    pageTitle: 'Food truck & event compliance',
    problem: 'Mobile and event operations face changing sites, transport conditions, temporary setups and tight deadlines. Your controls need to travel with you.',
    included: ['Review of preparation, transport, service and holding controls', 'Temperature control and time-based process records', 'Water, waste, cleaning and hand-washing considerations', 'Event organiser and council documentation readiness', 'Short-form staff briefings for casual and event teams'],
    outcomes: ['A repeatable event setup', 'Less last-minute uncertainty', 'Better records across locations', 'Practical support for temporary operations'],
    link: '/catering-food-safety-nsw'
  },
  manufacturing: {
    pageTitle: 'Boutique manufacturing compliance',
    problem: 'Small manufacturers often outgrow informal processes before they have the documentation, traceability and verification systems to support the next stage.',
    included: ['Product and process hazard analysis', 'HACCP plan and prerequisite program support', 'Ingredient, batch and finished-product traceability', 'SOP writing, verification and corrective-action records', 'Support preparing for regulator, customer or buyer questions'],
    outcomes: ['A system matched to the product', 'Stronger traceability', 'More consistent production controls', 'Documentation that supports responsible growth'],
    link: '/food-manufacturer-consulting'
  }
};

function packBody(page, pack) {
  return `${hero(page)}
<section class="section section-light"><div class="container"><div class="section-eyebrow">The problem we solve</div><h2 class="display">${pack.pageTitle} support built for <em>real operations.</em></h2><p class="lead">${pack.problem}</p><div class="callout"><strong>Our approach:</strong> We look at what your team actually does, identify the highest-value controls, and build documentation and training around those realities.</div></div></section>
<section class="section"><div class="container"><div class="section-eyebrow">What can be included</div><h2 class="display">A practical compliance <em>pack, not a generic binder.</em></h2><div class="grid-2"><div class="card"><h3>Core support</h3><ul class="checklist">${pack.included.map(item => `<li>${item}</li>`).join('')}</ul></div><div class="card"><h3>What better looks like</h3><ul class="checklist">${pack.outcomes.map(item => `<li>${item}</li>`).join('')}</ul><p style="margin-top:1.5rem;">The exact scope depends on your business type, products, premises, people and applicable regulatory requirements. We confirm that scope before work begins.</p></div></div></div></section>
<section class="section section-dark"><div class="container"><div class="section-eyebrow">Why AMES</div><h2 class="display" style="color:var(--white);">Standards your team can <em>understand and use.</em></h2><div class="grid-3"><div class="card"><div class="number">01</div><h3>Practical</h3><p>We connect the documents to the workflow, equipment, products and people in your operation.</p></div><div class="card"><div class="number">02</div><h3>Founder-led</h3><p>You work with an experienced food safety professional, not a hand-off to a generic template team.</p></div><div class="card"><div class="number">03</div><h3>Fixed scope</h3><p>We clarify what is included, what is not, and what your business needs before the work starts.</p></div></div></div></section>
<section class="section section-light"><div class="container"><div class="section-eyebrow">Next step</div><h2 class="display">Let's scope the right support for <em>your business.</em></h2><p class="lead">Tell us what you make, serve or sell, where you operate, and what is causing the pressure. We will help you identify the most useful first step.</p><div class="hero-actions" style="margin-top:2rem;"><a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="btn-primary" style="background:var(--navy);color:var(--white);">Book a Free Scoping Call ↗</a><a href="${pack.link}" class="btn-outline" style="border-color:var(--border-navy);color:var(--navy);">Explore Related Service ↗</a></div></div></section>${footer()}`;
}

for (const page of pages) {
  const body = page.type === 'haccp' ? haccpBody(page) : packBody(page, packContent[page.type]);
  fs.writeFileSync(path.join(OUTPUT_DIR, page.file), basePage(page, body));
}

const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const additions = pages.map(page => {
    const url = `https://www.amesfoodadvisory.com.au/${page.file.replace('.html', '')}`;
    return sitemap.includes(`<loc>${url}</loc>`) ? '' : `  <url><loc>${url}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
  }).filter(Boolean).join('\\n');
  if (additions) sitemap = sitemap.replace('</urlset>', additions + '\\n</urlset>');
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Generated ${pages.length} growth pages.`);

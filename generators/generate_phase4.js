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
<meta property="og:type" content="article">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${desc}">
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
    --amber:       #D4751F;
    --amber-dim:   #B05E10;
    --stone:       #F5F1EB;
    --stone-mid:   #EDE7DE;
    --stone-dark:  #DDD4C6;
    --ink:         #1A1C1E;
    --ink-mid:     #3C4048;
    --ink-soft:    #6B7280;
    --white:       #FFFFFF;
    --border-navy: rgba(28,43,58,0.12);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--stone); color: var(--ink); font-size: 16px; line-height: 1.6; overflow-x: hidden; }
  ${NAV_CSS}
  
  .page-hero { background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%); color: var(--white); padding: 120px 2rem 60px; margin-top: 58px; position: relative; overflow: hidden; }
  .page-hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
  .page-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.8rem; display: inline-block; }
  h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 400; line-height: 1.15; margin-bottom: 1.2rem; }
  .page-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.7); line-height: 1.75; margin: 0 auto 2rem; max-width: 700px; font-weight: 300; }
  
  .content-area { max-width: 800px; margin: -40px auto 4rem; background: var(--white); padding: 4rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); position: relative; z-index: 2; }
  .content-area h2 { font-family: 'Playfair Display', serif; font-size: 1.9rem; margin: 2.5rem 0 1rem; color: var(--navy); }
  .content-area h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin: 1.5rem 0 0.8rem; color: var(--navy); }
  .content-area p { margin-bottom: 1.5rem; line-height: 1.8; color: var(--ink-mid); font-size: 1.05rem; }
  .content-area a { color: var(--amber-dim); text-decoration: none; font-weight: 500; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
  .content-area a:hover { border-bottom-color: var(--amber-dim); }
  .content-area ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: var(--ink-mid); line-height: 1.8; font-size: 1.05rem; }
  .content-area li { margin-bottom: 0.5rem; }

  .disclaimer-box { background: var(--stone); border-left: 4px solid var(--navy-mid); padding: 1.5rem; border-radius: 0 8px 8px 0; margin: 2rem 0; font-size: 0.9rem; color: var(--ink-soft); }

  .cta-box { background: var(--stone); border-left: 4px solid var(--amber); padding: 2rem; border-radius: 0 8px 8px 0; margin: 3rem 0; }
  .cta-box h3 { margin-top: 0; font-family: 'Inter', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--navy); }
  .cta-box p { margin-bottom: 1rem; font-size: 0.95rem; }
  .btn-primary { background: var(--amber); color: var(--navy-deep); padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; border: none; }
  .btn-primary:hover { background: var(--amber-dim); border-bottom-color: transparent; }

  footer { background: var(--navy-deep); border-top: 1px solid rgba(212,117,31,0.12); padding: 2.5rem 2rem; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .footer-logo { display: flex; flex-direction: column; gap: 2px; text-decoration: none; }
  .footer-logo-name { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.7); line-height: 1.1; }
  .footer-logo-adv { color: rgba(212,117,31,0.8); font-style: italic; font-weight: 400; }
  .footer-logo-tag { font-size: 0.55rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.22); font-family: 'Inter', sans-serif; line-height: 1; }
  .footer-copy { font-size: 0.76rem; color: rgba(255,255,255,0.28); }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { font-size: 0.78rem; color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--amber); }

  @media(max-width: 768px) {
    .nav-links { display: none; }
    h1 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); }
    .content-area { padding: 2rem; margin-top: -20px; }
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
  </div>
</div>

${bodyContent}

<section style="background:var(--white); padding: 4rem 2rem; text-align: center; border-top: 1px solid var(--border-navy);">
  <div style="max-width: 800px; margin: 0 auto;">
    <div class="page-eyebrow">Free Resource</div>
    <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--navy); margin-bottom: 1rem;">NSW Food Business <em>Compliance Checklist</em></h2>
    <p style="color: var(--ink-soft); margin-bottom: 2rem;">Ensure your business satisfies the NSW Food Act 2003 and Standard 3.2.2A. Download our comprehensive 47-item audit readiness checklist.</p>
    <a href="/free-compliance-checklist-nsw" class="btn-primary resource-btn">Get the Checklist &rarr;</a>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <a href="/" class="footer-logo">
      <span class="footer-logo-name">AMES <span class="footer-logo-adv">Food Advisory</span></span>
      <span class="footer-logo-tag">NSW&nbsp;·&nbsp;HACCP&nbsp;·&nbsp;FOOD CONSULTANTS</span>
    </a>
    <div class="footer-copy">© 2026 AMES Food Advisory. Serving all of NSW.</div>
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

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const sitemapUrls = [];
function addSitemapUrl(url) {
  sitemapUrls.push(url);
}

// 1. Generate 20 Local Council Pages
const councils = [
  'Inner West Council', 'City of Sydney', 'Parramatta City Council', 'North Sydney Council', 
  'Sutherland Shire Council', 'Canterbury-Bankstown Council', 'Cumberland City Council', 
  'Northern Beaches Council', 'Blacktown City Council', 'Penrith City Council',
  'Ku-ring-gai Council', 'Willoughby City Council', 'Randwick City Council', 'Waverley Council',
  'Bayside Council', 'Georges River Council', 'Camden Council', 'Campbelltown City Council',
  'Liverpool City Council', 'Fairfield City Council'
];

const councilDir = path.join(OUTPUT_DIR, 'councils');
ensureDirSync(councilDir);

councils.forEach(council => {
  const slug = council.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-food-safety';
  const url = 'https://www.amesfoodadvisory.com.au/councils/' + slug;
  
  const content = `
  <div class="content-area">
    <div class="disclaimer-box">
      <strong>Important Clarification:</strong> AMES Food Advisory does <em>not</em> conduct official council inspections, nor are we an RTO or a regulatory body. We are a specialized consulting firm that <strong>prepares</strong> your business to successfully pass official Environmental Health Officer (EHO) inspections conducted by ${council} and the NSW Food Authority.
    </div>

    <h2>Understanding ${council} Food Inspections</h2>
    <p>Every food business operating within the jurisdiction of <strong>${council}</strong> is subject to routine health inspections by local Environmental Health Officers (EHOs). These unannounced visits are designed to ensure your premises complies strictly with the Australia New Zealand Food Standards Code.</p>
    
    <p>Failing an inspection in the ${council} area can result in costly fines, mandatory improvement notices, or in severe cases, the temporary closure of your business and placement on the "Name and Shame" register.</p>

    <h2>How AMES Food Advisory Helps You Pass</h2>
    <p>We take the stress out of unannounced council audits. Our principal consultant brings <strong>over 11 years of Tier-1 national food manufacturing experience</strong>, combined with deep pedagogical expertise as a <strong>TAFE NSW Lecturer</strong>.</p>
    
    <p>We apply this corporate rigor to your small or medium-sized business through:</p>
    <ul>
      <li><strong>Mock EHO Inspections:</strong> We assess your premises using the exact criteria ${council} inspectors use, identifying critical non-conformances before the real audit occurs.</li>
      <li><strong>Customised SOPs:</strong> We write and implement practical standard operating procedures (cleaning, temperature control, allergen management) tailored to your kitchen.</li>
      <li><strong>Staff Coaching:</strong> Unlike generic click-through courses, our hands-on coaching is designed by a TAE-Qualified trainer to ensure your staff actually retain and practice food safety daily.</li>
    </ul>

    <h2>Ready to be Audit-Ready?</h2>
    <p>Don't wait for a warning notice. Whether you are running a cafe, bakery, or restaurant in the ${council} area, professional preparation is your best defense against compliance failures.</p>

    <div class="cta-box">
      <h3>Book a Preparation Audit Today</h3>
      <p>Let's make sure your next ${council} inspection goes perfectly. We'll identify the gaps and fix them.</p>
      <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" class="btn-primary" target="_blank" rel="noopener">Book a Free Scoping Call ↗</a>
    </div>
  </div>
  `;

  const html = getBaseHTML(
    council + ' Food Safety Compliance & Audit Prep | AMES Food Advisory',
    'Prepare for ' + council + ' Environmental Health Officer (EHO) food safety inspections with expert mock audits and compliance consulting from AMES Food Advisory.',
    council + ' food safety, ' + council + ' health inspection, EHO audit prep',
    council + ' Food Inspection Prep',
    url,
    { "@context": "https://schema.org", "@type": "Article", "headline": "Preparing for " + council + " Food Inspections" },
    'Local Council Compliance Guide',
    'Pass Your <em>' + council + '</em> Food Inspections',
    'Expert mock audits, coaching, and compliance preparation to ensure your venue meets all local and state regulatory requirements.',
    content
  );

  fs.writeFileSync(path.join(councilDir, slug + '.html'), html);
  addSitemapUrl(url);
});

// 2. Generate 20 Industry Niche Pages
const industries = [
  'Breweries & Distilleries', 'Food Trucks & Mobile Vendors', 'Aged Care Facilities', 'Childcare Centers', 
  'Ghost Kitchens', 'Boutique Bakeries', 'Artisan Chocolate Makers', 'Coffee Roasters',
  'Market Stalls & Pop-ups', 'Butcher Shops', 'Seafood Retailers', 'Juice & Smoothie Bars',
  'Corporate Catering', 'Event & Festival Catering', 'Hotel Kitchens', 'School Canteens',
  'Meal Prep Delivery Services', 'Small Scale Condiment Manufacturers', 'Sushi Bars', 'Ice Cream & Gelato Shops'
];

const indDir = path.join(OUTPUT_DIR, 'industries');
ensureDirSync(indDir);

industries.forEach(ind => {
  const slug = 'food-safety-for-' + ind.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const url = 'https://www.amesfoodadvisory.com.au/industries/' + slug;
  
  const content = `
  <div class="content-area">
    <div class="disclaimer-box">
      <strong>Important Clarification:</strong> AMES Food Advisory is an independent consulting firm. We are not a regulatory body and we do not conduct official state or council compliance audits. We utilize our deep industry expertise to coach and prepare <strong>${ind}</strong> to meet all required NSW Food Authority standards.
    </div>

    <h2>Tailored Food Safety for ${ind}</h2>
    <p>Operating in the <strong>${ind}</strong> sector presents highly unique operational and compliance challenges. Generic, one-size-fits-all HACCP templates rarely hold up under intense scrutiny from local councils or the NSW Food Authority.</p>
    
    <p>At AMES Food Advisory, we understand that a system built for a massive commercial factory won't work for your operation, and a generic cafe template won't cover your specific risks. You need bespoke, scalable solutions.</p>

    <h2>Manufacturing-Proven Standards, Scaled for You</h2>
    <p>Our principal brings over a decade of Tier-1 manufacturing Quality Assurance experience—gained at The Arnott's Group—directly to your business. This means we build systems that are robust enough to pass any audit, but practical enough that your staff will actually follow them.</p>

    <p>We provide comprehensive support for ${ind} including:</p>
    <ul>
      <li><strong>Custom HACCP Plans:</strong> Identifying the critical control points specific to your unique processes.</li>
      <li><strong>Allergen Management:</strong> Strict, practical guidelines to prevent cross-contamination in your specific environment.</li>
      <li><strong>Traceability Systems:</strong> Ensuring you can track ingredients forward and backward through your supply chain.</li>
      <li><strong>Staff Training:</strong> Leveraging TAFE NSW lecturing experience to deliver training that sticks.</li>
    </ul>

    <div class="cta-box">
      <h3>Need Help with Your Compliance?</h3>
      <p>Whether you are launching a new venture in the ${ind} space or upgrading an existing operation, we can streamline your compliance.</p>
      <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" class="btn-primary" target="_blank" rel="noopener">Discuss Your Needs Today ↗</a>
    </div>
  </div>
  `;

  const html = getBaseHTML(
    'Food Safety Consulting for ' + ind + ' | AMES Food Advisory',
    'Specialised food safety consulting, HACCP plans, and compliance preparation specifically designed for ' + ind + ' in NSW.',
    'food safety ' + ind + ', HACCP for ' + ind + ', NSW food compliance',
    'Food Safety for ' + ind,
    url,
    { "@context": "https://schema.org", "@type": "Article", "headline": "Food Safety for " + ind },
    'Industry Expertise',
    'Food Safety Compliance for <em>' + ind + '</em>',
    'Bespoke HACCP plans, SOP development, and audit preparation tailored specifically for your sector.',
    content
  );

  fs.writeFileSync(path.join(indDir, slug + '.html'), html);
  addSitemapUrl(url);
});

// 3. Generate 10 Free Resource Pages
const resources = [
  'Daily Temperature Log Sheet', 'Kitchen Cleaning Schedule PDF', 'Supplier Delivery Checklist',
  'Allergen Matrix Template', 'Pest Control Monitoring Log', 'Food Wastage Tracker',
  'Staff Hygiene Policy Template', 'Internal Audit Self-Checklist', 'Cool Room Storage Guide Chart',
  'Corrective Action Report Template'
];

const resDir = path.join(OUTPUT_DIR, 'resources');
ensureDirSync(resDir);

resources.forEach(res => {
  const slug = 'free-' + res.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const url = 'https://www.amesfoodadvisory.com.au/resources/' + slug;
  
  const content = `
  <div class="content-area">
    <h2>Download the ${res}</h2>
    <p>Proper documentation is the absolute backbone of a strong food safety culture. Without records, you cannot prove compliance to a council EHO or the NSW Food Authority.</p>
    
    <p>To help Sydney and NSW food businesses get started, AMES Food Advisory has created a free, highly practical <strong>${res}</strong> based on over 11 years of corporate manufacturing and TAFE lecturing experience.</p>
    
    <h3>How to use this resource:</h3>
    <ul>
      <li>Print it out and place it on a dedicated clipboard in your kitchen.</li>
      <li>Train your staff on exactly how and when to fill it out.</li>
      <li>Review the logs weekly to identify any recurring issues.</li>
    </ul>

    <div class="cta-box" style="border-color: var(--navy); background: rgba(28,43,58,0.03);">
      <h3>Get Your Free Copy</h3>
      <p>Click below to request your free copy of the ${res}. If you need help customizing a full suite of documentation for your specific venue, let us know during your scoping call!</p>
      <a href="mailto:ames.food.adv@gmail.com?subject=Request Free Resource: ${res}" class="btn-primary" style="background: var(--navy); color: var(--white);">Email Us for the Download ↗</a>
    </div>

    <p style="font-size: 0.9rem; color: var(--ink-soft); margin-top: 2rem;"><em>Disclaimer: This template is a generic guide provided for educational purposes. It does not replace the need for a customized, business-specific food safety program or HACCP plan developed by a qualified professional.</em></p>
  </div>
  `;

  const html = getBaseHTML(
    'Free ' + res + ' | AMES Food Advisory',
    'Download our free ' + res + ' to help keep your food business compliant with NSW Food Authority documentation standards.',
    'free ' + res + ', food safety templates NSW',
    'Free ' + res,
    url,
    { "@context": "https://schema.org", "@type": "Article", "headline": "Free " + res },
    'Free Compliance Tool',
    'Free: <em>' + res + '</em>',
    'Professional, easy-to-use documentation templates to help you stay audit-ready every day of the week.',
    content
  );

  fs.writeFileSync(path.join(resDir, slug + '.html'), html);
  addSitemapUrl(url);
});

// Update Sitemap
const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const newUrlsXml = sitemapUrls.map(url => '  <url><loc>' + url + '</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>').join('\\n');
sitemapContent = sitemapContent.replace('</urlset>', newUrlsXml + '\\n</urlset>');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log('Successfully generated 50 new Vertical Dominance pages with strict compliance messaging.');

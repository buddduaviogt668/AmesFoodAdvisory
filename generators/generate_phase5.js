const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..');

// --- Helper to get base template ---
function getBaseHTML(title, desc, kw, ogTitle, ogUrl, schemaData, heroEyebrow, heroTitle, heroSub, bodyContent) {
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
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(28,43,58,0.96); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(212,117,31,0.15); padding: 0 2rem; height: 58px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; flex-direction: column; gap: 3px; text-decoration: none; justify-content: center; }
  .nav-logo-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--white); letter-spacing: 0.01em; line-height: 1.1; }
  .nav-logo-adv { color: var(--amber); font-style: italic; font-weight: 400; }
  .nav-logo-tag { font-size: 0.59rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.30); font-family: 'Inter', sans-serif; line-height: 1; margin-top: 1px; }
  .nav-links { display: flex; gap: 2rem; align-items: center; list-style: none; }
  .nav-links a { text-decoration: none; font-size: 0.855rem; font-weight: 400; color: rgba(255,255,255,0.6); letter-spacing: 0.01em; transition: color 0.2s; }
  .nav-links a:hover { color: var(--amber); }
  .nav-cta { background: var(--amber); color: var(--navy-deep); padding: 0.5rem 1.1rem; border-radius: 6px; font-weight: 600; font-size: 0.8rem; }
  .nav-cta:hover { background: var(--amber-dim); }
  
  .page-hero { background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%); color: var(--white); padding: 120px 2rem 60px; margin-top: 58px; position: relative; overflow: hidden; text-align: center; }
  .page-hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
  .page-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.8rem; display: inline-block; }
  h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 400; line-height: 1.15; margin-bottom: 1.2rem; }
  .page-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.7); line-height: 1.75; margin: 0 auto 2rem; max-width: 700px; font-weight: 300; }
  
  .content-area { max-width: 850px; margin: -40px auto 4rem; background: var(--white); padding: 4rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); position: relative; z-index: 2; }
  .content-area h2 { font-family: 'Playfair Display', serif; font-size: 1.9rem; margin: 2.5rem 0 1rem; color: var(--navy); }
  .content-area h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin: 1.5rem 0 0.8rem; color: var(--navy); }
  .content-area p { margin-bottom: 1.5rem; line-height: 1.8; color: var(--ink-mid); font-size: 1.05rem; }
  .content-area ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: var(--ink-mid); line-height: 1.8; font-size: 1.05rem; }
  .content-area li { margin-bottom: 0.5rem; }
  .content-area a { color: var(--amber-dim); font-weight: 500; text-decoration: none; border-bottom: 1px solid transparent; transition: 0.2s; }
  .content-area a:hover { border-bottom-color: var(--amber-dim); }

  .gate-box { background: var(--navy); color: var(--white); padding: 3rem; border-radius: 12px; text-align: center; margin: 3rem 0; box-shadow: 0 20px 40px rgba(28,43,58,0.15); }
  .gate-box h3 { color: var(--white); margin-top: 0; font-size: 1.8rem; margin-bottom: 1rem; }
  .gate-box p { color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: 1.05rem; }
  .gate-form { display: flex; gap: 1rem; max-width: 500px; margin: 0 auto; flex-direction: column; }
  .gate-form input { padding: 1rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: var(--white); font-size: 1rem; font-family: 'Inter', sans-serif; }
  .gate-form input::placeholder { color: rgba(255,255,255,0.5); }
  .gate-form button { background: var(--amber); color: var(--navy-deep); padding: 1rem; border-radius: 6px; font-size: 1rem; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
  .gate-form button:hover { background: var(--amber-dim); }
  .gate-privacy { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 1rem; }

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

<nav>
  <a href="/" class="nav-logo">
    <span class="nav-logo-name">AMES <span class="nav-logo-adv">Food Advisory</span></span>
    <span class="nav-logo-tag">NSW&nbsp;·&nbsp;HACCP&nbsp;·&nbsp;FOOD CONSULTANTS</span>
  </a>
  <ul class="nav-links">
    <li><a href="/the-ames-standard">Our Mission</a></li>
    <li><a href="/food-safety-consulting-sydney">Services</a></li>
    <li><a href="/the-vault">Free Resources</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="nav-cta">Book Call</a></li>
  </ul>
</nav>

<div class="page-hero">
  <div class="page-hero-inner">
    <div class="page-eyebrow">${heroEyebrow}</div>
    <h1>${heroTitle}</h1>
    <p class="page-hero-sub">${heroSub}</p>
  </div>
</div>

${bodyContent}

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
      <a href="/the-vault">The Vault</a>
      <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener">Book Call</a>
    </div>
  </div>
</footer>

</body>
</html>`;
}

const pages = [
  {
    slug: 'the-ames-standard',
    title: 'The AMES Standard | Our Mission | AMES Food Advisory',
    desc: 'Bringing Tier-1 corporate manufacturing standards to independent NSW food businesses.',
    kw: 'food safety mission, AMES food advisory standard, Tier-1 manufacturing QA',
    heroEyebrow: 'Our Mission & Pedigree',
    heroTitle: 'Bringing the <em>Tier-1 Standard</em> to Local Business',
    heroSub: 'We believe independent cafes and restaurants deserve the same elite food safety systems used by multinational corporations.',
    schema: { "@context": "https://schema.org", "@type": "AboutPage", "name": "The AMES Standard" },
    body: `
    <div class="content-area">
      <h2>Why We Started AMES Food Advisory</h2>
      <p>For over 11 years, our Principal Consultant managed Quality Assurance and Food Safety at the absolute highest levels of Australian manufacturing, including extensive tenure at <strong>The Arnott's Group</strong>.</p>
      
      <p>In those environments, food safety isn't a "tick-box" exercise; it is a finely tuned, scientifically rigorous system that protects millions of consumers and billions of dollars in brand equity. The systems are bulletproof. The training is continuous. The culture is relentless.</p>

      <p>But when we looked at the local hospitality and independent food manufacturing sector in NSW, we saw a massive gap.</p>

      <h2>The Problem with the "Old Guard"</h2>
      <p>Too many independent cafes, bakeries, and restaurants are being let down. They are sold generic, overpriced HACCP binders by consultants who have never managed a high-speed production line. These generic templates sit on a shelf gathering dust until the council inspector arrives, resulting in failed audits, fines, and immense stress for the business owner.</p>

      <h2>The AMES Difference</h2>
      <p>We created AMES Food Advisory to bridge this gap. We are taking the corporate rigor of Tier-1 manufacturing and scaling it down into practical, actionable systems for independent businesses. We combine this with deep pedagogical expertise—our Principal Consultant is also a <strong>TAFE NSW Lecturer</strong> and TAE-Qualified trainer. This means we don't just hand you a binder; we teach your staff how to actually use it.</p>

      <ul>
        <li><strong>No False Promises:</strong> We don't claim to be a regulatory body, and we do not conduct official council audits. We are the elite coaches who ensure you pass those audits with flying colors.</li>
        <li><strong>No Generic Templates:</strong> Your kitchen is unique. Your HACCP plan should be too.</li>
        <li><strong>True Education:</strong> We train your team so food safety becomes a habit, not a chore.</li>
      </ul>

      <p>If you are ready to elevate your business to the Tier-1 standard, we are ready to help.</p>

      <div style="text-align: center; margin-top: 3rem;">
        <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" class="btn-primary" target="_blank" rel="noopener">Book Your Free Scoping Call Today ↗</a>
      </div>
    </div>
    `
  },
  {
    slug: 'the-vault',
    title: 'The Food Safety Vault | Free Resources | AMES Food Advisory',
    desc: 'Unlock our massive vault of free food safety templates, cleaning schedules, and HACCP logs designed for NSW businesses.',
    kw: 'free food safety templates, free HACCP logs, food safety vault',
    heroEyebrow: 'Free Compliance Toolkit',
    heroTitle: 'Unlock <em>The Vault</em>',
    heroSub: 'Stop paying for generic templates. Get immediate access to our entire library of Tier-1 standard food safety logs, checklists, and guides—completely free.',
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "The Food Safety Vault" },
    body: `
    <div class="content-area">
      <h2 style="text-align: center;">Premium Tools. Zero Cost.</h2>
      <p style="text-align: center; margin-bottom: 3rem;">We believe the foundational tools for food safety should be accessible to everyone. Our Vault contains the exact templates we use to help Sydney cafes pass their NSW Food Authority audits.</p>
      
      <div class="gate-box">
        <h3>Access The Vault Now</h3>
        <p>Enter your details below to instantly unlock all 10+ premium templates, including the Daily Temperature Log, Allergen Matrix, and the Kitchen Cleaning Schedule.</p>
        
        <form class="gate-form" action="mailto:ames.food.adv@gmail.com?subject=Unlock The Vault" method="POST" enctype="text/plain">
          <input type="text" name="name" placeholder="Your Name" required>
          <input type="email" name="email" placeholder="Your Email Address" required>
          <button type="submit">Unlock All Free Resources</button>
          <div class="gate-privacy">We respect your inbox. No spam, just pure compliance value.</div>
        </form>
      </div>

      <h3>What's Inside the Vault?</h3>
      <ul>
        <li><strong>Daily Temperature Log Sheet:</strong> The absolute essential record for EHO audits.</li>
        <li><strong>Kitchen Cleaning Schedule PDF:</strong> Keep your premises spotless and compliant.</li>
        <li><strong>Supplier Delivery Checklist:</strong> Stop contaminated ingredients at the back door.</li>
        <li><strong>Allergen Matrix Template:</strong> Map out exactly what is in your menu.</li>
        <li><strong>Pest Control Monitoring Log:</strong> Crucial for maintaining a 5-star council rating.</li>
        <li><strong>Food Wastage Tracker:</strong> Improve your bottom line while staying compliant.</li>
        <li><strong>Staff Hygiene Policy Template:</strong> Set the standard for your team on day one.</li>
        <li><strong>Internal Audit Self-Checklist:</strong> Grade yourself before the inspector does.</li>
      </ul>

      <p style="text-align: center; margin-top: 3rem;"><em>Need these customized for your specific business? <a href="/contact">Contact the AMES team</a> to discuss bespoke SOP development.</em></p>
    </div>
    `
  },
  {
    slug: 'council-readiness-checklist',
    title: '50-Point Council Readiness Checklist | AMES Food Advisory',
    desc: 'The ultimate 50-point self-audit checklist to prepare your food business for a NSW local council health inspection.',
    kw: 'council health inspection checklist, NSW food authority audit, EHO checklist',
    heroEyebrow: 'Audit Preparation',
    heroTitle: 'The 50-Point <em>EHO Readiness</em> Checklist',
    heroSub: 'Grade your own kitchen before the council inspector arrives. A comprehensive self-audit guide based on real NSW Food Authority criteria.',
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "50-Point Council Readiness Checklist" },
    body: `
    <div class="content-area">
      <h2>Are You Truly Ready for an Unannounced Inspection?</h2>
      <p>Local council Environmental Health Officers (EHOs) can walk through your doors at any time. When they do, they are looking for specific, documented proof that your business is operating safely. This 50-point overview highlights the most critical areas where businesses fail.</p>

      <h3>Phase 1: Documentation & Records</h3>
      <ul>
        <li>Is your Food Safety Supervisor (FSS) certificate current and displayed?</li>
        <li>Are daily temperature logs for all fridges and freezers filled out completely?</li>
        <li>Are delivery temperature logs being maintained for high-risk foods?</li>
        <li>Do you have a documented and signed cleaning schedule?</li>
        <li>Is your pest control register up to date with a licensed contractor?</li>
      </ul>

      <h3>Phase 2: Temperature Control</h3>
      <ul>
        <li>Are all cool rooms operating strictly below 5°C?</li>
        <li>Is hot food being held above 60°C during service?</li>
        <li>Do staff have calibrated probe thermometers readily available?</li>
        <li>Are cooling processes for cooked foods tracked and documented?</li>
      </ul>

      <h3>Phase 3: Hygiene & Cross-Contamination</h3>
      <ul>
        <li>Are designated handwashing basins easily accessible, supplied with warm water, liquid soap, and paper towels?</li>
        <li>Are raw meats stored strictly below ready-to-eat foods in the cool room?</li>
        <li>Are color-coded cutting boards used correctly to prevent cross-contamination?</li>
        <li>Is the allergen matrix updated for the current menu?</li>
      </ul>

      <div class="gate-box" style="margin-top: 4rem;">
        <h3>Download the Full 50-Point PDF</h3>
        <p>This was just a preview. Enter your email to download the complete, printable 50-Point Checklist to use in your kitchen today.</p>
        
        <form class="gate-form" action="mailto:ames.food.adv@gmail.com?subject=Download 50-Point Checklist" method="POST" enctype="text/plain">
          <input type="email" name="email" placeholder="Your Email Address" required>
          <button type="submit">Download the PDF Checklist</button>
        </form>
      </div>

      <h2 style="margin-top: 3rem;">Failing the Checklist?</h2>
      <p>If you answered "No" to any of the questions above, you are at risk of a council fine or a warning notice. AMES Food Advisory provides mock audits and compliance coaching to fix these gaps permanently.</p>
      <p><a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener">Book a Mock Audit with our Principal Consultant ↗</a></p>
    </div>
    `
  },
  {
    slug: 'cafe-startup-roadmap',
    title: 'The Cafe Startup Success Map | AMES Food Advisory',
    desc: 'A step-by-step digital roadmap outlining exactly what a new hospitality business needs to do to be compliant in NSW.',
    kw: 'cafe startup checklist NSW, opening a cafe food safety, restaurant startup compliance',
    heroEyebrow: 'New Business Guide',
    heroTitle: 'The Cafe Startup <em>Success Map</em>',
    heroSub: 'Opening a new venue? Follow this exact compliance roadmap to ensure you pass your initial council inspections and open without delays.',
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "The Cafe Startup Success Map" },
    body: `
    <div class="content-area">
      <h2>The Critical Path to Opening Day</h2>
      <p>Opening a new cafe or restaurant in NSW is incredibly stressful. Alongside hiring staff and finalizing menus, you must navigate a maze of council regulations and food safety requirements. Missing a single step can delay your opening by weeks.</p>

      <h3>Step 1: The Design Phase</h3>
      <p>Before you even begin construction, your kitchen layout must comply with Australian Standard AS4674 (Design, construction and fit-out of food premises). Ensure adequate hand wash basins, coved flooring, and correct ventilation. <em>Do not sign off on plans until compliance is verified.</em></p>

      <h3>Step 2: Registration & Licensing</h3>
      <p>You must notify your local council and the NSW Food Authority of your business details before trading. You must also nominate your certified Food Safety Supervisor (FSS).</p>

      <h3>Step 3: System Implementation</h3>
      <p>This is where most startups fail. You must build your food safety program <em>before</em> you open.</p>
      <ul>
        <li>Develop a bespoke HACCP plan or Food Safety Program.</li>
        <li>Write Standard Operating Procedures (SOPs) for cleaning, opening, and closing.</li>
        <li>Create the Allergen Matrix for your launch menu.</li>
      </ul>

      <h3>Step 4: Staff Training</h3>
      <p>A binder is useless if your team ignores it. Conduct pre-opening induction training. Teach your chefs and floor staff exactly how to maintain the temperature logs and adhere to the SOPs.</p>

      <div class="gate-box" style="margin-top: 4rem;">
        <h3>Get the "Startup in a Box" Guide</h3>
        <p>Enter your email to receive our comprehensive guide detailing the exact timeline, costs, and templates needed to launch a compliant food business in NSW.</p>
        
        <form class="gate-form" action="mailto:ames.food.adv@gmail.com?subject=Download Startup Guide" method="POST" enctype="text/plain">
          <input type="email" name="email" placeholder="Your Email Address" required>
          <button type="submit">Send Me the Startup Guide</button>
        </form>
      </div>

      <h2 style="margin-top: 3rem;">Fast-Track Your Launch</h2>
      <p>AMES Food Advisory offers a specialized <a href="/food-business-startup-package">Startup Compliance Package</a>. We handle the documentation, the SOPs, and the staff training so you can focus on making your opening week a massive success.</p>
    </div>
    `
  }
];

const sitemapUrls = [];

pages.forEach(page => {
  const url = 'https://www.amesfoodadvisory.com.au/' + page.slug;
  const html = getBaseHTML(
    page.title, page.desc, page.kw, page.title, url, page.schema,
    page.heroEyebrow, page.heroTitle, page.heroSub, page.body
  );
  fs.writeFileSync(path.join(OUTPUT_DIR, page.slug + '.html'), html);
  sitemapUrls.push(url);
});

// Update Sitemap
const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const newUrlsXml = sitemapUrls.map(url => '  <url><loc>' + url + '</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>').join('\\n');
sitemapContent = sitemapContent.replace('</urlset>', newUrlsXml + '\\n</urlset>');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log('Successfully generated Phase 5 Value Bomb Launch Pages with email gates.');

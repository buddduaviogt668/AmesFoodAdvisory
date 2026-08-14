const fs = require('fs');
const path = require('path');
const projects = require('../projects_data.js');
const { NAV_HTML, NAV_JS, NAV_CSS } = require('../templates/nav-master.js');

const OUTPUT_DIR = path.join(__dirname, '..');

function getBaseHTML(title, desc, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
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
    background: var(--white);
    color: var(--ink);
    line-height: 1.6;
  }
  ${NAV_CSS}
  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
  .page-hero { background: var(--navy-deep); color: var(--white); padding: 6rem 2rem 4rem; text-align: center; }
  .page-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); margin-bottom: 1rem; }
  h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1rem; }
  h1 em { font-style: italic; color: var(--amber); }
  .hero-sub { color: rgba(255,255,255,0.6); max-width: 700px; margin: 0 auto; font-size: 1.1rem; }
  
  .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; padding: 4rem 0; }
  .project-card { border: 1px solid var(--border-navy); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; color: inherit; transition: transform 0.2s, border-color 0.2s; }
  .project-card:hover { transform: translateY(-5px); border-color: var(--amber); }
  .project-img { height: 200px; background: var(--stone); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
  .project-content { padding: 1.5rem; flex-grow: 1; }
  .project-industry { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--amber); margin-bottom: 0.5rem; }
  .project-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: var(--navy); margin-bottom: 0.75rem; line-height: 1.3; }
  .project-summary { font-size: 0.85rem; color: var(--ink-soft); line-height: 1.5; margin-bottom: 1rem; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tag { font-size: 0.65rem; background: var(--stone); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--ink-mid); }

  .detail-section { padding: 5rem 0; }
  .detail-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; }
  .detail-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--amber); margin-bottom: 0.5rem; }
  .detail-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--navy); margin-bottom: 1.5rem; }
  .detail-text { color: var(--ink-mid); margin-bottom: 2.5rem; line-height: 1.8; }
  .sidebar-box { background: var(--stone); padding: 2rem; border-radius: 12px; }
  .sidebar-item { margin-bottom: 1.5rem; }
  .sidebar-label { font-size: 0.7rem; font-weight: 700; color: var(--ink-muted); text-transform: uppercase; margin-bottom: 0.25rem; }
  .sidebar-val { font-weight: 600; color: var(--navy); }

  footer { background: var(--navy-deep); color: var(--white); padding: 4rem 2rem; margin-top: 4rem; }
  .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 2rem; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; text-decoration: none; color: var(--white); }
  .footer-logo span { color: var(--amber); font-style: italic; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.85rem; }
  .footer-links a:hover { color: var(--white); }

  @media (max-width: 768px) {
    .detail-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
</style>
</head>
<body>
${NAV_HTML}
`;
}

// 1. Generate Projects Hub
const hubContent = `
<div class="page-hero">
  <div class="container">
    <div class="page-eyebrow">Real World Results</div>
    <h1>Recent <em>Projects</em></h1>
    <p class="hero-sub">From local cafes to national manufacturers, we deliver the Tier-1 food safety standards that protect your business and your customers.</p>
  </div>
</div>

<div class="container">
  <div class="project-grid">
    ${projects.map(p => `
    <a href="/projects/${p.slug}" class="project-card">
      <div class="project-img">
        ${p.logo ? `<img src="${p.logo}" alt="${p.client} Logo" style="max-width: 80%; max-height: 80%; object-fit: contain;">` : '🏛️'}
      </div>
      <div class="project-content">
        <div class="project-industry">${p.industry}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-summary">${p.challenge.substring(0, 100)}...</div>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
    `).join('')}
  </div>
</div>

<section style="background: var(--stone); padding: 5rem 2rem; text-align: center;">
  <div class="container">
    <h2 class="detail-title">Ready to start your <em>success story?</em></h2>
    <p style="margin-bottom: 2.5rem; color: var(--ink-soft);">Book a free 15-minute scoping call to discuss your compliance needs.</p>
    <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="btn-primary" style="display: inline-block; text-decoration: none; padding: 1rem 2rem; background: var(--amber); color: var(--navy-deep); border-radius: 6px; font-weight: 600;">Book Free Scoping Call</a>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <a href="/" class="footer-logo">AMES <span>Food Advisory</span></a>
    <div style="color: rgba(255,255,255,0.3); font-size: 0.8rem;">© 2026 AMES Food Advisory. Sydney, NSW.</div>
    <div class="footer-links">
      <a href="/pricing">Pricing</a>
      <a href="/projects">Recent Work</a>
      <a href="/suburb-directory">Locations</a>
    </div>
  </div>
</footer>

<script>${NAV_JS}</script>
</body>
</html>
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'recent-projects.html'), getBaseHTML('Recent Projects | AMES Food Advisory', 'Explore our recent food safety consulting and HACCP projects across Sydney and NSW.', '') + hubContent);

// 2. Generate Individual Project Pages
const projectsDir = path.join(OUTPUT_DIR, 'projects');
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir);

projects.forEach(p => {
  const detailContent = `
  <div class="page-hero">
    <div class="container">
      <div class="page-eyebrow">Case Study: ${p.industry}</div>
      <h1>${p.title}</h1>
      <div class="hero-sub" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 1rem;">
        ${p.logo ? `<img src="${p.logo}" alt="${p.client} Logo" style="height: 60px; width: auto; border-radius: 8px; border: 2px solid rgba(255,255,255,0.1);">` : ''}
        <span>${p.client}</span>
      </div>
    </div>
  </div>

  <div class="container detail-section">
    <div class="detail-grid">
      <div>
        <div class="sidebar-item">
          <div class="detail-label">The Challenge</div>
          <div class="detail-text">${p.challenge}</div>
        </div>
        
        <div class="sidebar-item">
          <div class="detail-label">The AMES Solution</div>
          <div class="detail-text">${p.solution}</div>
        </div>

        <div class="sidebar-item">
          <div class="detail-label">The Outcome</div>
          <div class="detail-text" style="font-size: 1.2rem; color: var(--navy); font-weight: 500; border-left: 4px solid var(--amber); padding-left: 1.5rem;">${p.outcome}</div>
        </div>

        ${p.deliverables ? `
        <div class="sidebar-item" style="margin-top: 3rem; background: var(--stone); padding: 2rem; border-radius: 12px;">
          <div class="detail-label" style="color: var(--navy); border-bottom: 2px solid var(--amber); display: inline-block; margin-bottom: 1.5rem;">Key Deliverables Provided</div>
          <ul style="list-style: none;">
            ${p.deliverables.map(d => `
              <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; font-size: 0.95rem; color: var(--navy-mid);">
                <span style="color: var(--amber); font-weight: 700;">✓</span> ${d}
              </li>
            `).join('')}
          </ul>
        </div>
        ` : ''}

        <a href="/recent-projects" style="color: var(--amber); text-decoration: none; font-weight: 600;">← Back to all projects</a>
      </div>

      <div>
        <div class="sidebar-box">
          <div class="sidebar-item">
            <div class="sidebar-label">Client</div>
            <div class="sidebar-val">${p.client}</div>
          </div>
          <div class="sidebar-item">
            <div class="sidebar-label">Industry</div>
            <div class="sidebar-val">${p.industry}</div>
          </div>
          <div class="sidebar-item">
            <div class="sidebar-label">Services Delivered</div>
            <div class="project-tags" style="margin-top: 0.5rem;">
              ${p.tags.map(t => `<span class="tag" style="background: var(--white);">${t}</span>`).join('')}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(0,0,0,0.05); margin: 1.5rem 0;">
          <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 1.5rem;">Need similar results for your business?</p>
          <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" style="display: block; text-align: center; background: var(--navy); color: var(--white); text-decoration: none; padding: 0.8rem; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Book Free Scoping Call</a>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <div class="footer-inner">
      <a href="/" class="footer-logo">AMES <span>Food Advisory</span></a>
      <div style="color: rgba(255,255,255,0.3); font-size: 0.8rem;">© 2026 AMES Food Advisory. Sydney, NSW.</div>
      <div class="footer-links">
        <a href="/pricing">Pricing</a>
        <a href="/recent-projects">Recent Work</a>
        <a href="/suburb-directory">Locations</a>
      </div>
    </div>
  </footer>

  <script>${NAV_JS}</script>
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(projectsDir, p.slug + '.html'), getBaseHTML(p.title + ' | AMES Food Advisory', p.challenge.substring(0, 150), '') + detailContent);
});

console.log('Successfully generated Recent Projects hub and ' + projects.length + ' project pages.');

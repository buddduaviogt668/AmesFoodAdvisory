const fs = require('fs');
const path = require('path');
const projects = require('../projects_data.js');
const { NAV_HTML, NAV_JS, NAV_CSS } = require('../templates/nav-master.js');

const projectsDir = path.join(__dirname, '../projects');

function getBaseHTML(title, desc, extraCSS = '') {
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
    --amber:       #E8913A;
    --amber-light: #F0A855;
    --amber-pale:  #FDF3E7;
    --amber-dim:   #C4741E;
    --stone:       #F5F1EB;
    --stone-mid:   #EDE7DE;
    --stone-dark:  #DDD4C6;
    --ink:         #1A1C1E;
    --ink-mid:     #3C4048;
    --ink-soft:    #6B7280;
    --ink-muted:   #9CA3AF;
    --white:       #FFFFFF;
    --border-navy: rgba(28,43,58,0.12);
    --border-amber:rgba(232,145,58,0.28);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--stone);
    color: var(--ink);
    line-height: 1.6;
  }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
  
  ${NAV_CSS}
  
  .page-hero {
    background: var(--navy-deep);
    padding: 9rem 2rem 5rem;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 50% 80% at 90% 50%, rgba(232,145,58,0.09) 0%, transparent 65%),
      radial-gradient(ellipse 40% 60% at 0% 80%, rgba(44,68,96,0.5) 0%, transparent 60%);
  }
  .page-hero::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--amber), transparent);
    opacity: 0.35;
  }
  .page-hero-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
  
  .page-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--amber);
    margin-bottom: 1.25rem;
  }
  .page-eyebrow::before, .page-eyebrow::after { content: ''; width: 28px; height: 1px; background: var(--amber); }
  
  .page-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 400; line-height: 1.2;
    letter-spacing: -0.01em; color: var(--white);
    margin-bottom: 1.5rem;
  }
  .hero-sub { font-size: 1.1rem; color: rgba(255,255,255,0.6); font-weight: 300; }

  .detail-section { padding: 5rem 0; }
  .detail-grid {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  @media (max-width: 900px) {
    .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
  }

  .sidebar-box {
    background: var(--white);
    border: 1px solid var(--border-navy);
    border-radius: 12px;
    padding: 2.5rem;
    position: sticky;
    top: 100px;
  }
  .sidebar-item { margin-bottom: 2rem; }
  .sidebar-item:last-child { margin-bottom: 0; }
  .detail-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--amber);
    margin-bottom: 0.75rem;
    display: block;
  }
  .detail-text {
    font-size: 1.05rem;
    color: var(--navy-mid);
    line-height: 1.7;
  }
  .outcome-box {
    background: var(--amber-pale);
    border-left: 4px solid var(--amber);
    padding: 2rem;
    border-radius: 0 12px 12px 0;
    margin: 3rem 0;
  }
  .outcome-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: var(--navy-deep);
    font-style: italic;
    line-height: 1.5;
  }
  
  .deliverables-card {
    background: var(--white);
    border: 1px solid var(--border-navy);
    padding: 2.5rem;
    border-radius: 12px;
    margin-top: 3rem;
  }
  .deliverables-list { list-style: none; margin-top: 1.5rem; }
  .deliverables-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
    font-size: 0.95rem;
    color: var(--navy-mid);
  }
  .deliverables-list li::before {
    content: '✓';
    color: var(--amber);
    font-weight: 700;
  }

  .tag {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    background: var(--stone);
    color: var(--navy-mid);
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 4px;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }

  footer {
    background: var(--navy-deep);
    padding: 5rem 2rem;
    color: var(--white);
    border-top: 1px solid var(--border-amber);
  }
  .footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--white);
    text-decoration: none;
  }
  .footer-logo span { color: var(--amber); font-style: italic; font-weight: 400; }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--amber); }

  ${extraCSS}
</style>
</head>
<body>
${NAV_HTML}
`;
}

// Generate Recent Projects Hub
const hubContent = `
<div class="page-hero">
  <div class="page-hero-inner">
    <div class="page-eyebrow">Portfolio</div>
    <h1>Recent <em>Projects & Success</em></h1>
    <p class="hero-sub">Concrete proof of the Tier-1 compliance standards we deliver to food businesses across NSW.</p>
  </div>
</div>

<div class="container detail-section">
  <style>
    .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; }
    .project-card {
      background: var(--white);
      border: 1px solid var(--border-navy);
      border-radius: 16px;
      text-decoration: none;
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    .project-card:hover { transform: translateY(-5px); border-color: var(--amber); box-shadow: 0 15px 35px rgba(28,43,58,0.08); }
    .project-img-box {
      height: 180px;
      background: var(--navy-deep);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .project-img-box img { max-width: 60%; max-height: 60%; object-fit: contain; }
    .project-content { padding: 2rem; flex-grow: 1; }
    .project-industry { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--amber); margin-bottom: 0.75rem; letter-spacing: 0.05em; }
    .project-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--navy); line-height: 1.25; margin-bottom: 1rem; }
    .project-summary { font-size: 0.9rem; color: var(--ink-soft); line-height: 1.6; margin-bottom: 1.5rem; }
    .view-btn { font-size: 0.85rem; font-weight: 700; color: var(--navy-deep); display: flex; align-items: center; gap: 0.5rem; }
  </style>
  <div class="project-grid">
    ${projects.map(p => `
    <a href="/projects/${p.slug}" class="project-card">
      <div class="project-img-box">
        ${p.logo ? `<img src="${p.logo}" alt="${p.client} Logo">` : '<span style="font-size: 3rem;">🏛️</span>'}
      </div>
      <div class="project-content">
        <div class="project-industry">${p.industry}</div>
        <div class="project-title">${p.title}</div>
        <p class="project-summary">${p.challenge.substring(0, 110)}...</p>
        <div class="view-btn">View Case Study ↗</div>
      </div>
    </a>
    `).join('').trim()}
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

fs.writeFileSync(path.join(__dirname, '../recent-projects.html'), getBaseHTML('Recent Projects & Client Success | AMES Food Advisory', 'Concrete proof of the Tier-1 compliance standards we deliver to food businesses across NSW.', '') + hubContent);

// Generate Individual Project Pages
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir);

projects.forEach(p => {
  const detailContent = `
  <div class="page-hero">
    <div class="page-hero-inner">
      <div class="page-eyebrow">Case Study: ${p.industry}</div>
      <h1>${p.title}</h1>
      <div class="hero-sub" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 1.5rem;">
        ${p.logo ? `<img src="${p.logo}" alt="${p.client} Logo" style="height: 50px; width: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">` : ''}
        <span>${p.client}</span>
      </div>
    </div>
  </div>

  <div class="container detail-section">
    <div class="detail-grid">
      <div>
        <div class="sidebar-item">
          <span class="detail-label">The Challenge</span>
          <div class="detail-text">${p.challenge}</div>
        </div>
        
        <div class="sidebar-item">
          <span class="detail-label">The AMES Solution</span>
          <div class="detail-text">${p.solution}</div>
        </div>

        <div class="outcome-box">
          <span class="detail-label" style="margin-bottom: 1rem;">The Outcome</span>
          <div class="outcome-text">${p.outcome}</div>
        </div>

        ${p.deliverables ? `
        <div class="deliverables-card">
          <span class="detail-label">Key Deliverables Provided</span>
          <ul class="deliverables-list">
            ${p.deliverables.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div style="margin-top: 4rem;">
          <a href="/recent-projects" style="color: var(--amber); text-decoration: none; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
            ← Back to all projects
          </a>
        </div>
      </div>

      <div>
        <div class="sidebar-box">
          <div class="sidebar-item">
            <span class="detail-label">Client</span>
            <div style="font-weight: 600; color: var(--navy-deep); font-size: 1.1rem;">${p.client}</div>
          </div>
          <div class="sidebar-item">
            <span class="detail-label">Industry</span>
            <div style="color: var(--navy-mid);">${p.industry}</div>
          </div>
          <div class="sidebar-item">
            <span class="detail-label">Expertise Applied</span>
            <div style="margin-top: 0.75rem;">
              ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid var(--border-navy); margin: 2rem 0;">
          <p style="font-size: 0.85rem; color: var(--ink-soft); margin-bottom: 1.5rem; line-height: 1.5;">Need similar results for your business?</p>
          <a href="https://calendly.com/ames-food-adv/scoping-call-15-mins" target="_blank" rel="noopener" class="btn-primary" style="width: 100%; justify-content: center; text-decoration: none;">Book Scoping Call</a>
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

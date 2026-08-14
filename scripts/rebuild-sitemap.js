const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://www.amesfoodadvisory.com.au';
const excluded = new Set(['404.html']);

function collect(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scripts') continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...collect(absolute));
    else if (entry.isFile() && entry.name.endsWith('.html') && !excluded.has(entry.name)) result.push(absolute);
  }
  return result;
}

function urlFor(file) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  if (relative === 'index.html') return base + '/';
  return `${base}/${relative.replace(/\.html$/, '')}`;
}

const urls = collect(root).map(urlFor).sort();
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc><changefreq>monthly</changefreq><priority>${url === base + '/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`Rebuilt sitemap with ${urls.length} live HTML URLs.`);

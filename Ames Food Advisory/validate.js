const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let errors = 0;

console.log(`Checking ${files.length} HTML files for syntax issues and broken internal links...\n`);

const existingFiles = new Set(files.map(f => '/' + f));
// Also map root and hashes
existingFiles.add('/');
existingFiles.add('');

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // 1. Basic HTML Tags check
  const openHtml = (content.match(/<html/g) || []).length;
  const closeHtml = (content.match(/<\/html>/g) || []).length;
  if (openHtml !== 1 || closeHtml !== 1) {
    console.error(`❌ ${file}: HTML tag imbalance (open: ${openHtml}, close: ${closeHtml})`);
    errors++;
  }

  // 2. Unclosed Style check
  const styleBlocks = content.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
  styleBlocks.forEach(style => {
    const openBrace = (style.match(/\{/g) || []).length;
    const closeBrace = (style.match(/\}/g) || []).length;
    if (openBrace !== closeBrace) {
      console.error(`❌ ${file}: CSS braces imbalance (open: ${openBrace}, close: ${closeBrace})`);
      errors++;
    }
  });

  // 3. Javascript check (syntactic check by matching tags)
  const scriptBlocks = content.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [];
  scriptBlocks.forEach(script => {
    // Only parse if it's executable JS (exclude JSON-LD)
    if (script.includes('type="application/ld+json"') || script.includes("type='application/ld+json'")) {
      return;
    }
    const code = script.replace(/<script[^>]*>/, '').replace('</script>', '');
    try {
      new Function(code);
    } catch (e) {
      console.error(`❌ ${file}: JavaScript syntax error: ${e.message}`);
      errors++;
    }
  });

  // 4. Link Check (Internal links only)
  const links = content.match(/href="([^"]+)"/g) || [];
  links.forEach(linkStr => {
    const href = linkStr.match(/href="([^"]+)"/)[1];
    if (href.startsWith('/') && !href.includes('#') && !href.includes(':')) {
      const slug = href;
      const matchingFile = slug + '.html';
      if (!existingFiles.has(slug) && !fs.existsSync(path.join(dir, matchingFile))) {
        console.warn(`⚠️  ${file}: Potential broken internal link: "${href}"`);
      }
    }
  });
});

if (errors === 0) {
  console.log('\n✅ Validation successful! All files parsed cleanly with zero programming/syntax errors.');
  process.exit(0);
} else {
  console.error(`\n❌ Validation failed with ${errors} error(s).`);
  process.exit(1);
}

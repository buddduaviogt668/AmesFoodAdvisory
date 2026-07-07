#!/bin/bash

# Get all .html files
all_files=$(find . -name "*.html" -not -path "./node_modules/*" | sed 's|./||' | grep -v "^index.html$" | sort)

# Get all links from index.html (service pages only, not anchors or externals)
index_links=$(grep -o 'href="[^"]*\.html[^"]*"' index.html | grep -v "^index.html" | sed 's/href="\///g' | sed 's/"//g' | sort | uniq)

echo "=== SITE STRUCTURE AUDIT ==="
echo ""
echo "Total HTML files: $(echo "$all_files" | wc -l)"
echo ""
echo "=== PAGES LINKED IN INDEX.HTML ==="
echo "$index_links"
echo ""
echo "=== POTENTIALLY ORPHANED PAGES (Not in index.html nav) ==="
echo "$all_files" | while read file; do
  if ! echo "$index_links" | grep -q "$file"; then
    echo "❌ $file"
  fi
done

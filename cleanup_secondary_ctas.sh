#!/bin/bash

# Replace all "All services" links with /pricing
sed -i 's|<a href="/#services" class="btn-outline">All services|<a href="/pricing" class="btn-outline">View pricing|g' *.html

# Replace all phone "Speak with a specialist" links with pricing page
sed -i 's|<a href="tel:+61400000000" class="btn-outline">Speak with a specialist|<a href="/pricing" class="btn-outline">View all services|g' *.html

echo "✅ Secondary CTAs cleaned up"

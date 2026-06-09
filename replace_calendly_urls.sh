#!/bin/bash

# Replace all placeholder Calendly URLs with real ones
sed -i 's|https://calendly.com/ames-food-advisory/scoping-call|https://calendly.com/ames-food-adv/scoping-call-15-mins|g' *.html
sed -i 's|https://calendly.com/ames-food-advisory/haccp-workshop|https://calendly.com/ames-food-adv/haccp-workshop-60mins|g' *.html
sed -i 's|https://calendly.com/ames-food-advisory/consultation|https://calendly.com/ames-food-adv/consultation-60-mins|g' *.html
sed -i 's|https://calendly.com/ames-food-advisory/training-assessment|https://calendly.com/ames-food-adv/training-assessment-30-mins|g' *.html
sed -i 's|https://calendly.com/ames-food-advisory/audit-planning|https://calendly.com/ames-food-adv/audit-planning-30-mins|g' *.html

echo "✅ All Calendly URLs replaced with production links"

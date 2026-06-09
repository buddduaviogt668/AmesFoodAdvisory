#!/bin/bash

# Food Safety Consulting Sydney
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/scoping-call" class="btn-primary">Claim Your Food Safety Consultation|g' food-safety-consulting-sydney.html
sed -i 's|<a href="/#services" class="btn-outline">All services|<a href="/pricing" class="btn-outline">View pricing|g' food-safety-consulting-sydney.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Start Your Food Safety Roadmap Now|g' food-safety-consulting-sydney.html
sed -i 's|<a href="tel:+61400000000" class="btn-outline">Speak with a specialist|<a href="/pricing" class="btn-outline">View all services|g' food-safety-consulting-sydney.html

# Food Safety Training Sydney
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/training-assessment" class="btn-primary">Schedule Your Team Training|g' food-safety-training-sydney.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Enroll Your Team in Food Safety Training|g' food-safety-training-sydney.html

# Internal Auditing Services
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/audit-planning" class="btn-primary">Get Your Audit Timeline|g' internal-auditing-services.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Book Your Internal Food Safety Audit|g' internal-auditing-services.html

# SOP Writing for Food Businesses
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/scoping-call" class="btn-primary">Get Your SOP Template Audit|g' sop-writing-food-businesses.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Start Your Professional SOP Suite|g' sop-writing-food-businesses.html

# Lab Skills Training
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/training-assessment" class="btn-primary">Explore Lab Training Options|g' lab-skills-training.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Enroll Your Team in Lab Skills Training|g' lab-skills-training.html

# RTO Resource Development
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/scoping-call" class="btn-primary">Discuss Your RTO Needs|g' rto-resource-development.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Commission Your Custom RTO Resources|g' rto-resource-development.html

# Sampling & Inspection Services
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="https://calendly.com/ames-food-advisory/audit-planning" class="btn-primary">Book Your Inspection & Sampling|g' sampling-inspection-services.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Schedule Your Lab Analysis & Report|g' sampling-inspection-services.html

# Food Business Startup Package
sed -i 's|<a href="/#contact" class="btn-primary">Book a free consultation|<a href="/free-compliance-checklist-nsw" class="btn-primary">Claim Your Startup Essentials Checklist|g' food-business-startup-package.html
sed -i 's|<a href="/#contact" class="btn-primary">Arrange a free consultation call|<a href="https://calendly.com/ames-food-advisory/consultation" class="btn-primary">Get Your Complete Startup Package|g' food-business-startup-package.html

echo "✅ All 9 pages updated with 2-CTA structure"

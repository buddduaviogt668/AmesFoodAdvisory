# Ames Food Advisory: "Monster SEO" Monolith Implementation Plan

This plan outlines the strategy and technical implementation for building out the AMES Food Advisory website into an SEO powerhouse. We will use the successful structural approach of Sydney Automation Co. (tier-based service and local pages) while upgrading the visual design to a premium, authoritative standard (Midnight & Amber palette).

## User Review Required

> [!IMPORTANT]
> **Director Anonymity Strategy:**
> We will leverage the director's impressive background (11+ years at Arnotts, TAFE NSW instructor, HACCP specialist) to build trust and authority, but we will purposefully omit her specific name. The language will use "we" and "AMES Food Advisory" to sound like a large, established firm. 

> [!IMPORTANT]
> **LinkedIn Credentials:**
> Unfortunately, LinkedIn blocks automated AI readers from viewing profiles. **Could you please copy and paste the raw text of her LinkedIn "About" and "Experience" sections into the chat?** This will ensure I have 100% accurate details on all her accreditations, certifications, and career history to weave into the site's authority signals.

> [!NOTE]
> **AEO (Answer Engine Optimization) & Conversational Search:**
> To dominate AI searches (like ChatGPT, Perplexity, Gemini) and Google's AI overviews, every single page will include a deep, conversational "Questions & Answers" section. This goes beyond standard FAQs. It will be formatted using strict `FAQPage` Schema.org JSON-LD and written in natural, long-tail conversational language (e.g., "What happens if the NSW Food Authority finds a critical non-conformance during my audit?").

> [!TIP]
> **Strict Code Validation:**
> I will ensure absolutely zero HTML, CSS, or JS errors across the entire site. I will write a custom validation script to check all files before we finalize them.

## Proposed Changes

We will build the site architecture in three primary tiers. I will write a Node.js script (or similar programmatic builder) to generate these HTML files consistently from a master template, ensuring all pages have perfect SEO metadata, Schema.org markup (LocalBusiness & FAQPage), and internal linking.

---

### Phase 1: Core Foundation & Accreditations

We will finalize the main template (`ames-food-advisory.html`) to ensure it reflects the new Midnight & Amber color palette and the big-firm narrative.

#### [MODIFY] [ames-food-advisory.html](file:///c:/Users/gaska/Documents/antigravity/lucid-babbage/Ames%20Food%20Advisory/ames-food-advisory.html)
- Add a new "Accreditations & Experience" logo strip (Arnotts, TAFE NSW, HACCP).
- Enhance the copy to sound like a multi-disciplinary firm.
- Ensure all meta tags use the primary keyword: "Food Safety Consulting & Training · Sydney NSW".

---

### Phase 2: Tier 1 - The 9 Money Pages (Service Pages)

We will update or create the 9 core service pages. These target direct, high-intent searches. 

#### [NEW/MODIFY] Tier 1 HTML Files
- `/food-safety-consulting-sydney.html`
- `/haccp-plan-development.html`
- `/food-safety-training-sydney.html`
- `/internal-auditing-services.html`
- `/sop-writing-food-businesses.html`
- `/food-business-startup-package.html`
- `/lab-skills-training.html`
- `/rto-resource-development.html`
- `/sampling-inspection-services.html`

*Action: Each page will receive 400-600 words of targeted content, FAQ Schema, and CTA.*

---

### Phase 3: Tier 2 - Client Type Pages (Long-Tail Niche Pages)

These pages capture searchers looking for help specific to their business type.

#### [NEW] Tier 2 HTML Files
- `/food-safety-small-business.html`
- `/food-startup-consultant-sydney.html`
- `/cafe-restaurant-food-safety.html`
- `/food-manufacturer-consulting.html`
- `/rto-food-technology-resources.html`
- `/food-industry-workers-training.html`

*Action: These will feature a "This is for you if..." section and targeted copy.*

---

### Phase 4: Tier 3 - Suburb Pages (Hyper-Local SEO)

Following the Sydney Automation Co. playbook, we will create location-specific pages targeting high-density food areas in NSW.

#### [NEW] Tier 3 Suburb HTML Files
- **Western Sydney:** Parramatta, Blacktown, Liverpool, Penrith, Campbelltown
- **Industrial:** Mascot, Alexandria, Botany
- **Dining Hubs:** Surry Hills, Newtown, Leichhardt
- **Growth/Regional:** Chatswood, Hornsby, Newcastle, Wollongong

*Action: These pages will dynamically insert the suburb name naturally 4-6 times and link back to the core 9 service pages.*

## Open Questions

1. **Automation:** Because we are building ~30 pages, do you want me to write a Javascript build script (e.g., `build.js`) inside the project folder that compiles these from a template, or would you prefer I hardcode each HTML file individually? A build script is highly recommended for maintainability.
2. **Logos:** Are you okay with me generating some professional SVG placeholder badges for the accreditations section for now?

## Verification Plan

### Automated Tests
- Run an HTML linter on the generated files to ensure valid markup.
- Verify Schema.org JSON-LD exists and is properly formatted in the `<head>` of all generated pages.

### Manual Verification
- The user will open the newly generated pages in the browser to confirm the "big firm" aesthetic, the anonymity of the director, and the robustness of the SEO architecture.

# Ames Food Advisory - CRO & Technical Audit Findings

## 1. Top Performing Pages (GSC Insights)
*   **NSW Food Authority Registration Guide:** Highest clicks (5). High intent, but weak conversion path.
*   **Blacktown & Wollongong Suburb Pages:** Local intent traction (3 clicks each). These are "Hub" pages that should drive direct enquiries.
*   **How to Prepare for Council Inspection:** Solid intent (3 clicks).

## 2. Critical Conversion Issues (CRO)
*   **Lead Capture is Local-Only:** The `lead-gate.js` stores leads in the visitor's `localStorage` only. This means the business never actually receives the lead data!
*   **CTA Friction:**
    *   Duplicate/Conflicting CTAs in the header (Phone vs Book Call).
    *   Top pages like the Registration Guide redirect to the "Startup Package" instead of a direct consult.
    *   Suburbs pages push users into "Knowledge Hubs" with placeholder content (`case-study-1.html`, `faq-1.html`) instead of enquiry forms.
*   **Orphaned/Placeholder Content:** Many "Resource" links point to `guide-1.html`, `faq-1.html`, etc., which are just empty templates. This kills trust for a professional advisory service.

## 3. Technical & Navigation Issues
*   **Inconsistent Nav:** Multiple generators use different navigation templates. Mobile hamburger is missing or patched poorly on many pages.
*   **Broken Hubs:** The "Resource Hub" is currently missing or poorly linked.
*   **Generator Staleness:** Generators like `generate_all.js` and `generate_blog.js` are still producing pages with the old, flat navigation.

## 4. Proposed Solution Plan
1.  **Unified Navigation:** Deploy the `nav-master.js` template across all generators.
2.  **Fix Lead Capture:** Replace `localStorage` with a real form submission path (even if just mailto or a proper endpoint).
3.  **Optimize High-Traffic Pages:**
    *   **Registration Guide:** Add a "Download Registration Checklist" lead magnet that captures email.
    *   **Suburb Pages:** Add a "Request a Quote for Blacktown" section with a simple form.
4.  **Content Cleanup:** Replace placeholder `/guide-1` links with links to the actual Registration Guide and other high-performing content.
5.  **Regenerate & Verify:** Re-run all generators to apply fixes site-wide.

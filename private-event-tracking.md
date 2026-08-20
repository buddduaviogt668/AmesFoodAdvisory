# Ames FOOD Advisory private event tracking

AMES Food Advisory now loads `/ames-event-tracking.js` on all 316 HTML pages and uses the existing GA4 property `G-WE0FLYZLBP`. The tracker records private conversion activity only; no counters are displayed publicly.

| Event | Trigger | Useful dimensions |
|---|---|---|
| `calendly_click` | Calendly consultation links | `page_path`, `cta_text`, `destination` |
| `phone_click` | Telephone links | `page_path`, `cta_text`, `destination` |
| `email_click` | Email links | `page_path`, `cta_text`, `destination` |
| `stripe_click` | Direct Stripe booking/payment link | `page_path`, `cta_text`, `destination` |
| `form_start` | First input into an HTML form | `page_path`, `form_id` |
| `form_submit` | Form submission attempt | `page_path`, `form_id`, `form_action` |
| `form_submission` | Existing homepage Formspree request succeeds | `event_label`, `event_category` |
| `generate_lead` | Existing homepage Formspree request succeeds | `event_label`, `form_id` |

The homepage’s pre-existing Calendly, phone, email, UTM, and form-success tracking was preserved. Four pages with older inline click listeners are guarded so the shared tracker does not double-count Calendly, phone, or email events: `index.html`, `commercial-kitchen-asset-compliance.html`, `food-safety-faq-nsw.html`, and `pricing.html`.

All 316 HTML pages now contain the existing GA4 property and exactly one shared tracker reference. The tracker passes Node syntax validation and `git diff --check` passes.

## GA4 reporting

In Google Analytics, open **Admin → Data display → Events** and mark `calendly_click`, `phone_click`, `email_click`, `stripe_click`, `form_submission`, and `generate_lead` as key events. Use **Reports → Engagement → Events** and compare event names by **Page path and screen class**.

The public homepage form currently posts to `https://formspree.io/f/YOUR_FORM_ID`. The tracking records a successful `generate_lead` only when that endpoint returns a successful response, so the form endpoint should be replaced with the live Formspree endpoint before relying on form-lead counts.

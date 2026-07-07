# AEO & Schema Markup Templates

To ensure AMES Food Advisory is effectively cited by Answer Engines (like ChatGPT, Perplexity, and Google AI Overviews), we must structure our HTML logically and inject JSON-LD schema.

## 1. "Answer-First" HTML Module
Use this structure at the very top of every technical and service page.

```html
<section class="aeo-direct-answer" id="quick-answer">
  <!-- The H2 should clearly state the question users ask -->
  <h2>What are the requirements for Standard 3.2.2A in NSW?</h2>
  
  <!-- The paragraph should provide a concise, factual 2-3 sentence answer -->
  <p class="summary-answer">
    Standard 3.2.2A requires all NSW food businesses handling unpackaged, potentially hazardous, ready-to-eat food to implement three key safety tools: <strong>1) Appoint a certified Food Safety Supervisor (FSS)</strong>, <strong>2) Ensure all food handlers receive specific training</strong>, and <strong>3) Maintain records to demonstrate safe food handling practices.</strong>
  </p>
</section>
```

## 2. FAQ Schema (JSON-LD)
Inject this schema block in the `<head>` of your pages. Ensure the questions and answers exactly match the text on the page.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much does a food safety audit cost in Sydney?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The cost of a food safety audit in Sydney typically ranges from $500 to $1,500 depending on the size of the facility and the type of audit required (e.g., local council vs. third-party regulatory). AMES offers transparent baseline packages starting at $600."
    }
  }, {
    "@type": "Question",
    "name": "Do I need a Food Safety Supervisor for my Sydney cafe?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Under NSW Food Authority Standard 3.2.2A, any cafe handling unpackaged, ready-to-eat, potentially hazardous food must appoint at least one certified Food Safety Supervisor who is reasonably available during operating hours."
    }
  }]
}
</script>
```

## 3. Local Business Schema
Place this on your homepage and Contact page to solidify your Entity presence in Sydney.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AMES Food Advisory",
  "image": "https://www.yourwebsite.com/logo.jpg",
  "@id": "https://www.yourwebsite.com",
  "url": "https://www.yourwebsite.com",
  "telephone": "+61 2 0000 0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street",
    "addressLocality": "Sydney",
    "addressRegion": "NSW",
    "postalCode": "2000",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -33.8688,
    "longitude": 151.2093
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  },
  "priceRange": "$$" 
}
</script>
```

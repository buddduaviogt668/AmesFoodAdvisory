(function () {
  'use strict';
  if (window.__amesEventTrackingLoaded) return;
  window.__amesEventTrackingLoaded = true;

  var legacyClickTracking = !!window.__amesLegacyConversionTracking;

  function sendEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href
    }, params || {}));
  }

  function textOf(element) {
    return (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  }

  function classifyLink(link) {
    var href = (link.getAttribute('href') || '').toLowerCase();
    var customEvent = link.getAttribute('data-ames-event');
    if (customEvent) return { name: customEvent, type: 'page_specific' };
    if (href.indexOf('stripe.com') !== -1) return { name: 'stripe_click', type: 'payment' };
    if (legacyClickTracking) return null;
    if (href.indexOf('calendly.com') !== -1) return { name: 'calendly_click', type: 'booking' };
    if (href.indexOf('tel:') === 0) return { name: 'phone_click', type: 'phone' };
    if (href.indexOf('mailto:') === 0) return { name: 'email_click', type: 'email' };
    return null;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('a') : null;
    if (!link) return;
    var classified = classifyLink(link);
    if (!classified) return;
    sendEvent(classified.name, {
      event_category: 'conversion',
      event_label: window.location.pathname,
      cta_type: classified.type,
      cta_text: textOf(link),
      destination: link.getAttribute('href') || ''
    });
  }, true);

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || form.tagName !== 'FORM') return;
    sendEvent('form_submit', {
      event_category: 'conversion',
      form_id: form.id || 'unidentified_form',
      form_action: form.getAttribute('action') || window.location.pathname
    });
  }, true);

  document.addEventListener('input', function (event) {
    var form = event.target && event.target.form;
    if (!form || form.dataset.amesFormStarted) return;
    form.dataset.amesFormStarted = 'true';
    sendEvent('form_start', {
      event_category: 'conversion',
      form_id: form.id || 'unidentified_form'
    });
  }, true);
})();

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

/* --- $295 + GST booking pop-up (shown site-wide after a delay) --- */
(function () {
  'use strict';
  if (window.__amesBookingPopupLoaded) return;
  window.__amesBookingPopupLoaded = true;

  var STRIPE_LINK = 'https://buy.stripe.com/3cIcN492hbYf89f6A6gIo05';
  var WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  var DELAY_MS = 8000;
  var SEEN_KEY = 'ames_booking_popup_seen';

  var path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
  var excluded = ['/book-your-session', '/pricing', '/contact'];
  if (excluded.indexOf(path) !== -1) return;

  function popupEvent(name) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      event_category: 'conversion',
      page_path: path,
      popup: 'booking_popup'
    });
  }

  function isSuppressed() {
    try {
      var seen = parseInt(localStorage.getItem(SEEN_KEY) || '0', 10);
      if (seen && (Date.now() - seen) < WEEK_MS) return true;
    } catch (e) {}
    return false;
  }

  function suppress() {
    try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch (e) {}
  }

  function addStyles() {
    if (document.getElementById('ames-popup-css')) return;
    var style = document.createElement('style');
    style.id = 'ames-popup-css';
    style.textContent = [
      '#ames-popup-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(10,25,45,.55);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;font-family:Arial,Helvetica,sans-serif}',
      '#ames-popup-overlay.is-open{opacity:1;visibility:visible}',
      '#ames-popup-card{position:relative;max-width:430px;width:100%;background:#fff;border-radius:14px;box-shadow:0 25px 60px rgba(5,15,30,.35);padding:1.6rem 1.7rem 1.7rem;transform:translateY(16px);transition:transform .35s cubic-bezier(.22,1,.36,1)}',
      '#ames-popup-overlay.is-open #ames-popup-card{transform:none}',
      '#ames-popup-close{position:absolute;top:.55rem;right:.7rem;background:none;border:0;font-size:1.45rem;line-height:1;color:#95a3b3;cursor:pointer;padding:.2rem}',
      '#ames-popup-close:hover{color:#0f2740}',
      '#ames-popup-kicker{display:inline-block;font-size:.68rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#d97a1a;margin-bottom:.55rem}',
      '#ames-popup-title{margin:0 0 .6rem;font-family:Georgia,\'Times New Roman\',serif;font-size:1.28rem;line-height:1.3;color:#0f2740}',
      '#ames-popup-copy{margin:0 0 1.2rem;font-size:.9rem;line-height:1.6;color:#4b5a6a}',
      '#ames-popup-cta{display:block;text-align:center;background:#d97a1a;color:#fff;text-decoration:none;font-weight:700;font-size:.95rem;padding:.95rem 1rem;border-radius:8px;transition:background .2s}',
      '#ames-popup-cta:hover{background:#c2680f}',
      '#ames-popup-note{display:block;text-align:center;margin-top:.7rem;font-size:.8rem;color:#7b8997}',
      '#ames-popup-note a{color:#0f2740;font-weight:600}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function openPopup() {
    if (isSuppressed()) return;
    addStyles();

    var overlay = document.createElement('div');
    overlay.id = 'ames-popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'ames-popup-title');

    var card = document.createElement('div');
    card.id = 'ames-popup-card';
    card.innerHTML =
      '<button type="button" id="ames-popup-close" aria-label="Close">\u00d7</button>' +
      '<span id="ames-popup-kicker">Ames Food Advisory</span>' +
      '<h3 id="ames-popup-title">Book the $295 + GST Compliance Scoping Session</h3>' +
      '<p id="ames-popup-copy">45 focused minutes with a NSW food-safety specialist, plus written follow-up. We map exactly what your business needs.</p>' +
      '<a id="ames-popup-cta" href="' + STRIPE_LINK + '" target="_blank" rel="noopener">Book my session &mdash; $295 + GST</a>' +
      '<span id="ames-popup-note"><a id="ames-popup-more" href="/what-are-my-options">See what\'s included</a></span>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 320);
      suppress();
      popupEvent('popup_dismissed');
    }

    var closeBtn = card.querySelector('#ames-popup-close');
    var cta = card.querySelector('#ames-popup-cta');
    var more = card.querySelector('#ames-popup-more');

    cta.addEventListener('click', function () { suppress(); popupEvent('popup_cta_click'); });
    more.addEventListener('click', function () { suppress(); });
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', onKey);
      }
    });

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    });
    closeBtn.focus();
    popupEvent('popup_shown');
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  whenReady(function () {
    setTimeout(openPopup, DELAY_MS);
  });
})();

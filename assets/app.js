/* BecaWell Reviews — Client-Side BFF v1.0 */
/* UTM strategy detection + UX enhancements */

(function() {
  'use strict';

  // ── Strategy Detection ────────────────────────────────────────────────
  var UTM = (function() {
    var params = new URLSearchParams(window.location.search);
    return {
      source:   params.get('utm_source')   || '',
      medium:   params.get('utm_medium')   || '',
      campaign: params.get('utm_campaign') || '',
      content:  params.get('utm_content')  || ''
    };
  })();

  function detectChannel() {
    var src = UTM.source.toLowerCase();
    var med = UTM.medium.toLowerCase();
    if (src === 'pinterest' || med === 'social_pin') return 'pinterest';
    if (src === 'tiktok' || src === 'tt') return 'tiktok';
    if (src === 'reddit') return 'reddit';
    if (src === 'email' || med === 'email') return 'email';
    if (med === 'organic' || med === 'seo' || med === '') return 'seo';
    return 'seo';
  }

  var CHANNEL = detectChannel();

  // ── Channel Strategy Config ───────────────────────────────────────────
  var STRATEGIES = {
    pinterest: {
      ctaDensity: 'high',    // show sticky + inline CTAs
      contentTone: 'visual', // image-first, scannable
      ctaPosition: 'top',    // CTA high on page
      socialProof: true
    },
    tiktok: {
      ctaDensity: 'high',
      contentTone: 'urgent',
      ctaPosition: 'top',
      socialProof: true
    },
    seo: {
      ctaDensity: 'medium',
      contentTone: 'informational',
      ctaPosition: 'natural',
      socialProof: false
    },
    email: {
      ctaDensity: 'low',
      contentTone: 'personal',
      ctaPosition: 'bottom',
      socialProof: false
    },
    reddit: {
      ctaDensity: 'low',
      contentTone: 'skeptical',
      ctaPosition: 'natural',
      socialProof: false
    }
  };

  var strategy = STRATEGIES[CHANNEL] || STRATEGIES.seo;

  // ── Apply Strategy ────────────────────────────────────────────────────
  function applyStrategy() {
    document.documentElement.setAttribute('data-channel', CHANNEL);

    // High-density channels: show sticky CTA earlier
    if (strategy.ctaDensity === 'high') {
      var sticky = document.querySelector('.sticky-cta');
      if (sticky) sticky.style.display = 'block';
    }

    // Pinterest: make first CTA more prominent
    if (CHANNEL === 'pinterest') {
      var firstCta = document.querySelector('.cta-primary');
      if (firstCta && !firstCta.dataset.boosted) {
        firstCta.style.fontSize = '1.1rem';
        firstCta.style.padding = '18px 32px';
        firstCta.dataset.boosted = '1';
      }
    }
  }

  // ── Sticky CTA Scroll Behavior ────────────────────────────────────────
  function initStickyCta() {
    var sticky = document.querySelector('.sticky-cta');
    if (!sticky) return;

    var lastScroll = 0;
    var threshold = 300; // px from top before showing

    window.addEventListener('scroll', function() {
      var scrollY = window.pageYOffset;
      // Show after threshold, hide if near top
      if (scrollY > threshold) {
        sticky.style.display = 'block';
      } else {
        sticky.style.display = 'none';
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ── FAQ Accordion ─────────────────────────────────────────────────────
  // Native <details> works without JS, this just adds analytics tracking
  function initFaq() {
    document.querySelectorAll('.faq details').forEach(function(el) {
      el.addEventListener('toggle', function() {
        if (el.open) {
          trackEvent('faq_open', { question: el.querySelector('summary').textContent.trim().slice(0, 60) });
        }
      });
    });
  }

  // ── Score Bar Animation ───────────────────────────────────────────────
  function initScoreBars() {
    var bars = document.querySelectorAll('.score-fill[data-score]');
    if (!bars.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var score = parseFloat(el.dataset.score) || 0;
          el.style.width = score + '%';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function(bar) {
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }

  // ── Lazy Images ───────────────────────────────────────────────────────
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;
    var imgs = document.querySelectorAll('img[data-src]');
    if (!imgs.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    imgs.forEach(function(img) { observer.observe(img); });
  }

  // ── CTA Tracking ──────────────────────────────────────────────────────
  function initCtaTracking() {
    document.querySelectorAll('.cta-primary, .cta-secondary, .sticky-cta a').forEach(function(el) {
      el.addEventListener('click', function() {
        trackEvent('cta_click', {
          text: el.textContent.trim().slice(0, 40),
          channel: CHANNEL,
          href: el.href
        });
      });
    });
  }

  // ── Analytics Stub ────────────────────────────────────────────────────
  function trackEvent(name, data) {
    // Plumbing for future analytics — no external calls
    try {
      var events = JSON.parse(sessionStorage.getItem('bw_events') || '[]');
      events.push({ name: name, data: data, ts: Date.now() });
      if (events.length > 50) events = events.slice(-50);
      sessionStorage.setItem('bw_events', JSON.stringify(events));
    } catch (e) { /* quota exceeded — silent fail */ }
  }

  // ── UTM Passthrough on internal links ─────────────────────────────────
  function initUtmPassthrough() {
    if (!UTM.source) return;
    var utmStr = '?utm_source=' + encodeURIComponent(UTM.source) +
                 '&utm_medium=' + encodeURIComponent(UTM.medium) +
                 '&utm_campaign=' + encodeURIComponent(UTM.campaign);

    document.querySelectorAll('a[href]').forEach(function(link) {
      var href = link.getAttribute('href');
      // Only internal links (relative or same domain)
      if (href && href.indexOf('http') === -1 && href.indexOf('#') !== 0) {
        if (href.indexOf('?') === -1) {
          link.href = href + utmStr;
        }
      }
    });
  }

  // ── Star display ──────────────────────────────────────────────────────
  function renderStars(val) {
    var full  = Math.floor(val);
    var half  = (val - full) >= 0.3 ? 1 : 0;
    var empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  function initStarDisplay() {
    document.querySelectorAll('[data-stars]').forEach(function(el) {
      var val = parseFloat(el.dataset.stars) || 0;
      el.textContent = renderStars(val);
    });
  }

  // ── Product Hydration — live data from BFF products.json ─────────────
  // Fetches the latest score/tier/hoplink for the current page's product
  // and updates [data-slot] elements. This means CFO score updates propagate
  // to pages without requiring a full page rebuild.
  function initProductHydration() {
    var slug = document.body.dataset.product;
    if (!slug) return; // non-product page (index, collection) — skip

    var DATA_URL = 'https://becabotinha-boop.github.io/becawell-reviews/data/products.json';

    fetch(DATA_URL, { cache: 'no-cache' })
      .then(function(r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function(data) {
        var products = (data && data.products) || [];
        var p = null;
        for (var i = 0; i < products.length; i++) {
          if (products[i].slug === slug) { p = products[i]; break; }
        }
        if (!p) return;

        // Live score — update text + bar width
        document.querySelectorAll('[data-slot="score"]').forEach(function(el) {
          el.textContent = p.score;
        });
        document.querySelectorAll('.score-fill').forEach(function(el) {
          el.dataset.score = p.score;
          el.style.width   = p.score + '%';
        });

        // Live tier badge
        var tierCls = { A: 'badge--a', B: 'badge--b', C: 'badge--c' }[p.tier] || 'badge--b';
        document.querySelectorAll('[data-slot="tier"]').forEach(function(el) {
          el.className   = 'badge ' + tierCls;
          el.textContent = 'Tier ' + p.tier;
        });

        // Live hoplinks — append UTM if channel known
        var utmTail = CHANNEL && CHANNEL !== 'seo'
          ? ('&utm_source=' + encodeURIComponent(CHANNEL) + '&utm_medium=organic')
          : '';
        document.querySelectorAll('[data-slot="hoplink"]').forEach(function(el) {
          el.href = p.hoplink + utmTail;
        });

        trackEvent('product_hydrated', { slug: slug, score: p.score, tier: p.tier });
      })
      .catch(function() { /* degrade gracefully — static HTML still works */ });
  }

  // ── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    applyStrategy();
    initStickyCta();
    initFaq();
    initScoreBars();
    initLazyImages();
    initCtaTracking();
    initUtmPassthrough();
    initStarDisplay();
    initProductHydration(); // must come after initScoreBars (will re-animate if needed)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Expose minimal public API
  window.BFF = { channel: CHANNEL, strategy: strategy, track: trackEvent };

})();

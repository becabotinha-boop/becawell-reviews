"use strict";
(() => {
    "use strict";
    const windowWithBff = window;
    const params = new URLSearchParams(window.location.search);
    const UTM = {
        source: params.get("utm_source") ?? "",
        medium: params.get("utm_medium") ?? "",
        campaign: params.get("utm_campaign") ?? "",
        content: params.get("utm_content") ?? "",
    };
    function detectChannel() {
        const src = UTM.source.toLowerCase();
        const med = UTM.medium.toLowerCase();
        if (src === "pinterest" || med === "social_pin")
            return "pinterest";
        if (src === "tiktok" || src === "tt")
            return "tiktok";
        if (src === "reddit")
            return "reddit";
        if (src === "email" || med === "email")
            return "email";
        return "seo";
    }
    const CHANNEL = detectChannel();
    const STRATEGIES = {
        pinterest: { ctaDensity: "high", contentTone: "visual", ctaPosition: "top", socialProof: true },
        tiktok: { ctaDensity: "high", contentTone: "urgent", ctaPosition: "top", socialProof: true },
        reddit: { ctaDensity: "low", contentTone: "skeptical", ctaPosition: "natural", socialProof: false },
        email: { ctaDensity: "low", contentTone: "personal", ctaPosition: "bottom", socialProof: false },
        seo: { ctaDensity: "medium", contentTone: "informational", ctaPosition: "natural", socialProof: false },
    };
    const strategy = STRATEGIES[CHANNEL];
    function queryAll(selector) {
        return Array.from(document.querySelectorAll(selector));
    }
    function trackEvent(name, data) {
        try {
            const raw = sessionStorage.getItem("bw_events") ?? "[]";
            const events = JSON.parse(raw);
            events.push({ name, data, ts: Date.now() });
            sessionStorage.setItem("bw_events", JSON.stringify(events.slice(-50)));
        }
        catch {
            // ignore storage/parse failures
        }
    }
    function applyStrategy() {
        document.documentElement.setAttribute("data-channel", CHANNEL);
        if (strategy.ctaDensity === "high") {
            const sticky = document.querySelector(".sticky-cta");
            if (sticky)
                sticky.style.display = "block";
        }
        if (CHANNEL === "pinterest") {
            const firstCta = document.querySelector(".cta-primary");
            if (firstCta && firstCta.dataset.boosted !== "1") {
                firstCta.style.fontSize = "1.1rem";
                firstCta.style.padding = "18px 32px";
                firstCta.dataset.boosted = "1";
            }
        }
    }
    function initStickyCta() {
        const sticky = document.querySelector(".sticky-cta");
        if (!sticky)
            return;
        window.addEventListener("scroll", () => {
            sticky.style.display = window.pageYOffset > 300 ? "block" : "none";
        }, { passive: true });
    }
    function initFaq() {
        queryAll(".faq details").forEach((el) => {
            el.addEventListener("toggle", () => {
                const summary = el.querySelector("summary");
                if (el.open && summary?.textContent) {
                    trackEvent("faq_open", { question: summary.textContent.trim().slice(0, 60) });
                }
            });
        });
    }
    function initScoreBars() {
        const bars = queryAll(".score-fill[data-score]");
        if (!bars.length || !("IntersectionObserver" in window))
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting)
                    return;
                const el = entry.target;
                const score = Number.parseFloat(el.dataset.score ?? "0") || 0;
                el.style.width = `${score}%`;
                observer.unobserve(el);
            });
        }, { threshold: 0.3 });
        bars.forEach((bar) => {
            bar.style.width = "0%";
            observer.observe(bar);
        });
    }
    function initLazyImages() {
        if (!("IntersectionObserver" in window))
            return;
        const images = queryAll("img[data-src]");
        if (!images.length)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting)
                    return;
                const img = entry.target;
                const src = img.dataset.src;
                if (src) {
                    img.src = src;
                    img.removeAttribute("data-src");
                }
                observer.unobserve(img);
            });
        }, { rootMargin: "200px" });
        images.forEach((img) => observer.observe(img));
    }
    function initCtaTracking() {
        queryAll(".cta-primary, .cta-secondary, .sticky-cta a").forEach((el) => {
            el.addEventListener("click", () => {
                trackEvent("cta_click", {
                    text: el.textContent?.trim().slice(0, 40) ?? "",
                    channel: CHANNEL,
                    href: el.href,
                });
            });
        });
    }
    function initUtmPassthrough() {
        if (!UTM.source)
            return;
        const utmString = `?utm_source=${encodeURIComponent(UTM.source)}` +
            `&utm_medium=${encodeURIComponent(UTM.medium)}` +
            `&utm_campaign=${encodeURIComponent(UTM.campaign)}`;
        queryAll("a[href]").forEach((link) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("http") && !href.startsWith("#") && !href.includes("?")) {
                link.href = href + utmString;
            }
        });
    }
    function renderStars(value) {
        const full = Math.floor(value);
        const half = value - full >= 0.3 ? 1 : 0;
        const empty = 5 - full - half;
        return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
    }
    function initStarDisplay() {
        queryAll("[data-stars]").forEach((el) => {
            const value = Number.parseFloat(el.dataset.stars ?? "0") || 0;
            el.textContent = renderStars(value);
        });
    }
    async function initProductHydration() {
        const slug = document.body.dataset.product;
        if (!slug)
            return;
        const dataUrl = "https://becabotinha-boop.github.io/becawell-reviews/data/products.json";
        try {
            const response = await fetch(dataUrl, { cache: "no-cache" });
            if (!response.ok)
                return;
            const data = (await response.json());
            const product = (data.products ?? []).find((item) => item.slug === slug);
            if (!product)
                return;
            queryAll('[data-slot="score"]').forEach((el) => {
                el.textContent = String(product.score ?? "");
            });
            queryAll(".score-fill").forEach((el) => {
                const score = String(product.score ?? "");
                el.dataset.score = score;
                el.style.width = `${score}%`;
            });
            const tierClass = { A: "badge--a", B: "badge--b", C: "badge--c" }[product.tier ?? ""] ?? "badge--b";
            queryAll('[data-slot="tier"]').forEach((el) => {
                el.className = `badge ${tierClass}`;
                el.textContent = `Tier ${product.tier ?? "B"}`;
            });
            const utmTail = CHANNEL !== "seo"
                ? `&utm_source=${encodeURIComponent(CHANNEL)}&utm_medium=organic`
                : "";
            queryAll('[data-slot="hoplink"]').forEach((el) => {
                if (product.hoplink)
                    el.href = `${product.hoplink}${utmTail}`;
            });
            trackEvent("product_hydrated", {
                slug,
                score: product.score ?? null,
                tier: product.tier ?? null,
            });
        }
        catch {
            // degrade gracefully; static HTML still works
        }
    }
    function boot() {
        applyStrategy();
        initStickyCta();
        initFaq();
        initScoreBars();
        initLazyImages();
        initCtaTracking();
        initUtmPassthrough();
        initStarDisplay();
        void initProductHydration();
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    }
    else {
        boot();
    }
    windowWithBff.BFF = { channel: CHANNEL, strategy, track: trackEvent };
})();

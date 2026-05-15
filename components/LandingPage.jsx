'use client';

import { useEffect } from 'react';
import { urlFor } from '../lib/sanity';

export default function LandingPage({ data }) {
  useEffect(() => {
    // GSAP is loaded via Next.js Script in layout.js — poll until available
    const wait = () => {
      if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        return setTimeout(wait, 50);
      }
      window.gsap.registerPlugin(window.ScrollTrigger);
      initAll();
    };
    wait();

    function initAll() {
      initReveals();
      initNav();
      initLightboxes();
      initFunnel();
      initConcepts();
      initBars();
      initCountUp();
      initChat();
      initInbox();
      initForm();
      initPopup();
    }

    function initReveals() {
      window.gsap.utils.toArray('.gs-reveal').forEach(el => {
        window.gsap.fromTo(el, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });
    }

    function initNav() {
      const nav = document.getElementById('mainNav');
      const fc = document.getElementById('floatCta');
      const pr = document.getElementById('pricing');
      let lastY = window.scrollY, sup = false;
      document.getElementById('navCtaBtn').addEventListener('click', () => { sup = true; });
      window.addEventListener('scroll', () => {
        const y = window.scrollY, d = y > lastY + 2, u = y < lastY - 2;
        const ap = pr.getBoundingClientRect().top < window.innerHeight * 0.85 && pr.getBoundingClientRect().bottom > 0;
        if (ap) sup = false;
        if (y <= 200) { nav.classList.remove('is-hidden'); fc.classList.remove('is-visible'); }
        else if (d) { nav.classList.add('is-hidden'); if (!ap && !sup) fc.classList.add('is-visible'); else fc.classList.remove('is-visible'); }
        else if (u) { nav.classList.remove('is-hidden'); fc.classList.remove('is-visible'); }
        if (ap) fc.classList.remove('is-visible');
        lastY = y;
      }, { passive: true });
    }

    function initLightboxes() {
      setupLB('heroPlayBtn', 'heroLightbox', 'heroLightboxClose', 'heroVideoSlot', '/assets/hero-video.mp4', '/assets/hero-poster.jpg');
      setupLB('reviewsPlayBtn', 'reviewsLightbox', 'reviewsLightboxClose', 'reviewsVideoSlot', '/assets/reviews-video.mp4', '/assets/reviews-poster.jpg');
    }

    function setupLB(bi, li, ci, si, vs, ps) {
      const b = document.getElementById(bi), l = document.getElementById(li), c = document.getElementById(ci), s = document.getElementById(si);
      if (!b || !l) return;
      const op = () => {
        l.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        s.innerHTML = '<video style="width:100%;height:100%;display:block;object-fit:cover" autoplay controls playsinline poster="' + ps + '"><source src="' + vs + '" type="video/mp4"></video>';
      };
      const cl = () => {
        l.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { s.innerHTML = ''; }, 360);
      };
      b.addEventListener('click', op);
      c.addEventListener('click', cl);
      l.addEventListener('click', e => { if (e.target === l) cl(); });
      window.addEventListener('keydown', e => { if (e.key === 'Escape' && l.classList.contains('is-open')) cl(); });
    }

    function initFunnel() {
      const wrap = document.querySelector('.funnel-steps');
      const steps = window.gsap.utils.toArray('.funnel-step');
      const arrows = window.gsap.utils.toArray('.funnel-arrow');
      if (!wrap) return;
      window.ScrollTrigger.create({
        trigger: wrap, start: 'top 80%', once: true, onEnter: () => {
          window.gsap.to(steps, {
            opacity: 1, y: 0, duration: 1, ease: 'power2.out',
            stagger: {
              each: 0.3, onStart: function () {
                const s = this.targets()[0];
                s.classList.add('is-entered');
                const bg = s.querySelector('.funnel-step-bg');
                const ov = s.querySelector('.funnel-step-overlay');
                if (bg) bg.style.display = 'block';
                if (ov) ov.style.display = 'block';
              }
            },
            onComplete: () => { arrows.forEach(a => a.classList.add('is-visible')); }
          });
        }
      });
    }

    function initConcepts() {
      const st = document.getElementById('conceptStack');
      if (!st) return;
      const cs = st.querySelectorAll('.concept-circle');
      const r = document.getElementById('conceptResult');
      const g = document.getElementById('conceptGreenDot');
      const ts = [0.2, 0.35, 0.5];
      window.ScrollTrigger.create({
        trigger: st, start: 'top 85%', end: 'top 25%', onUpdate: self => {
          const p = self.progress;
          cs.forEach((c, i) => { if (p >= ts[i]) c.classList.add('is-on'); });
          if (p >= 0.65) { r.classList.add('is-on'); g.classList.add('is-on'); }
        }
      });
    }

    function initBars() {
      const c = document.getElementById('cvCard');
      if (!c) return;
      let done = false;
      window.ScrollTrigger.create({
        trigger: c, start: 'top 70%', once: true, onEnter: () => {
          if (done) return;
          done = true;
          c.querySelectorAll('.cv-bar-fill').forEach((b, i) => {
            window.gsap.to(b, { width: b.dataset.width + '%', duration: 1.1, delay: i * 0.12, ease: 'power2.out' });
          });
          c.querySelectorAll('.cv-bar-rate').forEach((el, i) => {
            const t = parseFloat(el.dataset.rate);
            window.gsap.to({ v: 0 }, {
              v: t, duration: 1.1, delay: i * 0.12, ease: 'power2.out',
              onUpdate: function () { el.textContent = this.targets()[0].v.toFixed(1) + '%'; }
            });
          });
        }
      });
    }

    function initCountUp() {
      document.querySelectorAll('[data-count]').forEach(el => {
        const t = +el.dataset.count;
        const suf = t === 9 ? ' figures' : '';
        window.ScrollTrigger.create({
          trigger: el, start: 'top 80%', once: true, onEnter: () => {
            window.gsap.to({ v: 0 }, {
              v: t, duration: 1.1, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.floor(this.targets()[0].v).toLocaleString() + suf; }
            });
          }
        });
      });
    }

    function initChat() {
      const m = document.getElementById('phoneMock');
      if (!m) return;
      const sc = [{ d: 400, b: 1 }, { d: 1100, b: 2 }, { d: 1200, b: 3, h: 2 }, { d: 800, b: 4 }, { d: 1100, b: 5 }, { d: 900, b: 6, h: 5 }];
      window.ScrollTrigger.create({
        trigger: m, start: 'top 60%', once: true, onEnter: () => {
          let i = 0;
          const tick = () => {
            if (i >= sc.length) return;
            const s = sc[i];
            setTimeout(() => {
              const el = m.querySelector('[data-bubble="' + s.b + '"]');
              if (el) el.classList.add('is-visible');
              if (s.h) {
                const h = m.querySelector('[data-bubble="' + s.h + '"]');
                if (h) h.classList.remove('is-visible');
              }
              i++;
              tick();
            }, s.d);
          };
          tick();
        }
      });
    }

    function initInbox() {
      const f = document.getElementById('inboxFrame');
      if (!f) return;
      window.ScrollTrigger.create({
        trigger: f, start: 'top 60%', once: true, onEnter: () => {
          const fr = document.getElementById('inboxFirstRow');
          setTimeout(() => {
            fr.style.opacity = '1';
            fr.style.transform = 'translateY(0)';
            fr.style.transition = 'transform 600ms cubic-bezier(0.16,1.2,0.3,1),opacity 480ms cubic-bezier(0.2,0.7,0.2,1)';
          }, 350);
          setTimeout(() => {
            document.getElementById('inboxNewRow').style.maxHeight = '72px';
            fr.style.background = 'transparent';
            document.getElementById('firstRowDot').style.display = 'none';
            document.getElementById('inboxCount').textContent = '285';
            document.getElementById('inboxHotCount').textContent = '13';
          }, 3200);
        }
      });
    }

    /* Multi-step pricing form */
    function initForm() {
      var card = document.getElementById('pfCard');
      var body = document.getElementById('pfBody');
      var topBar = document.getElementById('pfTopBar');
      var pillFill = document.getElementById('stepPillFill');
      var foot = document.getElementById('pfFoot');
      var backBtn = document.getElementById('pfBack');
      var thankYou = document.getElementById('thankYou');
      if (!card || !body) return;

      var step = 0, formData = { role: '', weakness: '', size: '', company: '', name: '', email: '', phone: '' };
      var TOP_PCT = [25, 50, 70, 82, 95];
      var total = 5;

      var choiceSteps = [
        {
          q: 'What describes what you do best?',
          hint: 'Pick the one that lands closest. We\u2019ll tailor pricing to it.',
          key: 'role',
          opts: [
            { label: 'Sell services', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a3 3 0 0 1 3-3h4l3 3h9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z"/><path d="M11 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>' },
            { label: 'Sell high-ticket products', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>' },
            { label: 'A bit of both', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="16" r="7"/><circle cx="21" cy="16" r="7"/></svg>' }
          ]
        },
        {
          q: 'Where would you say you\u2019re weakest?',
          hint: 'Honest answer beats the polished one \u2014 it\u2019s what we\u2019ll fix first.',
          key: 'weakness',
          opts: [
            { label: 'Automation &amp; AI systems', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="16" height="16" rx="3"/><path d="M14 14h4v4h-4z"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M8 8 5 5M27 5l-3 3M5 27l3-3M27 27l-3-3"/></svg>' },
            { label: 'Getting results from paid ads', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>' },
            { label: 'High-converting funnels', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6h22l-9 11v9l-4-2v-7z"/></svg>' },
            { label: 'All of the above', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="9" height="9" rx="2"/><rect x="18" y="5" width="9" height="9" rx="2"/><rect x="5" y="18" width="9" height="9" rx="2"/><rect x="18" y="18" width="9" height="9" rx="2"/></svg>' }
          ]
        },
        {
          q: 'Ballpark, how many people work at your company?',
          hint: 'We price by complexity, not seats. This sets expectations.',
          key: 'size',
          opts: [
            { label: '1\u201310 people', icon: '<svg width="32" height="32" viewBox="-16 -16 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="0" cy="-5" r="3"/><path d="M-5 6c0-3 2.2-5 5-5s5 2 5 5"/></svg>' },
            { label: '11\u201330', icon: '<svg width="32" height="32" viewBox="-16 -16 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-5 0)"><circle cx="0" cy="-5" r="3"/><path d="M-5 6c0-3 2.2-5 5-5s5 2 5 5"/></g><g transform="translate(5 0)"><circle cx="0" cy="-5" r="3"/><path d="M-5 6c0-3 2.2-5 5-5s5 2 5 5"/></g></svg>' },
            { label: '31\u2013100', icon: '<svg width="32" height="32" viewBox="-16 -16 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-8 0)"><circle cx="0" cy="-5" r="3"/><path d="M-5 6c0-3 2.2-5 5-5s5 2 5 5"/></g><g transform="translate(0 0)"><circle cx="0" cy="-5" r="3"/><path d="M-5 6c0-3 2.2-5 5-5s5 2 5 5"/></g><g transform="translate(8 0)"><circle cx="0" cy="-5" r="3"/><path d="M-5 6c0-3 2.2-5 5-5s5 2 5 5"/></g></svg>' },
            { label: '100\u2013250', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="7" width="20" height="19" rx="1"/><path d="M10 12h2M14 12h2M18 12h2M22 12h2M10 16h2M14 16h2M18 16h2M22 16h2M14 21h4v5"/></svg>' },
            { label: '250+', icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="10" height="15" rx="1"/><rect x="15" y="5" width="14" height="21" rx="1"/><path d="M6 15h4M6 19h4M6 23h4M18 9h2M22 9h2M18 13h2M22 13h2M18 17h2M22 17h2M18 21h2M22 21h2"/></svg>' }
          ]
        }
      ];

      function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

      function updateChrome() {
        var cur = Math.min(step, total - 1);
        var fillPct = step >= total ? 100 : ((cur + 1) / total) * 100;
        var topPct = step >= total ? 100 : TOP_PCT[cur];
        topBar.style.width = topPct + '%';
        var cp = 'inset(0 ' + (100 - fillPct) + '% 0 0 round 999px)';
        pillFill.style.clipPath = cp;
        pillFill.style.WebkitClipPath = cp;
        foot.style.display = step > 0 ? 'flex' : 'none';
      }

      function renderBody() {
        if (step >= total) { renderThankYou(); return; }
        updateChrome();
        var h = '';
        if (step < 3) {
          var s = choiceSteps[step];
          h += '<h3 class="pf-step-q">' + s.q + '</h3>';
          h += '<p class="pf-step-hint">' + s.hint + '</p>';
          h += '<div class="choice-grid" style="grid-template-columns:repeat(' + s.opts.length + ',1fr)">';
          s.opts.forEach(function (o) {
            var active = formData[s.key] === o.label;
            h += '<button class="choice-card' + (active ? ' is-active' : '') + '" data-val="' + esc(o.label) + '">';
            h += '<div class="choice-body">';
            h += '<div class="choice-icon">' + o.icon + '</div>';
            h += '<span class="choice-label">' + o.label + '</span>';
            h += '</div>';
            h += '<div class="choice-select">Select</div>';
            h += '</button>';
          });
          h += '</div>';
        } else if (step === 3) {
          h += '<h3 class="pf-step-q">Tell us who you are.</h3>';
          h += '<p class="pf-step-hint">So we know what to say when we email you back.</p>';
          h += '<div class="pf-field-grid">';
          h += '<label class="pf-field"><span class="pf-field-label">Company name</span><input type="text" placeholder="Quooker UK" value="' + esc(formData.company) + '" data-key="company" class="pf-input"></label>';
          h += '<label class="pf-field"><span class="pf-field-label">What should we call you?</span><input type="text" placeholder="Stephen" value="' + esc(formData.name) + '" data-key="name" class="pf-input"></label>';
          h += '</div>';
          var ok3 = formData.company && formData.name;
          h += '<div class="pf-next-row"><button class="pf-next" ' + (ok3 ? '' : 'disabled') + '>Continue \u2192</button></div>';
        } else if (step === 4) {
          h += '<h3 class="pf-step-q">Where shall we send byFriday\u2019s pricing?</h3>';
          h += '<p class="pf-step-hint">We will send you our pricing to your email and Whatsapp. <b>We will not call you!</b></p>';
          h += '<div class="pf-field-grid">';
          h += '<label class="pf-field"><span class="pf-field-label">Work email</span><input type="email" placeholder="stephen@quooker.co.uk" value="' + esc(formData.email) + '" data-key="email" class="pf-input"></label>';
          h += '<label class="pf-field"><span class="pf-field-label">Phone number</span><input type="tel" placeholder="+44 7700 900123" value="' + esc(formData.phone) + '" data-key="phone" class="pf-input"></label>';
          h += '</div>';
          var ok4 = formData.email.indexOf('@') > -1 && formData.phone.length >= 7;
          h += '<div class="pf-next-row"><button class="pf-next pf-submit" ' + (ok4 ? '' : 'disabled') + '>Send me byFriday\u2019s pricing \u2192</button></div>';
          h += '<p class="pf-fine">By submitting you agree to receive a follow-up from Friday \u2014 usually within the hour.</p>';
        }
        body.innerHTML = h;
        bindEvents();
        window.gsap.fromTo(body, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' });
      }

      function bindEvents() {
        body.querySelectorAll('.choice-card').forEach(function (c) {
          c.addEventListener('click', function () {
            var key = choiceSteps[step].key;
            formData[key] = c.dataset.val;
            window.gsap.to(body, { opacity: 0, y: -12, duration: 0.22, ease: 'power2.in', onComplete: function () { step++; renderBody(); } });
          });
        });
        body.querySelectorAll('.pf-input').forEach(function (inp) {
          inp.addEventListener('input', function () {
            formData[inp.dataset.key] = inp.value;
            var btn = body.querySelector('.pf-next');
            if (!btn) return;
            var ok = step === 3 ? (formData.company && formData.name) : (formData.email.indexOf('@') > -1 && formData.phone.length >= 7);
            btn.disabled = !ok;
          });
        });
        var nb = body.querySelector('.pf-next:not(.pf-submit)');
        if (nb) nb.addEventListener('click', function () { window.gsap.to(body, { opacity: 0, y: -12, duration: 0.22, ease: 'power2.in', onComplete: function () { step++; renderBody(); } }); });
        var sb = body.querySelector('.pf-submit');
        if (sb) sb.addEventListener('click', function () {
          sb.disabled = true; sb.textContent = 'Sending\u2026';
          submitToGHL(function () { step++; renderBody(); });
        });
      }

      backBtn.addEventListener('click', function () { if (step > 0) { step--; renderBody(); } });

      function submitToGHL(cb) {
        var GHL_WEBHOOK = data?.settings?.ghlWebhookUrl || 'https://hooks.gohighlevel.com/webhook/YOUR_WEBHOOK_ID';
        var payload = { role: formData.role, weakness: formData.weakness, companySize: formData.size, companyName: formData.company, contactName: formData.name, email: formData.email, phone: formData.phone, source: 'byFriday Landing Page', submittedAt: new Date().toISOString() };
        fetch(GHL_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(function () { cb(); }).catch(function () { cb(); });
      }

      function renderThankYou() {
        var n = esc(formData.name) || 'friend';
        var co = esc(formData.company) || 'your team';
        var em = esc(formData.email) || 'your inbox';
        card.style.display = 'none';
        thankYou.style.display = '';
        var h = '<div class="ty-header">';
        h += '<div class="ty-left">';
        h += '<span class="ty-eyebrow"><span class="ty-eyebrow-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Pricing inbound</span>';
        h += '<h2 class="ty-h">Got it, <span class="ty-accent">' + n + '.</span></h2>';
        h += '<p class="ty-p">Friday is putting together pricing for <strong>' + co + '</strong>. Check <strong>' + em + '</strong> within the hour for what we\u2019d recommend \u2014 plus a link to book a call where we\u2019ll show you our funnel live.</p>';
        h += '<p class="ty-fine">While you wait, here\u2019s what happens next \u2193</p>';
        h += '</div>';
        h += '<div class="ty-right"><div class="ty-thumb"><div class="ty-thumb-overlay"></div><div class="ty-play-wrap"><div class="ty-play-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-left:3px"><polygon points="6 4 22 12 6 20 6 4"/></svg></div><div class="ty-play-label">How Friday works \u00b7 2 min</div></div></div></div>';
        h += '</div>';
        var steps = [
          { n: '01', t: 'Pricing email lands', b: 'In your inbox within the hour. With a 2-min Loom walking through what we\u2019d build for you.' },
          { n: '02', t: 'Book a sales call', b: 'Link inside the email \u2014 pick a slot Tuesday or Thursday. We\u2019ll prep around your funnel.' },
          { n: '03', t: 'See our funnel live', b: 'On the call we\u2019ll show you our own funnel and its real numbers. Not slide-deck case studies.' },
          { n: '04', t: 'Brief on Monday, live by Friday', b: 'If it\u2019s a fit, we start building. (Yes, that\u2019s where the name comes from.)', accent: true }
        ];
        h += '<div class="ty-next-steps">';
        steps.forEach(function (s) {
          h += '<div class="ty-step' + (s.accent ? ' ty-step-accent' : '') + '">';
          h += '<div class="ty-step-num">' + s.n + '</div>';
          h += '<div class="ty-step-title">' + s.t + '</div>';
          h += '<div class="ty-step-body">' + s.b + '</div></div>';
        });
        h += '</div>';
        thankYou.innerHTML = h;
        window.gsap.fromTo(thankYou, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      }

      renderBody();
    }

    /* Social proof popup */
    function initPopup() {
      var el = document.getElementById('spPopup');
      if (!el || window.innerWidth < 768) return;

      var cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Liverpool', 'Edinburgh', 'Glasgow', 'Cardiff', 'Newcastle', 'Sheffield', 'Brighton', 'Oxford', 'Cambridge', 'Belfast', 'Nottingham', 'Southampton', 'Reading', 'Aberdeen', 'York'];
      var initials = ['AR', 'TS', 'MK', 'JD', 'EL', 'BP', 'NH', 'OW', 'CS', 'RM', 'FH', 'DG', 'KW', 'PL', 'GS', 'VA', 'HC', 'IW', 'ZM', 'QB'];
      var actions = [
        { tpl: 'One of our clients has just got a lead from', loc: true, w: 3 },
        { tpl: 'One of our clients has just had a quote request from', loc: true, w: 3 },
        { tpl: 'One of our clients has had a request for a call', loc: false, w: 1 }
      ];
      var dismissed = false, hideT, cycleT;

      function pick() {
        var total = actions.reduce(function (s, a) { return s + a.w; }, 0);
        var r = Math.random() * total, act = actions[0];
        for (var i = 0; i < actions.length; i++) { r -= actions[i].w; if (r < 0) { act = actions[i]; break; } }
        var city = cities[Math.floor(Math.random() * cities.length)];
        var ini = initials[Math.floor(Math.random() * initials.length)];
        var mins = Math.floor(Math.random() * 8) + 1;
        return { city: city, ini: ini, act: act, mins: mins };
      }

      function show() {
        if (dismissed) return;
        var a = pick();
        var locPin = a.act.loc ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' : '';
        var metaText = a.act.loc ? a.city + ', UK \u00b7 ' + a.mins + ' min' + (a.mins === 1 ? '' : 's') + ' ago' : a.mins + ' min' + (a.mins === 1 ? '' : 's') + ' ago';
        var line = a.act.loc ? a.act.tpl + ' <strong>' + a.city + '</strong>' : a.act.tpl;

        el.innerHTML = '<div class="sp-popup-card">' +
          '<div class="sp-popup-avatar">' + a.ini + '<span class="sp-popup-live"></span></div>' +
          '<div style="display:flex;flex-direction:column;gap:3px;min-width:0"><div class="sp-popup-line">' + line + '</div><div class="sp-popup-meta">' + locPin + metaText + '</div></div>' +
          '<button class="sp-popup-close" aria-label="Dismiss"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
          '</div>';
        el.classList.add('is-visible');
        el.querySelector('.sp-popup-close').addEventListener('click', function () { dismissed = true; el.classList.remove('is-visible'); });
        hideT = setTimeout(function () { el.classList.remove('is-visible'); cycleT = setTimeout(show, 15000 + Math.random() * 10000); }, 6000);
      }

      setTimeout(show, 3000);
    }

    return () => {
      // Cleanup: kill all ScrollTriggers on unmount
      if (typeof window.ScrollTrigger !== 'undefined') {
        window.ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="nav" id="mainNav">
        <div className="nav-inner">
          <div className="nav-brand">
            <img src={urlFor(data?.settings?.logo) || '/assets/logo-wordmark.svg'} alt="byFriday" />
          </div>
          <div className="nav-links">
            <a href="#funnel" className="nav-link">How it works</a>
            <a href="#paid-ads" className="nav-link">Paid ads</a>
            <a href="#automation" className="nav-link">Automation</a>
            <a href="#platform" className="nav-link">Platform</a>
            <a href="#process" className="nav-link">Process</a>
          </div>
          <a href={data?.settings?.phoneHref || 'tel:+442045771234'} className="nav-phone">
            <svg className="nav-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5 12.7 19.8 19.8 0 0 1 1.9 4 2 2 0 0 1 3.9 2H6.9a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7 2 2 0 0 1 1.9 2z" /></svg>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span className="nav-phone-number">{data?.settings?.phoneNumber || '+44 20 4577 1234'}</span>
              <span className="nav-phone-aside">{data?.settings?.phoneAside || 'Chat to our AI receptionist'}</span>
            </span>
          </a>
          <a href="#pricing" className="nav-cta" id="navCtaBtn">{data?.settings?.navCtaText || 'See our pricing \u2192'}</a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <h1 className="gs-reveal">{data?.hero?.headline || 'Lead generation ad funnels powered by artificial intelligence'}</h1>
            <p className="hero-sub gs-reveal">{data?.hero?.subheadline || 'Funnels powered by paid ads, landing pages, sales automations, reputation & AI employees. We build the system that turns scrolling strangers into qualified enquiries \u2014 predictably, repeatedly, without you chasing it.'}</p>
            <a href="#pricing" className="hero-promise gs-reveal">
              <span className="promise-shield">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                <span className="live-dot-sm"></span>
              </span>
              <span className="promise-copy">
                <span className="promise-eyebrow">{data?.hero?.promiseEyebrow || 'Our 90-day guarantee'}</span>
                <span className="promise-line">{data?.hero?.promiseLine || <>You don&apos;t pay for new qualified leads for <span className="promise-em">3 months</span></>}</span>
                <span className="promise-stars">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                </span>
              </span>
              <span className="promise-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
            </a>
          </div>
          <div className="hero-right">
            <button type="button" className="hero-thumb" id="heroPlayBtn" aria-label="Play product video">
              <img fetchPriority="high" src={urlFor(data?.hero?.heroImage) || '/assets/Jamie.webp'} alt="" />
              <div className="hero-thumb-overlay"></div>
              <div className="hero-live-pill"><span className="live-dot"></span>{data?.hero?.livePillText || 'Live \u00b7 booking now'}</div>
              <div className="hero-play-wrap">
                <div className="hero-play-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '3px' }}><polygon points="6 4 22 12 6 20 6 4" /></svg></div>
                <div className="hero-play-label">{data?.hero?.playLabel || 'Watch \u00b7 90 seconds'}</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Hero Lightbox */}
      <div className="lightbox" id="heroLightbox">
        <div className="lightbox-frame">
          <button className="lightbox-close" id="heroLightboxClose" aria-label="Close video"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div id="heroVideoSlot"></div>
        </div>
      </div>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="social-proof gs-reveal">
        <div className="sp-grid">
          <div className="sp-quote-card">
            <div className="sp-video-cover">
              <iframe
                src={data?.socialProof?.caseStudyVideoUrl || 'https://player.vimeo.com/video/1148638773?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&title=0&byline=0&portrait=0'}
                title={data?.socialProof?.caseStudyVideoTitle || 'byFriday \u00d7 Quooker'}
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <div className="sp-bg-overlay"></div>
            <div className="sp-quote-inner">
              <div className="sp-header-row">
                <div className="sp-stat-block">
                  <div className="sp-stat-big" data-count={data?.socialProof?.statNumber || '9'}>0</div>
                  <div className="sp-stat-lbl">{data?.socialProof?.statLabel || 'figures in sales attributed to byFriday'}</div>
                </div>
                <img loading="lazy" src={urlFor(data?.socialProof?.clientLogo) || '/assets/quooker-logo.svg'} alt={data?.socialProof?.clientName || 'Quooker UK'} className="sp-quooker-logo" />
              </div>
              <p className="sp-quote">{data?.socialProof?.quote || '\u201CbyFriday built us a video consultation funnel that became the single biggest sales channel in our history. Nine figures in attributed revenue and counting.\u201D'}</p>
              <div className="sp-author">
                <div className="sp-avatar">{data?.socialProof?.authorInitials || 'S'}</div>
                <div>
                  <div className="sp-name">{data?.socialProof?.authorName || 'Stephen'}</div>
                  <div className="sp-role">{data?.socialProof?.authorRole || 'CEO, Quooker UK & Ireland'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sp-video-card">
            <img loading="lazy" src={urlFor(data?.socialProof?.caseStudyImage) || '/assets/quooker-byfriday.webp'} alt="" />
            <div className="sp-video-overlay"></div>
          </div>
          <div className="sp-cred-card">
            <div className="sp-joes-col">
              <div className="sp-joes-label">{data?.socialProof?.credClientName || "Joe's Doors"}</div>
              <div className="sp-joes-big" data-count={data?.socialProof?.credLeadCount || '1600'}>0</div>
              <div className="sp-joes-suffix">{data?.socialProof?.credLeadSuffix || 'qualified leads / month'}</div>
              <div className="sp-joes-divider"></div>
              <div className="sp-joes-row"><span className="sp-joes-row-label">Avg ticket</span><span className="sp-joes-row-value">{data?.socialProof?.credAvgTicket || '\u00a310,000+'}</span></div>
              <div className="sp-joes-row"><span className="sp-joes-row-label">Channel</span><span className="sp-joes-row-value">{data?.socialProof?.credChannel || 'Paid + form qualified'}</span></div>
            </div>
            <div className="sp-joes-img-wrap">
              <img loading="lazy" src={urlFor(data?.socialProof?.credImage) || '/assets/joes-door-brochure.webp'} alt={data?.socialProof?.credClientName || "Joe's Doors"} />
            </div>
          </div>
          <div className="sp-testimonial">
            <div className="sp-testimonial-stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
            </div>
            <p className="sp-testimonial-quote">{data?.socialProof?.testimonialQuote || '\u201CThe team at byFriday rebuilt our entire lead funnel and it\u2019s already paying for itself in the first month. We doubled the calls into our sales line without spending a penny more on ads.\u201D'}</p>
            <div className="sp-testimonial-author">
              <div className="sp-testimonial-avatar">{data?.socialProof?.testimonialInitials || 'LM'}</div>
              <div>
                <div className="sp-testimonial-name">{data?.socialProof?.testimonialName || 'Andrew Name'}</div>
                <div className="sp-testimonial-role">{data?.socialProof?.testimonialRole || "Managing Director \u00b7 Joe's Doors"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FUNNEL EXPLAINER ===== */}
      <section className="funnel" id="funnel">
        <div className="funnel-sticky">
          <div className="funnel-header gs-reveal">
            <div>
              <span className="section-eyebrow">{data?.funnelExplainer?.eyebrow || 'The funnel, explained'}</span>
              <h2 className="section-h2">{data?.funnelExplainer?.headline || <>What is a<br />lead generation funnel?</>}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p className="funnel-lede">{data?.funnelExplainer?.lede || 'A lead generation funnel is the system that turns a stranger scrolling on their phone into a qualified enquiry sitting in your calendar \u2014 predictably, repeatedly, and without you chasing it.'}</p>
              <p className="funnel-p">{data?.funnelExplainer?.body || <>It&apos;s not a landing page. It&apos;s not an ad. It&apos;s not a piece of software. Those are <em>components</em>. The funnel is the whole machine: the ad that stops the scroll, the page that earns the click, the offer that earns the lead, and the follow-up that turns the lead into a booked call before your competitor gets to them.</>}</p>
              <p className="funnel-p-bold">{data?.funnelExplainer?.boldStatement || "Most businesses don't have a funnel. They have a phone number, a website, and hope."}</p>
            </div>
          </div>
          <div className="funnel-steps" id="funnelSteps">
            <div className="funnel-step" data-step="0">
              <span className="funnel-step-num">01</span>
              <img loading="lazy" src={urlFor(data?.funnelExplainer?.steps?.[0]?.image) || '/assets/quooker-ad.webp'} alt="" className="funnel-step-bg" style={{ display: 'none' }} />
              <div className="funnel-step-overlay" style={{ display: 'none' }}></div>
              <div className="funnel-step-content">
                <div className="funnel-step-icon"><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M3 11v2a1 1 0 0 0 1 1h4l5 4V6L8 10H4a1 1 0 0 0-1 1z" /><path d="M16 8a4 4 0 0 1 0 8" /><path d="M19 5a8 8 0 0 1 0 14" /></svg></div>
                <div className="funnel-step-title">{data?.funnelExplainer?.steps?.[0]?.title || 'The Ad'}</div>
                <div className="funnel-step-body">{data?.funnelExplainer?.steps?.[0]?.body || 'Stops the scroll. Creative is the targeting now.'}</div>
              </div>
            </div>
            <svg className="funnel-arrow" data-arrow="1" width="28" height="20" viewBox="0 0 28 20" fill="none"><path d="M2 10h22M18 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="funnel-step" data-step="1">
              <span className="funnel-step-num">02</span>
              <img loading="lazy" src={urlFor(data?.funnelExplainer?.steps?.[1]?.image) || '/assets/quooker-landing-page.webp'} alt="" className="funnel-step-bg" style={{ display: 'none' }} />
              <div className="funnel-step-overlay" style={{ display: 'none' }}></div>
              <div className="funnel-step-content">
                <div className="funnel-step-icon"><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M7 13h7M7 16h5" /></svg></div>
                <div className="funnel-step-title">{data?.funnelExplainer?.steps?.[1]?.title || 'The Page'}</div>
                <div className="funnel-step-body">{data?.funnelExplainer?.steps?.[1]?.body || 'Earns the click. Fast, focused, conversion-tuned.'}</div>
              </div>
            </div>
            <svg className="funnel-arrow" data-arrow="2" width="28" height="20" viewBox="0 0 28 20" fill="none"><path d="M2 10h22M18 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="funnel-step" data-step="2">
              <span className="funnel-step-num">03</span>
              <img loading="lazy" src={urlFor(data?.funnelExplainer?.steps?.[2]?.image) || '/assets/the-offer.webp'} alt="" className="funnel-step-bg" style={{ display: 'none' }} />
              <div className="funnel-step-overlay" style={{ display: 'none' }}></div>
              <div className="funnel-step-content">
                <div className="funnel-step-icon"><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v2h6V3" /><path d="M9 10h6M9 14h6M9 18h3" /></svg></div>
                <div className="funnel-step-title">{data?.funnelExplainer?.steps?.[2]?.title || 'The Offer'}</div>
                <div className="funnel-step-body">{data?.funnelExplainer?.steps?.[2]?.body || 'Earns the lead. Multi-step form qualifies them.'}</div>
              </div>
            </div>
            <svg className="funnel-arrow" data-arrow="3" width="28" height="20" viewBox="0 0 28 20" fill="none"><path d="M2 10h22M18 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="funnel-step" data-step="3">
              <span className="funnel-step-num">04</span>
              <img loading="lazy" src={urlFor(data?.funnelExplainer?.steps?.[3]?.image) || '/assets/quooker-installer.webp'} alt="" className="funnel-step-bg" style={{ display: 'none' }} />
              <div className="funnel-step-overlay" style={{ display: 'none' }}></div>
              <div className="funnel-step-content">
                <div className="funnel-step-icon"><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5 12.7 19.8 19.8 0 0 1 1.9 4 2 2 0 0 1 3.9 2H6.9a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7 2 2 0 0 1 1.9 2z" /></svg></div>
                <div className="funnel-step-title">{data?.funnelExplainer?.steps?.[3]?.title || 'The Follow-up'}</div>
                <div className="funnel-step-body">{data?.funnelExplainer?.steps?.[3]?.body || 'Books the call. Before your competitor gets to them.'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY FAIL ===== */}
      <section className="why-fail">
        <div className="why-fail-inner">
          <span className="section-eyebrow-dark">{data?.whyFail?.eyebrow || 'Why most funnels fail'}</span>
          <h2 className="section-h2" style={{ color: '#fff', maxWidth: '900px' }}>{data?.whyFail?.headline || <>It&apos;s almost never the ad.<br /><span className="muted">It&apos;s almost never the page.</span></>}</h2>
          <div className="why-fail-cols">
            <p>{data?.whyFail?.col1 || <>It&apos;s that the four pieces aren&apos;t built to work together. The ad promises one thing, the page sells another, the form filters out the buyers, and the follow-up is a single auto-reply that arrives an hour late. Each piece looks fine in isolation. <strong>The system loses money.</strong></>}</p>
            <p>{data?.whyFail?.col2 || 'A funnel built properly compounds. Every winning ad makes the page sharper. Every conversion teaches the form what to ask. Every closed deal feeds the follow-up sequence. After six months, your cost per booked job is half what it was on day one \u2014 and your competitors are still buying clicks.'}</p>
          </div>
        </div>
      </section>

      {/* ===== PAID ADS ===== */}
      <section className="paid-ads gs-reveal" id="paid-ads">
        <div className="paid-ads-header">
          <span className="section-eyebrow">{data?.paidAds?.eyebrow || 'Paid ads'}</span>
          <h2 className="section-h2">{data?.paidAds?.headline || <>We advertise<br />everywhere your buyers are.</>}</h2>
        </div>
        <div className="ad-strip">
          <div className="ad-track">
            <div className="ad-group">
              <img loading="lazy" src="/assets/ad-google.svg" alt="Google Ads" />
              <img loading="lazy" src="/assets/ad-meta.svg" alt="Meta Ads" />
              <img loading="lazy" src="/assets/ad-bing.svg" alt="Bing Ads" />
              <img loading="lazy" src="/assets/ad-youtube.svg" alt="YouTube Ads" />
              <img loading="lazy" src="/assets/ad-linkedin.svg" alt="LinkedIn Ads" />
              <img loading="lazy" src="/assets/ad-x.svg" alt="X Ads" />
            </div>
            <div className="ad-group" aria-hidden="true">
              <img loading="lazy" src="/assets/ad-google.svg" alt="" />
              <img loading="lazy" src="/assets/ad-meta.svg" alt="" />
              <img loading="lazy" src="/assets/ad-bing.svg" alt="" />
              <img loading="lazy" src="/assets/ad-youtube.svg" alt="" />
              <img loading="lazy" src="/assets/ad-linkedin.svg" alt="" />
              <img loading="lazy" src="/assets/ad-x.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="pa-grid">
          <div className="pa-card">
            <div className="pa-card-eyebrow"><span className="pa-card-eyebrow-dot"></span>{data?.paidAds?.searchEyebrow || 'Search advertising'}</div>
            {/* Google Ad Mock */}
            <div className="ga-card">
              <span className="ga-sponsored">Sponsored</span>
              <div className="ga-brand">
                <div className="ga-favicon"><img src="/assets/logo-secondary.svg" alt="" /></div>
                <div><div className="ga-brand-name">byFriday</div><div className="ga-brand-url">https://www.byfriday.com <span style={{ color: '#4d5156' }}>&rsaquo; pricing</span></div></div>
              </div>
              <a href="#" className="ga-headline">byFriday | AI Lead Generation Funnels for Services &amp; High-Ticket</a>
              <p className="ga-desc">Get qualified leads in your inbox while you sleep. Paid ads, landing pages &amp; AI follow-up. <strong>You don&apos;t pay for new leads in your first 90 days.</strong></p>
              <div className="ga-rating">
                <span className="ga-rating-num">4.9</span>
                <div className="ga-rating-stars">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbc04"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbc04"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbc04"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbc04"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbc04"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                </div>
                <span style={{ fontSize: '12px' }}>Rating for byfriday.com</span>
              </div>
              <div className="ga-links"><a href="#">Pricing</a><a href="#">Case studies</a><a href="#">How a funnel works</a><a href="#">Book a call</a></div>
            </div>
            <p>{data?.paidAds?.searchBody1 || <>When someone searches an intentful term for your services, it&apos;s our job to put you in position one &mdash; with stand-out creative and tailored landing pages for <em>every</em> target keyword.</>}</p>
            <p>{data?.paidAds?.searchBody2 || 'Instant sales automation fires the moment a lead submits. You scale your business on the same ad spend you already have.'}</p>
            <ul className="pa-bullets">
              <li className="pa-bullet"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{data?.paidAds?.searchBullet1 || 'Per-keyword landing pages, not one site for all of them'}</li>
              <li className="pa-bullet"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{data?.paidAds?.searchBullet2 || 'Instant follow-up automation under 60 seconds'}</li>
              <li className="pa-bullet"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{data?.paidAds?.searchBullet3 || 'Same ad spend, multiples of the conversion rate'}</li>
            </ul>
          </div>
          <div className="pa-card pa-card-dark">
            <div className="pa-card-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}><span className="pa-card-eyebrow-dot"></span>{data?.paidAds?.socialEyebrow || 'Social advertising'}</div>
            <h3 style={{ color: '#fff' }}>{data?.paidAds?.socialHeadline || 'Cold strangers to customers \u2014 in the andromeda era.'}</h3>
            <p>{data?.paidAds?.socialBody || <>We shoot video and produce stills across concepts &mdash; the overlap of hook, offer and ICP. It&apos;s the only way to scale in 2026 and beyond: Meta now targets better than any human can. The creative <strong style={{ color: '#fff' }}>is</strong> the targeting.</>}</p>
            <div className="concept-stack" id="conceptStack">
              <div className="concept-grid">
                <div className="concept-tile"><div className="concept-circle" data-concept="0"></div><span className="concept-label">Hook</span></div>
                <div className="concept-tile"><div className="concept-circle" data-concept="1"></div><span className="concept-label">Offer</span></div>
                <div className="concept-tile"><div className="concept-circle" data-concept="2"></div><span className="concept-label">ICP</span></div>
              </div>
              <div className="concept-result" id="conceptResult">
                <div className="concept-green-dot" id="conceptGreenDot"></div>
                <div style={{ textAlign: 'center' }}>
                  <div className="concept-result-eyebrow">The output</div>
                  <div className="concept-result-title">Concept</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LANDING PAGES ===== */}
      <section className="landing-pages gs-reveal">
        <div className="lp-inner">
          <div className="lp-left">
            <span className="section-eyebrow" style={{ background: '#fff' }}>{data?.landingPages?.eyebrow || 'Smart landing pages'}</span>
            <h2 className="section-h2">{data?.landingPages?.headline || <>Double your conversion rate.<br />Double your year.</>}</h2>
            <p>{data?.landingPages?.body1 || <>If you increase your conversion rate from <strong>1%</strong> to <strong>2%</strong>, you just doubled your revenue for the year. Tailor a page to each specific ad and you see that double again. Add a fast load and a multi-step qualifying form &mdash; another jump.</>}</p>
            <p className="pem">{data?.landingPages?.italicLine || "It's that simple."}</p>
            <p>{data?.landingPages?.body2 || 'Beautifully designed. Built around conversion. Page-speed scored. Mobile-first. Connected to the rest of the system from day one.'}</p>
          </div>
          <div>
            <div className="cv-card" id="cvCard">
              <div className="cv-label">{data?.landingPages?.cvLabel || 'Same ad spend \u2192 conversion rate'}</div>
              <div className="cv-bars">
                <div className="cv-bar-row"><span className="cv-bar-label">Generic site</span><div className="cv-bar-track"><div className="cv-bar-fill" data-width="20" style={{ background: 'var(--color-midnight-ink)' }}></div></div><span className="cv-bar-rate" data-rate="1.0">0.0%</span></div>
                <div className="cv-bar-row"><span className="cv-bar-label">Tailored page</span><div className="cv-bar-track"><div className="cv-bar-fill" data-width="40" style={{ background: 'var(--color-ember-glow)' }}></div></div><span className="cv-bar-rate" data-rate="2.0">0.0%</span></div>
                <div className="cv-bar-row"><span className="cv-bar-label">+ multi-step form</span><div className="cv-bar-track"><div className="cv-bar-fill" data-width="68" style={{ background: 'var(--color-ember-glow)' }}></div></div><span className="cv-bar-rate" data-rate="3.4">0.0%</span></div>
                <div className="cv-bar-row"><span className="cv-bar-label">+ instant follow-up</span><div className="cv-bar-track"><div className="cv-bar-fill" data-width="100" style={{ background: 'var(--color-ember-glow)' }}></div></div><span className="cv-bar-rate" data-rate="5.0">0.0%</span></div>
              </div>
              <div className="cv-foot">{data?.landingPages?.cvFoot || '5\u00d7 more revenue, same spend.'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUTOMATION BENTO ===== */}
      <section className="automation gs-reveal" id="automation">
        <div className="auto-header">
          <span className="section-eyebrow">{data?.automation?.eyebrow || 'Sales & reputation automation'}</span>
          <h2 className="section-h2">{data?.automation?.headline || <>Every signal answered.<br />Every reply five-star.</>}</h2>
          <p>{data?.automation?.subheadline || 'Five connected automations that turn missed messages, sleepless follow-up and review chasing into systems that run while you sleep.'}</p>
        </div>
        <div className="auto-bento">
          {/* Reviews video tile */}
          <button type="button" className="reviews-tile" id="reviewsPlayBtn" aria-label="Play reviews video">
            <img loading="lazy" src={urlFor(data?.automation?.reviewsImage) || '/assets/Jamie.webp'} alt="" />
            <div className="reviews-overlay"></div>
            <div className="reviews-play-wrap">
              <div className="reviews-play-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '3px' }}><polygon points="6 4 22 12 6 20 6 4" /></svg></div>
              <div className="reviews-caption">{data?.automation?.reviewsCaption || 'How to automate 5\u2605 reviews \u2014 48s'}</div>
            </div>
          </button>
          {/* AI Call Centre */}
          <a href={data?.settings?.phoneHref || 'tel:+442045771234'} className="call-tile" style={{ textDecoration: 'none' }}>
            <div>
              <div className="call-tile-icon"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5 12.7 19.8 19.8 0 0 1 1.9 4 2 2 0 0 1 3.9 2H6.9a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7 2 2 0 0 1 1.9 2z" /></svg></div>
              <div className="call-tile-title" style={{ marginTop: '14px' }}>{data?.automation?.callTitle || 'AI Call Centre'}</div>
              <div className="call-tile-body">{data?.automation?.callBody || 'A voice agent that answers, qualifies and books \u2014 in your brand voice, in your accent, 24/7.'}</div>
            </div>
            <div className="call-divider"></div>
            <div>
              <div className="call-badge"><span className="live-dot"></span>Live demo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '14px' }}>
                <div className="call-eyebrow">Try it now</div>
                <div className="call-number">{data?.settings?.phoneNumber || '+44 20 4577 1234'}</div>
                <div className="call-hint">{data?.automation?.callHint || 'Call and pretend to be a customer \u2014 see how it handles you.'}</div>
              </div>
              <div className="call-btn" style={{ marginTop: '14px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5 12.7 19.8 19.8 0 0 1 1.9 4 2 2 0 0 1 3.9 2H6.9a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7 2 2 0 0 1 1.9 2z" /></svg><span>Call now</span></div>
            </div>
          </a>
          {/* Missed Call Text Back */}
          <div className="missed-call-tile">
            <div>
              <div className="missed-call-big">{data?.automation?.missedCallStat || '69%'}</div>
              <div className="missed-call-sub">{data?.automation?.missedCallBody || 'of businesses gain more customers with missed call text back.'}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="phone-mock" id="phoneMock">
                <div className="phone-header">
                  <div className="phone-avatar"><img src="/assets/byfriday-secondary-white.svg" alt="" /></div>
                  <div><div className="phone-name">byFriday</div><div className="phone-status">SMS &middot; just now</div></div>
                </div>
                <div className="bubble-them bubble" data-bubble="1">Hey! Sorry we missed your call. We&apos;ll have someone call you back shortly. In the meantime, if you want to know about our services and pricing &mdash; or schedule a call &mdash; I can do that here.</div>
                <div className="bubble-typing bubble" data-bubble="2"><span style={{ animationDelay: '0s' }}></span><span style={{ animationDelay: '0.15s' }}></span><span style={{ animationDelay: '0.3s' }}></span></div>
                <div className="bubble-me bubble" data-bubble="3">Hi. Yes please &mdash; I&apos;d like to know about your pricing.</div>
                <div className="bubble-them bubble" data-bubble="4">Sure thing. I&apos;ve sent you a video on WhatsApp about our pricing model, plus a link to schedule a call with the team.</div>
                <div className="bubble-typing bubble" data-bubble="5"><span style={{ animationDelay: '0s' }}></span><span style={{ animationDelay: '0.15s' }}></span><span style={{ animationDelay: '0.3s' }}></span></div>
                <div className="bubble-me bubble" data-bubble="6">Amazing! Speak soon.</div>
              </div>
            </div>
          </div>
          {/* SMS & Email */}
          <div className="auto-tile email-tile">
            <div className="auto-tile-icon"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg></div>
            <div className="auto-tile-title">{data?.automation?.emailTitle || 'SMS & Email Automation'}</div>
            <div className="auto-tile-body">{data?.automation?.emailBody || 'Multi-channel follow-up sequences that adapt to opens, clicks and replies. No leads left cold.'}</div>
            <div className="email-flow">
              <div className="flow-node flow-node-trigger"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg> Lead submits</div>
              <svg width="10" height="14" viewBox="0 0 10 14" style={{ display: 'block', margin: '0 auto', color: 'var(--color-faded-gray)' }}><path d="M5 0v12M1 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              <div className="flow-node"><svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg> Welcome email</div>
              <svg width="10" height="14" viewBox="0 0 10 14" style={{ display: 'block', margin: '0 auto', color: 'var(--color-faded-gray)' }}><path d="M5 0v12M1 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              <div className="flow-node flow-node-decision">Opened?</div>
              <div className="flow-branch">
                <div className="flow-branch-col"><div className="flow-branch-label">YES</div><div className="flow-node flow-node-small">Demo offer</div></div>
                <div className="flow-branch-col"><div className="flow-branch-label" style={{ color: 'var(--color-ember-glow)' }}>NO</div><div className="flow-node flow-node-accent">SMS reminder &middot; 24h</div></div>
              </div>
            </div>
          </div>
          {/* AI Chat */}
          <div className="auto-tile chat-tile">
            <div className="auto-tile-icon"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /></svg></div>
            <div className="auto-tile-title">{data?.automation?.chatTitle || 'AI Chat'}</div>
            <div className="auto-tile-body">{data?.automation?.chatBody || "Friday answers every web visitor and DM. Books the meeting when the lead is hot, hands off when it's not."}</div>
          </div>
        </div>
      </section>

      {/* Reviews Lightbox */}
      <div className="lightbox" id="reviewsLightbox">
        <div className="lightbox-frame">
          <button className="lightbox-close" id="reviewsLightboxClose" aria-label="Close video"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div id="reviewsVideoSlot"></div>
        </div>
      </div>

      {/* ===== PLATFORM ===== */}
      <section className="platform gs-reveal" id="platform">
        <div className="platform-inner">
          <div className="platform-left">
            <span className="section-eyebrow" style={{ background: '#fff' }}>{data?.platform?.eyebrow || 'The platform'}</span>
            <h2 className="section-h2">{data?.platform?.headline || <>One inbox.<br />Every channel.</>}</h2>
            <p>{data?.platform?.body || 'Manage every submission, every Instagram and Facebook DM, every WhatsApp \u2014 from one place. Friday handles the qualifying. You only step in when the lead is hot.'}</p>
            <ul className="platform-list">
              <li><span className="platform-dot"></span>{data?.platform?.bullet1 || 'Web forms, SMS, email, Insta, FB Messenger, WhatsApp'}</li>
              <li><span className="platform-dot"></span>{data?.platform?.bullet2 || 'AI qualifies, scores and tags every conversation'}</li>
              <li><span className="platform-dot"></span>{data?.platform?.bullet3 || 'Hand-off rules \u2014 by source, value, response time'}</li>
              <li><span className="platform-dot"></span>{data?.platform?.bullet4 || 'Mobile + desktop, with team assignments and SLAs'}</li>
            </ul>
          </div>
          <div>
            <div className="inbox-frame" id="inboxFrame">
              <div className="inbox-toolbar">
                <div className="inbox-tabs">
                  <span className="inbox-tab inbox-tab-active">All <span className="inbox-tab-count" id="inboxCount">284</span></span>
                  <span className="inbox-tab">Hot <span className="inbox-tab-count-accent" id="inboxHotCount">12</span></span>
                  <span className="inbox-tab">Unread</span>
                </div>
                <div className="inbox-search">Search&hellip;</div>
              </div>
              <div id="inboxNewRow" style={{ maxHeight: 0, overflow: 'hidden', transition: 'max-height 600ms cubic-bezier(0.16,1.2,0.3,1)' }}>
                <div className="inbox-row" style={{ background: 'rgba(255,90,0,0.08)' }}>
                  <div className="inbox-avatar" style={{ position: 'relative' }}>LH<span className="live-dot-sm"></span></div>
                  <div style={{ flex: 1, minWidth: 0 }}><div className="inbox-line1"><span className="inbox-name">Liam Hayes</span><span className="inbox-channel">&middot; WhatsApp</span><span className="inbox-hot">HOT</span></div><div className="inbox-msg">Just left a voicemail &mdash; looking for a quote in BS6, ASAP.</div></div>
                  <div className="inbox-time">just now</div>
                </div>
              </div>
              <div className="inbox-row" id="inboxFirstRow" style={{ opacity: 0, transform: 'translateY(-100%)' }}>
                <div className="inbox-avatar" style={{ position: 'relative' }}>AR<span className="live-dot-sm" id="firstRowDot"></span></div>
                <div style={{ flex: 1, minWidth: 0 }}><div className="inbox-line1"><span className="inbox-name">Alex Romero</span><span className="inbox-channel">&middot; WhatsApp</span><span className="inbox-hot">HOT</span></div><div className="inbox-msg">Hey &mdash; interested in the consultation funnel piece. Free Thursday?</div></div>
                <div className="inbox-time">just now</div>
              </div>
              <div className="inbox-row"><div className="inbox-avatar">JD</div><div style={{ flex: 1, minWidth: 0 }}><div className="inbox-line1"><span className="inbox-name">Quote &mdash; Joe&apos;s Doors</span><span className="inbox-channel">&middot; Web form</span></div><div className="inbox-msg">Front door fitting in BN1 &mdash; budget &pound;8&ndash;12k</div></div><div className="inbox-time">6m</div></div>
              <div className="inbox-row"><div className="inbox-avatar">MP</div><div style={{ flex: 1, minWidth: 0 }}><div className="inbox-line1"><span className="inbox-name">Maya Patel</span><span className="inbox-channel">&middot; Insta DM</span></div><div className="inbox-msg">Saw the andromeda playbook &mdash; got time to chat next week?</div></div><div className="inbox-time">18m</div></div>
              <div className="inbox-row"><div className="inbox-avatar">SK</div><div style={{ flex: 1, minWidth: 0 }}><div className="inbox-line1"><span className="inbox-name">Stephen K.</span><span className="inbox-channel">&middot; Email</span></div><div className="inbox-msg">Looping in marketing on the proposal you sent over</div></div><div className="inbox-time">1h</div></div>
              <div className="inbox-row"><div className="inbox-avatar inbox-avatar-auto">&check;</div><div style={{ flex: 1, minWidth: 0 }}><div className="inbox-line1"><span className="inbox-name">Friday auto-reply</span><span className="inbox-channel">&middot; SMS</span></div><div className="inbox-msg">Booked a 30-min slot for Friday 3pm with Lou Martin</div></div><div className="inbox-time">2h</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW TO WORK ===== */}
      <section className="how-to-work gs-reveal" id="process">
        <div className="htw-inner">
          <div className="htw-header">
            <span className="section-eyebrow">{data?.howToWork?.eyebrow || 'The process'}</span>
            <h2 className="section-h2">{data?.howToWork?.headline || 'How to work with us'}</h2>
            <p>{data?.howToWork?.subheadline || 'Six steps from \u201Csend me your pricing\u201D to qualified leads in your calendar. No surprises, no padding.'}</p>
          </div>
          <div className="htw-steps">
            <div className="htw-step">
              <div className="htw-step-num">01</div>
              <div className="htw-step-title">{data?.howToWork?.steps?.[0]?.title || 'See our pricing'}</div>
              <div className="htw-step-body">{data?.howToWork?.steps?.[0]?.body || 'See our pricing and decide if you would like to schedule a call.'}</div>
              <a href="#pricing" className="htw-step-cta">Request pricing <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></a>
            </div>
            <div className="htw-step">
              <div className="htw-step-num">02</div>
              <div className="htw-step-title">{data?.howToWork?.steps?.[1]?.title || 'Meet the team'}</div>
              <div className="htw-step-body">{data?.howToWork?.steps?.[1]?.body || 'Meet the team and ask any questions you have.'}</div>
            </div>
            <div className="htw-step">
              <div className="htw-step-num">03</div>
              <div className="htw-step-title">{data?.howToWork?.steps?.[2]?.title || 'Shoot the ads'}</div>
              <div className="htw-step-body">{data?.howToWork?.steps?.[2]?.body || 'We bring our video team to shoot your first ads and VSLs.'}</div>
            </div>
            <div className="htw-step">
              <div className="htw-step-num">04</div>
              <div className="htw-step-title">{data?.howToWork?.steps?.[3]?.title || 'Build the system'}</div>
              <div className="htw-step-body">{data?.howToWork?.steps?.[3]?.body || 'We build the AI automation systems, landing pages and ad accounts.'}</div>
            </div>
            <div className="htw-step">
              <div className="htw-step-num">05</div>
              <div className="htw-step-title">{data?.howToWork?.steps?.[4]?.title || 'Launch campaigns'}</div>
              <div className="htw-step-body">{data?.howToWork?.steps?.[4]?.body || 'We then launch your campaigns to drive qualified leads.'}</div>
            </div>
            <div className="htw-step htw-step-accent">
              <div className="htw-step-num">06</div>
              <div className="htw-step-title">{data?.howToWork?.steps?.[5]?.title || '90-day guarantee'}</div>
              <div className="htw-step-body">{data?.howToWork?.steps?.[5]?.body || "You don't pay for your qualified leads for the next 90 days."}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING FORM ===== */}
      <section className="pricing-form" id="pricing">
        <div className="pf-card" id="pfCard">
          <div className="pf-top-bar"><div className="pf-top-bar-fill" id="pfTopBar" style={{ width: '25%' }}></div></div>
          <div className="pf-header">
            <span className="section-eyebrow">{data?.pricingForm?.eyebrow || 'Pricing'}</span>
            <h2>{data?.pricingForm?.headline || "Send me byFriday's pricing"}</h2>
            <p>{data?.pricingForm?.subheadline || "5 quick questions. We'll have tailored pricing to you within minutes."}</p>
          </div>
          {/* Step pill */}
          <div className="step-pill" id="stepPill">
            <div className="step-pill-row">
              <div className="step-pill-cell step-pill-cell-dark"><span style={{ opacity: 0.85 }}>1.</span> <span className="step-word">Focus</span></div>
              <div className="step-pill-cell step-pill-cell-dark"><span style={{ opacity: 0.85 }}>2.</span> <span className="step-word">Gap</span></div>
              <div className="step-pill-cell step-pill-cell-dark"><span style={{ opacity: 0.85 }}>3.</span> <span className="step-word">Team</span></div>
              <div className="step-pill-cell step-pill-cell-dark"><span style={{ opacity: 0.85 }}>4.</span> <span className="step-word">Details</span></div>
              <div className="step-pill-cell step-pill-cell-dark"><span style={{ opacity: 0.85 }}>5.</span> <span className="step-word">Contact</span></div>
            </div>
            <div className="step-pill-fill" id="stepPillFill" style={{ clipPath: 'inset(0 80% 0 0 round 999px)' }}>
              <div className="step-pill-row">
                <div className="step-pill-cell step-pill-cell-light"><span style={{ opacity: 0.85 }}>1.</span> <span className="step-word">Focus</span></div>
                <div className="step-pill-cell step-pill-cell-light"><span style={{ opacity: 0.85 }}>2.</span> <span className="step-word">Gap</span></div>
                <div className="step-pill-cell step-pill-cell-light"><span style={{ opacity: 0.85 }}>3.</span> <span className="step-word">Team</span></div>
                <div className="step-pill-cell step-pill-cell-light"><span style={{ opacity: 0.85 }}>4.</span> <span className="step-word">Details</span></div>
                <div className="step-pill-cell step-pill-cell-light"><span style={{ opacity: 0.85 }}>5.</span> <span className="step-word">Contact</span></div>
              </div>
            </div>
          </div>
          {/* Form body */}
          <div className="pf-body" id="pfBody"></div>
          {/* Back button */}
          <div className="pf-foot" id="pfFoot" style={{ display: 'none' }}><button className="pf-back" id="pfBack">&larr; Back</button></div>
        </div>
        {/* Thank you (hidden initially) */}
        <div className="thank-you" id="thankYou" style={{ display: 'none' }}></div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img loading="lazy" src={urlFor(data?.footer?.logo) || '/assets/byfr-footer.svg'} alt="byFriday" />
            <p className="footer-tag">{data?.footer?.tagline || 'AI-powered lead generation funnels for services & high-ticket products.'}</p>
            <div className="footer-social">
              <a href={data?.settings?.instagramUrl || '#'} aria-label="Instagram"><img src="/assets/icon-instagram.svg" alt="" /></a>
              <a href={data?.settings?.youtubeUrl || '#'} aria-label="YouTube"><img src="/assets/icon-youtube.svg" alt="" /></a>
              <a href={data?.settings?.whatsappUrl || '#'} aria-label="WhatsApp"><img src="/assets/icon-whatsapp.svg" alt="" /></a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">{data?.footer?.col1Title || 'Funnel'}</div>
              <ul>
                <li><a href="#funnel">How it works</a></li>
                <li><a href="#">Why funnels fail</a></li>
                <li><a href="#">Case studies</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">{data?.footer?.col2Title || 'Capabilities'}</div>
              <ul>
                <li><a href="#paid-ads">Paid ads</a></li>
                <li><a href="#">Landing pages</a></li>
                <li><a href="#automation">Automation</a></li>
                <li><a href="#platform">Platform</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">{data?.footer?.col3Title || 'Company'}</div>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{data?.footer?.copyright || '\u00a9 2026 byFriday Ltd.'}</span>
          <span>{data?.footer?.taglineBottom || 'Made on a Tuesday. Shipped on a Friday.'}</span>
        </div>
        <div className="footer-big-logo"><img loading="lazy" src="/assets/logo-wordmark.svg" alt="byFriday" /></div>
      </footer>

      {/* ===== FLOATING CTA ===== */}
      <div className="float-cta" id="floatCta">
        <div className="float-cta-shell">
          <div className="float-cta-head">
            <div className="float-cta-avatar">
              <img src={urlFor(data?.settings?.floatCtaAvatar) || '/assets/jamie-chat-image.png'} alt="" />
              <span className="live-dot-sm"></span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span className="float-cta-author">{data?.settings?.floatCtaAuthor || 'Jamie Sellars'}</span>
              <span className="float-cta-role">{data?.settings?.floatCtaRole || 'Founder, byFriday'}</span>
              <div className="float-cta-stars">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-ember-glow)"><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6" /></svg>
              </div>
            </div>
          </div>
          <p className="float-cta-headline">{data?.settings?.floatCtaHeadline || <>You don&apos;t pay for your first <span className="float-cta-accent">90 days</span> of new qualified leads.</>}</p>
          <a href="#pricing" className="float-cta-btn">Pricing <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg></a>
        </div>
      </div>

      {/* ===== SOCIAL PROOF POPUP ===== */}
      <div className="sp-popup" id="spPopup" aria-hidden="true"></div>
    </>
  );
}

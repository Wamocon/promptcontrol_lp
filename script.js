/* =====================================================
   ProCon Landing Page – script.js
   Vanilla JS, no dependencies, ES5-compatible globals
   ===================================================== */

(function () {
  'use strict';

  /* ─── Language Toggle ─────────────────────────────── */
  function initLangToggle() {
    var current = localStorage.getItem('lang') || 'de';
    applyLang(current);

    var btns = document.querySelectorAll('#lang-de, #lang-en, #lang-de-m, #lang-en-m');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.id.replace('-m', '').replace('lang-', '');
        applyLang(lang);
        localStorage.setItem('lang', lang);
      });
    });
  }

  function applyLang(lang) {
    /* update active class on all lang buttons */
    ['lang-de', 'lang-en', 'lang-de-m', 'lang-en-m'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var btnLang = id.replace('-m', '').replace('lang-', '');
      el.classList.toggle('active-lang', btnLang === lang);
    });

    /* update all translatable text nodes */
    document.querySelectorAll('[data-de][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang) || el.textContent;
    });

    /* update placeholders for inputs */
    document.querySelectorAll('[data-ph-de][data-ph-en]').forEach(function (el) {
      el.placeholder = el.getAttribute('data-ph-' + lang) || el.placeholder;
    });

    /* update select option text */
    document.querySelectorAll('select option[data-de][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang) || el.textContent;
    });

    document.documentElement.setAttribute('lang', lang);
  }

  /* ─── Theme Toggle ────────────────────────────────── */
  function initThemeToggle() {
    var html = document.documentElement;
    var saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
      });
    }
  }

  function setTheme(theme) {
    var html = document.documentElement;
    html.setAttribute('data-theme', theme);
    var moon = document.getElementById('icon-moon');
    var sun = document.getElementById('icon-sun');
    if (moon) moon.style.display = theme === 'dark' ? 'block' : 'none';
    if (sun) sun.style.display = theme === 'light' ? 'block' : 'none';
  }

  /* ─── iPhone Screen Cycle ─────────────────────────── */
  function initIphoneScreenCycle() {
    var screens = document.querySelectorAll('.app-screen');
    if (!screens.length) return;
    var idx = 0;
    function showScreen(i) {
      screens.forEach(function (s) { s.classList.remove('active'); });
      screens[i].classList.add('active');
    }
    showScreen(0);
    setInterval(function () {
      idx = (idx + 1) % screens.length;
      showScreen(idx);
    }, 4200);
  }

  /* ─── Showcase Tabs ───────────────────────────────── */
  function initShowcaseTabs() {
    var btns = document.querySelectorAll('.tab-btn');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-tab');
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(function (p) {
          p.classList.remove('active');
        });
        var panel = document.getElementById('tab-' + tab);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ─── Sticky Nav ──────────────────────────────────── */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }, { passive: true });
  }

  /* ─── Scroll Reveal ───────────────────────────────── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── Smooth Scroll ───────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href === '#' || href === '#kontakt') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── FAQ Accordion ───────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-question');
      var a = item.querySelector('.faq-answer');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        /* close all others */
        document.querySelectorAll('.faq-item.open').forEach(function (other) {
          other.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ─── Mobile Menu ─────────────────────────────────── */
  function initMobileMenu() {
    var btn = document.getElementById('mobile-menu-btn');
    var nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      nav.classList.toggle('hidden');
    });
    /* close when a link is clicked */
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.add('hidden');
      });
    });
  }

  /* ─── Footer Year ─────────────────────────────────── */
  function initFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ─── Contact Modal ───────────────────────────────── */
  window.openContactModal = function () {
    var modal = document.getElementById('contact-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeContactModal = function () {
    var modal = document.getElementById('contact-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.submitContactForm = function (e) {
    e.preventDefault();
    var name    = (document.getElementById('cf-name')    || {}).value || '';
    var email   = (document.getElementById('cf-email')   || {}).value || '';
    var company = (document.getElementById('cf-company') || {}).value || '';
    var subject = (document.getElementById('cf-subject') || {}).value || '';
    var message = (document.getElementById('cf-message') || {}).value || '';
    var errEl   = document.getElementById('cf-error');

    if (!name.trim() || !email.trim()) {
      if (errEl) errEl.classList.remove('hidden');
      return;
    }
    if (errEl) errEl.classList.add('hidden');

    var body = encodeURIComponent(
      'Name: ' + name + '\r\n' +
      'E-Mail: ' + email + '\r\n' +
      'Unternehmen: ' + company + '\r\n' +
      'Thema: ' + subject + '\r\n\r\n' +
      message
    );
    window.location.href =
      'mailto:info@wamocon.de' +
      '?subject=' + encodeURIComponent('ProCon – ' + subject) +
      '&body=' + body;

    window.closeContactModal();
  };

  /* close modal on overlay click */
  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('contact-modal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) window.closeContactModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.closeContactModal();
    });
  });

  /* ─── Boot ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    /* restore theme first (before paint) */
    var savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    initLangToggle();
    initThemeToggle();
    initIphoneScreenCycle();
    initShowcaseTabs();
    initNav();
    initReveal();
    initSmoothScroll();
    initFAQ();
    initMobileMenu();
    initFooterYear();
  });

}());
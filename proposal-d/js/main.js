/* ==========================================================================
   PROPOSAL D — Warm Mediterranean — Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- DOM Refs ---------- */
  const header       = document.getElementById('header');
  const menuToggle   = document.getElementById('menuToggle');
  const mobileNav    = document.getElementById('mobileNav');
  const modalOverlay = document.getElementById('contactModal');
  const contactForm  = document.getElementById('contactForm');

  const openModalBtns  = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');

  const faqItems = document.querySelectorAll('.faq__item');

  /* ---------- Header Scroll Shadow ---------- */
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    /* Shadow on scroll */
    if (scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    /* CTA reveal — show after scrolling past hero (~500px) */
    const headerCta = header.querySelector('.header__cta');
    if (headerCta && !headerCta.classList.contains('header__cta--visible')) {
      if (scrollY > 500) {
        headerCta.classList.add('header__cta--visible');
      } else {
        headerCta.classList.remove('header__cta--visible');
      }
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load

  /* ---------- Mobile Menu ---------- */
  function openMobileMenu() {
    menuToggle.classList.add('header__toggle--open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('mobile-nav--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuToggle.classList.remove('header__toggle--open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('mobile-nav--open');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('mobile-nav--open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    /* Close mobile nav on link click */
    mobileNav.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', function () {
        closeMobileMenu();
      });
    });
  }

  /* ---------- Contact Modal ---------- */
  function openModal() {
    modalOverlay.classList.add('modal-overlay--open');
    document.body.style.overflow = 'hidden';
    closeMobileMenu();

    /* Focus first input after transition */
    setTimeout(function () {
      var firstInput = modalOverlay.querySelector('input, textarea, select');
      if (firstInput) firstInput.focus();
    }, 350);
  }

  function closeModal() {
    modalOverlay.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  closeModalBtns.forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  /* Close on overlay click */
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  /* Form submission */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('.form__submit');
      var originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#5c6b4f';
        submitBtn.style.borderColor = '#5c6b4f';

        setTimeout(function () {
          closeModal();
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
        }, 1800);
      }, 1200);
    });
  }

  /* ---------- FAQ Accordion ---------- */
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq__item--open');

      /* Close all */
      faqItems.forEach(function (other) {
        other.classList.remove('faq__item--open');
        var otherBtn = other.querySelector('.faq__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      /* Toggle clicked */
      if (!isOpen) {
        item.classList.add('faq__item--open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        closeMobileMenu();
      }
    });
  });

})();

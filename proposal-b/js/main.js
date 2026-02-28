(() => {
  'use strict';

  // --- Header scroll shadow ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.classList.toggle('header--scrolled', scrollY > 10);
    lastScroll = scrollY;
  }, { passive: true });

  // --- Mobile menu ---
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('mobile-nav--open');
    mobileNav.classList.toggle('mobile-nav--open', !isOpen);
    menuToggle.classList.toggle('header__toggle--open', !isOpen);
    menuToggle.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // --- Contact modal ---
  const modal = document.getElementById('contactModal');

  function openModal() {
    modal.classList.add('modal-overlay--open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.querySelector('input')?.focus();
    }, 100);
  }

  function closeModal() {
    modal.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
  }

  // Open triggers
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNav?.classList.remove('mobile-nav--open');
      menuToggle?.classList.remove('header__toggle--open');
      document.body.style.overflow = '';
      openModal();
    });
  });

  // Close triggers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on overlay click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-overlay--open')) {
      closeModal();
    }
  });

  // --- Header CTA reveal on scroll past hero CTA ---
  const heroActions = document.querySelector('.hero__actions');
  const headerCta = document.querySelector('.header__cta');

  if (heroActions && headerCta) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        headerCta.classList.toggle('header__cta--visible', !entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-72px 0px 0px 0px' });

    heroObserver.observe(heroActions);
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isOpen = item.classList.contains('faq__item--open');

      // Close all items
      document.querySelectorAll('.faq__item--open').forEach(openItem => {
        openItem.classList.remove('faq__item--open');
        openItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('faq__item--open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

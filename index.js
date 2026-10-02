/**
 * KALVACHARLA SHIVASHANKAR - PORTFOLIO INTERACTION CONTROLLER
 * Zero external JS dependencies. Pure Vanilla JavaScript for GitHub Pages deployment.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Dynamic Current Year Injection
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Elements & Navigation State
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navAnchorElements = document.querySelectorAll('.nav-links a.nav-item');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item, .btn-nav-cta');

  // 3. Consolidated Scroll Controller via requestAnimationFrame
  let isTicking = false;

  const onScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar Glass Effect
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll-to-Top Button Visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active Section Spy
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navAnchorElements.forEach(anchor => {
          if (anchor.getAttribute('href') === `#${sectionId}`) {
            anchor.classList.add('active');
          } else {
            anchor.classList.remove('active');
          }
        });
      }
    });

    isTicking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(onScroll);
        isTicking = true;
      }
    },
    { passive: true }
  );

  // 4. Mobile Navigation Menu Toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 5. Scroll-to-Top Click Handler
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Smooth Anchor Scroll with Fixed Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Certificate Modal Controller
  const modal = document.getElementById('certModal');
  const certPdf = document.getElementById('certPdf');
  const openTabBtn = document.getElementById('downloadCertBtn');
  const closeBtn = document.querySelector('.close-modal');

  if (modal && certPdf && openTabBtn) {
    const openModal = fileUrl => {
      certPdf.src = fileUrl;
      openTabBtn.href = fileUrl;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeModal = () => {
      modal.style.display = 'none';
      certPdf.src = '';
      openTabBtn.href = '';
      document.body.style.overflow = ''; // Restore background scroll
    };

    document.querySelectorAll('.cert-card').forEach(card => {
      card.addEventListener('click', () => {
        const fileUrl = card.getAttribute('data-cert');
        if (fileUrl) openModal(fileUrl);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }
});
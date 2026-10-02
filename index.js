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

  // 2. Sticky Navbar Glass Effect
  const navbar = document.getElementById('navbar');
  const handleScrollNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollNavbar, { passive: true });

  // 3. Mobile Navigation Menu Toggle & Accessibility
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item, .btn-nav-cta');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('open');
    });

    // Close menu when navigation link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 4. Scroll-to-Top Button Control
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const handleScrollTopBtnVisibility = () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleScrollTopBtnVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Active Section Detection on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navAnchorElements = document.querySelectorAll('.nav-links a.nav-item');

  const highlightCurrentSection = () => {
    const scrollY = window.pageYOffset;

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
  };
  window.addEventListener('scroll', highlightCurrentSection, { passive: true });

  // 6. Smooth Scroll Adjustment for Fixed Navbar Anchor Offsets
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
});
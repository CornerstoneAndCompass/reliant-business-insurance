// ============================================
// RELIANT BUSINESS INSURANCE - Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky header scroll effect ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // --- Mobile menu toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (mobileToggle && nav) {
    // Add phone and CTA to nav for mobile
    if (!nav.querySelector('.mobile-nav-phone')) {
      const phoneLink = document.createElement('a');
      phoneLink.href = 'tel:0389054753';
      phoneLink.className = 'mobile-nav-phone';
      phoneLink.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 03 8905 4753';
      nav.appendChild(phoneLink);
    }
    if (!nav.querySelector('.mobile-nav-cta')) {
      // Determine if we're on index or inside pages/
      const isSubpage = window.location.pathname.includes('/pages/');
      const contactHref = isSubpage ? 'contact.html' : 'pages/contact.html';
      const ctaLink = document.createElement('a');
      ctaLink.href = contactHref;
      ctaLink.className = 'btn btn--primary btn--lg mobile-nav-cta';
      ctaLink.innerHTML = 'Get a Free Quote <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      nav.appendChild(ctaLink);
    }

    mobileToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      mobileToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Toggle dropdown on mobile
    const dropdown = nav.querySelector('.nav__dropdown');
    if (dropdown) {
      const dropdownLink = dropdown.querySelector('.nav__link');
      dropdownLink.addEventListener('click', (e) => {
        if (nav.classList.contains('nav--open')) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }

    // Close mobile menu when clicking a nav link (not dropdown parent)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        // Don't close if it's the dropdown parent toggle
        if (link.closest('.nav__dropdown') && link === link.closest('.nav__dropdown').querySelector('.nav__link')) return;
        if (nav.classList.contains('nav--open')) {
          nav.classList.remove('nav--open');
          mobileToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
          if (dropdown) dropdown.classList.remove('open');
        }
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Open clicked if it wasn't active
      if (!wasActive) item.classList.add('active');
    });
  });

  // --- Scroll animations (Intersection Observer) ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // --- Counter animation ---
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current) + suffix;
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Form validation (contact page) ---
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple visual feedback
      const btn = form.querySelector('.btn');
      const origText = btn.innerHTML;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
      btn.style.background = '#2EAB4B';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

});

// --- Add animate-on-scroll styles ---
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
  .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
  .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

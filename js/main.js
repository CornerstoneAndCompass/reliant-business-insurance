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
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      mobileToggle.classList.toggle('active');
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
  .nav--open { display: flex !important; position: fixed; top: 80px; left: 0; right: 0; bottom: 0; background: white; flex-direction: column; padding: 24px; gap: 8px; z-index: 999; }
`;
document.head.appendChild(style);

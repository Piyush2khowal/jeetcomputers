/* ==========================================================
   JEET COMPUTERS - script.js (vanilla JavaScript)
   1 Mobile menu · 2 Hero slider · 3 Active nav link ·
   4 Animated counters · 5 Contact form · 6 Footer year
   ========================================================== */
(function () {
  'use strict';

  /* ---------- Settings you can edit ---------- */
  var SLIDE_INTERVAL = 5000;   // time between slides in milliseconds (5 seconds)
  var COUNTER_DURATION = 2000; // how long the numbers take to count up
  var CONTACT_EMAIL = 'info@example.com'; // where the contact form sends mail

  /* ==========================================================
     1. MOBILE MENU
     ========================================================== */
  var menuToggle = document.getElementById('menu-toggle');
  var mainNav = document.getElementById('main-nav');

  function setMenu(open) {
    mainNav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      setMenu(!mainNav.classList.contains('is-open'));
    });

    // Close the menu after choosing a link
    mainNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); }
    });

    // Close with the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setMenu(false); }
    });

    // Reset when the window grows back to desktop size
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) { setMenu(false); }
    });
  }

  /* ==========================================================
     2. HERO SLIDER
     Auto-plays, previous/next buttons, dots, swipe, keyboard.
     ========================================================== */
  var hero = document.getElementById('home');
  var slides = hero ? hero.querySelectorAll('.slide') : [];
  var dots = hero ? hero.querySelectorAll('.dot') : [];
  var prevBtn = document.getElementById('slide-prev');
  var nextBtn = document.getElementById('slide-next');
  var current = 0;
  var timer = null;

  function showSlide(index) {
    if (!slides.length) { return; }
    current = (index + slides.length) % slides.length; // wraps around both ways

    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach(function (dot, i) {
      var active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(function () { showSlide(current + 1); }, SLIDE_INTERVAL);
  }

  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  if (slides.length) {
    showSlide(0);
    startAutoplay();

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { showSlide(current - 1); startAutoplay(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () { showSlide(current + 1); startAutoplay(); });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showSlide(i); startAutoplay(); });
    });

    // Pause while the visitor hovers or focuses inside the slider
    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
    hero.addEventListener('focusin', stopAutoplay);
    hero.addEventListener('focusout', startAutoplay);

    // Pause when the browser tab is hidden
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stopAutoplay(); } else { startAutoplay(); }
    });

    // Left / right arrow keys while the slider has focus
    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { showSlide(current - 1); startAutoplay(); }
      if (e.key === 'ArrowRight') { showSlide(current + 1); startAutoplay(); }
    });

    // Touch swipe on phones and tablets
    var touchStartX = 0;
    hero.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) {
        showSlide(diff < 0 ? current + 1 : current - 1);
        startAutoplay();
      }
    }, { passive: true });
  }

  /* ==========================================================
     3. ACTIVE NAV LINK (highlights the section being viewed)
     ========================================================== */
  var navLinks = document.querySelectorAll('.nav-link');
  var sectionIds = ['home', 'about', 'services', 'experience', 'contact'];

  if ('IntersectionObserver' in window && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }); // triggers near the middle of the screen

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) { navObserver.observe(section); }
    });
  }

  /* ==========================================================
     4. ANIMATED COUNTERS (Intersection Observer)
     Starts from 0 when the Experience section scrolls into view.
     ========================================================== */
  var counters = document.querySelectorAll('.counter');

  function formatFinal(el) {
    return el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;

    function step(timestamp) {
      if (start === null) { start = timestamp; }
      var progress = Math.min((timestamp - start) / COUNTER_DURATION, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // starts fast, slows down at the end
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) { requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (counters.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // run only once
          }
        });
      }, { threshold: 0.4 });

      counters.forEach(function (el) {
        el.textContent = '0' + (el.getAttribute('data-suffix') || '');
        counterObserver.observe(el);
      });
    } else {
      // Fallback: show final numbers straight away
      counters.forEach(function (el) { el.textContent = formatFinal(el); });
    }
  }

  /* ==========================================================
     5. CONTACT FORM
     Validates, then opens the visitor's email app with the
     message filled in (no server needed).
     ========================================================== */
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');

  function setError(input, message) {
    var field = input.closest('.field');
    var errorEl = form.querySelector('[data-error-for="' + input.id + '"]');
    field.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorEl) { errorEl.textContent = message || ''; }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('cf-name');
      var emailInput = document.getElementById('cf-email');
      var messageInput = document.getElementById('cf-message');
      var valid = true;

      if (!nameInput.value.trim()) {
        setError(nameInput, 'Enter your name.'); valid = false;
      } else { setError(nameInput, ''); }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        setError(emailInput, 'Enter a valid email address.'); valid = false;
      } else { setError(emailInput, ''); }

      if (!messageInput.value.trim()) {
        setError(messageInput, 'Write a short message.'); valid = false;
      } else { setError(messageInput, ''); }

      if (!valid) {
        statusEl.textContent = '';
        return;
      }

      var subject = 'Website enquiry from ' + nameInput.value.trim();
      var body = messageInput.value.trim() +
        '\n\nName: ' + nameInput.value.trim() +
        '\nEmail: ' + emailInput.value.trim();

      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      statusEl.textContent = 'Your email app should open with the message ready to send.';
      form.reset();
    });
  }

  /* ==========================================================
     6. FOOTER YEAR (keeps the copyright year current)
     ========================================================== */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

})();

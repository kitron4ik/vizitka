// Scroll-reveal for elements marked .reveal
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
  );
  items.forEach(function (el) { io.observe(el); });
})();

// Close-to-instant reveal for anything already in the first viewport on load
window.addEventListener('load', function () {
  document.querySelectorAll('.reveal').forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) el.classList.add('in');
  });
});

// Mobile menu toggle
(function () {
  var nav = document.querySelector('.site-nav');
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('mobileMenu');
  if (!nav || !burger || !menu) return;

  function closeMenu() {
    nav.classList.remove('menu-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    nav.classList.add('menu-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
  }

  burger.addEventListener('click', function () {
    if (nav.classList.contains('menu-open')) closeMenu();
    else openMenu();
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close automatically if the viewport grows back to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) closeMenu();
  });
})();

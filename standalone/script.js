document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for the fixed navbar
        const headerOffset = 80;
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

// Intersection Observer for Premium Section Reveals
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-reveal-hidden');
        sectionObserver.observe(section);
    });
});

// Scroll Progress & Navbar Glow Logic
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    
    // Calculate scroll percentage
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }
    
    // Add dynamic glow to navbar on scroll
    if (window.scrollY > 100) {
        navbar.classList.add('nav-scrolled-glow');
    } else {
        navbar.classList.remove('nav-scrolled-glow');
    }

    // High-End Parallax Logic
    const hero = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const scrollPos = window.scrollY;

    if (hero && scrollPos < window.innerHeight) {
        // Background moves at 40% speed
        hero.style.backgroundPositionY = (scrollPos * 0.4) + 'px';
        
        // Content drifts and fades slightly for depth
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPos * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrollPos / 800);
        }
    }
});

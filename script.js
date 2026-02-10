// Toggle menu hamburger
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ============ ANIMATIONS AU SCROLL (AOS) ============
// Observer pour les animations au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

// Observer tous les éléments avec data-aos
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Ajouter un délai aux éléments avec data-aos-delay
  animatedElements.forEach(el => {
    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
      el.style.transitionDelay = delay + 'ms';
    }
  });
});

// ============ EFFET DE PARALLAXE SUR LES SECTIONS ============
//window.addEventListener('scroll', () => {
  //const scrolled = window.pageYOffset;
  //const parallaxElements = document.querySelectorAll('.section__pic-container');
  
  //parallaxElements.forEach(element => {
    //const speed = 0.5;
    //element.style.transform = `translateY(${scrolled * speed}px)`;
  //});
//});

// ============ EFFET 3D SUR LES CARTES AU MOUVEMENT DE LA SOURIS ============
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============ SMOOTH SCROLL POUR LES LIENS DE NAVIGATION ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============ ANIMATION DU GRADIENT DE TEXTE ============
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(text => {
  text.style.backgroundSize = '200% 200%';
});

// ============ EFFET DE TYPING SUR LE TEXTE D'INTRODUCTION ============
const typingText = document.querySelector('.typing-effect');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Démarrer l'animation après un court délai
  setTimeout(typeWriter, 500);
}

// ============ ANIMATION DES COMPÉTENCES AU SCROLL ============
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

skillItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'all 0.5s ease';
  skillObserver.observe(item);
});

// ============ EFFET DE GLOW SUR LA NAVIGATION AU SCROLL ============
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  const nav = document.querySelector('nav');
  
  if (currentScroll > 100) {
    nav.style.boxShadow = '0 8px 40px rgba(255, 105, 180, 0.3)';
  } else {
    nav.style.boxShadow = '0 4px 30px rgba(255, 105, 180, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// ============ ANIMATION DES BOUTONS ============
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ============ PARTICULES INTERACTIVES ============
const particles = document.querySelectorAll('.particle');
particles.forEach(particle => {
  // Taille aléatoire pour chaque particule
  const size = Math.random() * 6 + 4;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  // Position verticale de départ aléatoire
  particle.style.top = Math.random() * 100 + '%';
});

// ============ EFFET DE GLOW SUR L'IMAGE DE PROFIL ============
const profileImg = document.querySelector('.profile-glow');
if (profileImg) {
  profileImg.addEventListener('mouseenter', () => {
    profileImg.style.transform = 'scale(1.05)';
  });
  
  profileImg.addEventListener('mouseleave', () => {
    profileImg.style.transform = 'scale(1)';
  });
}

// ============ COMPTEUR D'ANIMATION POUR LES STATISTIQUES ============
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ============ LAZY LOADING DES IMAGES ============
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ============ EFFET DE CURSOR PERSONNALISÉ (OPTIONNEL) ============
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Ferme le menu quand on clique sur un lien
document.querySelectorAll('.menu-links a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.remove("open");
    icon.classList.remove("open");
  });
});

// Ajouter le style du cursor
const style = document.createElement('style');
style.textContent = `
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #FF1493;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    mix-blend-mode: difference;
    display: none; /* Désactivé par défaut, activez en changeant en 'block' */
  }
`;
document.head.appendChild(style);

console.log('✨ Animations chargées avec succès!');

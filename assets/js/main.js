/**
 * MUHAMMAD ATEEQ - PORTFOLIO INTERACTIVITY
 * Clean Architecture Modular JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  });

  // 2. Navbar Scroll Effect & Active Link Tracking
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Dynamic Scroll-Morphing Background Controller
  const bgSlideHero = document.getElementById('bg-slide-hero');
  const bgSlideServices = document.getElementById('bg-slide-services');
  const bgSlideSkills = document.getElementById('bg-slide-skills');
  const bgSlideProjects = document.getElementById('bg-slide-projects');
  const allBgSlides = [bgSlideHero, bgSlideServices, bgSlideSkills, bgSlideProjects].filter(Boolean);
  let currentActiveSlideId = 'bg-slide-hero';

  function updateScrollBackground(sectionId) {
    let targetSlideId = 'bg-slide-hero';

    if (sectionId === 'services') {
      targetSlideId = 'bg-slide-services';
    } else if (sectionId === 'skills') {
      targetSlideId = 'bg-slide-skills';
    } else if (sectionId === 'projects' || sectionId === 'experience' || sectionId === 'contact') {
      targetSlideId = 'bg-slide-projects';
    } else {
      targetSlideId = 'bg-slide-hero';
    }

    if (targetSlideId !== currentActiveSlideId) {
      currentActiveSlideId = targetSlideId;
      allBgSlides.forEach(slide => {
        if (slide.id === targetSlideId) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting & Background Morphing
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Morph background to match current developer section
    updateScrollBackground(current);
  });

  // 3. Mobile Navigation Drawer (Off-Canvas)
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu && navMenu.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 4. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  // 5. Dynamic Typing Effect in Hero
  const typewriterElement = document.getElementById('typewriter-text');
  const roles = [
    'ASP.NET Core & MVC Developer',
    'RESTful APIs & FastAPI Engineer',
    'Python & Django Developer',
    'C# & SQL Server Specialist',
    'Full-Stack Web & Software Engineer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingDelay);
  }

  typeEffect();

  // 6. Photo Switcher (Cycling through executive, office & portraits)
  const togglePhotoBtn = document.getElementById('toggle-photo-btn');
  const portraitImg = document.getElementById('main-portrait-img');
  const photoTitle = document.getElementById('current-photo-title');

  const photoGallery = [
    {
      src: 'assets/images/ateeq-nextgenz-executive.png',
      title: 'NextGenZ Executive (.NET)',
      btnText: 'View Workspace'
    },
    {
      src: 'assets/images/ateeq-nextgenz-office.png',
      title: 'NextGenZ Workspace View',
      btnText: 'View Executive Desk'
    }
  ];

  let currentPhotoIndex = 0;

  if (togglePhotoBtn && portraitImg) {
    togglePhotoBtn.addEventListener('click', () => {
      currentPhotoIndex = (currentPhotoIndex + 1) % photoGallery.length;
      const nextPhoto = photoGallery[currentPhotoIndex];
      
      portraitImg.style.opacity = '0.4';
      portraitImg.style.transition = 'opacity 0.25s ease';

      setTimeout(() => {
        portraitImg.src = nextPhoto.src;
        if (photoTitle) photoTitle.textContent = nextPhoto.title;
        togglePhotoBtn.innerHTML = `<i class="fas fa-images"></i> <span>${nextPhoto.btnText}</span>`;
        portraitImg.style.opacity = '1';
      }, 200);
    });
  }

  // 7. Interactive Project Category Filtering
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Animated Counters for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  function countUp(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1800;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        statNumbers.forEach(stat => countUp(stat));
        hasCounted = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 9. Contact Form Handler (Supports Direct Email & WhatsApp)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Build Mailto Link
      const mailtoUrl = `mailto:ateeqgiloti1235@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Hi Muhammad Ateeq,\n\n' + message + '\n\nFrom: ' + name + ' (' + email + ')')}`;

      // Open email client
      window.location.href = mailtoUrl;

      // Show feedback
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Opening your email client to send message to Ateeq!';
        formFeedback.style.display = 'flex';
      }
    });

    // WhatsApp Direct Send Button
    const whatsappBtn = document.getElementById('whatsapp-send-btn');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const name = document.getElementById('contact-name').value.trim() || 'Recruiter/Visitor';
        const message = document.getElementById('contact-message').value.trim() || 'Hello Ateeq, I viewed your portfolio and would like to connect with you regarding opportunities.';
        const waUrl = `https://wa.me/923159288036?text=${encodeURIComponent('Hi Ateeq, I am ' + name + '.\n\n' + message)}`;
        window.open(waUrl, '_blank');
      });
    }
  }

  // 10. Project Image Lightbox Modal
  const modalOverlay = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const previewBtns = document.querySelectorAll('.preview-btn');

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute('data-img');
      const caption = btn.getAttribute('data-title');
      if (modalOverlay && modalImg) {
        modalImg.src = imgSrc;
        if (modalCaption) modalCaption.textContent = caption;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  // 10.B Rich Project Details Modal System
  const projectModal = document.getElementById('project-details-modal');
  const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
  const closeProjectFooterBtn = document.getElementById('modal-close-footer-btn');
  const modalProjectImg = document.getElementById('modal-project-img');
  const modalBadgesStrip = document.getElementById('modal-badges-strip');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectSubtitle = document.getElementById('modal-project-subtitle');
  const modalProjectDesc = document.getElementById('modal-project-desc');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const modalWalkthroughCta = document.getElementById('modal-walkthrough-cta');

  const projectsData = {
    'bkmc': {
      title: 'BKMC Hospital Management System (HMIS)',
      subtitle: 'Bacha Khan Medical Complex Healthcare Information System',
      image: 'assets/images/bkmc-hospital.jpg',
      status: 'Active Development',
      statusClass: 'status-cyan',
      description: 'Comprehensive enterprise healthcare software engineered for Bacha Khan Medical Complex (BKMC). Built with Clean Architecture, it manages end-to-end hospital operations including Electronic Medical Records (EMR), OPD patient queue tokening, doctor appointment scheduling, pathology laboratory test workflows, and patient bed allocation.',
      features: [
        'Real-time OPD patient queue tokening & live consultation tracking',
        'Integrated Pathology Lab test report generation with electronic medical records (EMR)',
        'Clinical workload analytics & multi-department doctor scheduling',
        'Role-Based Access Control (RBAC) ensuring clinical data privacy standards'
      ],
      tags: ['ASP.NET Core', 'C#', 'SQL Server', 'Entity Framework Core', 'REST APIs', 'Clean Architecture', 'Healthcare HMIS']
    },
    'vision-exam': {
      title: 'Vision Exam: AI-powered Online Proctoring',
      subtitle: 'Final Year Capstone: Intelligent Remote Examination Monitoring',
      image: 'assets/images/vision-exam.jpg',
      status: 'Final Year Project',
      statusClass: 'status-emerald',
      description: 'An intelligent remote examination monitoring system engineered with a hybrid microservices architecture. It combines an ASP.NET Core enterprise management backend with high-performance, asynchronous FastAPI (Python) microservices for low-latency facial tracking, gaze deviation alerts, and multi-face audio telemetry.',
      features: [
        'High-throughput async FastAPI microservice for real-time computer vision & audio analysis',
        'Real-time multi-face, unauthorized object, and screen anomaly detection alerts',
        'Secure proctor command dashboard with candidate telemetry and ASP.NET Core REST APIs',
        'Automated proctoring session recording and tamper-proof grading audit logs'
      ],
      tags: ['ASP.NET Core', 'FastAPI (Python)', 'C#', 'OpenCV', 'SQL Server', 'Microservices', 'AI Proctoring']
    },
    'apex-minerals': {
      title: 'Apex Minerals: Supply & Mining ERP',
      subtitle: 'Industrial Supply Chain & Mineral Inventory ERP',
      image: 'assets/images/apex-minerals.jpg',
      status: 'Industrial ERP',
      statusClass: 'status-amber',
      description: 'An industrial enterprise resource planning (ERP) platform developed for Apex Minerals. Automates mineral inventory volume tracking (copper, coal, quartz, limestone), purchase order lifecycles, active shipment logistics tracking, and commercial sales analytics.',
      features: [
        'Multi-mineral stock volume gauges and real-time inventory depletion tracking',
        'Live shipment logistics map with global port ETA monitoring',
        'Purchase order lifecycle management with automated invoice generations',
        'Automated mineral grade compliance reporting and commercial export logs'
      ],
      tags: ['ASP.NET Core', 'C#', 'SQL Server', 'EF Core', 'Logistics Engine', 'Industrial ERP']
    },
    'university-cafeteria': {
      title: 'University Cafeteria POS & Meal System',
      subtitle: 'UniCafé - Smart Campus Dining & Digital Wallet POS',
      image: 'assets/images/university-cafeteria.jpg',
      status: 'Campus POS',
      statusClass: 'status-emerald',
      description: 'A modern campus dining and Point-of-Sale (POS) management web solution. Facilitates digital food catalog browsing, live kitchen order queuing, student digital meal wallet balance management, and real-time canteen sales analytics.',
      features: [
        'Interactive food menu card catalog with quick add-to-cart POS workflow',
        'Student digital RFID/ID meal card wallet with instant balance deduction',
        'Live kitchen order status board (Ready, Preparing, Pending)',
        'End-of-day sales auditing, revenue reporting, and ingredient inventory warnings'
      ],
      tags: ['ASP.NET MVC', 'C#', 'SQL Server', 'Digital Wallet', 'Billing Engine', 'Bootstrap']
    },
    'e-marking': {
      title: 'E-Marking Examination System',
      subtitle: 'Digital Evaluation Platform for Educational Boards',
      image: 'assets/images/e-marking.jpg',
      status: 'Enterprise Security',
      statusClass: 'status-cyan',
      description: 'A digital paper evaluation and mark allocation platform designed for educational institutions. Streamlines the grading workflow with question rubrics, double-blind grading protocols, and automatic score calculations.',
      features: [
        'Role-based access control (Admin, Head Examiner, Marker)',
        'Automated marks tallying preventing human calculation errors',
        'Statistical performance charts and audit logs in SQL Server',
        'Double-blind candidate identification masking for unbiased grading'
      ],
      tags: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server', 'RBAC Security']
    },
    'js-marking': {
      title: 'Interactive JS Paper Marking Engine',
      subtitle: 'High-Performance Client-Side Scoring Application',
      image: 'assets/images/js-marking.jpg',
      status: 'High Performance',
      statusClass: 'status-amber',
      description: 'A fast, client-side interactive evaluation application allowing examiners to review handwritten and digital student responses with live score sliders, question checklists, and instant feedback annotations.',
      features: [
        'Interactive visual rubric assessment sliders and checks',
        'Zero-lag responsive interface with intuitive keyboard shortcuts',
        'Real-time score calculation and structured JSON payload export',
        'Instant offline evaluation caching via browser localStorage'
      ],
      tags: ['JavaScript (ES6+)', 'HTML5 / CSS3', 'Rubric Engine', 'Dynamic UI']
    }
  };

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    if (modalProjectImg) modalProjectImg.src = data.image;
    if (modalProjectTitle) modalProjectTitle.textContent = data.title;
    if (modalProjectSubtitle) modalProjectSubtitle.textContent = data.subtitle;
    if (modalProjectDesc) modalProjectDesc.textContent = data.description;

    if (modalBadgesStrip) {
      modalBadgesStrip.innerHTML = `
        <span class="project-status-pill ${data.statusClass}">${data.status}</span>
        <span class="project-nda-pill"><i class="fas fa-shield-halved"></i> Private Repo (NDA)</span>
      `;
    }

    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = data.features.map(f => `
        <li><i class="fas fa-circle-check"></i> <span>${f}</span></li>
      `).join('');
    }

    if (modalTechTags) {
      modalTechTags.innerHTML = data.tags.map(t => `
        <span class="tech-tag">${t}</span>
      `).join('');
    }

    if (modalWalkthroughCta) {
      modalWalkthroughCta.setAttribute('data-project', data.title);
    }

    projectModal.style.display = 'flex';
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const projectModal = document.getElementById('project-details-modal');
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  window.openProjectModal = openProjectModal;
  window.closeProjectModal = closeProjectModal;

  // Attach click listener on all "View Details" buttons (delegated fallback)
  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.btn-view-details');
    if (viewBtn) {
      e.preventDefault();
      const projectId = viewBtn.getAttribute('data-project-id');
      if (projectId) openProjectModal(projectId);
    }
  });

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
  if (closeProjectFooterBtn) closeProjectFooterBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      if (modalOverlay) modalOverlay.classList.remove('active');
    }
  });

  // 11. Floating Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // 13. Private Repository Walkthrough Request Handler (Works for Cards & Modal)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.walkthrough-req-btn');
    if (!btn) return;

    e.preventDefault();
    const projectTitle = btn.getAttribute('data-project') || 'Enterprise Software';

    // Close modal if open
    closeProjectModal();

    const contactSubjectInput = document.getElementById('contact-subject');
    const contactMessageInput = document.getElementById('contact-message');

    if (contactSubjectInput) {
      contactSubjectInput.value = `Private Demo Request: ${projectTitle}`;
    }
    if (contactMessageInput) {
      contactMessageInput.value = `Hi Muhammad Ateeq,\n\nI am reviewing your portfolio and would like to request an architecture and code walkthrough of "${projectTitle}". Please let me know your availability for a brief call/meeting.`;
    }

    // Smooth scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (contactMessageInput) contactMessageInput.focus();
      }, 700);
    }
  });

  // 14. Animated Interactive Cyber Network / Particle Canvas (Video-like Living Motion)
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 70;
    const maxDistance = isMobile ? 95 : 135;

    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 0.8;
        const colors = ['#38bdf8', '#06b6d4', '#818cf8', '#c084fc'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }
});

// 14. CV View & Download Handler
window.downloadCvFile = function(e) {
  // Let native browser action download the exact file: Muhammad_Ateeq_CV.pdf
  // We do not intercept with blob URLs to guarantee the .pdf extension is preserved in Windows.
};


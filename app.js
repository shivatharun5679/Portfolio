/**
 * THARUNPRANAV RC - PORTFOLIO INTERACTION ENGINE
 * Features:
 * - Interactive Neural Synaptic Particle Canvas (Crimson, Ruby & White)
 * - Interactive Architecture Inspector for Enterprise RAG System
 * - Scrollspy & Active Navigation Tracking
 * - One-Click Clipboard with Accessible Toast Alerts
 * - Mobile Drawer Menu Toggle
 */

(function () {
  'use strict';

  // --- TOAST NOTIFICATIONS ---
  const toastEl = document.getElementById('toast');
  let toastTimeout = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.remove('hidden');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 3200);
  }

  // --- MOBILE NAVIGATION DRAWER ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      const newState = !isOpen;
      mobileMenuBtn.setAttribute('aria-expanded', String(newState));
      mobileNav.setAttribute('aria-hidden', String(!newState));

      if (newState) {
        mobileNav.classList.add('open');
      } else {
        mobileNav.classList.remove('open');
      }
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('open');
      });
    });
  }

  // --- CLIPBOARD COPY FUNCTIONALITY ---
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${textToCopy} to clipboard!`);
        }).catch(() => {
          showToast(`Failed to copy to clipboard`);
        });
      }
    });
  });

  // --- PROJECT 1: PIPELINE ARCHITECTURE INSPECTOR ---
  const pipeNodes = document.querySelectorAll('.pipe-node');
  const pipeDetailBox = document.getElementById('pipe-detail-box-1');

  const nodeDetails = {
    input: {
      title: 'Multi-Format Document Ingestion',
      text: 'Built a Multimodal Document Intelligence and OCR pipeline using RAG for PDFs, Word documents, images, smartphone camera images, scanned files, and various document formats.'
    },
    ocr: {
      title: 'Multimodal Vision & OCR Engine',
      text: 'Extracts structured text, tabular metrics, and visual tokens from unstructured documents, camera captures, and scans for downstream semantic tokenization.'
    },
    vector: {
      title: 'Semantic Vector Search & Embeddings',
      text: 'Developed an Enterprise RAG system with Embeddings and Vector Search for fast, context-grounded document retrieval from large knowledge bases.'
    },
    guardrails: {
      title: 'AI Guardrails & Source Citations',
      text: 'Implemented AI Guardrails and Source Citations to minimize hallucinations and ensure policy answers remain grounded in verified documents.'
    },
    chatbot: {
      title: 'Interactive RAG Chatbot & PDF Export',
      text: 'Built a Web-Based Interactive RAG Chatbot that retrieves answers in real time, with one-click PDF download of the complete Q&A conversation directly from the same interface.'
    }
  };

  if (pipeNodes.length > 0 && pipeDetailBox) {
    pipeNodes.forEach(node => {
      node.addEventListener('click', () => {
        pipeNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const key = node.getAttribute('data-node');
        const detail = nodeDetails[key];

        if (detail) {
          pipeDetailBox.innerHTML = `<span class="detail-label">${detail.title}:</span> <span class="detail-text">${detail.text}</span>`;
        }
      });
    });
  }

  // --- ACTIVE NAVBAR SCROLLSPY (IntersectionObserver) ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // --- INTERACTIVE NEURAL SYNAPSE PARTICLE CANVAS ---
  const canvas = document.getElementById('neural-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
        // Color distribution: 60% crimson red, 40% crisp white
        const isRed = Math.random() > 0.4;
        this.color = isRed ? '#e11d48' : '#ffffff';
        this.baseAlpha = isRed ? 0.65 : 0.45;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (subtle attraction)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 1) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.6;
            this.y += (dy / dist) * force * 0.6;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.baseAlpha;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 16000), 80);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#e11d48';
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) {
        requestAnimationFrame(renderLoop);
      }
    });

    function renderLoop() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      ctx.globalAlpha = 1;

      requestAnimationFrame(renderLoop);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Initialize
    resizeCanvas();
    renderLoop();
  }

  // Console message
  console.log(
    '%c THARUNPRANAV RC %c AI Solution Builder ',
    'background: #e11d48; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #0d0d12; color: #fff; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
})();

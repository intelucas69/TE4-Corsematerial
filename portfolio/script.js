/*
  Main site script — modular, commented, uses DOM API, events, loops and conditionals.
  Features:
  - Mobile menu toggle (existing)
  - Theme (dark/light) toggle persisted in localStorage
  - Dynamic project rendering (array -> DOM)
  - Contact form validation + simulated submit
  - Scroll reveal using IntersectionObserver
  - Back-to-top button
*/
(function () {
  // ----- State & selectors -----
  const btnMenu = document.getElementById("menu-toggle");
  const header = document.querySelector(".site-header");
  const btnTheme = document.getElementById("theme-toggle");
  const backToTop = document.getElementById("back-to-top");
  const projectsContainerHome = document.getElementById("featured-projects");
  const projectsContainerAll = document.getElementById("projects-list");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // ---- Utilities ----
  function qs(selector, ctx = document) {
    return ctx.querySelector(selector);
  }
  function qsa(selector, ctx = document) {
    return Array.from(ctx.querySelectorAll(selector));
  }
  function el(tag, props = {}, children = []) {
    const e = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else e.setAttribute(k, v);
    });
    children.forEach((c) => e.appendChild(c));
    return e;
  }

  // ----- Theme (dark / light) -----
  const THEME_KEY = "site-theme";

  function applyTheme(theme) {
    // theme: 'dark' | 'light'
    document.documentElement.setAttribute("data-theme", theme);
    if (btnTheme) {
      btnTheme.setAttribute("aria-pressed", String(theme === "dark"));
      btnTheme.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    applyTheme(theme);
  }

  function toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  // ----- Mobile menu toggle -----
  function toggleMenu(open) {
    if (!btnMenu || !header) return;
    const isOpen =
      typeof open === "boolean"
        ? open
        : !(btnMenu.getAttribute("aria-expanded") === "true");
    btnMenu.setAttribute("aria-expanded", String(isOpen));
    header.setAttribute("data-open", String(isOpen));
  }

  function initMenu() {
    if (!btnMenu || !header) return;
    btnMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    // close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !header.contains(e.target) &&
        header.getAttribute("data-open") === "true"
      ) {
        toggleMenu(false);
      }
    });
    // close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && header.getAttribute("data-open") === "true") {
        toggleMenu(false);
        btnMenu.focus();
      }
    });
  }

  // ----- Projects data + rendering -----
  const projects = [
    {
      id: "project-a",
      title: "Responsive App",
      desc: "Accessible, high-performance responsive app built with HTML/CSS/JS.",
      img: "./assets/images/kaihan.png",
      tags: ["HTML", "CSS", "JS"],
      link: "#project-a",
    },
    {
      id: "project-b",
      title: "Interactive UI",
      desc: "Lightweight UI components with state and animations (vanilla JS).",
      img: "./assets/images/leo.png",
      tags: ["JS", "UI", "Accessibility"],
      link: "#project-b",
    },
    {
      id: "project-c",
      title: "API Service",
      desc: "Small Node.js API for aggregation and simple auth workflows.",
      img: "./assets/images/moradi.png",
      tags: ["Node.js", "API"],
      link: "#project-c",
    },
  ];

  function createProjectCard(p) {
    const img = el("img", {
      class: "responsive",
      src: p.img,
      alt: `${p.title} thumbnail`,
    });
    const h4 = el("h4", {}, [document.createTextNode(p.title)]);
    const pdesc = el("p", {}, [document.createTextNode(p.desc)]);
    const link = el("a", { class: "card-link", href: p.link }, [
      document.createTextNode("Read more"),
    ]);
    const card = el("article", { class: "card", id: p.id }, []);
    card.appendChild(img);
    card.appendChild(h4);
    card.appendChild(pdesc);
    card.appendChild(link);
    return card;
  }

  function renderProjects(container, items = projects, limit = null) {
    if (!container) return;
    container.innerHTML = "";
    const toRender = typeof limit === "number" ? items.slice(0, limit) : items;
    toRender.forEach((p) => {
      container.appendChild(createProjectCard(p));
    });
  }

  // ----- Contact form validation & simulated submit -----
  function isValidEmail(email) {
    // simple, safe-ish email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    if (!contactForm) return;
    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const errors = [];
    if (name.length < 2) errors.push("Please enter your name (2+ chars).");
    if (!isValidEmail(email)) errors.push("Please enter a valid email.");
    if (message.length < 10)
      errors.push("Message should be at least 10 characters.");

    if (errors.length > 0) {
      if (formStatus) {
        formStatus.textContent = errors.join(" ");
        formStatus.style.color = "crimson";
      }
      return;
    }

    // show sending
    if (formStatus) {
      formStatus.textContent = "Sending…";
      formStatus.style.color = "";
    }

    // simulate network request
    setTimeout(() => {
      if (formStatus) {
        formStatus.textContent =
          "Thanks — message sent (simulation). I will reply soon.";
        formStatus.style.color = "green";
      }
      contactForm.reset();
    }, 800);
  }

  // ----- Scroll reveal (IntersectionObserver) -----
  function initReveal() {
    const els = qsa(".reveal-on-scroll");
    if (!els.length || !("IntersectionObserver" in window)) {
      // fallback: reveal immediately
      els.forEach((s) => s.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.12 }
    );
    els.forEach((s) => io.observe(s));
  }

  // ----- Back to top -----
  function initBackToTop() {
    if (!backToTop) return;
    function update() {
      if (window.scrollY > 360) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }
    window.addEventListener("scroll", update, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    update();
  }

  // ----- Init all -----
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMenu();
    initReveal();
    initBackToTop();

    // Theme toggle
    if (btnTheme) btnTheme.addEventListener("click", toggleTheme);

    // Render projects
    if (projectsContainerHome)
      renderProjects(projectsContainerHome, projects, 3);
    if (projectsContainerAll) renderProjects(projectsContainerAll, projects);

    // Contact form
    if (contactForm)
      contactForm.addEventListener("submit", handleContactSubmit);
  });
})();

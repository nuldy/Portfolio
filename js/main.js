/**
 * Premium Portfolio - Main JavaScript
 * Arnold Pramudita - UI/UX Designer & Developer
 *
 * Features:
 * - Theme Toggle (Light/Dark Mode)
 * - Smooth Scroll Navigation
 * - Navbar Scroll Effects
 * - Mobile Menu
 * - Scroll Reveal Animations
 * - Smooth Microinteractions
 */

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset from viewport edge
 * @returns {boolean} - Whether element is in viewport
 */
function isInViewport(element, offset = 100) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight - offset && rect.bottom >= 0;
}

// ============================================
// Theme Manager
// ============================================

const ThemeManager = {
  storageKey: "portfolio-theme",
  themes: {
    light: "light",
    dark: "dark",
  },

  /**
   * Initialize theme manager
   */
  init() {
    this.theme = this.getStoredTheme() || this.getPreferredTheme();
    this.applyTheme(this.theme);
    this.bindEvents();
  },

  /**
   * Get stored theme from localStorage
   * @returns {string|null} - Stored theme or null
   */
  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      return null;
    }
  },

  /**
   * Get preferred theme based on system preference
   * @returns {string} - Preferred theme
   */
  getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? this.themes.dark
      : this.themes.light;
  },

  /**
   * Apply theme to document
   * @param {string} theme - Theme to apply
   */
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.theme = theme;

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#111111" : "#A67D3B",
      );
    }
  },

  /**
   * Toggle between themes
   */
  toggle() {
    const newTheme =
      this.theme === this.themes.light ? this.themes.dark : this.themes.light;
    this.applyTheme(newTheme);

    try {
      localStorage.setItem(this.storageKey, newTheme);
    } catch (e) {
      // localStorage not available
    }
  },

  /**
   * Bind theme toggle events
   */
  bindEvents() {
    const toggleButton = document.getElementById("themeToggle");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => this.toggle());
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? this.themes.dark : this.themes.light);
        }
      });
  },
};

// ============================================
// Navigation Manager
// ============================================

const NavigationManager = {
  scrollThreshold: 50,

  /**
   * Initialize navigation manager
   */
  init() {
    this.navbar = document.getElementById("navbar");
    this.mobileMenuToggle = document.getElementById("mobileMenuToggle");
    this.mobileMenu = document.getElementById("mobileMenu");
    this.mobileMenuBack = document.getElementById("mobileMenuBack");
    this.navLinks = document.querySelectorAll(
      ".nav-link, .mobile-nav-link, .mobile-cta",
    );

    this.bindEvents();
    this.handleScroll();
  },

  /**
   * Bind navigation events
   */
  bindEvents() {
    // Scroll event for navbar styling
    window.addEventListener(
      "scroll",
      throttle(() => this.handleScroll(), 100),
    );

    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener("click", () =>
        this.toggleMobileMenu(),
      );
    }

    if (this.mobileMenuBack) {
      this.mobileMenuBack.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    }
    // Close mobile menu on link click
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu());
    });

    // Close mobile menu on outside click
    document.addEventListener("click", (e) => {
      if (this.mobileMenu && this.mobileMenu.classList.contains("active")) {
        if (
          !this.mobileMenu.contains(e.target) &&
          !this.mobileMenuToggle.contains(e.target)
        ) {
          this.closeMobileMenu();
        }
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) =>
        this.handleAnchorClick(e, anchor),
      );
    });
  },

  /**
   * Handle scroll event
   */
  handleScroll() {
    if (this.navbar) {
      if (window.scrollY > this.scrollThreshold) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }
    }
  },

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    if (this.mobileMenuToggle && this.mobileMenu) {
      this.mobileMenuToggle.classList.toggle("active");
      this.mobileMenu.classList.toggle("active");
      document.body.style.overflow = this.mobileMenu.classList.contains(
        "active",
      )
        ? "hidden"
        : "";
    }
  },

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (this.mobileMenuToggle && this.mobileMenu) {
      this.mobileMenuToggle.classList.remove("active");
      this.mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  /**
   * Handle anchor link click for smooth scroll
   * @param {Event} e - Click event
   * @param {HTMLAnchorElement} anchor - Anchor element
   */
  handleAnchorClick(e, anchor) {
    const href = anchor.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        this.smoothScrollTo(offsetTop, 800);
      }
    }
  },

  /**
   * Custom smooth scroll with easing
   * @param {number} targetPosition - Target scroll position
   * @param {number} duration - Animation duration in ms
   */
  smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    /**
     * Easing function - ease-in-out cubic
     * @param {number} t - Current time
     * @returns {number} - Eased value
     */
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    /**
     * Animation step
     * @param {number} currentTime - Current timestamp
     */
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  },
};

// ============================================
// Scroll Reveal Animation Manager
// ============================================

const ScrollRevealManager = {
  revealElements: [],
  observerOptions: {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  },

  /**
   * Initialize scroll reveal manager
   */
  init() {
    this.revealElements = document.querySelectorAll(".reveal-up");

    if ("IntersectionObserver" in window) {
      this.initObserver();
    } else {
      // Fallback for browsers without IntersectionObserver
      this.revealAll();
    }
  },

  /**
   * Initialize Intersection Observer
   */
  initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    this.revealElements.forEach((element) => {
      observer.observe(element);
    });
  },

  /**
   * Reveal single element
   * @param {HTMLElement} element - Element to reveal
   */
  revealElement(element) {
    element.classList.add("revealed");
  },

  /**
   * Reveal all elements (fallback)
   */
  revealAll() {
    this.revealElements.forEach((element) => {
      this.revealElement(element);
    });
  },
};

// ============================================
// Active Section Highlighter
// ============================================

const ActiveSectionHighlighter = {
  sections: [],
  navLinks: [],

  /**
   * Initialize active section highlighter
   */
  init() {
    this.sections = document.querySelectorAll("section[id]");
    this.navLinks = document.querySelectorAll(".nav-link");

    if (this.sections.length > 0) {
      this.bindEvents();
    }
  },

  /**
   * Bind scroll events
   */
  bindEvents() {
    window.addEventListener(
      "scroll",
      throttle(() => this.handleScroll(), 100),
    );
    this.handleScroll();
  },

  /**
   * Handle scroll to update active section
   */
  handleScroll() {
    const scrollPosition = window.scrollY + 150;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        this.setActiveLink(sectionId);
      }
    });
  },

  /**
   * Set active navigation link
   * @param {string} sectionId - Section ID
   */
  setActiveLink(sectionId) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  },
};

// ============================================
// Smooth Hover Effects
// ============================================

const HoverEffectsManager = {
  /**
   * Initialize hover effects
   */
  init() {
    this.initButtonEffects();
    this.initCardEffects();
    this.initLinkEffects();
  },

  /**
   * Initialize button hover effects
   */
  initButtonEffects() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--mouse-x", `${x}px`);
        button.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  },

  /**
   * Initialize card hover effects
   */
  initCardEffects() {
    const cards = document.querySelectorAll(
      ".project-card, .skill-category, .timeline-content",
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  },

  /**
   * Initialize link hover effects
   */
  initLinkEffects() {
    const links = document.querySelectorAll(".nav-link, .footer-nav a");

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        link.style.transition = "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      });
    });
  },
};

// ============================================
// Parallax Effects (Subtle)
// ============================================

const ParallaxManager = {
  elements: [],

  /**
   * Initialize parallax effects
   */
  init() {
    this.elements = document.querySelectorAll(
      ".hero-image-decoration, .hero-gradient",
    );

    if (this.elements.length > 0) {
      this.bindEvents();
    }
  },

  /**
   * Bind scroll events
   */
  bindEvents() {
    window.addEventListener(
      "scroll",
      throttle(() => this.handleScroll(), 16),
    );
  },

  /**
   * Handle scroll for parallax effect
   */
  handleScroll() {
    const scrollY = window.scrollY;

    this.elements.forEach((element, index) => {
      const speed = index === 0 ? 0.05 : 0.1;
      const yPos = scrollY * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  },
};

// ============================================
// Form & Input Effects
// ============================================

const InputEffectsManager = {
  /**
   * Initialize input effects
   */
  init() {
    // Add focus effects for any future form inputs
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement?.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        input.parentElement?.classList.remove("focused");
      });
    });
  },
};

// ============================================
// Performance Optimizer
// ============================================

const PerformanceOptimizer = {
  /**
   * Initialize performance optimizations
   */
  init() {
    this.lazyLoadImages();
    this.preloadCriticalAssets();
  },

  /**
   * Lazy load images
   */
  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback: load all images
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    }
  },

  /**
   * Preload critical assets
   */
  preloadCriticalAssets() {
    // Preload hero image if it exists
    const heroImage = document.querySelector(".hero-image");
    if (heroImage && heroImage.src) {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = heroImage.src;
      document.head.appendChild(preloadLink);
    }
  },
};

// ============================================
// Accessibility Manager
// ============================================

const AccessibilityManager = {
  /**
   * Initialize accessibility features
   */
  init() {
    this.handleKeyboardNavigation();
    this.handleFocusVisible();
    this.respectReducedMotion();
  },

  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Close mobile menu on Escape
      if (e.key === "Escape") {
        NavigationManager.closeMobileMenu();
      }
    });
  },

  /**
   * Handle focus visible for keyboard users
   */
  handleFocusVisible() {
    let lastInteractionWasMouse = false;

    document.addEventListener("mousedown", () => {
      lastInteractionWasMouse = true;
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        lastInteractionWasMouse = false;
      }
    });

    document.addEventListener("focusin", (e) => {
      if (lastInteractionWasMouse) {
        e.target.classList.add("focus-visible-mouse");
      } else {
        e.target.classList.remove("focus-visible-mouse");
      }
    });
  },

  /**
   * Respect user's reduced motion preference
   */
  respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add("reduced-motion");
    }

    prefersReducedMotion.addEventListener("change", (e) => {
      if (e.matches) {
        document.documentElement.classList.add("reduced-motion");
      } else {
        document.documentElement.classList.remove("reduced-motion");
      }
    });
  },
};

// ============================================
// Footer Year Update
// ============================================

const FooterManager = {
  /**
   * Initialize footer manager
   */
  init() {
    this.updateYear();
  },

  /**
   * Update copyright year
   */
  updateYear() {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  },
};

// ============================================
// Cursor Effects (Optional - Desktop Only)
// ============================================

const CursorEffectsManager = {
  cursor: null,
  cursorFollower: null,
  enabled: false,

  /**
   * Initialize cursor effects
   */
  init() {
    // Only enable on desktop with pointer
    if (
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth > 1024
    ) {
      this.createCursor();
      this.bindEvents();
      this.enabled = true;
    }
  },

  /**
   * Create custom cursor elements
   */
  createCursor() {
    // Disabled by default for premium feel
    // Can be enabled by uncommenting below
    /*
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        */
  },

  /**
   * Bind mouse events
   */
  bindEvents() {
    if (!this.enabled) return;

    document.addEventListener("mousemove", (e) => {
      if (this.cursor) {
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;
      }
    });
  },
};

// ============================================
// Initialize Application
// ============================================

const App = {
  /**
   * Initialize the application
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.bootstrap());
    } else {
      this.bootstrap();
    }
  },

  /**
   * Bootstrap all modules
   */
  bootstrap() {
    try {
      // Core functionality
      ThemeManager.init();
      NavigationManager.init();
      ScrollRevealManager.init();
      ActiveSectionHighlighter.init();

      // Effects
      HoverEffectsManager.init();
      ParallaxManager.init();
      InputEffectsManager.init();

      // Performance & Accessibility
      PerformanceOptimizer.init();
      AccessibilityManager.init();
      FooterManager.init();
      CursorEffectsManager.init();

      // Log initialization
      console.log("Portfolio initialized successfully");
    } catch (error) {
      console.error("Error initializing portfolio:", error);
    }
  },
};

// Start the application
App.init();

// ============================================
// Export modules for external use
// ============================================

window.PortfolioApp = {
  ThemeManager,
  NavigationManager,
  ScrollRevealManager,
  ActiveSectionHighlighter,
  HoverEffectsManager,
  ParallaxManager,
  PerformanceOptimizer,
  AccessibilityManager,
};

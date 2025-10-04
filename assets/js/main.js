document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 20) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
    lastScroll = currentScroll;
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");

  function toggleMobileMenu() {
    if (!mobileMenu || !menuIcon || !closeIcon) return;
    mobileMenu.classList.toggle("active");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Mobile Service Submenu Toggle
  const serviceBtnMobile = document.getElementById("serviceBtnMobile");
  const mobileServiceMenu = document.getElementById("mobileServiceMenu");
  const serviceArrow = document.getElementById("serviceArrow");

  if (serviceBtnMobile && mobileServiceMenu && serviceArrow) {
    serviceBtnMobile.addEventListener("click", () => {
      mobileServiceMenu.classList.toggle("active");
      serviceArrow.classList.toggle("rotate-180");
    });
  }

  // Close mobile menu when clicking on a link
  if (mobileMenu) {
    document.querySelectorAll("#mobileMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("active")) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Centered Service dropdown hover handling
  const serviceTrigger = document.getElementById("serviceTrigger");
  const serviceContainer = document.getElementById("serviceContainer");
  const serviceDropdown = document.getElementById("serviceDropdown");
  if (serviceContainer && serviceTrigger && serviceDropdown) {
    let overDropdown = false;
    let overTrigger = false;
    let closeTimer = null;

    const positionServiceDropdown = () => {
      const rect = serviceContainer.getBoundingClientRect();
      const top = rect.bottom + 8; // fixed position uses viewport coords
      serviceDropdown.style.top = `${top}px`;
    };
    const openService = () => {
      // Close More dropdown if open
      const md = document.getElementById("moreDropdown");
      const mt = document.getElementById("moreTrigger");
      if (md && md.classList.contains("open")) {
        md.classList.remove("open");
        if (mt) mt.setAttribute("aria-expanded", "false");
      }
      positionServiceDropdown();
      serviceDropdown.classList.add("open");
      serviceTrigger.setAttribute("aria-expanded", "true");
    };
    const maybeClose = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (!overDropdown && !overTrigger) {
          serviceDropdown.classList.remove("open");
          serviceTrigger.setAttribute("aria-expanded", "false");
        }
      }, 2000); // extra time to move cursor after scroll
    };

    // Container hover (covers trigger and its area)
    serviceContainer.addEventListener("mouseenter", () => {
      // Ensure More dropdown closes instantly when hovering Service
      const md = document.getElementById("moreDropdown");
      const mt = document.getElementById("moreTrigger");
      if (md && md.classList.contains("open")) {
        md.classList.remove("open");
        if (mt) mt.setAttribute("aria-expanded", "false");
      }
      overTrigger = true;
      openService();
      if (closeTimer) clearTimeout(closeTimer);
    });
    serviceContainer.addEventListener("mouseleave", () => {
      overTrigger = false;
      maybeClose();
    });

    // Keep open while moving on the trigger area
    serviceContainer.addEventListener("mousemove", () => {
      if (!serviceDropdown.classList.contains("open")) {
        openService();
      }
    });

    // Open on keyboard focus
    serviceTrigger.addEventListener("focus", () => {
      overTrigger = true;
      openService();
    });

    // Dropdown hover
    serviceDropdown.addEventListener("mouseenter", () => {
      overDropdown = true;
      openService();
      if (closeTimer) clearTimeout(closeTimer);
    });
    serviceDropdown.addEventListener("mouseleave", () => {
      overDropdown = false;
      maybeClose();
    });

    // Reposition on scroll/resize while open
    const repositionIfOpen = () => {
      if (serviceDropdown.classList.contains("open")) {
        positionServiceDropdown();
      }
    };
    window.addEventListener("scroll", repositionIfOpen, { passive: true });
    window.addEventListener("resize", repositionIfOpen);

    // Click-to-toggle fallback
    serviceTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (serviceDropdown.classList.contains("open")) {
        overTrigger = false;
        overDropdown = false;
        serviceDropdown.classList.remove("open");
      } else {
        openService();
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const withinTrigger = serviceTrigger.contains(e.target);
      const withinDropdown = serviceDropdown.contains(e.target);
      if (!withinTrigger && !withinDropdown) {
        serviceDropdown.classList.remove("open");
        overTrigger = false;
        overDropdown = false;
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        serviceDropdown.classList.remove("open");
        overTrigger = false;
        overDropdown = false;
      }
    });
  }

  // More dropdown hover handling (same as Service)
  const moreTrigger = document.getElementById("moreTrigger");
  const moreContainer = document.getElementById("moreContainer");
  const moreDropdown = document.getElementById("moreDropdown");
  if (moreContainer && moreTrigger && moreDropdown) {
    let overMoreDropdown = false;
    let overMoreTrigger = false;
    let moreCloseTimer = null;

    const positionMoreDropdown = () => {
      const rect = moreContainer.getBoundingClientRect();
      const top = rect.bottom + 8; // fixed position uses viewport coords
      moreDropdown.style.top = `${top}px`;
    };
    const openMoreDropdown = () => {
      // Close Service dropdown if open
      const sd = document.getElementById("serviceDropdown");
      const st = document.getElementById("serviceTrigger");
      if (sd && sd.classList.contains("open")) {
        sd.classList.remove("open");
        if (st) st.setAttribute("aria-expanded", "false");
      }
      positionMoreDropdown();
      moreDropdown.classList.add("open");
      moreTrigger.setAttribute("aria-expanded", "true");
    };
    const maybeCloseMore = () => {
      if (moreCloseTimer) clearTimeout(moreCloseTimer);
      moreCloseTimer = setTimeout(() => {
        if (!overMoreDropdown && !overMoreTrigger) {
          moreDropdown.classList.remove("open");
          moreTrigger.setAttribute("aria-expanded", "false");
        }
      }, 2000);
    };

    // Container hover
    moreContainer.addEventListener("mouseenter", () => {
      // Ensure Service dropdown closes instantly when hovering More
      const sd = document.getElementById("serviceDropdown");
      const st = document.getElementById("serviceTrigger");
      if (sd && sd.classList.contains("open")) {
        sd.classList.remove("open");
        if (st) st.setAttribute("aria-expanded", "false");
      }
      overMoreTrigger = true;
      openMoreDropdown();
      if (moreCloseTimer) clearTimeout(moreCloseTimer);
    });
    moreContainer.addEventListener("mouseleave", () => {
      overMoreTrigger = false;
      maybeCloseMore();
    });
    // Keep open while moving on trigger
    moreContainer.addEventListener("mousemove", () => {
      if (!moreDropdown.classList.contains("open")) {
        openMoreDropdown();
      }
    });

    // Dropdown hover
    moreDropdown.addEventListener("mouseenter", () => {
      overMoreDropdown = true;
      openMoreDropdown();
      if (moreCloseTimer) clearTimeout(moreCloseTimer);
    });
    moreDropdown.addEventListener("mouseleave", () => {
      overMoreDropdown = false;
      maybeCloseMore();
    });

    // Reposition on scroll/resize while open
    const repositionMoreIfOpen = () => {
      if (moreDropdown.classList.contains("open")) positionMoreDropdown();
    };
    window.addEventListener("scroll", repositionMoreIfOpen, { passive: true });
    window.addEventListener("resize", repositionMoreIfOpen);

    // Click to toggle dropdown (not modal)
    moreTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (moreDropdown.classList.contains("open")) {
        overMoreTrigger = false;
        overMoreDropdown = false;
        moreDropdown.classList.remove("open");
        moreTrigger.setAttribute("aria-expanded", "false");
      } else {
        openMoreDropdown();
      }
    });

    // Outside click closes
    document.addEventListener("click", (e) => {
      const withinTrigger = moreTrigger.contains(e.target);
      const withinDropdown = moreDropdown.contains(e.target);
      if (!withinTrigger && !withinDropdown) {
        moreDropdown.classList.remove("open");
        overMoreTrigger = false;
        overMoreDropdown = false;
        moreTrigger.setAttribute("aria-expanded", "false");
      }
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        moreDropdown.classList.remove("open");
        overMoreTrigger = false;
        overMoreDropdown = false;
        moreTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }
});

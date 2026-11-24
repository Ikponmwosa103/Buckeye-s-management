/**
 * Buckeye State Welding & Fabricating — Upgraded interactions
 */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const yearEl = document.getElementById("year");

// Current year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Sticky header shadow
window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("scrolled", window.scrollY > 12);
  },
  { passive: true }
);

// Mobile menu
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// Close mobile nav on link click
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    document.body.style.overflow = "";
  });
});

// Dropdown keyboard / mobile support
document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(".dropdown-trigger");
  trigger?.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("open");
      const open = dropdown.classList.contains("open");
      trigger.setAttribute("aria-expanded", String(open));
    }
  });
});

// Scroll progress bar
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
};
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// Progressive reveal
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(".reveal");

if (!motionQuery.matches && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

// Equipment tabs
const equipTabs = document.querySelectorAll(".equip-tab");
const equipPanels = {
  machining: document.getElementById("panel-machining"),
  cutting: document.getElementById("panel-cutting"),
  fab: document.getElementById("panel-fab"),
};
const equipVisual = document.getElementById("equip-visual");
const equipVisualLabel = document.getElementById("equip-visual-label");

const equipImages = {
  machining: {
    src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85",
    label: "INDUSTRIAL MACHINING",
  },
  cutting: {
    src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85",
    label: "PLATE PROCESSING",
  },
  fab: {
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    label: "FABRICATION SHOP",
  },
};

equipTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.tab;
    if (!key || !equipPanels[key]) return;

    equipTabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    Object.entries(equipPanels).forEach(([k, panel]) => {
      if (!panel) return;
      if (k === key) {
        panel.hidden = false;
        panel.classList.add("is-active");
      } else {
        panel.hidden = true;
        panel.classList.remove("is-active");
      }
    });

    // Swap visual
    const imgData = equipImages[key];
    if (imgData && equipVisual) {
      equipVisual.style.opacity = "0.4";
      setTimeout(() => {
        equipVisual.src = imgData.src;
        if (equipVisualLabel) equipVisualLabel.textContent = imgData.label;
        equipVisual.style.opacity = "1";
      }, 180);
    }
  });
});

// Quote form (demo only)
const quoteForm = document.getElementById("quoteForm");
quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = quoteForm.querySelector(".form-status");
  if (!quoteForm.reportValidity()) return;

  const file = quoteForm.elements.attachment?.files?.[0];
  if (file && file.size > 10 * 1024 * 1024) {
    status.textContent = "Please choose a file smaller than 10 MB.";
    status.style.color = "#dc2626";
    return;
  }

  status.textContent =
    "Thank you. This demonstration form has validated your details, but nothing has been sent to Buckeye.";
  status.style.color = "#059669";
  quoteForm.reset();
});

// Smooth active nav highlight (optional polish)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("[data-nav]");

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("is-active", href === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => navObserver.observe(s));
}

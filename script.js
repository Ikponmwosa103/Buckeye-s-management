const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const quoteForm = document.getElementById("quoteForm");
quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = quoteForm.querySelector(".form-status");
  if (!quoteForm.reportValidity()) return;

  const file = quoteForm.elements.attachment.files[0];
  if (file && file.size > 10 * 1024 * 1024) {
    status.textContent = "Please choose a file smaller than 10 MB.";
    status.style.color = "#b42318";
    return;
  }

  status.textContent = "Thank you. This demonstration form has validated your details, but nothing has been sent to Buckeye.";
  status.style.color = "#087b4e";
  quoteForm.reset();
});

// Progressive reveal, lightweight motion and reading progress.
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(
  ".about-visual, .about-copy, .section-heading, .service-card, .equipment-image, .equipment-list article, .portfolio-item, .benefit-grid article, .testimonial-layout, .quote-intro, .quote-form, .location-card"
);
if (!motionQuery.matches && "IntersectionObserver" in window) {
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => revealObserver.observe(element));
}
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
};
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

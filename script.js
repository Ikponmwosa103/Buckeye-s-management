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
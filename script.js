const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");
const currentYear = document.getElementById("currentYear");
const revealItems = document.querySelectorAll(".reveal");
let lastScrollY = window.scrollY;

currentYear.textContent = new Date().getFullYear();

function closeMenu() {
  mobileMenu.classList.add("hidden");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openModal() {
  privacyModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  privacyModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden");
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 120) {
    header.classList.add("header-hidden");
    closeMenu();
  } else {
    header.classList.remove("header-hidden");
  }
  lastScrollY = currentScrollY;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

revealItems.forEach((item) => observer.observe(item));

privacyOpen.addEventListener("click", openModal);
privacyClose.addEventListener("click", closeModal);
privacyModal.querySelector("[data-close-modal]").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMenu();
  }
});
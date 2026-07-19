const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Check saved theme or system preference
const savedTheme = localStorage.getItem("theme") || "auto";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const preferLight = window.matchMedia("(prefers-color-scheme: light)").matches;

// Set initial theme
function setTheme(theme) {
  if (theme === "light") {
    htmlElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else if (theme === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "auto");
  }
}

// Initialize theme
if (savedTheme === "light") {
  setTheme("light");
} else if (savedTheme === "dark") {
  setTheme("dark");
} else {
  setTheme("auto");
}

// Theme toggle handler
themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    setTheme("dark");
  } else if (currentTheme === "dark") {
    setTheme("auto");
  } else {
    setTheme("light");
  }
});

// Mobile Navigation
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !isExpanded);
  navLinks.classList.toggle("is-active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-active");
  });
});

// Animations
if (!reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.14 }
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-5px)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });

  const light = document.querySelector(".pointer-light");
  window.addEventListener("pointermove", (event) => {
    light.style.left = `${event.clientX}px`;
    light.style.top = `${event.clientY}px`;
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

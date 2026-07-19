const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  if (!themeToggle) {
    console.error("Theme toggle button not found");
    return;
  }

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("theme") || "auto";

  // Set initial theme
  function setTheme(theme) {
    console.log("Setting theme to:", theme);
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

  // Initialize theme on page load
  if (savedTheme === "light") {
    setTheme("light");
  } else if (savedTheme === "dark") {
    setTheme("dark");
  } else {
    setTheme("auto");
  }

  // Theme toggle handler
  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTheme = htmlElement.getAttribute("data-theme");
    console.log("Current theme:", currentTheme);
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

  if (navToggle && navLinks) {
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
  }
});

// Animations (can run before DOM fully loaded)
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
  
  // Observe elements as they load
  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  }, 100);

  document.addEventListener("DOMContentLoaded", () => {
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
    if (light) {
      window.addEventListener("pointermove", (event) => {
        light.style.left = `${event.clientX}px`;
        light.style.top = `${event.clientY}px`;
      });
    }
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  });
}

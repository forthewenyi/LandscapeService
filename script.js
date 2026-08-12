const PHONE_DIGITS = "15127920697";
const PHONE_DISPLAY = "512 792 0697";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll("[data-filter]");
const serviceFilterLinks = document.querySelectorAll("[data-service-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const compare = document.querySelector("[data-compare]");
const compareRange = document.querySelector("[data-compare-range]");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.textContent = isOpen ? "Menu" : "Close";
  nav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "Menu";
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min((index % 5) * 60, 240)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const setProjectFilter = (filter) => {
  filterButtons.forEach((button) => {
    const isSelected = button.dataset.filter === filter;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  projectCards.forEach((card) => {
    const shouldShow = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-filtered-out", !shouldShow);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setProjectFilter(button.dataset.filter));
});

serviceFilterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setProjectFilter(link.dataset.serviceFilter);
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  });
});

compareRange?.addEventListener("input", (event) => {
  compare?.style.setProperty("--compare-position", `${event.target.value}%`);
});

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const name = String(formData.get("name") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const details = String(formData.get("details") || "").trim();
  const message = [
    `Hi, my name is ${name}. I would like a quote for ${service}.`,
    `The property is at ${location}.`,
    details ? `Property details: ${details}.` : "",
    "I will attach yard photos to this text.",
  ]
    .filter(Boolean)
    .join(" ");

  const smsUrl = `sms:+${PHONE_DIGITS}?&body=${encodeURIComponent(message)}`;
  formStatus.innerHTML = `Your request is not sent yet. If your text app did not open, <a href="${smsUrl}">open a text to ${PHONE_DISPLAY}</a>.`;
  window.location.href = smsUrl;
});

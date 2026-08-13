document.documentElement.classList.add("js-enabled");

const PHONE_DIGITS = "15127920697";
const PHONE_DISPLAY = "512 792 0697";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll("[data-filter]");
const serviceFilterLinks = document.querySelectorAll("[data-service-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const featuredProjects = document.querySelector("[data-featured-projects]");
const projectGridKicker = document.querySelector("[data-project-grid-kicker]");
const projectGridTitle = document.querySelector("[data-project-grid-title]");
const projectGridSummary = document.querySelector("[data-project-grid-summary]");
const compareWidgets = document.querySelectorAll("[data-compare]");
const quoteForm = document.querySelector("[data-quote-form]");
const quoteSubmit = document.querySelector("[data-quote-submit]");
const formStatus = document.querySelector("[data-form-status]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const setMenuState = (isOpen) => {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  if (menuToggle) menuToggle.textContent = isOpen ? "Close" : "Menu";
  nav?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820 && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
  }
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
    const categories = card.dataset.category.split(/\s+/);
    const shouldShow = filter === "all" || categories.includes(filter);
    card.classList.toggle("is-filtered-out", !shouldShow);
    card.hidden = !shouldShow;
  });

  if (featuredProjects) {
    const hasVisibleFeaturedProject = [...featuredProjects.querySelectorAll("[data-category]")].some(
      (project) => !project.hidden
    );
    featuredProjects.hidden = !hasVisibleFeaturedProject;
  }

  const selectedButton = [...filterButtons].find((button) => button.dataset.filter === filter);
  const selectedLabel = selectedButton?.textContent.trim() || "Projects";
  if (projectGridKicker && projectGridTitle && projectGridSummary) {
    const showingAll = filter === "all";
    projectGridKicker.textContent = showingAll ? "More work + available services" : "Filtered by service";
    projectGridTitle.textContent = showingAll ? "Find a project like yours." : `${selectedLabel} work.`;
    projectGridSummary.textContent = showingAll
      ? "Choose a service above to narrow the gallery. Each project is labeled residential or commercial."
      : "Project photos appear where available. Services without photos are clearly labeled.";
  }
};

const requestedFilter = new URLSearchParams(window.location.search).get("filter");
if (requestedFilter && [...filterButtons].some((button) => button.dataset.filter === requestedFilter)) {
  setProjectFilter(requestedFilter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    setProjectFilter(filter);
    const nextUrl = new URL(window.location.href);
    if (filter === "all") nextUrl.searchParams.delete("filter");
    else nextUrl.searchParams.set("filter", filter);
    window.history.replaceState({}, "", nextUrl);
  });
});

serviceFilterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setProjectFilter(link.dataset.serviceFilter);
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  });
});

compareWidgets.forEach((widget) => {
  const range = widget.querySelector("[data-compare-range]");
  range?.addEventListener("input", (event) => {
    widget.style.setProperty("--compare-position", `${event.target.value}%`);
  });
});

const prepareQuoteText = (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const name = String(formData.get("name") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const services = formData
    .getAll("service")
    .map((service) => String(service).trim())
    .filter(Boolean);
  const details = String(formData.get("details") || "").trim();

  if (!name) {
    formStatus.textContent = "Enter your name to open the prepared quote text.";
    quoteForm.querySelector('[name="name"]')?.focus();
    return;
  }

  if (!location) {
    formStatus.textContent = "Enter the property ZIP or address.";
    quoteForm.querySelector('[name="location"]')?.focus();
    return;
  }

  if (!services.length) {
    formStatus.textContent = "Choose at least one service before opening your text.";
    quoteForm.querySelector('[name="service"]')?.focus();
    return;
  }

  const serviceSummary = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(services);
  const message = [
    `Hi, my name is ${name}. I would like a quote for ${serviceSummary}.`,
    `The property is at ${location}.`,
    details ? `Property details: ${details}.` : "",
    "I will attach yard photos to this text.",
  ]
    .filter(Boolean)
    .join(" ");

  const smsUrl = `sms:+${PHONE_DIGITS}?body=${encodeURIComponent(message)}`;
  formStatus.innerHTML = `Your request is not sent yet. If your text app did not open, <a href="${smsUrl}">open the prepared text to ${PHONE_DISPLAY}</a>.`;
  window.location.href = smsUrl;
};

quoteForm?.addEventListener("submit", prepareQuoteText);

quoteSubmit?.addEventListener("click", (event) => {
  prepareQuoteText(event);
});

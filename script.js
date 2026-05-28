const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");
const fallbackImages = document.querySelectorAll("img[data-fallback-src]");

fallbackImages.forEach((image) => {
  image.addEventListener(
    "error",
    () => {
      image.src = image.dataset.fallbackSrc;
    },
    { once: true }
  );
});

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  revealObserver.observe(item);
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const name = formData.get("name").trim();
  const service = formData.get("service");

  formStatus.textContent = `Thanks, ${name}. Your ${service.toLowerCase()} request is ready to send.`;
  quoteForm.reset();
});

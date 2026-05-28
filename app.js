const navToggle = document.querySelector("[data-nav-toggle]");
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

document.querySelectorAll("[data-mailto-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const subject = form.getAttribute("data-subject") || "PPIG Preceptorship Interest";
    const lines = [];

    for (const [key, value] of formData.entries()) {
      const cleanValue = String(value).trim();
      if (cleanValue) {
        lines.push(`${key}: ${cleanValue}`);
      }
    }

    const body = [
      "Hello PPIG,",
      "",
      "I am submitting interest for the Private Practice Preceptorship Program.",
      "",
      ...lines,
      "",
      "Thank you."
    ].join("\n");

    const note = form.querySelector("[data-form-note]");
    if (note) {
      note.textContent = "Opening an email draft with your responses. This static mockup does not store submissions.";
    }

    window.location.href = `mailto:ppigunthsc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

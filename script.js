const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = mainNav.querySelectorAll("a");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const hiddenSubmitFrame = document.querySelector("iframe[name='hiddenSubmitFrame']");
const submitButton = contactForm ? contactForm.querySelector("button[type='submit']") : null;
let isSubmitting = false;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
}

if (contactForm && submitButton && hiddenSubmitFrame) {
  contactForm.addEventListener("submit", () => {
    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.classList.remove("is-sent");
    submitButton.classList.add("is-sending");
    submitButton.textContent = "Enviando...";
  });

  hiddenSubmitFrame.addEventListener("load", () => {
    if (!isSubmitting) {
      return;
    }

    isSubmitting = false;
    submitButton.classList.remove("is-sending");
    submitButton.classList.add("is-sent");
    submitButton.textContent = "Enviado!";
    contactForm.reset();

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.classList.remove("is-sent");
      submitButton.textContent = "Enviar";
    }, 2500);
  });
}


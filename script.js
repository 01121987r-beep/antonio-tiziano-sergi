// Gestione interazioni leggere della landing page.
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealElements = document.querySelectorAll("[data-reveal]");
  const faqButtons = document.querySelectorAll(".faq-question");
  const contactForms = document.querySelectorAll(".contact-form");
  const modalTriggers = document.querySelectorAll("[data-open-modal]");
  const modal = document.querySelector(".modal");
  const modalCloseButtons = document.querySelectorAll("[data-close-modal]");
  const rotatingQuoteCard = document.querySelector(".portrait-caption");
  const rotatingQuoteText = document.querySelector(".rotating-quote-text");
  const rotatingQuoteAuthor = document.querySelector(".rotating-quote-author");
  const blogFilterButtons = document.querySelectorAll(".blog-filter-button");
  const blogCards = document.querySelectorAll(".blog-card");
  let lastFocusedElement = null;

  const rotatingQuotes = [
    {
      text: "Non si vede bene che col cuore. L'essenziale è invisibile agli occhi.",
      author: "Antoine de Saint-Exupery"
    },
    {
      text: "Chi guarda fuori sogna, chi guarda dentro si sveglia.",
      author: "Carl Gustav Jung"
    },
    {
      text: "Conoscere se stessi è l'inizio di ogni saggezza.",
      author: "Aristotele"
    },
    {
      text: "Non possiamo cambiare nulla finché non lo accettiamo.",
      author: "Carl Gustav Jung"
    },
    {
      text: "Ogni uomo porta in sé la forma intera della condizione umana.",
      author: "Michel de Montaigne"
    }
  ];

  const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 36);
  };

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  };

  const toggleMenu = () => {
    if (!menuToggle || !navMenu) return;
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("is-open", !isExpanded);
  };

  const openModal = (modalId, trigger) => {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;
    lastFocusedElement = trigger || document.activeElement;
    targetModal.classList.add("is-open");
    targetModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const firstField = targetModal.querySelector("input, textarea, button");
    firstField?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) {
        closeMenu();
      }
    });
  });

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-open-modal");
      if (!modalId) return;
      openModal(modalId, trigger);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("click", (event) => {
    if (!menuToggle || !navMenu) return;
    const target = event.target;
    if (
      target instanceof Node &&
      !navMenu.contains(target) &&
      !menuToggle.contains(target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) {
      closeModal();
    }
  });

  revealElements.forEach((element) => {
    const delay = element.getAttribute("data-delay");
    if (delay) {
      element.style.setProperty("--reveal-delay", `${delay}ms`);
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  if (rotatingQuoteCard && rotatingQuoteText && rotatingQuoteAuthor) {
    let currentQuoteIndex = 0;

    window.setInterval(() => {
      rotatingQuoteCard.classList.add("is-switching");

      window.setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % rotatingQuotes.length;
        rotatingQuoteText.textContent = rotatingQuotes[currentQuoteIndex].text;
        rotatingQuoteAuthor.textContent = rotatingQuotes[currentQuoteIndex].author;
        rotatingQuoteCard.classList.remove("is-switching");
      }, 420);
    }, 5200);
  }

  if (blogFilterButtons.length > 0 && blogCards.length > 0) {
    blogFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        blogFilterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        blogCards.forEach((card) => {
          const topic = card.getAttribute("data-topic");
          const shouldShow = filter === "all" || topic === filter;
          card.classList.toggle("is-hidden", !shouldShow);
        });
      });
    });
  }

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq-item");
      const answer = faqItem?.querySelector(".faq-answer");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      faqButtons.forEach((otherButton) => {
        if (otherButton === button) return;
        otherButton.setAttribute("aria-expanded", "false");
        const otherItem = otherButton.closest(".faq-item");
        const otherAnswer = otherItem?.querySelector(".faq-answer");
        otherItem?.classList.remove("is-open");
        if (otherAnswer) {
          otherAnswer.style.maxHeight = "0px";
        }
      });

      button.setAttribute("aria-expanded", String(!isOpen));
      faqItem?.classList.toggle("is-open", !isOpen);

      if (answer) {
        answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : "0px";
      }
    });
  });

  contactForms.forEach((form) => {
    const feedback = document.createElement("p");
    feedback.className = "form-feedback";
    feedback.hidden = true;
    form.append(feedback);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      feedback.textContent =
        "Messaggio ricevuto. Il modulo è dimostrativo e non invia dati reali senza un backend dedicato.";
      feedback.hidden = false;
      form.reset();
    });
  });

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
});

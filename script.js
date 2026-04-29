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
  const modals = document.querySelectorAll(".modal");
  const modalCloseButtons = document.querySelectorAll("[data-close-modal]");
  const rotatingQuoteCard = document.querySelector(".portrait-caption");
  const rotatingQuoteText = document.querySelector(".rotating-quote-text");
  const rotatingQuoteAuthor = document.querySelector(".rotating-quote-author");
  const blogFilterButtons = document.querySelectorAll(".blog-filter-button");
  const blogCards = document.querySelectorAll(".blog-card");
  const carousels = document.querySelectorAll("[data-carousel]");
  let lastFocusedElement = null;
  let activeModal = null;

  let rotatingQuotes = [
    {
      text: "Non cade foglia che l'inconscio non voglia",
      author: "Scienza Analogica"
    },
    {
      text: "La logica afferma ciò che l'inconscio nega e viceversa",
      author: "Scienza Analogica"
    },
    {
      text: "Se è vero il verso è anche vero l'inverso",
      author: "Scienza Analogica"
    },
    {
      text: "Se non ti agganci con il verso ti agganci con l'inverso",
      author: "Scienza Analogica"
    },
    {
      text: "Ciò che è obiettivo della logica è strumento per l'inconscio",
      author: "Scienza Analogica"
    },
    {
      text: "I limiti dell'operatore sono le proprie esigenze",
      author: "Scienza Analogica"
    },
    {
      text: "Chi dice non fa e chi fa non dice",
      author: "Scienza Analogica"
    },
    {
      text: "Chi gratifica sarà penalizzato e chi penalizza sarà gratificato",
      author: "Scienza Analogica"
    },
    {
      text: "Chi chiede è perdente e chi sa ottenere è vincente",
      author: "Scienza Analogica"
    },
    {
      text: "Per l'inconscio è vero ciò che coinvolge",
      author: "Scienza Analogica"
    },
    {
      text: "Simulare il gioco attraverso la fantasia",
      author: "Scienza Analogica"
    },
    {
      text: "Chi raschia non rischia e chi rischia non raschia",
      author: "Scienza Analogica"
    },
    {
      text: "Il passato si riflette sul futuro",
      author: "Scienza Analogica"
    },
    {
      text: "Per l'inconscio un matrimonio o un funerale è lo stesso",
      author: "Scienza Analogica"
    },
    {
      text: "Dietro ogni sintomo c'è l'uomo",
      author: "Scienza Analogica"
    },
    {
      text: "La sofferenza è l'immagine ideale del piacere",
      author: "Scienza Analogica"
    },
    {
      text: "La sofferenza è direttamente proporzionale all'assenza del piacere",
      author: "Scienza Analogica"
    },
    {
      text: "Non sei malato, sei solo infelice",
      author: "Scienza Analogica"
    },
    {
      text: "Essere felici vuol dire perseguire i propri sogni in piena libertà e in pace con la propria coscienza",
      author: "Scienza Analogica"
    },
    {
      text: "Le difficoltà sono direttamente proporzionali al grado di difetto presente in se stessi",
      author: "Scienza Analogica"
    },
    {
      text: "Se non puoi mordere la mano a Don Calogero è bene che la baci tanto lo freghi lo stesso",
      author: "Scienza Analogica"
    },
    {
      text: "Chi di spada subisce di spada colpisce",
      author: "Scienza Analogica"
    },
    {
      text: "Quando il serpente s'invecchia la rana se lo incula",
      author: "Scienza Analogica"
    },
    {
      text: "Sii regista della tua vita",
      author: "Scienza Analogica"
    },
    {
      text: "Il distonico dell'essere rende difficile il facile attraverso l'inutile",
      author: "Scienza Analogica"
    },
    {
      text: "Il distonico dell'avere rende facile il difficile attraverso l'utile",
      author: "Scienza Analogica"
    },
    {
      text: "Il verso e l'inverso, in contrapposizione, generano il conflitto, il conflitto genera il turbamento e il turbamento il problema; il problema genera il sintomo",
      author: "Scienza Analogica"
    },
    {
      text: "La realtà è ineluttabile, l'interpretazione è soggettiva.",
      author: "Scienza Analogica"
    },
    {
      text: "Il potere è autoreferenziale.",
      author: "Scienza Analogica"
    },
    {
      text: "Se il dubbio uccide, il segreto rende schiavi.",
      author: "Scienza Analogica"
    }
  ];

  const pageLang = document.documentElement.lang || "it";
  if (pageLang === "en") {
    rotatingQuotes = [
      { text: "Not a leaf falls unless the unconscious allows it.", author: "Analogical Sciences" },
      { text: "Logic affirms what the unconscious denies, and vice versa.", author: "Analogical Sciences" },
      { text: "If the direct path is true, the inverse path is also true.", author: "Analogical Sciences" },
      { text: "For the unconscious, what engages is what is true.", author: "Analogical Sciences" },
      { text: "Behind every symptom there is a person.", author: "Analogical Sciences" },
      { text: "You are not ill, you are simply unhappy.", author: "Analogical Sciences" },
      { text: "Be the director of your own life.", author: "Analogical Sciences" },
      { text: "Reality is inescapable; interpretation is subjective.", author: "Analogical Sciences" },
      { text: "If doubt kills, secrecy enslaves.", author: "Analogical Sciences" }
    ];
  } else if (pageLang === "ru") {
    rotatingQuotes = [
      { text: "Ни один лист не падает без воли бессознательного.", author: "Аналогические дисциплины" },
      { text: "Логика утверждает то, что бессознательное отрицает, и наоборот.", author: "Аналогические дисциплины" },
      { text: "Если верен прямой путь, верен и обратный.", author: "Аналогические дисциплины" },
      { text: "Для бессознательного истинно то, что вовлекает.", author: "Аналогические дисциплины" },
      { text: "За каждым симптомом стоит человек.", author: "Аналогические дисциплины" },
      { text: "Ты не болен, ты просто несчастлив.", author: "Аналогические дисциплины" },
      { text: "Будь режиссёром своей жизни.", author: "Аналогические дисциплины" },
      { text: "Реальность неизбежна, интерпретация субъективна.", author: "Аналогические дисциплины" },
      { text: "Если сомнение убивает, тайна порабощает.", author: "Аналогические дисциплины" }
    ];
  }

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

  const closeModal = (targetModal = activeModal) => {
    if (!targetModal) return;
    targetModal.classList.remove("is-open");
    targetModal.setAttribute("aria-hidden", "true");
    activeModal = null;
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
      activeModal = document.getElementById(modalId);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal"));
    });
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
    if (event.key === "Escape" && activeModal?.classList.contains("is-open")) {
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

  if (rotatingQuoteCard && rotatingQuoteText) {
    let currentQuoteIndex = 0;

    window.setInterval(() => {
      rotatingQuoteCard.classList.add("is-switching");

      window.setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % rotatingQuotes.length;
        rotatingQuoteText.textContent = rotatingQuotes[currentQuoteIndex].text;
        if (rotatingQuoteAuthor) {
          rotatingQuoteAuthor.textContent = rotatingQuotes[currentQuoteIndex].author;
        }
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

  if (carousels.length > 0) {
    carousels.forEach((carousel) => {
      const track = carousel.querySelector(".about-carousel-track");
      const slides = carousel.querySelectorAll(".about-carousel-slide");
      const prevButton = carousel.querySelector("[data-carousel-prev]");
      const nextButton = carousel.querySelector("[data-carousel-next]");
      const dots = carousel.querySelectorAll("[data-carousel-dot]");
      if (!track || slides.length === 0) return;

      let currentIndex = 0;
      let autoplayId = null;

      const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === currentIndex);
        });
      };

      const goToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
      };

      prevButton?.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
      });

      nextButton?.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const dotIndex = Number(dot.getAttribute("data-carousel-dot"));
          if (Number.isNaN(dotIndex)) return;
          goToSlide(dotIndex);
        });
      });

      const startAutoplay = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        autoplayId = window.setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 6200);
      };

      const stopAutoplay = () => {
        if (!autoplayId) return;
        window.clearInterval(autoplayId);
        autoplayId = null;
      };

      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);

      updateCarousel();
      startAutoplay();
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

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      feedback.hidden = true;

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const payload = new FormData(form);
        payload.append("form_source", form.dataset.mailForm || "contatto");

        const response = await fetch("mail-config.php", {
          method: "POST",
          body: payload
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Invio non riuscito");
        }

        feedback.textContent =
          "Richiesta inviata correttamente. Sarai ricontattato al più presto.";
        feedback.hidden = false;
        form.reset();

        const parentModal = form.closest(".modal");
        if (parentModal?.id === "booking-modal") {
          closeModal(parentModal);
        }
        const thankyouModal = document.getElementById("thankyou-modal");
        if (thankyouModal) {
          openModal("thankyou-modal", submitButton || form);
          activeModal = thankyouModal;
        }
      } catch (error) {
        feedback.textContent =
          "Invio non riuscito. Verifica la configurazione email del server e riprova.";
        feedback.hidden = false;
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
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

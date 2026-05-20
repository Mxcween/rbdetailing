const SITE_CONFIG = {
  phoneDisplay: "0151 26324979",
  phoneNumber: "4915126324979",
  address: "Rottachstraße 38, 87439 Kempten (Allgäu)",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rottachstra%C3%9Fe%2038%2C%2087439%20Kempten%20%28Allg%C3%A4u%29",
  email: "info.kemptenrbdetailing@gmail.com",
  instagram:
    "https://www.instagram.com/car.detailing_kempten?igsh=MXAxemp3azg5YjVtcw%3D%3D&utm_source=qr",
  facebook: "https://www.facebook.com/profile.php?id=61589990882422",
  whatsappMessage:
    "Hallo RB Details, ich möchte einen Termin für Fahrzeugaufbereitung anfragen.",
};

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const chatWidget = document.querySelector("[data-chat-widget]");
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatClose = document.querySelector("[data-chat-close]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
let ambientFrame = null;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateAmbientBackground = () => {
  ambientFrame = null;

  const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(window.scrollY / scrollMax, 1);
  const root = document.documentElement;

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--ambient-red-x", `${16 + progress * 58}%`);
  root.style.setProperty("--ambient-red-y", `${18 + progress * 34}%`);
  root.style.setProperty("--ambient-blue-x", `${84 - progress * 50}%`);
  root.style.setProperty("--ambient-blue-y", `${14 + progress * 46}%`);
  root.style.setProperty("--ambient-tilt", `${-12 + progress * 20}deg`);
  root.style.setProperty("--ambient-dim", `${0.62 + progress * 0.18}`);
};

const requestAmbientUpdate = () => {
  if (!ambientFrame) {
    ambientFrame = window.requestAnimationFrame(updateAmbientBackground);
  }
};

window.addEventListener("scroll", () => {
  updateHeader();
  requestAmbientUpdate();
}, { passive: true });

window.addEventListener("resize", requestAmbientUpdate);
updateHeader();
updateAmbientBackground();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("is-open");
  mobilePanel.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobilePanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("is-open");
    mobilePanel.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const whatsappUrl = `https://wa.me/${SITE_CONFIG.phoneNumber}?text=${encodeURIComponent(
  SITE_CONFIG.whatsappMessage,
)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
});

document.querySelectorAll("[data-phone]").forEach((node) => {
  node.textContent = SITE_CONFIG.phoneDisplay;
});

document.querySelectorAll("[data-phone-link]").forEach((link) => {
  link.href = `tel:+${SITE_CONFIG.phoneNumber}`;
});

document.querySelectorAll("[data-email]").forEach((node) => {
  node.textContent = SITE_CONFIG.email;
});

document.querySelectorAll("[data-email-link]").forEach((link) => {
  link.href = `mailto:${SITE_CONFIG.email}`;
});

document.querySelectorAll("[data-address]").forEach((node) => {
  node.textContent = SITE_CONFIG.address;
});

document.querySelectorAll("[data-map-link]").forEach((link) => {
  link.href = SITE_CONFIG.mapsUrl;
});

document.querySelectorAll("[data-instagram]").forEach((link) => {
  link.href = SITE_CONFIG.instagram;
});

document.querySelectorAll("[data-facebook]").forEach((link) => {
  link.href = SITE_CONFIG.facebook;
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

document
  .querySelectorAll(".benefit-grid, .service-grid, .gallery-grid, .review-grid")
  .forEach((grid) => {
    grid.querySelectorAll(".reveal").forEach((element, index) => {
      if (!element.style.getPropertyValue("--delay")) {
        element.style.setProperty("--delay", `${Math.min(index * 70, 280)}ms`);
      }
    });
  });

const chatReplies = {
  ceramic:
    "Eine Keramikversiegelung schützt den Lack mit hydrophobem Effekt und tiefem Glanz. Je nach Pflege hält sie meist 1-3 Jahre.",
  price:
    "Der Preis hängt von Fahrzeuggröße, Zustand und gewünschtem Service ab. Für ein realistisches Angebot senden Sie am besten Fotos per WhatsApp.",
  appointment:
    "Termine laufen nach Anfrage. Schreiben Sie uns über WhatsApp mit Fahrzeugmodell, gewünschtem Service und Ihrem Wunschdatum.",
  default:
    "Danke für Ihre Nachricht. Für eine schnelle Einschätzung empfehlen wir WhatsApp mit Fotos vom Fahrzeug und dem gewünschten Service.",
};

const setChatOpen = (isOpen) => {
  chatWidget.classList.toggle("is-open", isOpen);
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  chatPanel.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    window.setTimeout(() => chatInput.focus(), 120);
  }
};

const addChatMessage = (message, type = "bot") => {
  const bubble = document.createElement("div");
  bubble.className = type === "user" ? "user-message" : "bot-message";
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const getBotReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes("keramik") || text.includes("ceramic") || text.includes("coating")) {
    return chatReplies.ceramic;
  }

  if (text.includes("preis") || text.includes("kosten") || text.includes("price")) {
    return chatReplies.price;
  }

  if (text.includes("termin") || text.includes("book") || text.includes("whatsapp")) {
    return chatReplies.appointment;
  }

  if (text.includes("innen") || text.includes("interior")) {
    return "Die Innenraumreinigung umfasst die Tiefenreinigung von Stoff, Leder, Kunststoff, Teppichen und Innenraumflächen.";
  }

  return chatReplies.default;
};

chatToggle.addEventListener("click", () => {
  setChatOpen(!chatWidget.classList.contains("is-open"));
});

chatClose.addEventListener("click", () => setChatOpen(false));

document.querySelectorAll("[data-chat-quick]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.chatQuick;
    addChatMessage(button.textContent, "user");
    window.setTimeout(() => addChatMessage(chatReplies[key] || chatReplies.default), 180);
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();

  if (!message) {
    return;
  }

  addChatMessage(message, "user");
  chatInput.value = "";
  window.setTimeout(() => addChatMessage(getBotReply(message)), 220);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll("[data-compare-slider]").forEach((slider) => {
  const setSliderPosition = (clientX) => {
    const rect = slider.getBoundingClientRect();
    const position = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const value = Math.round(position * 100);

    slider.style.setProperty("--position", `${value}%`);
    slider.setAttribute("aria-valuenow", String(value));
  };

  const stopDragging = () => {
    slider.classList.remove("is-dragging");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);
  };

  const onPointerMove = (event) => {
    setSliderPosition(event.clientX);
  };

  slider.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    slider.classList.add("is-dragging");
    setSliderPosition(event.clientX);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  });

  slider.addEventListener("keydown", (event) => {
    const current = Number(slider.getAttribute("aria-valuenow")) || 50;
    let next = current;

    if (event.key === "ArrowLeft") {
      next = current - 5;
    }

    if (event.key === "ArrowRight") {
      next = current + 5;
    }

    if (event.key === "Home") {
      next = 0;
    }

    if (event.key === "End") {
      next = 100;
    }

    if (next !== current) {
      event.preventDefault();
      const value = Math.min(Math.max(next, 0), 100);
      slider.style.setProperty("--position", `${value}%`);
      slider.setAttribute("aria-valuenow", String(value));
    }
  });
});

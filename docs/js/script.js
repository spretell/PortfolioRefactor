// ink note typing effect
document.addEventListener("DOMContentLoaded", () => {
  const notes = document.querySelectorAll(".ink-note");
  if (!notes.length) return;

  notes.forEach((note) => {
    const text = note.getAttribute("data-text") || "";

    if (!text.trim()) return;

    let index = 0;
    note.textContent = "";

    const typeInk = () => {
      note.textContent += text.charAt(index);
      index += 1;

      if (index < text.length) {
        setTimeout(typeInk, 80);
      }
    };

    typeInk();
  });
});

// project card stack hover effect
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".work__gallery");
  const cards = Array.from(document.querySelectorAll(".proj-card"));
  if (!gallery || cards.length === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const spread = 38;
  const liftY = -10;
  const liftScale = 1.03;

  const reset = () => {
    cards.forEach((card) => {
      card.style.transform = "";
      card.style.opacity = "1";
      card.style.zIndex = "";
    });
  };

  cards.forEach((card, hoverIndex) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((other, i) => {
        const offset = (i - hoverIndex) * spread;

        let transform = `translateY(${offset}px)`;
        let opacity = "0.96";
        let z = i + 1;

        if (i === hoverIndex) {
          transform = `translateY(${offset + liftY}px) scale(${liftScale})`;
          opacity = "1";
          z = 999;
        }

        other.style.transform = transform;
        other.style.opacity = opacity;
        other.style.zIndex = z;
      });
    });
  });

  gallery.addEventListener("mouseleave", reset);
});

// scroll reveal effect
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".js-reveal");
  if (!reveals.length) return;

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  reveals.forEach((el) => observer.observe(el));
});

// contact form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const success = document.getElementById("formSuccess");

  const fields = {
    firstName: {
      el: document.getElementById("firstName"),
      err: document.getElementById("firstNameError"),
      validate: (v) =>
        v.trim().length >= 2 || "Please enter at least 2 characters.",
    },
    lastName: {
      el: document.getElementById("lastName"),
      err: document.getElementById("lastNameError"),
      validate: (v) =>
        v.trim().length >= 2 || "Please enter at least 2 characters.",
    },
    email: {
      el: document.getElementById("email"),
      err: document.getElementById("emailError"),
      validate: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
        "Please enter a valid email address.",
    },
    phone: {
      el: document.getElementById("phone"),
      err: document.getElementById("phoneError"),
      validate: (v) => {
        const val = v.trim();
        if (!val) return true; // optional
        return (
          /^[0-9()+\-\s]{7,}$/.test(val) || "Please enter a valid phone number."
        );
      },
    },
    message: {
      el: document.getElementById("message"),
      err: document.getElementById("messageError"),
      validate: (v) =>
        v.trim().length >= 10 || "Please write at least 10 characters.",
    },
  };

  const setError = (key, msg) => {
    fields[key].err.textContent = msg || "";
    if (msg) fields[key].el.classList.add("is-invalid");
    else fields[key].el.classList.remove("is-invalid");
  };

  const validateField = (key) => {
    const value = fields[key].el.value;
    const result = fields[key].validate(value);
    if (result === true) {
      setError(key, "");
      return true;
    }
    setError(key, result);
    return false;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("blur", () => validateField(key));
    fields[key].el.addEventListener("input", () => {
      if (fields[key].el.classList.contains("is-invalid")) validateField(key);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.textContent = "";

    const results = Object.keys(fields).map((key) => validateField(key));
    const allValid = results.every(Boolean);

    if (!allValid) {
      success.textContent = "oops , check the highlighted fields";
      return;
    }

    success.textContent = "yay!! message sent. thank you ◝(ᵔᗜᵔ)◜";
    form.reset();
    Object.keys(fields).forEach((key) => setError(key, ""));
  });
});

// udemy mini touch toggle
document.addEventListener("DOMContentLoaded", () => {
  const minis = document.querySelectorAll(".udemy-mini");
  if (!minis.length) return;

  const isTouch = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;
  if (!isTouch) return;

  minis.forEach((mini) => {
    mini.addEventListener("click", (e) => {
      minis.forEach((m) => {
        if (m !== mini) m.classList.remove("is-open");
      });

      mini.classList.toggle("is-open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".udemy-mini")) {
      minis.forEach((m) => m.classList.remove("is-open"));
    }
  });
});

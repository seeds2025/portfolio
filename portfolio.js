document.addEventListener("DOMContentLoaded", () => {
  setupScrollAnimations()
  setupFormValidation()
  setupSkillBarAnimation()
})

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("fade-in-up")) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
        }
        if (entry.target.classList.contains("fade-in-left")) {
          entry.target.style.animation = "fadeInLeft 0.8s ease-out forwards"
        }
        if (entry.target.classList.contains("fade-in-right")) {
          entry.target.style.animation = "fadeInRight 0.8s ease-out forwards"
        }
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right").forEach((el) => {
    el.style.opacity = "0"
    observer.observe(el)
  })

  observeProjectCards()
  observeStatCards()
}

function observeProjectCards() {
  const cards = document.querySelectorAll(".project-card")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`
            entry.target.style.opacity = "0"
          }, index * 100)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => observer.observe(card))
}

function observeStatCards() {
  const stats = document.querySelectorAll(".stat")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`
            entry.target.style.opacity = "0"
          }, index * 100)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  stats.forEach((stat) => observer.observe(stat))
}

function setupSkillBarAnimation() {
  const skillFills = document.querySelectorAll(".skill-fill")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width")
          entry.target.style.width = width
        }
      })
    },
    { threshold: 0.5 },
  )

  skillFills.forEach((fill) => observer.observe(fill))
}

function setupFormValidation() {
  const form = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const prenom = document.getElementById("prenom").value.trim()
      const nom = document.getElementById("nom").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()

      if (!prenom || !nom || !email || !message) {
        showFormMessage("Veuillez remplir tous les champs.", "error", formMessage)
        return
      }

      if (!isValidEmail(email)) {
        showFormMessage("Veuillez entrer une adresse email valide.", "error", formMessage)
        return
      }

      showFormMessage("Merci pour votre message ! Je vous répondrai bientôt.", "success", formMessage)
      form.reset()

      setTimeout(() => {
        formMessage.classList.remove("success", "error")
        formMessage.style.display = "none"
      }, 4000)
    })
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showFormMessage(text, type, element) {
  element.textContent = text
  element.className = `form-message ${type}`
  element.style.display = "block"
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
  }
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

const navLinks = document.querySelectorAll(".nav-link")
window.addEventListener("scroll", () => {
  let current = ""

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "var(--accent)"
    } else {
      link.style.color = "var(--text-light)"
    }
  })
})

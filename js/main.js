document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const menu = document.querySelector(".menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      menu.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Dropdown Toggle for Mobile
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a")

    if (window.innerWidth <= 768) {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        dropdown.classList.toggle("active")
      })
    }
  })

  // Testimonial Slider Auto Scroll
  const testimonialSlider = document.querySelector(".testimonial-slider")

  if (testimonialSlider) {
    const testimonialItems = testimonialSlider.querySelectorAll(".testimonial-item")
    const itemWidth = testimonialItems[0].offsetWidth + 30 // Width + gap
    let currentIndex = 0

    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialItems.length
      testimonialSlider.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      })
    }, 5000)
  }

  // Lazy Loading Images
  const lazyImages = document.querySelectorAll("img[data-src]")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
      img.removeAttribute("data-src")
    })
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#" && href !== "javascript:void(0)") {
        e.preventDefault()

        const targetElement = document.querySelector(this.getAttribute("href"))

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Page Load Animation
  document.body.classList.add("loaded")
})

// Add page transition effect
window.addEventListener("beforeunload", () => {
  document.body.classList.add("page-transition")
})

// Performance optimization
window.addEventListener("load", () => {
  // Defer non-critical CSS
  const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][media="print"]')
  deferredStyles.forEach((style) => {
    style.media = "all"
  })

  // Preload images for next pages
  const preloadLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript"])')
  const preloadedUrls = new Set()

  preloadLinks.forEach((link) => {
    const url = link.getAttribute("href")

    if (url && url.startsWith("/") && !preloadedUrls.has(url)) {
      const preloadLink = document.createElement("link")
      preloadLink.rel = "prefetch"
      preloadLink.href = url
      document.head.appendChild(preloadLink)
      preloadedUrls.add(url)
    }
  })
})

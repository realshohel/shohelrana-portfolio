/* ==========================================
Hero Typewriter Effect
========================================== */

const words = [
    "Web Developer",
    "AI Developer",
    "WordPress Developer",
    "Plugin Developer",
    "Digital Solutions Creator"
];

let wordIndex = 0;
let charIndex = 0;

const typingElement = document.getElementById("typing-text");

function typeEffect() {
    if (!typingElement) return;

    if (charIndex < words[wordIndex].length) {
        typingElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(deleteEffect, 1800);
    }
}

function deleteEffect() {
    if (!typingElement) return;

    if (charIndex > 0) {
        typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteEffect, 40);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
    }
}

typeEffect();


/* ==========================================
Hero Counter Animation
========================================== */

const counters = document.querySelectorAll(".counter");

if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target) || 0;
            let count = 0;
            const speed = target / 40;

            function updateCounter() {
                count += speed;

                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent =
                        target === 100 ? `${target}%` :
                        (target === 30 || target === 3) ? `${target}+` :
                        target;
                }
            }

            updateCounter();
            observer.unobserve(counter);
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
}


/* ==========================================
Premium Navbar
========================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-menu a");
const navbar = document.querySelector(".header");

let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });

    if (navbar) {
        navbar.classList.toggle("sticky", scrollY > 60);
    }

    ticking = false;
}

function requestNavbarUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener("scroll", requestNavbarUpdate, { passive: true });

updateNavbar();


/* ==========================================
Scroll To Top
========================================== */

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    function updateScrollTopButton() {
        scrollTopBtn.classList.toggle("show", window.scrollY > 300);
    }

    window.addEventListener("scroll", updateScrollTopButton, { passive: true });
    updateScrollTopButton();

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ==========================================
Mobile Menu
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}


/* ==========================================
Scroll Reveal Animation
========================================== */

const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(element => revealObserver.observe(element));
}


/* ==========================================
Dark / Light Theme
========================================== */

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");

    function applyTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);

        if (themeIcon) {
            themeIcon.classList.toggle("fa-sun", isLight);
            themeIcon.classList.toggle("fa-moon", !isLight);
        }
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        const theme = isLight ? "light" : "dark";

        localStorage.setItem("theme", theme);

        if (themeIcon) {
            themeIcon.classList.toggle("fa-sun", isLight);
            themeIcon.classList.toggle("fa-moon", !isLight);
        }
    });
}


/* ==========================================
Premium Preloader
========================================== */

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 1000);
});


/* ==========================================
EmailJS Contact Form
========================================== */

if (typeof emailjs !== "undefined") {
    emailjs.init("LlztVbvVCSBNBfpJs");

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        const submitBtn = document.getElementById("submit-btn");

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!submitBtn) return;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            emailjs.sendForm(
                "service_4kbyp6w",
                "template_fnlzniw",
                this
            )
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();
            })
            .catch(error => {
                console.error(error);
                alert("Something went wrong. Please try again.");
            })
            .finally(() => {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            });
        });
    }
};

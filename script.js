const CV_PATH = "cv/Furkan_Demirel_CV.pdf";
const CV_FILENAME = "Furkan_Demirel_CV.pdf";

/* ===============================
   THEME TOGGLE
================================== */

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system'
};

const STORAGE_KEY = 'portfolio-theme';

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

function getStoredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Object.values(THEMES).includes(stored)) {
        return stored;
    }
    return THEMES.SYSTEM;
}

function applyTheme(theme) {
    const effectiveTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;
    html.setAttribute('data-theme', effectiveTheme);
}

function initTheme() {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);
}

function cycleTheme() {
    const currentTheme = getStoredTheme();
    let nextTheme;

    if (currentTheme === THEMES.DARK) {
        nextTheme = THEMES.LIGHT;
    } else if (currentTheme === THEMES.LIGHT) {
        nextTheme = THEMES.SYSTEM;
    } else {
        nextTheme = THEMES.DARK;
    }

    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', cycleTheme);
}

initTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getStoredTheme() === THEMES.SYSTEM) {
        applyTheme(THEMES.SYSTEM);
    }
});

/* ===============================
   FOTOĞRAF YEDEKLEME
================================== */

document.querySelectorAll(".photo").forEach((img) => {

    const fallback = img.dataset.fallback;

    if (!fallback) return;

    img.addEventListener("error", () => {
        img.src = fallback;
    }, { once: true });

});


/* ===============================
   CV İNDİRME
================================== */

document.querySelectorAll(".cv-download, .nav-cv").forEach((button) => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        const link = document.createElement("a");

        link.href = CV_PATH;
        link.download = CV_FILENAME;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });

});


/* ===============================
   SAYFA AÇILIŞI
================================== */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


/* ===============================
   SCROLL ANİMASYONU
================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section, .card").forEach((element) => {
    observer.observe(element);
});


/* ===============================
   AKTİF MENÜ
================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


console.log("🚀 Furkan Demirel Portfolio başarıyla yüklendi.");
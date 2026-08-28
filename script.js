const CV_PATH = "cv/Furkan_Demirel_CV.pdf";
const CV_FILENAME = "Furkan_Demirel_CV.pdf";

/* ===============================
   THEME TOGGLE
================================== */

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
};

const STORAGE_KEY = 'portfolio-theme';

function getStoredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === THEMES.DARK || stored === THEMES.LIGHT)) {
        return stored;
    }
    return THEMES.DARK;
}

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
}

function initTheme() {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);
}

function cycleTheme() {
    const currentTheme = getStoredTheme();
    const nextTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', cycleTheme);
}

initTheme();

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
   3D MODEL YEDEKLEME
================================== */

document.querySelectorAll(".model-3d").forEach((model) => {

    const fallback = model.dataset.fallback;

    if (!fallback) return;

    model.addEventListener("error", () => {
        const modelContainer = model.parentElement;
        const poster = model.querySelector('.model-poster');
        
        if (poster) {
            model.remove();
            const fallbackImg = document.createElement('img');
            fallbackImg.src = fallback;
            fallbackImg.alt = model.alt;
            fallbackImg.className = 'photo';
            modelContainer.appendChild(fallbackImg);
        }
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


/* ===============================
   PROFİL FOTOĞRAF BÜYÜTME
================================== */

const navProfilePhoto = document.querySelector('.nav-profile-photo');
const dikeyMikserPhoto = document.getElementById('dikeyMikserPhoto');
const ozelMakinePhoto = document.getElementById('ozelMakinePhoto');
const photoOverlay = document.getElementById('photoOverlay');
const overlayPhoto = document.getElementById('overlayPhoto');

if (navProfilePhoto && photoOverlay && overlayPhoto) {
    navProfilePhoto.addEventListener('click', () => {
        const currentSrc = navProfilePhoto.src;
        overlayPhoto.src = currentSrc;
        photoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (dikeyMikserPhoto && photoOverlay && overlayPhoto) {
    dikeyMikserPhoto.addEventListener('click', () => {
        const currentSrc = dikeyMikserPhoto.src;
        overlayPhoto.src = currentSrc;
        photoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (ozelMakinePhoto && photoOverlay && overlayPhoto) {
    ozelMakinePhoto.addEventListener('click', () => {
        const currentSrc = ozelMakinePhoto.src;
        overlayPhoto.src = currentSrc;
        photoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (photoOverlay && overlayPhoto) {
    photoOverlay.addEventListener('click', () => {
        photoOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            overlayPhoto.src = '';
        }, 500);
    });
}


console.log("🚀 Furkan Demirel Portfolio başarıyla yüklendi.");
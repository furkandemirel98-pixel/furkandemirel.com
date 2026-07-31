const CV_PATH = "cv/Furkan_Demirel_CV.pdf";
const CV_FILENAME = "Furkan_Demirel_CV.pdf";

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
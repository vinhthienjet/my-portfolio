
"use strict";

// =========================
// 1. MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu");
}

menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Đóng menu" : "Mở menu"
    );
});

// Đóng menu khi người dùng chọn một mục.
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        closeMenu();
    });
});

// Đóng menu khi nhấn Escape.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Đóng menu nếu chuyển sang màn hình desktop.
window.addEventListener("resize", function () {
    if (window.innerWidth > 720) {
        closeMenu();
    }
});

// =========================
// 2. CURRENT YEAR
// =========================

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

// =========================
// 3. ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    // Khi ở đầu trang, chọn mục Trang chủ.
    if (window.scrollY < 100) {
        currentSection = "home";
    }

    navLinks.forEach(function (link) {
        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateActiveLink, {
    passive: true
});

window.addEventListener("load", updateActiveLink);

// =========================
// 4. CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

// Thay bằng địa chỉ email thật của bạn.
const recipientEmail = "your-email@example.com";

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formNote.textContent = "Vui lòng điền đầy đủ thông tin.";
        return;
    }

    const subject = "Portfolio contact - " + name;

    const body = [
        "Xin chào Thiện,",
        "",
        "Tên: " + name,
        "Email: " + email,
        "",
        "Nội dung:",
        message
    ].join("\n");

    const mailtoURL =
        "mailto:" + recipientEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    formNote.textContent =
        "Đang mở ứng dụng email. Hãy kiểm tra người nhận và gửi email.";

    window.location.href = mailtoURL;
});

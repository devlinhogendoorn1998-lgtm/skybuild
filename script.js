// ==========================================================================
// SECTION: Mobile Menu Navigation Toggle
// ==========================================================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        
        const bars = mobileMenu.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('open')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('open');
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// ==========================================================================
// SECTION: Conversion Form Submission Handler
// ==========================================================================
const quoteForm = document.getElementById('quoteForm');
const formFeedback = document.getElementById('formFeedback');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            formFeedback.textContent = "Vul alstublieft alle verplichte velden in.";
            formFeedback.className = "form-feedback error";
            return;
        }
        
        formFeedback.textContent = "Uw aanvraag wordt verwerkt...";
        formFeedback.className = "form-feedback";
        
        setTimeout(() => {
            formFeedback.textContent = `Bedankt ${name}! Uw aanvraag is succesvol ontvangen. We nemen binnen 24 uur contact met u op.`;
            formFeedback.className = "form-feedback success";
            quoteForm.reset();
        }, 1500);
    });
}

// ==========================================================================
// SECTION: Cookie Banner — toon/verberg op basis van localStorage + versie
// ==========================================================================
(function () {
    const banner = document.getElementById('cookieBanner');
    const btnAccept = document.getElementById('cookieAccept');
    const btnDecline = document.getElementById('cookieDecline');

    // Controleer of banner element bestaat
    if (!banner) return;

    // Versienummer — verhoog dit om toestemming van alle bezoekers te resetten
    const COOKIE_VERSION = 'v1';
    const storedVersion = localStorage.getItem('cookieConsentVersion');

    // Reset consent als versie niet overeenkomt (bijv. na privacybeleid update)
    if (storedVersion !== COOKIE_VERSION) {
        localStorage.removeItem('cookieConsent');
    }

    // Toon banner alleen als er nog geen keuze is gemaakt
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Kleine vertraging zodat de slide-in animatie zichtbaar is na page load
        setTimeout(() => {
            banner.classList.add('is-visible');
        }, 800);
    }

    function closeBanner(choice) {
        localStorage.setItem('cookieConsent', choice);
        localStorage.setItem('cookieConsentVersion', COOKIE_VERSION);
        banner.classList.remove('is-visible');
    }

    if (btnAccept) {
        btnAccept.addEventListener('click', () => closeBanner('accepted'));
    }

    if (btnDecline) {
        btnDecline.addEventListener('click', () => closeBanner('declined'));
    }
})();

// ==========================================================================
// SECTION: Dynamic Navbar Background Blur on Scroll
// Gebruikt passive listener + requestAnimationFrame om forced reflow te voorkomen
// ==========================================================================
const navbar = document.querySelector('.navbar');
let rafPending = false;

function updateNavbar() {
    // Lees scrollY buiten rAF — geen layout-thrashing
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(9, 12, 16, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    rafPending = false;
}

window.addEventListener('scroll', () => {
    if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updateNavbar);
    }
}, { passive: true });
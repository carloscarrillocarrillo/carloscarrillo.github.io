/* Theme toggle — dark is default */
const themeButton = document.getElementById('theme-button');

function applyTheme(isLight) {
    document.body.classList.toggle('light-theme', isLight);
    themeButton.classList.toggle('uil-sun', !isLight);
    themeButton.classList.toggle('uil-moon', isLight);
}

// Restore saved preference (default: dark)
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'light');

themeButton.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-theme');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* Show and hide menu */
const   navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}


/* remove menu mobile */
const navLink  = document.querySelectorAll('.nav_link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))


/* accordion skills */
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/* Qualification tabs */
const tabs = document.querySelectorAll('[data-target]'),
    tabsContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabsContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })

        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active');
    })
})

/* Services modal */
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/* Scroll reveal — Intersection Observer */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(el => {
    revealObserver.observe(el);
});

/* Active nav link on scroll (scrollspy) */
const sections = document.querySelectorAll('section[id]');

const scrollspy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('nav__link--active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('nav__link--active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => scrollspy.observe(s));

/* Contact form — AJAX submission via Formspree */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('contact-form-status');
const formFields = document.getElementById('contact-form-fields');

if (contactForm && formStatus && formFields) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous status
        formStatus.className = 'contact__status';
        formStatus.textContent = '';

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="uil uil-spinner-alt button__icon"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });

            if (response.ok) {
                // Hide form fields and show success message
                formFields.style.display = 'none';
                formStatus.className = 'contact__status contact__status--success';
                formStatus.innerHTML = '<i class="uil uil-check-circle contact__success-icon"></i><p>Mensaje enviado con éxito.<br>Te responderé pronto.</p>';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.className = 'contact__status contact__status--error';
            formStatus.textContent = 'Algo salió mal. Inténtalo de nuevo o escríbeme directamente por email.';
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

const ham = document.querySelectorAll('.ham');
const overlay = document.querySelector('.intro_overlay');
const body = document.body;
const mobileNav = document.querySelector(".mobile_nav");

ham.forEach(hamburger => {
    hamburger.addEventListener('click', function () {
        this.classList.toggle('is-active');
        overlay.classList.toggle('intro-active-overlay');
        body.classList.toggle('no-scroll');
        mobileNav.classList.toggle('mobile_nav_is-active');
    });
});

const mobileNavItems = document.querySelectorAll('.mobile_nav_list_item');

mobileNavItems.forEach(navitem => {
    navitem.addEventListener('click', function () {
        overlay.classList.toggle('intro-active-overlay'); // Toggle class for overlay
        body.classList.toggle('no-scroll');
        mobileNav.classList.toggle('mobile_nav_is-active');
        ham.forEach(hamburger => {
            hamburger.classList.toggle('is-active');
        });
    });
});

window.addEventListener('scroll', function () {
    const targetDiv = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list-nav');

    let scrollPosition = window.scrollY;
    let scrollThreshold = 99 * window.innerHeight / 100;

    if (scrollPosition >= scrollThreshold) {
        targetDiv.classList.add('scrolled-class');
    } else {
        targetDiv.classList.remove('scrolled-class');
    }


    navLinks.forEach(function (navLink) {
        let sectionId = navLink.getAttribute('href').substring(1);
        let section = document.getElementById(sectionId);
        let sectionTop = section.offsetTop - 1;
        let sectionBottom = sectionTop + section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLink.classList.add('navcolor');
        } else {
            navLink.classList.remove('navcolor');
        }
    });
});



let stackItems = document.querySelectorAll('.stack');
let outItems = document.querySelectorAll('.out');

function handleHover(event) {
    let prevHovered = document.querySelector('.hovered');
    if (prevHovered) {
        prevHovered.classList.remove('hovered');
    }

    event.target.classList.add('hovered');

    let index = Array.from(this.parentNode.children).indexOf(this);
    outItems.forEach(function (item, i) {
        if (i === index) {
            item.style.display = 'block';
            setTimeout(function () {
                item.style.opacity = '1';
            }, 50);
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

stackItems.forEach(function (item) {
    item.addEventListener('mouseover', handleHover);
});


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});



document.addEventListener('DOMContentLoaded', function () {
    let modalTriggers = document.querySelectorAll('.modalTrigger');
    function openModal(modalId) {
        let modal = document.getElementById(modalId);
        let overlay = document.getElementById('overlay');
        console.log(modal)
        modal.style.display = "block";
        modal.offsetHeight;
        modal.style.opacity = "1";
        overlay.style.display = "block";
        document.body.classList.add('modal-open');
        console.log(modal)
    }
    function closeModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "none";
        overlay.style.display = "none";
        document.body.classList.remove('modal-open');
    }
    modalTriggers.forEach(function (trigger, index) {
        trigger.addEventListener('click', function () {
            let modalId = 'myModal' + (index + 1);
            openModal(modalId);
        });
    });
    document.querySelectorAll('.close').forEach(function (closeBtn, index) {
        closeBtn.addEventListener('click', function () {
            let modalId = 'myModal' + (index + 1);
            closeModal(modalId);
        });
    });
    var overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            document.querySelectorAll('.modal').forEach(function (modal, index) {
                var modalId = 'myModal' + (index + 1);
                if (modal.style.display === "block") {
                    closeModal(modalId);
                }
            });
        }
    });
});



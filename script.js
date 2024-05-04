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
        this.classList.toggle('is-active'); // Toggle class for hamburger
        overlay.classList.toggle('intro-active-overlay'); // Toggle class for overlay
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




// const hamburgers = document.querySelectorAll('.hamburger');
// const overlay = document.querySelector('.intro_overlay');
// const body = document.body;
// const mobileNav = document.querySelector(".mobile_nav");

// hamburgers.forEach(hamburger => {
//     hamburger.addEventListener('click', function () {
//         this.classList.toggle('is-active'); // Toggle class for hamburger
//         overlay.classList.toggle('intro-active-overlay'); // Toggle class for overlay
//         body.classList.toggle('no-scroll');
//         mobileNav.classList.toggle('mobile_nav_is-active');
//     });
// });

// const mobileNavItem = document.querySelector('.mobile_nav_list_item');

// mobileNavItem.forEach(navitem => {
//     navitem.addEventListener('click', function () {
//         overlay.classList.toggle('intro-active-overlay'); // Toggle class for overlay
//         body.classList.toggle('no-scroll');
//         mobileNav.classList.toggle('mobile_nav_is-active');
//     });
// });

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
    // Get all elements with class "modalTrigger"
    var modalTriggers = document.querySelectorAll('.modalTrigger');

    // Function to open the modal
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        var overlay = document.getElementById('overlay'); // assuming you have an overlay element
        modal.style.display = "block";
        modal.offsetHeight; // Trigger reflow to enable transition
        modal.style.opacity = "1";
        overlay.style.display = "block";
        document.body.classList.add('modal-open'); // Add class to body to restrict scrolling
    }

    // Function to close the modal
    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "none";
        overlay.style.display = "none";
        document.body.classList.remove('modal-open'); // Remove class to allow scrolling
    }

    // Add click event listener to each modalTrigger
    modalTriggers.forEach(function (trigger, index) {
        trigger.addEventListener('click', function () {
            var modalId = 'myModal' + (index + 1);
            openModal(modalId);
        });
    });

    // Add click event listener to close button
    document.querySelectorAll('.close').forEach(function (closeBtn, index) {
        closeBtn.addEventListener('click', function () {
            var modalId = 'myModal' + (index + 1);
            closeModal(modalId);
        });
    });

    // Add click event listener to overlay to close modal when clicking outside
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

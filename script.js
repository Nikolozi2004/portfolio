document.addEventListener("DOMContentLoaded", function () {
    // Add smooth scrolling to all links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                // Smooth scroll to the target element
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
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



var stackItems = document.querySelectorAll('.stack');
var outItems = document.querySelectorAll('.out');

// Function to handle hover behavior
function handleHover(event) {
    // Remove 'hovered' class from previously hovered element
    var prevHovered = document.querySelector('.hovered');
    if (prevHovered) {
        prevHovered.classList.remove('hovered');
    }

    // Add 'hovered' class to the currently hovered element
    event.target.classList.add('hovered');

    // Show the corresponding out item
    var index = Array.from(this.parentNode.children).indexOf(this);
    outItems.forEach(function (item, i) {
        if (i === index) {
            item.style.display = 'block';
            setTimeout(function () {
                item.style.opacity = '1';
            }, 50); // Delay to ensure display is updated before opacity transition starts
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

// Attach event listeners to stack elements
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
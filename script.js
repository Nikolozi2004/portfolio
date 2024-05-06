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









































const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight


c.fillStyle = 'rgb(15, 15, 30)'
c.fillRect(0, 0, canvas.width, canvas.height)
c.fillStyle = 'white'
c.strokeStyle = 'white'

let configs = {
    numOfParticles: 3500,
    particleSize: .7,
    cellSize: 20,
    curve: 2,
    zoom: 5,
    timer: .1,
    hue: 0,
    colorRange: 1,
    gridOverlay: 0
}

class Particle {
    constructor(effect) {
        this.effect = effect
        this.x = Math.floor(Math.random() * this.effect.width)
        this.y = Math.floor(Math.random() * this.effect.height)
        this.speedX
        this.speedY
        this.speedModifier = Math.floor(Math.random() * 3 + 1)
        this.timer = Math.floor(Math.random() * 20 + 1) * configs.timer
    }
    draw(context) {
        context.fillStyle = `hsl(${Math.floor(Math.random() * configs.colorRange * 90 + configs.hue)}, 100%, 50%)`
        context.fillRect(this.x, this.y, configs.particleSize, configs.particleSize)
    }
    drawGrid(context) {
        c.save()
        c.strokeStyle = 'white'
        c.lineWidth = 0.1
        for (let col = 1; col <= this.effect.cols; col++) {

            c.beginPath()
            c.moveTo(configs.cellSize * col, 0)
            c.lineTo(configs.cellSize * col, this.effect.height)
            c.stroke()
        }
        for (let row = 1; row <= this.effect.rows; row++) {
            c.beginPath()
            c.moveTo(0, configs.cellSize * row)
            c.lineTo(this.effect.width, configs.cellSize * row)
            c.stroke()
        }
        c.restore()
    }
    update() {
        this.timer -= 0.01
        if (configs.gridOverlay) {
            this.drawGrid()
        }
        if (this.timer > 0) {
            let x = Math.floor(this.x / this.effect.configs.cellSize)
            let y = Math.floor(this.y / this.effect.configs.cellSize)
            let index = y * this.effect.cols + x
            this.angle = this.effect.flowField[index]
            this.speedX = Math.sin(this.angle)
            this.speedY = Math.cos(this.angle)

            this.x += this.speedX * this.speedModifier
            this.y += this.speedY * this.speedModifier
        } else {
            this.x = Math.floor(Math.random() * this.effect.width)
            this.y = Math.floor(Math.random() * this.effect.height)
            this.timer = Math.floor(Math.random() * 2 + 1) * configs.timer
        }

    }
    reset() {

    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = []
        this.rows
        this.flowField = []
        this.configs = configs
        this.init()
    }
    init() {

        // create flow field
        this.rows = Math.floor(this.height / this.configs.cellSize)
        this.cols = Math.floor(this.width / this.configs.cellSize)
        this.flowField = []
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let angle = (Math.cos(x / configs.zoom) + Math.sin(y / configs.zoom)) * configs.curve
                this.flowField.push(angle)
            }
        }
        // console.log(this.flowField);
        // create particles
        this.particles = []
        for (let i = 0; i < configs.numOfParticles; i++) {
            this.particles.push(new Particle(this))
        }
        // it gets so slow after 3 times of resize :((
        window.addEventListener('resize', (e) => {
            this.resize(e.target.innerWidth, e.target.innerHeight)
        })
    }
    resize(width, height) {
        // this.canvas.width = width
        // this.canvas.height = height
        this.width = width
        this.height = height
        this.init()
    }
    render(context) {
        this.particles.forEach(particle => {
            particle.draw(context)
            particle.update()
        })
    }
}

const effect = new Effect(canvas)

const gui = new dat.GUI();
gui.add(configs, 'numOfParticles', 100, 4000).onChange(() => effect.init())
gui.add(configs, 'zoom', .01, 20).onChange(() => effect.init())
gui.add(configs, 'cellSize', .01, 50).onChange(() => effect.init())
gui.add(configs, 'curve', .01, 10).onChange(() => effect.init())
gui.add(configs, 'particleSize', .1, 3)
gui.add(configs, 'timer', .05, 7)
gui.add(configs, 'hue', 0, 360)
gui.add(configs, 'colorRange', 0, 4)
gui.add(configs, 'gridOverlay', 0, 1, 1)

function animate() {
    c.fillStyle = 'rgba(0, 0, 15, .03)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    effect.render(c)
    requestAnimationFrame(animate)

}
animate()
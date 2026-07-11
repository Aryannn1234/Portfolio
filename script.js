const roles = [
    "AI / ML Enthusiast",
    "Software Engineer",
    "Python Developer",
    "Java Developer",
    "Problem Solver"
];

const typing = document.getElementById("typing");

let role = 0;
let letter = 0;
let deleting = false;

function animateTyping(){

    const current = roles[role];

    if(!deleting){

        typing.textContent = current.substring(0,letter++);

        if(letter > current.length){

            deleting = true;

            setTimeout(animateTyping,1500);

            return;
        }

    }else{

        typing.textContent = current.substring(0,--letter);

        if(letter===0){

            deleting=false;

            role=(role+1)%roles.length;

        }

    }

    setTimeout(animateTyping,deleting?40:80);

}

animateTyping();
/* ===========================================
   CANVAS PARTICLE ENGINE
=========================================== */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const mouse = {
    x: undefined,
    y: undefined,
    radius: 140
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("mouseleave", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;

        if (mouse.x !== undefined) {

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                this.x += dx * 0.02;
                this.y += dy * 0.02;

            }

        }

    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle = "#60a5fa";

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#3b82f6";

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

    }

}

const particles = [];

const PARTICLE_COUNT = 90;

for (let i = 0; i < PARTICLE_COUNT; i++) {

    particles.push(new Particle());

}

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(96,165,250,${1 - distance / 120})`;

                ctx.lineWidth = 0.6;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {

        particle.update();
        particle.draw();

    });

    connectParticles();

    requestAnimationFrame(animateParticles);

}

animateParticles();
/* ===================================
   CURSOR GLOW
=================================== */

const glow = document.getElementById("cursor-glow");

window.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});
/* ===================================
   SCROLL REVEAL
=================================== */

const sections=document.querySelectorAll(".section");

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

sections.forEach(section=>observer.observe(section));
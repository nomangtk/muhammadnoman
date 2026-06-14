// CUSTOM CURSOR

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

});

// HERO ANIMATION

gsap.from(".hero-title",{

y:120,
opacity:0,
duration:1.5

});

gsap.from(".hero-text",{

y:50,
opacity:0,
duration:1.5,
delay:.3

});

gsap.from(".hero-buttons",{

y:50,
opacity:0,
duration:1.5,
delay:.6

});

// DARK MODE

// const toggle=document.getElementById("theme-toggle");

// toggle.addEventListener("click",()=>{

// document.body.classList.toggle("light");

// });

const toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {

    document.body.classList.toggle("light");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light")
        ? "light"
        : "dark"
    );
};

if(localStorage.getItem("theme")==="light"){
    document.body.classList.add("light");
}


// let count = 0;
// const counter = document.querySelector(".loader-counter");

// const interval = setInterval(() => {
//     count++;
//     counter.textContent = count + "%";

//     if(count >= 100){
//         clearInterval(interval);

//         gsap.to(".loader",{
//             y:"-100%",
//             duration:1.2,
//             ease:"power4.inOut"
//         });
//     }
// },20);

window.addEventListener("load", () => {

let count = 0;

const counter = document.querySelector(".loader-counter");
const loader = document.querySelector(".loader");

const interval = setInterval(() => {

count++;

counter.innerHTML = count + "%";

if(count >= 100){

clearInterval(interval);

gsap.to(loader,{
yPercent:-100,
duration:1.2,
ease:"power4.inOut"
});

}

},15);

});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".services-title",{
y:150,
opacity:0,
duration:1.4
});

gsap.utils.toArray(".service-card").forEach(card=>{

gsap.from(card,{
scrollTrigger:{
trigger:card,
start:"top 85%"
},
y:100,
opacity:0,
duration:1
});

});

gsap.utils.toArray(".process-item").forEach(item=>{

gsap.from(item,{
scrollTrigger:{
trigger:item,
start:"top 85%"
},
x:-100,
opacity:0,
duration:1
});

});


// Footer
gsap.from(".footer-brand",{
scrollTrigger:{
trigger:".footer",
start:"top 85%"
},
y:80,
opacity:0,
duration:1
});

gsap.from(".footer-links div",{
scrollTrigger:{
trigger:".footer",
start:"top 85%"
},
y:50,
opacity:0,
duration:1,
stagger:.2
});

window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".project-card").forEach(card => {

        const video = card.querySelector("video");

        card.addEventListener("mouseenter", () => {
            video.play();
        });

        card.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0; /* optional */
        });

    });

});
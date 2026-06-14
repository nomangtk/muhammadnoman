let count = 0;
const counter = document.querySelector(".loader-counter");

const interval = setInterval(() => {
    count++;
    counter.textContent = count + "%";

    if(count >= 100){
        clearInterval(interval);

        gsap.to(".loader",{
            y:"-100%",
            duration:1.2,
            ease:"power4.inOut"
        });
    }
},20);
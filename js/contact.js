gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title",{
y:120,
opacity:0,
duration:1.2
});

gsap.from(".contact-hero p",{
y:50,
opacity:0,
delay:.3,
duration:1
});

gsap.from(".contact-info",{
scrollTrigger:{
trigger:".contact-info",
start:"top 80%"
},
x:-100,
opacity:0,
duration:1
});

gsap.from(".contact-form",{
scrollTrigger:{
trigger:".contact-form",
start:"top 80%"
},
x:100,
opacity:0,
duration:1
});

gsap.utils.toArray(".info-card").forEach(card=>{

gsap.from(card,{
scrollTrigger:{
trigger:card,
start:"top 90%"
},
y:50,
opacity:0,
duration:.8
});

});

gsap.from(".cta h2",{
scrollTrigger:{
trigger:".cta",
start:"top 75%"
},
scale:.8,
opacity:0,
duration:1
});

gsap.to(".blob1",{
x:60,
y:100,
repeat:-1,
yoyo:true,
duration:8,
ease:"sine.inOut"
});

gsap.to(".blob2",{
x:-80,
y:-100,
repeat:-1,
yoyo:true,
duration:10,
ease:"sine.inOut"
});
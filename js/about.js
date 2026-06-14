gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title",{
y:120,
opacity:0,
duration:1.2
});

gsap.from(".about-hero p",{
y:50,
opacity:0,
delay:.3,
duration:1
});

gsap.utils.toArray(".stat-card").forEach(card=>{

gsap.from(card,{
scrollTrigger:{
trigger:card,
start:"top 85%"
},
y:80,
opacity:0,
duration:1
});

});

gsap.utils.toArray(".timeline-item").forEach(item=>{

gsap.from(item,{
scrollTrigger:{
trigger:item,
start:"top 90%"
},
x:-100,
opacity:0,
duration:.8
});

});

gsap.from(".story-right",{
scrollTrigger:{
trigger:".story",
start:"top 75%"
},
x:100,
opacity:0,
duration:1
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
y:100,
x:50,
repeat:-1,
yoyo:true,
duration:8,
ease:"sine.inOut"
});

gsap.to(".blob2",{
y:-100,
x:-50,
repeat:-1,
yoyo:true,
duration:10,
ease:"sine.inOut"
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
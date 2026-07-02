// CUSTOM CURSOR

const cursor = document.querySelector(".cursor");

if (cursor) {
  cursor.style.display = "none";

  document.addEventListener("mousemove", (e) => {
    cursor.style.display = "block";
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.display = "block";
  });
}

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

// Categories Section
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category-btn");
  const projects = document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active button and aria-pressed
      buttons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      
      // Filter projects
      const filter = btn.dataset.filter;
      projects.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
// categories section
const videos = [
  { id: "uiSdtVXrhpI", category: "talking-head", title: "Create a Realistic AI Avatar That Looks & Sounds 100% Like You" },
  { id: "qFubB9NHkRM", category: "avatar", title: "Create Realistic AI AVATARS That Look And Talk EXACTLY Like You!" },
  { id: "w7uJAjSIOwM", category: "ugc", title: "Create UGC ads videos for products" },
  { id: "XP97QiivcSk", category: "ugc", title: "Create UGC ads videos for products" },
  { id: "3Ng7gLio9-E", category: "short-form", title: "Mastering Short Form Video EDITING" },
  { id: "SRDgc5uxrAk", category: "avatar", title: "Edit Short-Form Videos" },
  { id: "XSwXQuIb_oI", category: "avatar", title: "VIRAL Long-Form Videos" },
  { id: "LG79GZqNX8o", category: "short-form", title: "Long-Form Video Editing" },
  { id: "1oLx2liPHdQ", category: "avatar", title: "Long Form Videos" },
  { id: "49Wb-liud2Q", category: "avatar", title: "Realistic AI Avatar" },
  { id: "Ucawd3G6kew", category: "avatar", title: "Realistic AI Avatar for Instagram Influncer" },
  { id: "d9CK7eGGZtI", category: "long-form", title: "Long-Form SToory video generation" },
  { id: "Xay73UTnef0", category: "long-form", title: "Animated Cartoon videos with AI" },
  { id: "2w1JKGqmZys", category: "long-form", title: "Cartoon Videos with AI" },
  { id: "k6wtaCfLexM", category: "short-form", title: "Full Cartoon Animation Stories With AI" },
  { id: "87GIUzlk83A", category: "avatar", title: "Realistic AI Avatars that look & Sound like You" },
  { id: "sB-pL44tso0", category: "talking-head", title: "Talking AI Clone That Looks Just Like You" },
  { id: "gwdiIgxkCM8", category: "talking-head", title: "Ultra Realistic AI Clone" },
  { id: "adOKCVwSOLk", category: "avatar", title: " Realistic AI avatar" },
  { id: "RSprs7za1xY", category: "podcast", title: "AI voice generator for a podcast" },
  { id: "1D6RfetEA9A", category: "podcast", title: "3D Animated AI Podcast Video" }
];

const videosPerPage = 8;
let currentFilter = "all";
let currentIndex = 0;
const grid = document.getElementById("portfolioGrid");
const loadMoreBtn = document.getElementById("loadMore");
const filterEls = document.querySelectorAll(".category-list li");

// Function to render videos
function renderCards() {
  const filtered = (currentFilter === "all")
    ? videos
    : videos.filter(v => v.category === currentFilter);
  const slice = filtered.slice(currentIndex, currentIndex + videosPerPage);
  slice.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";
    col.innerHTML = `
      <div class="portfolio-card">
        <div class="video-thumb" data-id="${video.id}"
             role="button" tabindex="0" aria-label="Play video: ${video.title}">
          <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg"
               alt="${video.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/320x180?text=No+Image';">
          <div class="play-btn"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="portfolio-info">
          <h3>${video.title}</h3>
          <p>${video.category.replace('-', ' ')}</p>
        </div>
      </div>`;
    grid.appendChild(col);

    // Click and Keydown handlers for thumbnail
    const thumb = col.querySelector(".video-thumb");
    thumb.addEventListener("click", playVideo);
    thumb.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        playVideo.call(this, e);
      }
    });
  });

  currentIndex += slice.length;
  if (currentIndex >= filtered.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}



// Function to replace thumbnail with YouTube iframe
function playVideo(event) {
  const thumb = event.currentTarget || event.target.closest(".video-thumb");
  const id = thumb.dataset.id;
  thumb.innerHTML = `
    <iframe width="100%" height="100%" loading="lazy"
      src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>`;
}

// Category filter handling
filterEls.forEach(li => {
  li.addEventListener("click", () => {
    // Update active class
    filterEls.forEach(el => el.classList.remove("active"));
    li.classList.add("active");
    // Reset and render new filter
    currentFilter = li.dataset.filter;
    currentIndex = 0;
    grid.innerHTML = "";
    renderCards();
  });
  li.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      li.click();
    }
  });
});


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


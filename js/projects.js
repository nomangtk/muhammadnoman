// ===============================
// CUSTOM CURSOR
// ===============================

const cursor = document.querySelector(".cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

// ===============================
// THEME TOGGLE
// ===============================

const toggle = document.getElementById("theme-toggle");

if (toggle) {

    toggle.onclick = () => {

        document.body.classList.toggle("light");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light")
                ? "light"
                : "dark"
        );
    };

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
}

// ===============================
// PROJECT FILTER + SEARCH + PAGINATION
// ===============================

const categoryButtons =
    document.querySelectorAll(".category-list li");

const searchInput =
    document.getElementById("searchInput");

const projectCards =
    Array.from(document.querySelectorAll(".project-card"));

const pagination =
    document.getElementById("pagination");

const projectsPerPage = 15;

let filteredCards = [...projectCards];
let currentPage = 1;

// ===============================
// SHOW PAGE
// ===============================

function showPage(page) {

    currentPage = page;

    projectCards.forEach(card => {
        card.style.display = "none";
    });

    const start =
        (page - 1) * projectsPerPage;

    const end =
        start + projectsPerPage;

    filteredCards
        .slice(start, end)
        .forEach(card => {
            card.style.display = "block";
        });

    document
        .querySelectorAll(".page-btn")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    const activeBtn =
        document.querySelector(
            '[data-page="' + page + '"]'
        );

    if (activeBtn) {
        activeBtn.classList.add("active");
    }
}

// ===============================
// CREATE PAGINATION
// ===============================

function createPagination() {

    if (!pagination) return;

    pagination.innerHTML = "";

    const totalPages =
        Math.ceil(
            filteredCards.length /
            projectsPerPage
        );

    for (let i = 1; i <= totalPages; i++) {

        const btn =
            document.createElement("button");

        btn.classList.add("page-btn");

        btn.textContent = i;

        btn.setAttribute(
            "data-page",
            i
        );

        btn.addEventListener(
            "click",
            () => showPage(i)
        );

        pagination.appendChild(btn);
    }

//     const savedPage =
// parseInt(localStorage.getItem("currentProjectPage")) || 1;

// showPage(savedPage);
showPage(1);
}

// ===============================
// CATEGORY FILTER
// ===============================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        filteredCards =
            projectCards.filter(card => {

                if (filter === "all") {
                    return true;
                }

                return (
                    card.dataset.category ===
                    filter
                );
            });

        createPagination();
    });
});

// ===============================
// SEARCH
// ===============================

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        () => {

            const value =
                searchInput.value
                    .toLowerCase();

            const activeCategory =
                document.querySelector(
                    ".category-list li.active"
                )?.dataset.filter || "all";

            filteredCards =
                projectCards.filter(card => {

                    const title =
                        card.querySelector("h3")
                            .textContent
                            .toLowerCase();

                    const categoryMatch =
                        activeCategory === "all" ||
                        card.dataset.category === activeCategory;

                    return (
                        title.includes(value) &&
                        categoryMatch
                    );
                });

            createPagination();
        }
    );
}

// ===============================
// INITIAL LOAD
// ===============================

createPagination();

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
  { id: "1D6RfetEA9A", category: "podcast", title: "3D Animated AI Podcast Video" },
  { id: "1D6RfetEA9A", category: "product-ads", title: "3D Animated AI Podcast Video" },

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

// Load more button handler
loadMoreBtn.addEventListener("click", renderCards);

// Initial render
renderCards();

// Open category from index.html
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

if (selectedCategory) {

    const categoryButton = document.querySelector(
        `.category-list li[data-filter="${selectedCategory}"]`
    );

    if (categoryButton) {
        categoryButton.click();
    }

}



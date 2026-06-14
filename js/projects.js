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
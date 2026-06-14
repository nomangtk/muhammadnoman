// const projects =
// JSON.parse(localStorage.getItem("projects")) || [];

// projects.push({
// title,
// category,
// thumbnail,
// video
// });

// localStorage.setItem(
// "projects",
// JSON.stringify(projects)
// );

// const form = document.getElementById("projectForm");

// form.addEventListener("submit",e=>{

// e.preventDefault();

// const project = {

// title:
// document.getElementById("title").value,

// category:
// document.getElementById("category").value,

// image:
// document.getElementById("image").value

// };

// const projects =
// JSON.parse(
// localStorage.getItem("projects")
// ) || [];

// projects.push(project);

// localStorage.setItem(
// "projects",
// JSON.stringify(projects)
// );

// alert("Project Added");

// form.reset();

// });

const form =
document.getElementById("projectForm");

form.addEventListener("submit", e => {

e.preventDefault();

const project = {

title:
document.getElementById("title").value,

category:
document.getElementById("category").value,

thumbnail:
document.getElementById("thumbnail").value,

video:
document.getElementById("video").value

};

const projects =
JSON.parse(
localStorage.getItem("projects")
) || [];

projects.push(project);

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

alert("Project Added");

form.reset();

});

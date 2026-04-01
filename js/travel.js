const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

if (localStorage.getItem("userData")) {
    const userData = JSON.parse(localStorage.getItem("userData"));
} else {
    userName.classList.add("d-none");
}

logoutBtn.addEventListener("click", (e) => {
    console.log("logout");

    e.preventDefault();
    localStorage.removeItem("userData");
    window.location.href = "index.html";
})
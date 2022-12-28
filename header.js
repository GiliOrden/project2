/**
 * if the user is logged in, change the header accordingly
 */
if (localStorage.user !== undefined) {
    document.getElementById("login").style.display = "none";
    document.getElementById("profile").textContent = 
    JSON.parse(localStorage.users)[localStorage.user].name;
    document.getElementById("logout").style.display = "block";
}
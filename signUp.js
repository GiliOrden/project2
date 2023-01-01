function signUp() {
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    if (password !== password2) {
        alert("הסיסמאות שהזנת אינן זהות");
        return false;
    }
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let user = {name, password, email, phone};
    let users;
    if (localStorage.users === undefined) {
        users = {};
    } else {
        users = JSON.parse(localStorage.users);
        if (users[username] !== undefined) {
            alert("שם המשתמש שבחרתם כבר קיים. בחרו אחר.");
            return false;
        }
    }
    users[username] = user;
    localStorage.users = JSON.stringify(users);
}

function confirmPassword() {
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");
    if (password.value !== password2.value) {
        password.style.border = "2px red solid";
        password2.style.border = "2px red solid";
    } else {
        password.style.border = "2px green solid";
        password2.style.border = "2px green solid";
    }
}
const users = JSON.parse(localStorage.users);
const user = users[localStorage.user];
let name = document.getElementById("name");
let username = document.getElementById("username");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let conPass = document.getElementById("conPass");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
conPass.style.display = "none";
name.value = user.name;
username.value = localStorage.user;
password.value = user.password;
email.value = user.email;
phone.value = user.phone;

function enable() {
    this.previousElementSibling.readOnly = false;
}

function edit() {
    users[localStorage.user][this.name] = this.value;
    localStorage.users = JSON.stringify(users);
    this.readOnly = true;
}

function editPassword() {
    conPass.style.display = "";
}

function seePassword() {
    password.type = "text";
}

function notSeePassword() {
    password.type = "password";
}

function confirmPassword() {
    if (password.value === password2.value) {
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,20}/.test(password.value)) {
            edit.call(password);
            conPass.style.display = "none";
        } else {
            alert("הסיסמא חייבת לכלול אות אנגלית גדולה, אות אנגלית קטנה, ומספר, ולא יכולה להיות יותר מ-20 תווים")
        }
    } else {
        alert("הסיסמאות אינן זהות");
    }
}

let buttons = document.getElementsByClassName('edit');
for(let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = enable;
    buttons[i].previousElementSibling.readOnly = true;
    buttons[i].previousElementSibling.onchange = edit;
}

let editPass = document.getElementById("edit-pass");
editPass.addEventListener("click", editPassword);
editPass.previousElementSibling.onchange = ()=>{};

let seePass = document.getElementById("see-pass");
seePass.addEventListener("mousedown", seePassword);
seePass.addEventListener("mouseup", notSeePassword);
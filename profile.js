/**
 * profile script
 */
const users = JSON.parse(localStorage.users);
const user = users[localStorage.user];
let name = document.getElementById("name");
let username = document.getElementById("username");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let conPass = document.getElementById("conPass");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let highDiamond = document.getElementById("high-diamond");
let dateDiamond = document.getElementById("date-diamond");
let highMemory = document.getElementById("high-memory");
let dateMemory = document.getElementById("date-memory");
//set high and date for diamond avalanche
if (user.diamondAvalanche !== undefined) {
    highDiamond.textContent = user.diamondAvalanche.high;
    dateDiamond.textContent = user.diamondAvalanche.date;
} else {
    highDiamond.textContent = 0;
    dateDiamond.textContent = "לא הייתה כניסה למשחק";
}
//set high and date dor memory game
if (user.memoryGame !== undefined) {
    highMemory.textContent = user.memoryGame.high === -1? "הפסדתם במשחק" : user.memoryGame.high + " דקות";
    dateMemory.textContent = user.memoryGame.date;
} else {
    highMemory.textContent = "אין";
    dateMemory.textContent = "לא הייתה כניסה למשחק";
}
//set the attributes of user
conPass.style.display = "none";
name.value = user.name;
username.value = localStorage.user;
password.value = user.password;
email.value = user.email;
phone.value = user.phone;

const check = {
    email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    tel: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
    text: /.+/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,20}/};

//enable editing
function enable() {
    this.previousElementSibling.readOnly = false;
}

//edit attribute of user
function edit() {
    if(check[this.type].test(this.value)) {
        this.style.border = "";
        users[localStorage.user][this.name] = this.value;
        localStorage.users = JSON.stringify(users);
        this.readOnly = true;
    } else {
        this.style.border = "2px red solid"
        alert("התאימו את הקלט לתבנית הרצויה");
    }
}

//show confirm password
function editPassword() {
    conPass.style.display = "";
}

//show the password
function seePassword() {
    password.type = "text";
}

//hide the password
function notSeePassword() {
    password.type = "password";
}

//confirm password
function confirmPassword() {
    if (password.value !== "" && password2.value !== "") {
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
}

//for each edit button, enable editing when clicked
let buttons = document.getElementsByClassName('edit');
for(let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = enable;
    buttons[i].previousElementSibling.readOnly = true;
    buttons[i].previousElementSibling.onchange = edit;
}

//show confirm password when edit
let editPass = document.getElementById("edit-pass");
editPass.addEventListener("click", editPassword);
editPass.previousElementSibling.onchange = confirmPassword;

//show password when the eye button clicked
let seePass = document.getElementById("see-pass");
seePass.addEventListener("mousedown", seePassword);
seePass.addEventListener("mouseup", notSeePassword);
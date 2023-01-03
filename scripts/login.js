/**
 * script for login
 */
  
/**
 * returns the value of selected cookie of the document
 * @param {name of a cookie} cname 
 * @returns the value of the cookie
 */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

/**
 * The function that is invoked when the button is clicked
 * @returns whether the user may enter the website
 */
function login() {
    if (localStorage.users === undefined) {
        alert("לא קיימים משתמשים במערכת. אנא הרשמו וצרו את חשבונכם.");
        return false;
    }

    let username = document.getElementById("username").value;
    if (getCookie("username") == username) {
        alert("נחסמתם מהאתר");
        return false;
    }

    let user = JSON.parse(localStorage.users)[username];
    if (user === undefined) {
        alert("שם המשתמש אינו קיים במערכת");
        return false;
    } 

    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.users);
    if (user.password !== password) {
        alert("שם המשתמש או הסיסמא אינם נכונים");
        //count the attempts to write the password
        if (user.passwordAttempts === undefined) {
            users[username].passwordAttempts = 1;
            localStorage.users = JSON.stringify(users);
        } else {
            users[username].passwordAttempts++;
            localStorage.users = JSON.stringify(users);
        }
        //if it is the 5th attempt, the user blocked
        if (users[username].passwordAttempts >= 5) {
            const d = new Date();
            d.setTime(d.getTime() + (12*60*60*1000));//12 hours
            document.cookie = "username=" + username + ";expires=" + 
            d.toUTCString() + ";path=/";
            users[username].passwordAttempts = 0;
            localStorage.users = JSON.stringify(users);
            alert("נחסמתם מהאתר ל-12 שעות");
        }
        return false;
    }

    users[username].passwordAttempts = 0;
    localStorage.users = JSON.stringify(users);
    localStorage.user = username;
}
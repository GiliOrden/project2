if (!localStorage.user) {
  let links = document.querySelectorAll("a.game");
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = need_log_in;
    links[i].href = "";
  }
}
function need_log_in() {
  const massage = document.getElementById("need_log_in");
  massage.classList.remove("hide-message");
  return false;
}

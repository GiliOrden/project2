if (!localStorage.user) {
  let links = document.querySelectorAll("a.game");
  for (let i = 0; i < links.length; i++) {
    links[i].href = "";
    links[i].onclick = need_log_in;
  }
}
function need_log_in() {
  const massage = document.getElementById("game-over");
  massage.classList.remove("hide-message");
  return false;
}

if (!localStorage.user) {
  let links = document.querySelectorAll("a.game");
  for (let i = 0; i < links.length; i++) {
    links[i].href = "";
  }
  const massage = document.getElementById("game-over");
  //   massage.classList.remove("hide-message");
}

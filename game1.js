const cards = document.querySelectorAll(".card");

let card1, card2;
let disable = false;
let numOfMatches = 0;

function flipingCard(e) {
  let clickCard = e.target;
  if (clickCard !== card1 && !disable) {
    clickCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickCard);
    }
    disable = true;
    card2 = clickCard;
    let card1Img = card1.querySelector(".back-view img").src;
    console.log(card1Img);
    let card2Img = card2.querySelector(".back-view img").src;
    console.log(card2Img);
    ceckMatch(card1Img, card2Img);
  }
}
//this func checks if there is a match between 2 cards
function ceckMatch(card1Img, card2Img) {
  //there is a match
  if (card1Img === card2Img) {
    numOfMatches++;
    if (numOfMatches === 10) {
      //end of the game
      setTimeout(() => {
        return finishCards();
      }, 2000);
    }

    card1.removeEventListener("click", flipingCard);
    card2.removeEventListener("click", flipingCard);
    card1 = card2 = "";
    return (disable = false);
  }
  //adding the class shake for 'shaking' animation
  card1.classList.add("shake");
  card2.classList.add("shake");
  //removig the classes shake&flip after 1.3s
  setTimeout(() => {
    card1.classList.remove("shake", "flip");
    card2.classList.remove("shake", "flip");
    // setting the both cards to be null
    card1 = card2 = "";
    disable = false;
  }, 1300);
}
//we finished thee game and we start again
function finishCards() {
  numOfMatches = 0;
  disable = false;
  card1 = card2 = "";
  //creat an array for diffrent order of cards
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flip");
    let imgTag = cards[i].querySelector(".back-view img");
    imgTag.src = `flags_pic/flag${arr[i]}.png`;
    cards[i].addEventListener("click", flipingCard);
  }
}
finishCards();

for (let i = 0; i < cards.length; i++) {
  //cards[i].classList.add("flip");
  cards[i].addEventListener("click", flipingCard);
}

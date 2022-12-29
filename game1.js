const cards = document.querySelectorAll(".card");
const clock = document.querySelector(".timer b");
const startGame = document.querySelector(".start-game");
let card1, card2;
let disable = false;
let numOfMatches = 0;
let timer;
let leftFlips = 40;

//this func gets a cards fliping it and check if there is a match if the another card
function flipingCard(e) {
  let clickCard = e.target;
  if (clickCard !== card1 && !disable) {
    leftFlips--;

    document.getElementById("left_flips").innerHTML = leftFlips;
    //emphasizing in red that the left flips is going to end
    if (leftFlips <= 5) {
      document.querySelector(".flips").classList.add("flips_red");
    }
    clickCard.classList.add("flip");
    //this is the first card we flip
    if (!card1) {
      return (card1 = clickCard);
    }
    //there is 2 cards open
    disable = true; // for not fliping 3 cards at the same time
    card2 = clickCard;
    let card1Img = card1.querySelector(".back-view img").src;
    console.log(card1Img);
    let card2Img = card2.querySelector(".back-view img").src;
    console.log(card2Img);
    let ifWin = ceckMatch(card1Img, card2Img);
    //check if there is a lose in the game
    if (leftFlips === 0 && ifWin !== 1) {
      //stop the timer
      clearInterval(timer);
      setTimeout(() => {
        return messagesOfTheGame("You are such a loser😒");
      }, 2500);
    }
  }
}
//this func checks if there is a match between 2 cards, it return 1 if we found all matches (win)
function ceckMatch(card1Img, card2Img) {
  //there is a match
  if (card1Img === card2Img) {
    numOfMatches++;
    if (numOfMatches === 10) {
      //end of the game-win
      //stop the timer
      clearInterval(timer);
      setTimeout(() => {
        return messagesOfTheGame(
          `You won the game!🤩<br> Time passed: ${clock.innerHTML} s`
        );
      }, 1000);
      return 1;
    }
    //unable to flip the match cards
    card1.removeEventListener("click", flipingCard);
    card2.removeEventListener("click", flipingCard);
    card1 = card2 = "";
    return (disable = false);
  }
  //there is no match
  //adding the class shake for 'shaking' animation
  card1.classList.add("shake");
  card2.classList.add("shake");
  //removig the classes shake&flip after 1.3s
  setTimeout(() => {
    card1.classList.remove("shake", "flip");
    card2.classList.remove("shake", "flip");
    // setting the both cards to be null
    card1 = card2 = "";
    if (leftFlips !== 0) {
      return (disable = false);
    }
  }, 1300);
}
//starting/refreshing all the game
function startAllGame() {
  numOfMatches = 0;
  disable = false;
  card1 = card2 = "";
  leftFlips = 40;
  document.getElementById("left_flips").innerHTML = leftFlips;
  let message = document.getElementById("game-over");
  message.classList.add("hide-message");
  //if it turned to red last game return it to black
  document.querySelector(".flips").classList.remove("flips_red");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flip");
  }
  //creat an array for random order of cards
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  //the exrtra time is for not seeing the next card before it finish to flip the side
  setTimeout(() => {
    for (let i = 0; i < cards.length; i++) {
      let imgTag = cards[i].querySelector(".back-view img");
      imgTag.src = `flags_pic/flag${arr[i]}.png`;
      cards[i].addEventListener("click", flipingCard);
    }
  }, 500);
  //start the timer
  timeOver();
}

//this func gets a message of starting/finishing/refreshing the game, and show it on the screen
function messagesOfTheGame(str) {
  disable = true; //unable to flip the cards
  document.querySelector("#game-over b").innerHTML = str;

  let message = document.getElementById("game-over");
  message.classList.remove("hide-message");
  //clicking on the buttle we start the game
  startGame.addEventListener("click", startAllGame);
}

//rifreshing the game after clicking the buttle 'refresh'
function refreshing() {
  //stop the timer
  clearInterval(timer);
  startGame.innerHTML = "start again";
  return messagesOfTheGame("Do you want to start again?🙂");
}

//this function calculate the timer of the game
function timeOver() {
  let sec = 1;
  let minute = 0;
  //set the timer every second
  timer = setInterval(() => {
    if (sec <= 9) {
      clock.innerHTML = minute + ":0" + sec;
    } else if (sec <= 59) {
      clock.innerHTML = minute + ":" + sec;
    } else {
      //there is more than 60 seconds
      minute++;
      sec -= 60;
      clock.innerHTML = minute + ":00";
    }
    sec++;
  }, 1000);
}
//at the biggining of the game:

messagesOfTheGame("Let's start the game!😁");

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", flipingCard);
}

document.getElementById("refresh").addEventListener("click", refreshing);

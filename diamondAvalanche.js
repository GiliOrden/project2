/**
 * script for the diamond avalanche game
 */
const game = document.querySelector('.game');
const diamonds = game.getElementsByClassName('diamond');
const shuki = document.getElementById('shuki');
const scoreDiamonds = document.getElementById('diamonds');
const scoreLife = document.getElementById('life');
const bGMusic = document.getElementById('background-music');
const soundDiamond = document.getElementById('sound-diamond');
const soundRock = document.getElementById('sound-rock');
const soundBtn = document.getElementById('sound');
const musicBtn = document.getElementById('music');
const refreshBtn = document.getElementById('refresh');
const menuBoard = document.querySelector('.menu-board');
let fallingSpeed; //%height fall each 1ms
let rockFrequency; //1 from frequncy is a rock
let pos = []; //%height from the topfor each diamond
const fallIntervals = [];
let levelInterval;
let goInterval;
let life = 3;
let numDiamonds = 0;
let rightOrLeft = true;
let stoped = false;
let sound = true;
let music = true;

//became the diamond to to a rock randomaly in the rock frequency
function rock(diamond) {
    if (Math.floor(Math.random() * rockFrequency) == 0) {
        diamond.classList.add('rock');
    } else if (diamond.classList.contains('rock')) {
        diamond.classList.remove('rock');
    }
}

// the diamond in index, fall in the falling speed to the bottom,
// then restart maybe as a rock. if it touch on shuki, it disapear
// and if it is a diamond, add 1 to num diamonds,
// and if it is a rock, release 1 from life
function falling(index) {
    let diamond = diamonds[index];
    if(life == 0) {
        clearInterval(fallIntervals[index]);
        if (!stoped) {
            stoped = true;
            clearInterval(levelInterval);
            document.removeEventListener('keydown', go);
            gameOver();

        }
    } else  {
        pos[index] += fallingSpeed;
        diamond.style.top = pos[index] + '%';
        //the diamond in at the height of shuki
        if (pos[index] >= 61) {
            const shukiCol = Number(shuki.style.right.slice(0, -1))/10;
            //if the diamond or the rock touch shuki
            if (shukiCol >= index && shukiCol < index + 1 || 
                shukiCol + 1 > index && shukiCol + 1 < index + 1) {
                if (diamond.classList.contains('rock')) {
                    if(sound) {
                        soundRock.play();
                    }
                    life--;
                    scoreLife.textContent = scoreLife.textContent.replace('❤️', '');
                } else {
                    if(sound) {
                        soundDiamond.play();
                    }
                    numDiamonds++;
                    scoreDiamonds.textContent = numDiamonds;
                }
                pos[index] = -14 - Math.floor(Math.random()*50)/ fallingSpeed;
                diamond.style.top = pos[index] + '%';
                rock(diamond);
            } else if (pos[index] >= 86) {
                pos[index] = -14 - Math.floor(Math.random()*50) / fallingSpeed;
                diamond.style.top = pos[index] + '%';
                rock(diamond);
            }    
        }
    }
}

//remote the level of difficulty each 5 minutes
function levels () {
    levelInterval = setInterval(() => {
        fallingSpeed += 0.1;
        if (fallingSpeed > 25) {
            clearInterval(levelInterval);
        }
        if (rockFrequency > 0) {
            rockFrequency -= 1;
        }
    }, 60 * 1000);
}

//Toggles shuki between mode 1 and mode 2
function shuki12 () {
    if (shuki.classList.contains('shuki1')) {
        shuki.classList.remove('shuki1');
        shuki.classList.add('shuki2');
    } else {
        if (shuki.classList.contains('shuki2')) {
            shuki.classList.remove('shuki2');
        }
        shuki.classList.add('shuki1');
    }
}

//go shuki right or left according to pressures
function go(event) {
    console.log(event);
    let shukiRight = Number(shuki.style.right.slice(0, -1));
    if(event.which == '39') { //arrow right
        if(!rightOrLeft) {
            shuki.style.transform = '';
            rightOrLeft = true;
        }
        if (shukiRight > 0) {
            shuki.style.right = shukiRight - 2 + '%';
            if (goInterval === undefined) {
                shuki12();
                goInterval = setInterval(shuki12, 500);   
            } 
        }
    } else if (event.which == '37') { //arrow left
        if(rightOrLeft) {
            shuki.style.transform = 'rotateY(180deg)';
            rightOrLeft = false;
        }
        if (shukiRight < 90) {
            shuki.style.right = shukiRight + 2 + '%';
            if (goInterval === undefined) {
                shuki12();
                goInterval = setInterval(shuki12, 500);   
            } 
        }
    }
}

//stop the go animation
function stopGo() {
    clearInterval(goInterval);
    goInterval = undefined;
}

//Reset all variables and attributes
function reset() {
    fallingSpeed = 0.1;
    rockFrequency = 15;
    stoped = false;
    levelInterval;
    life = 3;
    numDiamonds = 0;
    rightOrLeft = true;
    //each diamond maybe became to rock and
    //start to fall after 0-5000ms each 1ms
    for (let i = 0; i < diamonds.length; i++) {
        rock(diamonds[i]);
        pos[i] = -14;
        diamonds[i].style.top = '-14%';
        let random = Math.floor(Math.random()*10000);
        setTimeout(function () {
            fallIntervals[i] = setInterval(falling, 1, i);
        }, random);
    }
    scoreDiamonds.textContent = '0';
    scoreLife.textContent = "❤️❤️❤️";
    shuki.style.right = '45%';
    shuki.style.transform = '';
    levels();//the difficulty level start to remote
    document.addEventListener('keydown', go);
    document.addEventListener('keyup', stopGo);
    menuBoard.style.visibility = 'visible';
    refreshBtn.style.visibility = 'visible';
    if (music) {
        bGMusic.play();
    }
}

//stop the game when refreshed
refreshBtn.addEventListener('click', () => {
    for(let i = 0; i < fallIntervals.length; i++) {
        clearInterval(fallIntervals[i]);
    }
    clearInterval(levelInterval);
    document.removeEventListener('keydown', go);
});

//add click event listener to the start button
//add event listeners to each start button so the game will start when it clicked
let startBtns = game.getElementsByClassName('start-game');
for(let i = 0; i < startBtns.length; i++) {
    startBtns[i].addEventListener('click', reset);
}

//set the event onclick for the sound and background music buttons
soundBtn.onclick = () => {
    if(sound) {
        sound = false;
        soundBtn.src = 'images/no_sound_icon.png';
    } else {
        sound = true;
        soundBtn.src = 'images/sound_icon.png';
    }
}

musicBtn.onclick = () => {
    if(music) {
        music = false;
        bGMusic.pause();
        musicBtn.src = 'images/no_music_icon.png';
    } else {
        music = true;
        bGMusic.play();
        musicBtn.src = 'images/music_icon.png';
    }
}

//full screen game
let fullScreenBtn = document.getElementById('full-screen');
fullScreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.webkitRequestFullscreen) { /* Safari */
            game.webkitRequestFullscreen();
        } else if (game.msRequestFullscreen) { /* IE11 */
            game.msRequestFullscreen();
        }
        fullScreenBtn.querySelector('img').src = 'images/exit_full_screen_icon.png';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        fullScreenBtn.querySelector('img').src = 'images/full_screen_icon.png';
    }
}

//when the game over show the score and high
function gameOver() {
    refreshBtn.style.visibility = 'hidden';
    let gOver = document.getElementById('game-over');
    let finalDiamonds = document.getElementById('diamonds-final');
    finalDiamonds.textContent = numDiamonds;
    let highBoard = document.getElementById('high');
    let high = localStorage.high;
    if (high !== undefined && Number(high) >= numDiamonds) {
        highBoard.style.fontSize = 'smaller';
        highBoard.textContent = `השיא שלכם הוא: ${high}💎`;
    } else {
        localStorage.high = numDiamonds;
        highBoard.style.fontSize = '';
        highBoard.textContent = '🏆שיא חדש!';
    }
    gOver.style.display = 'block';
}
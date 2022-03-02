// This script should only start once the DOM has finished loading
/** The start-function gets all the buttons of the DOM and adds event listner to them
 *  The respective functions are all called by clicking "Start".
 */
document.addEventListener ("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons){
    button.addEventListener("click", function(){
      if (this.getAttribute("data-type") === "start") {
        document.getElementById("countdown").innerHTML = 4;
        document.getElementById("clash").style = "";
        countdown();
        playerMove();
        opponentMove();
        runGame();
      } else {

      }
    })
  }
})


// Countdown - this will start a display of number counting down, which might be used later to check if a skill was selected before the value was at "0"
function countdown() {
  document.getElementById("countdown").style.visibility = "visible";
  let countdown = 3;
  let x = setInterval(function() {
    if(countdown <= 0) {
      clearInterval(x)
      document.getElementById("clash").style.visibility = "visible";
      document.getElementById("clash").style.animationName = "clash-zoom";
      document.getElementById("clash").style.animationDuration = "1s";
      document.getElementById("clash").style.animationFillMode = "forwards";
    }
  document.getElementById("countdown").innerHTML = 0 + countdown;
  countdown -= 1;
  }, 1000);
}
  
// The Animation
/**
 * Two knights charging another and clash in the middel of the screen
 */
function playerMove() {
  document.getElementById("player").style.visibility = "visible";

  let id = null;
  let elem = document.getElementById("player");
  let pos = -800;
  clearInterval(id);
  id = setInterval(frame, 5);

  function frame() {
    if (pos == 2) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.right = -pos + 'px';
    }
  }
}

function opponentMove() {
document.getElementById("opponent").style.visibility = "visible";

  let id = null;
  let elem = document.getElementById("opponent");
  let pos = -800;
  clearInterval(id);
  id = setInterval(frame, 5);
  
  function frame() {
    if (pos == 2) {
      clearInterval(id);
      } else {
        pos++;
        elem.style.left = -pos + 'px';
      }
    }
}


// Main Game Functions
/**
 * Function to check which skill button has been clicked
 * This should then be displayed in the "player-skill"-div and may add a value to the hidden section of the page for comparison
 */
function runGame() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons){
    button.addEventListener("click", function(){
      if (this.getAttribute("data-type") === "shield") {
        document.getElementsByClassName("player-skill").style.background = "url(../images/shield.png)";
        alert(`You clicked Shield`);
      } else if (this.getAttribute("data-type") === "lance") {
        document.getElementsByClassName("player-skill").style.background = "url(../images/lance.png)";
      } else if (this.getAttribute("data-type") === "ride") {
        document.getElementsByClassName("player-skill").style.background = "url(../images/horse.png)";
      } else if (this.getAttribute("data-type") === "") {
      }
    }
  )}
}

/**
 * Function to randomly create 1, 2 or 3 to choose the computer picked skill
 * Function to set up an array of [shield, lance, ride] and assign them an index
 */
function opponentSkill(){
  let skills = [shield, lance, ride]
  let num = Math.floor(Math.random() *3);
  
  if (skills.indexOf("shield") === num ){
    document.getElementsByClassName("pc-skill").style.background = "url(../images/shield.png)";
  } else if (skills.indexOf("lance") === num ){
    document.getElementsByClassName("pc-skill").style.background = "url(../images/lance.png)";
  } else {
    document.getElementsByClassName("pc-skill").style.background = "url(../images/horse.png)";
  }   
}

/**
 * Function to compare player skill and computer skill and determine the winner
 */


//Score
/**
 * Gets the current Score from the DOM and adds the appropriate value to it
 * 1000 for a Win
 * 50 for participation (due to the high randomness and chanceto fail by bad luck)
 * Only not choosing any skill will award no points
 */

function winScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = oldScore + 1000;
}

function loseScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = oldScore + 50;
}

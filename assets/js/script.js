// This script should only start once the DOM has finished loading
/** The start-function gets all the buttons of the DOM and adds an event listener to them
 *  The respective functions are all called by clicking "Start".
 *  Clicking the other button will change the content on the user 
 */
 document.addEventListener ("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons){
    button.addEventListener("click", function(){
      if (this.getAttribute("data-type") === "shield") {
        document.getElementById("player-skill").title = "Shield";
        document.getElementById("p-skill-image").src = "assets/images/shield.png";

      } else if (this.getAttribute("data-type") === "lance") {
        document.getElementById("player-skill").title = "Lance";
        document.getElementById("p-skill-image").src = "assets/images/lance.png";

      } else if (this.getAttribute("data-type") === "ride") {
        document.getElementById("player-skill").title = "Ride";
        document.getElementById("p-skill-image").src = "assets/images/horse.png";

      } else {
        document.getElementById("countdown").innerHTML = 4;
        document.getElementById("clash").style = "";
        document.getElementById("message").style = "";
        document.getElementById("player-skill").title = "Null";
        document.getElementById("pc-skill").title = "Null";
        document.getElementById("p-skill-image").src = "assets/images/placeholder.png";
        document.getElementById("o-skill-image").src = "assets/images/placeholder.png";
        countdown();
        playerMove();
        opponentMove();
      }
    });
  }
});


// Countdown - this will start a display of number counting down, which might be used later to check if a skill was selected before the value was at "0"
function countdown() {
  document.getElementById("countdown").style.visibility = "visible";
  let countdown = 3;
  let x = setInterval(function() {
    if(countdown <= 0) {
      clearInterval(x);
      document.getElementById("clash").style.visibility = "visible";
      document.getElementById("clash").style.animationName = "clash-zoom";
      document.getElementById("clash").style.animationDuration = "1s";
      document.getElementById("clash").style.animationFillMode = "forwards";
      opponentSkill();
      compareSkill();
    }
  document.getElementById("countdown").innerHTML = 0 + countdown;
  countdown -= 1;
  }, 1000);
}
  
// The Animation
/**
 * Two knights charging another and clash in the middle of the screen
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


/**
 * Function to randomly create 0, 1, or 2 to choose the computer picked skill
 * Function to set up an array of ["shield", "lance", "ride"] and assign them an index
 */
function opponentSkill(){
  let skills = ["shield", "lance", "ride"];
  let num = Math.floor(Math.random() *3);

  if (skills.indexOf("shield") === num ){
    document.getElementById("pc-skill").title = "Shield";
    document.getElementById("o-skill-image").src = "assets/images/shield.png";

  } else if (skills.indexOf("lance") === num ){
    document.getElementById("pc-skill").title = "Lance";
    document.getElementById("o-skill-image").src = "assets/images/lance.png";

  } else {
    document.getElementById("pc-skill").title = "Ride";
    document.getElementById("o-skill-image").src = "assets/images/horse.png";
  }
}

/**
 * Function to compare player skill and computer skill and determine the winner
 * Shield > Lance
 * Lance > Speed
 * Speed > Shield
 */
function compareSkill(){
  let playerSkill = document.getElementById("player-skill").title;
  let oppSkill = document.getElementById("pc-skill").title;
  
    //Draw
  if (playerSkill === oppSkill){ 
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").innerText = "Oh! It's a draw!";
    drawScore();
    
  } else if (playerSkill === "Shield"){
    if (oppSkill === "Lance"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Victory! Your shield stood strong!";
      winScore();
    } else if (oppSkill === "Ride"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Ouch! He nimbly bypassed your shield!";
      loseScore();
    }  

  } else if (playerSkill === "Lance"){
    if (oppSkill === "Ride"){
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").innerText = "Victory! Your lance scored a hit!";
    winScore();
    } else if (oppSkill === "Shield"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Ouch! Your lance broke upon his shield!";
      loseScore();
    }

  } else if (playerSkill === "Ride"){
    if (oppSkill === "Shield"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Victory! Your nimbleness bypassed the shield!";
      winScore();
    } else if (oppSkill === "Lance"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Ouch! Your nimbleness did not prevent this blow!";
      loseScore();
    }

  } else {
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").innerText = "You forfeit this round!";
  }
}

//Score
/**
 * Gets the current Score from the DOM and adds the appropriate value to it
 * 1000 for a Win
 * 50 for participation (due to the high randomness and chance to fail by bad luck)
 * Only not choosing any skill will award no points
 */

function winScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = oldScore + 1000;
}

function drawScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = oldScore + 500;
}

function loseScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = oldScore + 50;
}
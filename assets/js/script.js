// This script should only start once the DOM has finished loading
/** The start-function gets all the buttons of the DOM and adds an event listener to them
 *  The respective functions are all called by clicking "Start".
 *  Clicking the other button will change the content on the user 
 */
 document.addEventListener ("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons){
    button.addEventListener("click", function(){
      // If the player clicks the button with the shield, the immage of the shield is displayed in the "Used Skill" section and the "title" and "alt" discription are set accordingly.
      if (this.getAttribute("data-type") === "shield") {
        document.getElementById("player-skill").title = "Shield";
        document.getElementById("p-skill-image").src = "assets/images/shield.png";
        document.getElementById("p-skill-image").alt = "Blocking with your shield.";
        // If the player clicks the button with the lance, the immage of the lance is displayed in the "Used Skill" section and the "title" and "alt" discription are set accordingly.
      } else if (this.getAttribute("data-type") === "lance") {
        document.getElementById("player-skill").title = "Lance";
        document.getElementById("p-skill-image").src = "assets/images/lance.png";
        document.getElementById("p-skill-image").alt = "Attacking with your lance.";
        // If the player clicks the button with the horse, the immage of the horse is displayed in the "Used Skill" section and the "title" and "alt" discription are set to "ride".
      } else if (this.getAttribute("data-type") === "ride") {
        document.getElementById("player-skill").title = "Ride";
        document.getElementById("p-skill-image").src = "assets/images/horse.png";
        document.getElementById("p-skill-image").alt = "Swift and nimble riding.";
        /** The only other button on the webpage is "start".
         *  Clicking start will first reset the animation, the coundown and the display and all other changes from the previous round in the game-section.
         */ 
      } else {
        document.getElementById("countdown").innerHTML = 4; // This resets the coundown back to "4"
        document.getElementById("clash").style = ""; // This removes the "clash.webp" of the previous round from the webpage
        document.getElementById("message").style = ""; // This removes the "message" from the last round
        // This resets the skill, picture and alt-discription
        document.getElementById("player-skill").title = "Null"; 
        document.getElementById("pc-skill").title = "Null";
        document.getElementById("p-skill-image").src = "assets/images/placeholder.png";
        document.getElementById("p-skill-image").alt = "Nothing";
        document.getElementById("o-skill-image").src = "assets/images/placeholder.png";
        document.getElementById("o-skill-image").alt = "Nothing";
        // Here the other functions are started.
        countdown();
        // This calls the animation of the two knights.
        playerMove();
        opponentMove();
      }
    });
  }
});

// Countdown - this will start a display of number counting down, which is used to check if a skill was selected before the value was at "0"
function countdown() {
  document.getElementById("countdown").style.visibility = "visible";
  let countdown = 3;
  let x = setInterval(function() {
    // When the countdown hits "0", the countdown is stopped.
    if(countdown <= 0) {
      clearInterval(x);
      // Also when the countdown hits "0" the  clash-image is shown and animated
      document.getElementById("clash").style.visibility = "visible";
      document.getElementById("clash").style.animationName = "clash-zoom";
      document.getElementById("clash").style.animationDuration = "1s";
      document.getElementById("clash").style.animationFillMode = "forwards";
      // Finally two function are called upon once the countdown hits "0":
      opponentSkill(); // This will creat a skill randomly.
      compareSkill(); // this will compare the above generated skill with the selected skill of the player
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
  // This moves the players knight from left to right
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
  // This moves the opponent knight from right to left
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
  // The index of shield is 0, if the randomly created number is also 0, the title, image and alt discription are set appropriatly.
  if (skills.indexOf("shield") === num ){
    document.getElementById("pc-skill").title = "Shield";
    document.getElementById("o-skill-image").src = "assets/images/shield.png";
    document.getElementById("o-skill-image").alt = "Blocking with his shield.";
    // The index of lance is 1, if the randomly created number is also 1, the title, image and alt discription are set appropriatly.
  } else if (skills.indexOf("lance") === num ){
    document.getElementById("pc-skill").title = "Lance";
    document.getElementById("o-skill-image").src = "assets/images/lance.png";
    document.getElementById("o-skill-image").alt = "Attacking with his lance.";
    // The index is anything else then 0 or 1, the title, image and alt discription are set to the only skill left: "ride".
  } else {
    document.getElementById("pc-skill").title = "Ride";
    document.getElementById("o-skill-image").src = "assets/images/horse.png";
    document.getElementById("o-skill-image").alt = "He uses swift and nimble riding.";
  }
}

/**
 * Function to compare player skill and computer skill and determine the winner
 * Shield > Lance
 * Lance > Speed
 * Speed > Shield
 */
function compareSkill(){
  // selecting + generating a skill set the "title" on two places in the html - here the content of "title" will now be compared.
  let playerSkill = document.getElementById("player-skill").title;
  let oppSkill = document.getElementById("pc-skill").title;
  
    // When the skills match, we have a draw.
  if (playerSkill === oppSkill){ 
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").innerText = "Oh! It's a draw!";
    drawScore();
    
  } else if (playerSkill === "Shield"){
    // When the player pressed the shield button and the generated skill is lance, the player wins because "Shield" beats "Lance"
    if (oppSkill === "Lance"){ 
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Victory! Your shield stood strong!";
      winScore();
    // When the player pressed the shield button and the generated skill is ride, the player loses because "Ride" beats "Shield"
    } else if (oppSkill === "Ride"){ 
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Ouch! He nimbly bypassed your shield!";
      loseScore();
    }  

  } else if (playerSkill === "Lance"){
    // When the player pressed the lance button and the generated skill is ride, the player wins because "Lance" beats "Ride"
    if (oppSkill === "Ride"){
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").innerText = "Victory! Your lance scored a hit!";
    winScore();
    // When the player pressed the lance button and the generated skill is shield, the player loses because "Shield" beats "Lance"
    } else if (oppSkill === "Shield"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Ouch! Your lance broke upon his shield!";
      loseScore();
    }

  } else if (playerSkill === "Ride"){
    // When the player pressed the ride button and the generated skill is shield, the player wins because "Ride" beats "Shield"
    if (oppSkill === "Shield"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Victory! Your nimbleness bypassed the shield!";
      winScore();
    // When the player pressed the lance button and the generated skill is lance, the player loses because "Lance" beats "Ride"
    } else if (oppSkill === "Lance"){
      document.getElementById("message").style.visibility = "visible";
      document.getElementById("message").innerText = "Ouch! Your nimbleness did not prevent this blow!";
      loseScore();
    }

  } else {
    // When the player did not press any skill button he lost by default
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").innerText = "You forfeit this round!";
  }
}

//Score
/**
 * Gets the current Score from the DOM and adds the appropriate value to it
 * 1000 for a Win
 * 500 if it is a draw
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

// Resetting the score back to zero
function resetScore() {
  postMessage("Resetting the Score to 0")
  document.getElementById("score").innerText = 0;
}

//Instructions
function instructions() {
  postMessage(
    'Welcome to Jousting!\n'
    + '\n'
    + 'To start the game please press the "Start-Button".\n'
    + '\n'
    + 'Once the "Start-Button" is pressed you have 5 seconds to select on of the 3 Skills below.\n'
    + 'When the Countdown hits "0" your last selected Skill,before the timer ran out will be compared to the computer generated timer.\n'
    + '\n'
    + 'A shield will block a lance.\n'
    + 'An attack with the lance will beat an unshielded opponent.\n'
    + 'Nimbleness will help to bypass a shield.\n'
    + '\n'
    + 'You will get 1000 points for a win.\n'
    + 'A draw will give you 500 points.\n'
    + 'Losing a round will give you 50 points.\n'
    + 'Not choosing any skill, by not pressing any button before the countdown hits "0" will award no points.\n'
    + '\n'
    + 'Best of luck to you and have fun!'
  )
}
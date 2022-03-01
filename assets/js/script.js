document.addEventListener ("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName ("button");

  for (let button of buttons){
    button.addEventListener("click", function(){
      if (this.getAttribute("data-type") === "start") {
        document.getElementById("countdown").innerHTML = 4;
        document.getElementById("clash").style = "";
        countdown();
        playerMove();
        opponentMove();
      } else {
        let skillType = this.getAttribute("data-type");
        alert(`You clicked ${skillType}`);
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
  
// The visusal aid of the animated knight running towards each other to support the countdown
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
// Countdown

function countdown() {
  document.getElementById("countdown").style.visibility = "visible";
let countdown = 3;
let x = setInterval(function() {
  if(countdown <= 0) {
    clearInterval(x)
  }
  document.getElementById("countdown").innerHTML = 0 + countdown;
  countdown -= 1;
}, 1000);
}


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

function clashZoom() {
document.getElementById("clash").style.visibility = "visible";
let clash = document.getElementById("clash");

clash.style.animationName = "clash-zoom";
clash.style.animationDuration = "2s";
clash.style.animationFillMode = "forwards";

}

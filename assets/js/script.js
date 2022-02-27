// Countdown

let countdown = 3;
let x = setInterval(function() {
  if(countdown <= 0) {
    clearInterval(x)
  }
  document.getElementById("countdown").innerHTML = 0 + countdown;
  countdown -= 1;
}, 1000);


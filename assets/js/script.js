let timeLeft = document.getElementById("timeLeft");
let timeEl = document.getElementById("time");

const countdown = () => {
  var timeLeft = 10;

  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeEl.textContent = 'Time Left: ' + timeLeft;
      timeLeft--;
    } else {
      timeEl.textContent = 'Time is up!';
      clearInterval(timeInterval);
    }
  }, 1000);
}
countdown();
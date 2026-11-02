// Real-time digital clock and date display
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // AM/PM session
  let session = "AM";
  if (hours >= 12) {
    session = "PM";
  }

  // Convert to 12-hour time (0 becomes 12, 13-23 become 1-11)
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  // Leading zeros for values less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const time = hours + ":" + minutes + ":" + seconds + " " + session;
  const date = now.toLocaleDateString();

  document.getElementById("clock-face").innerHTML = time;
  document.getElementById("calendar-date").innerHTML = date;
}

// Show the time right away, then update every second
updateClock();
setInterval(updateClock, 1000);

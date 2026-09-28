// Magic Eight Ball

// Step 3.1: Array of possible answers
const answers = [
  "It is certain.",
  "Without a doubt.",
  "Yes, definitely.",
  "Most likely.",
  "Ask again later.",
  "Cannot predict now.",
  "Don't count on it.",
  "My sources say no.",
  "Outlook not so good."
];

// Page elements
const ball = document.getElementById("ball");
const circle = document.getElementById("circle");
const question = document.getElementById("question");
const resetButton = document.getElementById("reset");

// Step 3.2: Pick a random answer and show it in the circle
function displayAnswer() {
  let index = Math.floor(Math.random() * answers.length);
  circle.innerHTML = answers[index];
  circle.style.display = "flex";
}

// Step 3.3: When the ball is pressed, check for a question first
ball.addEventListener("mousedown", function () {
  if (question.value.trim() === "") {
    alert("Please type a question before asking the Magic Eight Ball.");
  } else {
    displayAnswer();
  }
});

// Step 3.4: Reset button hides the answer circle
resetButton.addEventListener("click", function () {
  circle.style.display = "none";
});

// Pressing Enter in the question box: check for a question instead of reloading the page
question.form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (question.value.trim() === "") {
    alert("Please type a question before asking the Magic Eight Ball.");
  } else {
    displayAnswer();
  }
});

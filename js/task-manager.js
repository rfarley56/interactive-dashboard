// task-manager.js
// Calculates a user's weekly task goal based on their daily target and bonus tasks

function weeklyGoal(userName, dailyGoal, bonusTasks) {
    // Multiply the daily goal by 5 workdays to get the weekly goal
    const weeklyTotal = dailyGoal * 5;

    // Add bonus tasks to the weekly goal to get the total goal
    const totalGoal = weeklyTotal + bonusTasks;

    // Build the output message
    const output = `${userName}, your weekly task goal is ${weeklyTotal} tasks. ` +
        `With ${bonusTasks} bonus tasks, your total goal is ${totalGoal} tasks.`;

    // Display the result in the goal-message paragraph
    document.getElementById("goal-message").innerHTML = output;
}

// Run weeklyGoal() when the user clicks the goal-btn button
document.getElementById("goal-btn").addEventListener("click", function (event) {
    // Prevent the form from submitting and reloading the page
    event.preventDefault();

    // Grab the current values from the form fields
    const userName = document.getElementById("user-name").value;
    const dailyGoal = Number(document.getElementById("daily-goal").value);
    const bonusTasks = Number(document.getElementById("bonus-tasks").value);

    weeklyGoal(userName, dailyGoal, bonusTasks);
});
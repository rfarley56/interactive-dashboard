// task-manager.js
// Module 6: Calculates a user's weekly task goal based on their daily target and bonus tasks
// Module 7: Dynamic Weekly Task List built with DOM manipulation

// ---- Global array to track tasks (Module 7) ----
let myTasks = [];

// =====================================================================
// Weekly Task Goal calculator (Module 6 — unchanged)
// =====================================================================

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

// =====================================================================
// Weekly Task List (Module 7)
// =====================================================================

// Create the <ul> with JavaScript, give it an ID, and append it to the "task-list" div
const userTasks = document.createElement("ul");
userTasks.id = "user-tasks";
userTasks.className = "list-group mt-3";
document.getElementById("task-list").appendChild(userTasks);

// Add a task when the user clicks the "Add Task" button
document.getElementById("add-task").addEventListener("click", function () {
    const taskInput = document.getElementById("task-name");

    // Capture the string from the input field
    const taskText = taskInput.value.trim();

    // Ignore empty entries
    if (taskText === "") {
        taskInput.focus();
        return;
    }

    // Store the task in the myTasks array
    myTasks.push(taskText);

    // Create the list item
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Task text (textContent, not innerHTML, so typed input can't inject HTML)
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    // Create the button for this task
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.className = "btn btn-sm btn-outline-danger";
    removeBtn.addEventListener("click", function () {
        // Remove the task from the array and the page, keeping them in sync
        const index = Array.from(userTasks.children).indexOf(li);
        if (index > -1) {
            myTasks.splice(index, 1);
        }
        li.remove();
        console.log("myTasks:", myTasks);
    });

    // Assemble: append the button to the <li>, then the <li> to the <ul>
    li.appendChild(removeBtn);
    userTasks.appendChild(li);

    // Clear the input for the next task
    taskInput.value = "";
    taskInput.focus();

    console.log("myTasks:", myTasks);
});

// Pressing Enter in the task input would submit the form and reload the page;
// stop that and click "Add Task" instead
document.getElementById("task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("add-task").click();
});

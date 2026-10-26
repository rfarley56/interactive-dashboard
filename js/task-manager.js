/**
 * ============================================================
 *  Task Manager — My Interactive Dashboard (WEB-115)
 *  Author: Robyn Farley
 *
 *  Lets users add, edit, delete, and complete tasks. Every task
 *  is stored as an object in the `tasks` array, rendered into
 *  the #task-list div as DOM nodes, styled with the .style
 *  property, and the full array is logged to the console with
 *  JSON.stringify() after every add, update, or delete.
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ---------- Data ---------- */

  // Array of task objects. Each object has the shape:
  // { id: 1, name: "Finish JavaScript project", priority: "High",
  //   isImportant: true, isCompleted: false }
  let tasks = [];
  let nextId = 1; // incrementing id so every task is unique

  // Colors used for priority styling (left border + badge)
  const PRIORITY_COLORS = {
    High: "#fd7e14",   // orange
    Medium: "#0d6efd", // blue
    Low: "#6c757d"     // gray
  };

  /* ---------- Element references ---------- */

  const form = document.getElementById("task-form");
  const nameInput = document.getElementById("task-name");
  const prioritySelect = document.getElementById("task-priority");
  const importantCheckbox = document.getElementById("task-important");
  const deleteListBtn = document.getElementById("delete-list-btn");
  const taskListDiv = document.getElementById("task-list");
  const messageEl = document.getElementById("task-message");
  const summaryEl = document.getElementById("task-summary");

  /* ---------- Helpers ---------- */

  /** Logs the full task list to the console as a JSON string. */
  function logTasks(action) {
    console.log(action);
    console.log(JSON.stringify(tasks));
  }

  /** Shows a short status message under the form. */
  function showMessage(text, isError) {
    messageEl.textContent = text;
    messageEl.style.color = isError ? "#dc3545" : "#198754";
    messageEl.style.visibility = text ? "visible" : "hidden";
  }

  /** Finds a task object by its id. */
  function findTask(id) {
    return tasks.find(function (task) {
      return task.id === id;
    });
  }

  /* ---------- Core task functions ---------- */

  /**
   * Adds a new task object to the array, re-renders the list,
   * and logs the updated array.
   */
  function addTask(name, priority, isImportant) {
    const task = {
      id: nextId++,
      name: name,
      priority: priority,
      isImportant: isImportant,
      isCompleted: false
    };
    tasks.push(task);
    renderTasks();
    logTasks("Task added:");
  }

  /**
   * Marks a task complete / not complete. Called from the
   * checkbox DOM node created for each task.
   */
  function toggleComplete(id) {
    const task = findTask(id);
    if (!task) return;
    task.isCompleted = !task.isCompleted;
    renderTasks();
    logTasks("Task updated (completion):");
  }

  /** Updates an existing task's name, priority, and importance. */
  function updateTask(id, changes) {
    const task = findTask(id);
    if (!task) return;
    task.name = changes.name;
    task.priority = changes.priority;
    task.isImportant = changes.isImportant;
    renderTasks();
    logTasks("Task updated (edit):");
  }

  /** Removes a single task from the array. */
  function deleteTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    renderTasks();
    logTasks("Task deleted:");
  }

  /** Removes the entire task list after the user confirms. */
  function deleteTaskList() {
    if (tasks.length === 0) {
      showMessage("The list is already empty.", true);
      return;
    }
    if (!confirm("Delete all " + tasks.length + " task(s)? This cannot be undone.")) {
      return;
    }
    tasks = [];
    renderTasks();
    showMessage("Task list deleted.", false);
    logTasks("Task list deleted:");
  }

  /* ---------- Styling (conditional logic) ---------- */

  /**
   * Applies visual styles with the .style property:
   *  - Priority  -> colored left border + font weight
   *  - Important -> highlighted in red
   *  - Completed -> strikethrough
   */
  function applyTaskStyles(li, nameSpan, task) {
    // Priority styling
    li.style.borderLeft = "6px solid " + PRIORITY_COLORS[task.priority];
    if (task.priority === "High") {
      nameSpan.style.fontWeight = "700";
    } else if (task.priority === "Medium") {
      nameSpan.style.fontWeight = "500";
    } else {
      nameSpan.style.fontWeight = "400";
    }

    // Important tasks highlighted in red
    if (task.isImportant) {
      li.style.backgroundColor = "#ffe5e5";
      nameSpan.style.color = "red";
    } else {
      li.style.backgroundColor = "#ffffff";
      nameSpan.style.color = "#212529";
    }

    // Completed tasks get a strikethrough
    if (task.isCompleted) {
      nameSpan.style.textDecoration = "line-through";
      li.style.opacity = "0.65";
    } else {
      nameSpan.style.textDecoration = "none";
      li.style.opacity = "1";
    }
  }

  /* ---------- Rendering (DOM nodes) ---------- */

  /** Creates a small button DOM node. */
  function createButton(text, className, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-sm " + className;
    btn.textContent = text;
    btn.addEventListener("click", onClick);
    return btn;
  }

  /** Builds the <li> DOM node for one task in normal (view) mode. */
  function createTaskNode(task) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex flex-wrap align-items-center gap-2";
    li.dataset.id = task.id;

    // Mark-complete checkbox (DOM node)
    const completeBox = document.createElement("input");
    completeBox.type = "checkbox";
    completeBox.className = "form-check-input mt-0";
    completeBox.id = "complete-" + task.id;
    completeBox.checked = task.isCompleted;
    completeBox.setAttribute("aria-label", "Mark task complete");
    completeBox.addEventListener("change", function () {
      toggleComplete(task.id);
    });

    // Task name (textContent keeps user input safe)
    const nameSpan = document.createElement("label");
    nameSpan.htmlFor = completeBox.id;
    nameSpan.className = "flex-grow-1 mb-0";
    nameSpan.textContent = task.name;

    // Priority badge
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = task.priority;
    badge.style.backgroundColor = PRIORITY_COLORS[task.priority];

    li.appendChild(completeBox);
    li.appendChild(nameSpan);

    // Important badge
    if (task.isImportant) {
      const impBadge = document.createElement("span");
      impBadge.className = "badge";
      impBadge.textContent = "Important";
      impBadge.style.backgroundColor = "red";
      li.appendChild(impBadge);
    }

    li.appendChild(badge);

    // Edit + Delete buttons
    const actions = document.createElement("div");
    actions.className = "d-flex gap-1";
    actions.appendChild(createButton("Edit", "btn-outline-secondary", function () {
      showEditForm(li, task);
    }));
    actions.appendChild(createButton("Delete", "btn-outline-danger", function () {
      deleteTask(task.id);
    }));
    li.appendChild(actions);

    applyTaskStyles(li, nameSpan, task);
    return li;
  }

  /** Replaces a task's <li> contents with inline edit controls. */
  function showEditForm(li, task) {
    li.innerHTML = "";
    li.style.backgroundColor = "#f8f9fa";
    li.style.opacity = "1";

    const editName = document.createElement("input");
    editName.type = "text";
    editName.className = "form-control form-control-sm flex-grow-1";
    editName.style.minWidth = "160px";
    editName.style.width = "auto";
    editName.value = task.name;
    editName.setAttribute("aria-label", "Edit task name");

    const editPriority = document.createElement("select");
    editPriority.className = "form-select form-select-sm";
    editPriority.style.width = "auto";
    editPriority.setAttribute("aria-label", "Edit priority");
    ["High", "Medium", "Low"].forEach(function (level) {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level;
      option.selected = level === task.priority;
      editPriority.appendChild(option);
    });

    const impWrap = document.createElement("label");
    impWrap.className = "d-flex align-items-center gap-1 mb-0";
    const editImportant = document.createElement("input");
    editImportant.type = "checkbox";
    editImportant.className = "form-check-input mt-0";
    editImportant.checked = task.isImportant;
    impWrap.appendChild(editImportant);
    impWrap.appendChild(document.createTextNode("Important"));

    function save() {
      const newName = editName.value.trim();
      if (newName === "") {
        showMessage("Task name cannot be empty.", true);
        editName.focus();
        return;
      }
      updateTask(task.id, {
        name: newName,
        priority: editPriority.value,
        isImportant: editImportant.checked
      });
      showMessage("Task updated.", false);
    }

    // Enter saves, Escape cancels
    editName.addEventListener("keydown", function (e) {
      if (e.key === "Enter") save();
      if (e.key === "Escape") renderTasks();
    });

    li.appendChild(editName);
    li.appendChild(editPriority);
    li.appendChild(impWrap);
    li.appendChild(createButton("Save", "btn-success", save));
    li.appendChild(createButton("Cancel", "btn-outline-secondary", renderTasks));
    editName.focus();
  }

  /** Clears #task-list and rebuilds the <ul> from the tasks array. */
  function renderTasks() {
    taskListDiv.innerHTML = "";

    if (tasks.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-muted fst-italic mb-0";
      empty.textContent = "No tasks yet. Add one above!";
      taskListDiv.appendChild(empty);
    } else {
      const ul = document.createElement("ul");
      ul.className = "list-group";
      tasks.forEach(function (task) {
        ul.appendChild(createTaskNode(task));
      });
      taskListDiv.appendChild(ul);
    }

    updateSummary();
  }

  /** Shows a quick count of total / completed / important tasks. */
  function updateSummary() {
    const completed = tasks.filter(function (t) { return t.isCompleted; }).length;
    const important = tasks.filter(function (t) { return t.isImportant; }).length;
    summaryEl.textContent =
      tasks.length + " task(s) · " + completed + " completed · " + important + " important";
  }

  /* ---------- Event listeners ---------- */

  // Submit button (or Enter in the input) adds a task
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();

    if (name === "") {
      showMessage("Please enter a task name.", true);
      nameInput.focus();
      return;
    }

    addTask(name, prioritySelect.value, importantCheckbox.checked);
    showMessage('Added "' + name + '".', false);

    // Reset the form for the next task
    form.reset();
    prioritySelect.value = "Medium";
    nameInput.focus();
  });

  // Delete List button removes every task
  deleteListBtn.addEventListener("click", deleteTaskList);

  // Initial render (shows the empty-state message)
  renderTasks();
  showMessage("", false);
});

// Select elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const taskList = document.getElementById("task-list");
const timeline = document.getElementById("timeline");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks in list and timeline
function renderTasks() {
  taskList.innerHTML = "";
  timeline.innerHTML = "";

  tasks.forEach((task, index) => {
    // Task list
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.text} - ${task.date} ${task.time}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);

    // Timeline
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerText = `${task.date} ${task.time} → ${task.text}`;
    timeline.appendChild(div);
  });
}

// Add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    text: taskInput.value,
    date: dateInput.value,
    time: timeInput.value,
    completed: false
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskForm.reset();
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();

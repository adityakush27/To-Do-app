let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div>
        <span>${task.text}</span><br/>
        <small>${task.dateTime ? new Date(task.dateTime).toLocaleString() : ""}</small>
      </div>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Done"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskInput.value,
    dateTime: taskDateTime.value,
    completed: false
  });

  taskInput.value = "";
  taskDateTime.value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

renderTasks();

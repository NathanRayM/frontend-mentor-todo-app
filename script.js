// DOM element variables
const input = document.getElementById("input");
const taskList = document.getElementById("task-list");
const allFilter = document.querySelectorAll(".filter-all");
const activeFilter = document.querySelectorAll(".filter-active");
const completedFilter = document.querySelectorAll(".filter-completed");
const clearCompleted = document.querySelector(".clear-completed");
const taskCount = document.getElementById("task-count");

let allTasks;

//Default toDos for pageload
const defaultTodos = [
  {
    id: Date.now(),
    text: "Complete online JavaScript course",
    completed: true,
  },
  { id: Date.now() + 1, text: "Jog around the park 3x", completed: false },
  { id: Date.now() + 2, text: "10 minutes meditation", completed: false },
  { id: Date.now() + 3, text: "Read for 1 hour", completed: false },
  { id: Date.now() + 4, text: "Pick up groceries", completed: false },
  {
    id: Date.now() + 5,
    text: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
];

// Target Body and toggle light/dark mode
const bodyElement = document.body;
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  bodyElement.classList.toggle("dark");
});

// variable containing local storage that loads on page load
let tasks = JSON.parse(localStorage.getItem("todos"));

if (!tasks || tasks.length === 0) {
  tasks = defaultTodos;
  localStorage.setItem("todos", JSON.stringify(tasks));
}
displayTasks();

// save tasks function setting local storage
function saveTasks() {
  let taskValue = input.value;
  localStorage.setItem("todos", JSON.stringify(tasks));
}

// Display task function to get the local storage and append needed HTML elements
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.setAttribute("class", `list-item ${task.completed ? "completed" : ""}`);
    li.setAttribute("draggable", true);

    li.innerHTML = `
  <div class="li-container">
  <label class="task-text">
    <input
      type="checkbox"
      name="selectedTask"
      class="select-checkbox"
      value="${task.id}"
      ${task.completed ? "checked" : ""}
    />
    ${task.text}
  </label>
</div>
<button class="delete-button" aria-label="Delete task">
   <img class="task-delete" src="images/icon-cross.svg" alt="" />
 </button>
`;

    taskList.appendChild(li);
  });
  allTasks = Array.from(taskList.children); // render li's as array

  let totalTasks = allTasks.length;
  let completedTasks = 0;

  allTasks.forEach((task) => {
    let completed = task.classList.contains("completed");

    if (completed) {
      completedTasks++;
    }
  });

  let activeTasks = totalTasks - completedTasks;
  taskCount.textContent = `${activeTasks}`;

  setupDragAndDrop();
}

// Event listener to add the task using the enter key assigning the id per task
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const taskText = input.value.trim();
    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      displayTasks();
      input.value = "";
    } else {
      alert("Please Enter A Task!");
    }
  }
});

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  displayTasks();
}

// Delete button event listener
taskList.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".delete-button");
  if (!deleteButton) return;

  const li = deleteButton.closest("li");
  const id = Number(li.getAttribute("data-id"));

  deleteTask(id);
});

// Change event for the radio input
taskList.addEventListener("change", (e) => {
  if (!e.target.classList.contains("select-checkbox")) return;

  const selectedId = Number(e.target.value);

  tasks = tasks.map((task) =>
    task.id === selectedId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  displayTasks();
});

// Function to filter tasks
function filterTasks(filterType) {
  allTasks.forEach((task) => {
    let completed = task.classList.contains("completed");

    task.classList.remove("hidden");

    if (filterType === "active" && completed) {
      task.classList.add("hidden");
    }
    if (filterType === "completed" && !completed) {
      task.classList.add("hidden");
    }
  });
}

// Function to change and reset filter buttons text color
function resetFilters() {
  [...allFilter, ...activeFilter, ...completedFilter].forEach((button) => {
    button.classList.remove("active-filter");
  });
}

// Event listener to show all tasks
allFilter.forEach((button) => {
  button.addEventListener("click", () => {
    resetFilters();
    allFilter.forEach((btn) => btn.classList.add("active-filter"));
    filterTasks("all");
  });
});

// Event listener to show active/uncompleted tasks
activeFilter.forEach((button) => {
  button.addEventListener("click", () => {
    resetFilters();
    activeFilter.forEach((btn) => btn.classList.add("active-filter"));
    filterTasks("active");
  });
});

// Event listener to show all completed tasks
completedFilter.forEach((button) => {
  button.addEventListener("click", () => {
    resetFilters();
    completedFilter.forEach((btn) => btn.classList.add("active-filter"));
    filterTasks("completed");
  });
});

// Function to clear all completed tasks
function clearAllCompleted() {
  allTasks.forEach((task) => {
    let completed = task.classList.contains("completed");

    if (completed) {
      let id = Number(task.getAttribute("data-id"));

      deleteTask(id);
    }
  });
}

// Event listener to clear/delete all completed tasks
clearCompleted.addEventListener("click", clearAllCompleted);

// DRAG AND DROP FEATURE:

let draggedItem = null;

function setupDragAndDrop() {
  // Variable to get the li elements that contain draggable true
  const draggableItem = document.querySelectorAll('li[draggable="true"]');

  // Dragstart event listener
  draggableItem.forEach((item) => {
    item.addEventListener("dragstart", () => {
      draggedItem = item;
    });
  });

  // Dragover event listener
  draggableItem.forEach((item) => {
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  });

  // Drop event listener
  draggableItem.forEach((item) => {
    item.addEventListener("drop", () => {
      if (draggedItem !== item) {
        item.parentNode.insertBefore(draggedItem, item);
      }
    });
  });

  // Dragend event listener
  draggableItem.forEach((item) => {
    item.addEventListener("dragend", () => {
      draggedItem = null;
    });
  });
}

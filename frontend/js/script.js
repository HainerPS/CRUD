const API_BASE_URL =
  window.API_BASE_URL || "https://crud-api-0q8i.onrender.com";
const API_URL = `${API_BASE_URL}/tasks`;
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const filters = document.querySelectorAll(".filter-btn");
const itemsLeftLabel = document.getElementById("items-left");
const tasksRemainingLabel = document.getElementById("tasks-remaining");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");

const COMPLETED_STORAGE_KEY = "todo_completed_state";
const THEME_STORAGE_KEY = "todo_theme";

let currentFilter = "all";
let tasksCache = [];
const completedState = readCompletedState();

function readCompletedState() {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_STORAGE_KEY) || "{}");
  } catch (_error) {
    return {};
  }
}

function saveCompletedState() {
  localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedState));
}

function isTaskCompleted(taskId) {
  return Boolean(completedState[String(taskId)]);
}

function setTaskCompleted(taskId, isCompleted) {
  completedState[String(taskId)] = isCompleted;
  saveCompletedState();
}

function getFilteredTasks(tasks) {
  if (currentFilter === "active") {
    return tasks.filter((task) => !isTaskCompleted(task.id));
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => isTaskCompleted(task.id));
  }

  return tasks;
}

function updateCounters(tasks) {
  const activeCount = tasks.filter((task) => !isTaskCompleted(task.id)).length;
  const suffix = activeCount === 1 ? "" : "s";
  itemsLeftLabel.textContent = `${activeCount} item${suffix} left`;
  tasksRemainingLabel.textContent = `${activeCount} task${suffix} remaining`;
}

function updateFilterButtons() {
  filters.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
  });
}

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light-mode", isLight);
  themeIcon.textContent = isLight ? "☾" : "☀";
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  applyTheme(savedTheme);
}

function rerender() {
  const filteredTasks = getFilteredTasks(tasksCache);
  renderTasks(filteredTasks);
  updateCounters(tasksCache);
  updateFilterButtons();
}

async function loadTasks() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Falha ao buscar tarefas");
    }

    tasksCache = await response.json();
    rerender();
  } catch (error) {
    taskList.innerHTML = '<li class="empty-state">Erro ao carregar tarefas.</li>';
    console.error(error);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (!tasks.length) {
    taskList.innerHTML =
      '<li class="empty-state">No tasks for this filter yet.</li>';
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    const completed = isTaskCompleted(task.id);
    li.classList.toggle("is-completed", completed);

    const taskMain = document.createElement("div");
    taskMain.className = "task-main";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = completed;
    checkbox.setAttribute("aria-label", `Marcar ${task.title} como concluida`);
    checkbox.addEventListener("change", () => {
      setTaskCompleted(task.id, checkbox.checked);
      rerender();
    });

    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "task-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskMain.appendChild(checkbox);
    taskMain.appendChild(titleSpan);
    li.appendChild(taskMain);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

async function createTask() {
  const title = taskInput.value.trim();

  if (!title) {
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Falha ao criar tarefa");
    }

    taskInput.value = "";
    loadTasks();
  } catch (error) {
    console.error(error);
  }
}

async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Falha ao excluir tarefa");
    }

    loadTasks();
  } catch (error) {
    console.error(error);
  }
}

addTaskBtn.addEventListener("click", createTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTask();
  }
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter || "all";
    rerender();
  });
});

themeToggleBtn.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-mode")
    ? "dark"
    : "light";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

initializeTheme();
loadTasks();

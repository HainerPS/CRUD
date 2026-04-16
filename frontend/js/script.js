const API_URL = "http://localhost:3000/tasks";
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");

async function loadTasks() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Falha ao buscar tarefas");
    }

    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    taskList.innerHTML = "<li>Erro ao carregar tarefas.</li>";
    console.error(error);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Excluir";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(titleSpan);
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

loadTasks();

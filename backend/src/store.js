const fs = require("fs/promises");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "tasks.json");

async function load() {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      return { tasks: [], nextId: 1 };
    }
    throw err;
  }
}

async function save(state) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(state, null, 2), "utf8");
}

async function listTasks() {
  const state = await load();
  return state.tasks;
}

async function createTask(title) {
  const state = await load();
  const id = state.nextId;
  state.nextId += 1;
  state.tasks.push({ id, title });
  await save(state);
  return { id, title };
}

async function deleteTask(id) {
  const numId = Number(id);
  const state = await load();
  const index = state.tasks.findIndex((t) => t.id === numId);
  if (index === -1) {
    return false;
  }
  state.tasks.splice(index, 1);
  await save(state);
  return true;
}

module.exports = {
  listTasks,
  createTask,
  deleteTask,
};

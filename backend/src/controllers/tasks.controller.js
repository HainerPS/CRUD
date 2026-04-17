const store = require("../store");

async function listTasks(_req, res) {
  try {
    const rows = await store.listTasks();
    return res.json(rows);
  } catch {
    return res.status(500).json({ error: "Failed to list tasks" });
  }
}

async function createTask(req, res) {
  let { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  title = title.trim();

  try {
    const created = await store.createTask(title);
    return res.status(201).json(created);
  } catch {
    return res.status(500).json({ error: "Failed to create task" });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const deleted = await store.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({ message: "Task deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to delete task" });
  }
}

module.exports = {
  listTasks,
  createTask,
  deleteTask,
};

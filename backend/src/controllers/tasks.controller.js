const db = require("../db");

function listTasks(_req, res) {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to list tasks" });
    }

    return res.json(rows);
  });
}

function createTask(_req, res) {
  let { title } = _req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  title = title.trim();

  db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to create task" });
    }

    return res.status(201).json({
      id: this.lastID,
      title,
    });
  });
}

function deleteTask(req, res) {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete task" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully" });
  });
}

module.exports = {
  listTasks,
  createTask,
  deleteTask,
};

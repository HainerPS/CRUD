const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "API running" });
});

app.use("/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

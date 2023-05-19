const tasksRouter = require("express").Router();
const Opportunity = require("../models/opp");
const Task = require("../models/task");
const ObjectId = require("mongoose").Types.ObjectId;

tasksRouter.get("/", async (resquest, response) => {
  const tasks = await Task.find({});
  response.json(tasks);
});

tasksRouter.get("/:id", async (request, response) => {
  const task = await Task.findById(request.params.id);
  if (task) {
    response.json(task);
  } else {
    response.status(404).end();
  }
});

tasksRouter.delete("/:id", async (request, response) => {
  await Task.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = tasksRouter;

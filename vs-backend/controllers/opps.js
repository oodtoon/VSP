const oppsRouter = require("express").Router();
const Opportunity = require("../models/opp");
const Task = require("../models/task");
const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

oppsRouter.get("/", async (resquest, response) => {
  const opps = await Opportunity.find({})
    .populate("tasks")
    .populate("user", { username: 1 });
  response.json(opps);
});

oppsRouter.get("/:id", (request, response, next) => {
  Opportunity.findById(request.params.id)
    .populate("user", { username: 1 })
    .then((opp) => {
      if (opp) {
        response.json(opp);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

oppsRouter.delete("/:id", (request, response, next) => {
  Opportunity.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

oppsRouter.patch("/:id", async (request, response) => {
  const oppId = request.params.id;
  const body = request.body;
  const updatedOpp = await Opportunity.findById(oppId);
  for (let key of Object.keys(body)) {
    updatedOpp[key] = body[key];
  }
  await updatedOpp.save();
  response.status(200).json(updatedOpp);
});

oppsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  console.log("decode", decodedToken)
 
  if (!decodedToken.id) {
    return response.status(400).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const opp = new Opportunity({
    company: body.company,
    contact: body.contact,
    businessIssue: body.businessIssue,
    anxietyQ: body.anxietyQ,
    problem: body.problem,
    solution: body.solution,
    value: body.value,
    power: body.power,
    plan: body.plan,
    date: new Date(),
    user: user.id,
  });

  if (opp.company) {
    const savedOpp = await opp.save();
    user.opps = user.opps.concat(savedOpp._id);
    await user.save();
    response.status(201).json(savedOpp);
  }
});

oppsRouter.post("/:id/tasks", async (request, response) => {
  const { task, date } = request.body;
  const oppId = request.params.id;
  const opp = await Opportunity.findById(request.params.id);

  const oppTask = new Task({
    task: task,
    date: date,
    completed: false,
    opp: oppId,
  });

  const savedTask = await oppTask.save();
  opp.tasks = opp.tasks.concat(savedTask._id);
  await opp.save();
  response.status(201).json(savedTask);
});

oppsRouter.put("/:id/tasks", async (request, response) => {
  const taskId = request.body.id;
  const body = request.body;
  const newTask = await Task.findByIdAndUpdate(taskId, body);
  response.status(200).json(newTask);
});

oppsRouter.delete("/:id/tasks", async (request, response) => {
  const taskId = request.body.id;
  await Task.findByIdAndRemove(taskId);
  response.status(204).end();
});

module.exports = oppsRouter;

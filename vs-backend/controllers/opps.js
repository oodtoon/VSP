const oppsRouter = require("express").Router();
const Opportunity = require("../models/opp");
const Task = require("../models/task");
const ObjectId = require("mongoose").Types.ObjectId;

oppsRouter.get("/", async (resquest, response) => {
    const opps = await Opportunity.find({}).populate('tasks')
    response.json(opps);
});

oppsRouter.get("/:id", (request, response, next) => {
  Opportunity.findById(request.params.id)
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
  const oppId = request.params.id
  const body = request.body
  const updatedOpp = await Opportunity.findById(oppId)
  for (let key of Object.keys(body)) {
    updatedOpp[key] = body[key]
  }
  await updatedOpp.save()
  response.status(200).json(updatedOpp)
})

oppsRouter.post("/", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.company) {
    return response.status(400).json({
      error: "company missing",
    });
  }

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
  });

  opp
    .save()
    .then((savedOpp) => {
      console.log("saved", savedOpp);
      response.json(savedOpp);
    })
    .catch((error) => next(error));
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

oppsRouter.get("/:id/tasks", async (request, response) => {
  const opp = await Task.find({ opp: new ObjectId(request.params.id) });
  response.status(201).json(opp);
});

oppsRouter.put('/:id/tasks', async (request, response) => {
  const taskId = request.body.id
  const body = request.body
  const newTask = await Task.findByIdAndUpdate(taskId, body)
  response.status(200).json(newTask)
})

module.exports = oppsRouter;

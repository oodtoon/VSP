const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  console.log("making new user")
  
  const { username, email, password } = request.body;
  User.findOne({ email, username });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    response.send(error)
    console.log(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("opps", {
    company: 1,
    contact: 1,
    businessIssue: 1,
    anxietyQ: 1,
    problem: 1,
    solution: 1,
    value: 1,
    power: 1,
    plan: 1,
    date: 1,
    tasks: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;

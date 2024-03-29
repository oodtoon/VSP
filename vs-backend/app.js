const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const oppsRouter = require("./controllers/opps");
const tasksRouter = require("./controllers/tasks");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const passwordResetRouter = require("./controllers/passwordReset");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const uri = process.env.MONGODB_URI;

console.log("connecting to", uri);

mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to DB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/opps", oppsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/password-reset", passwordResetRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

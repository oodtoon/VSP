const mongoose = require("mongoose");

const oppSchema = new mongoose.Schema({
  company: String,
  contact: String,
  businessIssue: String,
  anxietyQ: String,
  problem: String,
  solution: String,
  value: String,
  power: String,
  plan: String,
  gamePlan: String,
  date: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

oppSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Opportunity", oppSchema);

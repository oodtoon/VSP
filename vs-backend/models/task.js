const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: String,
  date: String,
  completed: Boolean,
  opp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity'
  },
});

taskSchema.set('toJSON', {
    transform: (document, resturnedObject) => {
        resturnedObject.id = resturnedObject._id.toString()
        delete resturnedObject._id
        delete resturnedObject.__v
    }
})

module.exports = mongoose.model('Task', taskSchema)
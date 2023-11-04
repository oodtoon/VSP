const mongoose = require("mongoose")

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 900,
    default: Date.now()
  }
})

module.exports = mongoose.model("ResetToken", resetTokenSchema)
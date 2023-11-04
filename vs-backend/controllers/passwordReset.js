const bcrypt = require("bcrypt");
const resetRouter = require("express").Router();
const config = require("../utils/config");
const User = require("../models/user");
const ResetToken = require("../models/resetToken");
const sendEmail = require("../utils/emailSender");
const crypto = require("crypto");

// const Joi = require("joi");

//send password link
resetRouter.post("/", async (request, response) => {
  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user)
      return response
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await ResetToken.findOne({ userId: user._id });
    if (!token) {
      token = await new ResetToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const url = `${config.BASE_URL}/password-reset/${user._id}/${token.token}/`;

    const body = `
    <p>Hello ${user.username},</p>
    <h1>Please follow the password reset link below to reset your password.</h1>
    <br/>
    <a href="${url}">${url}</a>
    `;

    await sendEmail(user.email, "Password Reset", body);

    response
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

//verify password reset link
resetRouter.get("/:id/:token", async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.params.id });

    if (!user) {
      console.log("no find");
      return response.status(400).send({ message: "Invalid Link" });
    }

    const token = await ResetToken.findOne({
      userId: user._id,
      token: request.params.token,
    });

    if (!token) {
      console.log("no token");
      return response.status(400).send({ message: "Invalid Link" });
    }

    console.log("good url");
    response.status(200).send("Valid Url");
  } catch (error) {
    response.status(500).send({ message: "Internal Server Error" });
  }
});

//reset password
resetRouter.post("/:id/:token", async (request, response) => {
  const { newPassword } = request.body;

  const user = await User.findOne({ _id: request.params.id });

  if (!user) {
    console.log("no user");
    return response.status(400).send({ message: "Invalid link" });
  }

  const token = await ResetToken.findOne({
    userId: user._id,
    token: request.params.token,
  });

  if (!token) {
    console.log("no token");
    return response.status(400).send({ message: "Invalid link" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    user.passwordHash = passwordHash;
    await user.save();

    response.status(200).send({ message: "Password reset!" });
  } catch (error) {
    console.log("no can do", error);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = resetRouter;

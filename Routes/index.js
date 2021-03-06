const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const validator = require("../Controllers/validator");

router.route("/user/sign-in").post(userController.signIn);

router
  .route("/user/sign-up")
  .post(validator.validateNewUser, userController.signUp);
module.exports = router;

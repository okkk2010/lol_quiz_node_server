const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//회원가입
router.put('/signUpUser', userController.signUpUser);

module.exports = router;
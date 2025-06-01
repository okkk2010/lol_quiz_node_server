const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//회원가입
router.put('/sign-up-user', userController.signUpUser);
//로그인
router.get("/sign-in-user", userController.signInUser);
//회원 조회
router.get("/user-info", userController.userInfo);
//비밀번호 변경
router.post("/user-password-change", userController.passwordChange);
//비밀번호 리셋
router.post("/user-password-reset", userController.passwordReset);
//닉네임 변경
router.post("/user-nickname-change", userController.nicknameChange);


module.exports = router;
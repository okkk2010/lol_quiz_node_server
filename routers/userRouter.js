const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//회원가입
router.put('/sign-up-user', userController.signUpUser);
//로그인
router.post("/sign-in-user", userController.signInUser);
//회원 조회
router.post("/user-info", userController.userInfo);
//비밀번호 변경
router.post("/user-password-change", userController.passwordChange);
//비밀번호 리셋
router.post("/user-password-reset", userController.passwordReset);
//닉네임 변경
router.post("/user-nickname-change", userController.nicknameChange);
//회원 탈퇴
router.post("/user-delete", userController.userDelete);

//유저 티어 업데이트
router.post("/user-tier-update", userController.userTierUpdate);
//사용자 권한은 아직

module.exports = router;
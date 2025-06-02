const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

//퀴즈 생성
router.post("/create-quiz-basic", quizController.createQuizBasic);
//퀴즈 이미지 URL 설정
router.post("/set-image-url", quizController.setImageUrl);
//퀴즈 조회
router.post("/get-quizs", quizController.getQuizs);

module.exports = router;
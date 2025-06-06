const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
// 전적 가져오기
router.post("/get-user-records", recordController.getUserRecords);
// 전적 기록
router.post("/record-game-history", recordController.recordGameHistory);
// high answer_quiz 기록
router.post("/get-high-answer-quiz", recordController.getHighAnswerQuiz);
// 랭킹
router.post("/get-ranking", recordController.getRanking);
// 전적 통계
router.post("/get-record-stats", recordController.getRecordStats);

module.exports = router;

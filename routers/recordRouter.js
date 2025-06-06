const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
// 전적
router.post("/get-user-records", recordController.getUserRecords);

// 전적 기록
router.post("/record-game-history", recordController.recordGameHistory);

// 랭킹
router.post("/get-ranking", recordController.getRanking);

module.exports = router;

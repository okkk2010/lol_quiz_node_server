const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
// 전적

router.post("/get-user-records", recordController.getUserRecords);

// 랭킹
router.post("/get-ranking", recordController.getRanking);

module.exports = router;

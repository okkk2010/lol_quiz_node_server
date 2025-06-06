const express = require("express");
const router = express.Router();
const tierController = require("../controllers/tierController");

//점수 당 티어
router.post("/get-tier-by-score", tierController.getTierByScore);

module.exports = router;
const tierService = require("../services/tierServices");


exports.getTierByScore = async (req, res) => {
    try {
        const { answer_quiz } = req.body;
        const [tier] = await tierService.getTierByScore(answer_quiz);

        if (tier.length === 0) {
            res.status(404).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_TIER",
                    "message": `해당 점수(${answer_quiz})에 대한 티어 정보가 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": JSON.stringify(tier[0])
        });
    } catch (err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": err.message || "서버 오류입니다."
            }
        });
    }
}
const e = require("express");
const recordService = require("../services/recordServices");

exports.getUserRecords = async (req, res) => {
    try {
        const { id } = req.body;
        const [records] = await recordService.getUserRecords(id);

        if (records.length === 0) {
            res.status(404).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_RECORDS",
                    "message": `해당 사용자(${id})의 전적이 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": JSON.stringify(records)
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

exports.recordGameHistory = async (req, res) => {
    try {
        const { user_id, title, answer_quiz, play_date } = req.body;
        const result = await recordService.recordGameHistory(user_id, title, answer_quiz, play_date);

        if (result.affectedRows === 0) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "RECORD_INSERT_FAILED",
                    "message": "전적 기록에 실패했습니다."
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
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

exports.getHighAnswerQuiz = async (req, res) => {
    try {
        const { id } = req.body;
        const answer_quiz = await recordService.getHighAnswerQuiz(id);

        if (answer_quiz.length === 0) {
            res.status(404).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_HIGH_ANSWER_QUIZ",
                    "message": `해당 사용자(${id})의 최고 정답 수가 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": JSON.stringify(answer_quiz)
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

exports.getRanking = async (req, res) => {
    try {
        const [ranking] = await recordService.getRanking();

        if (ranking.length === 0) {
            res.status(404).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_RANKING",
                    "message": "랭킹 정보가 없습니다."
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": JSON.stringify(ranking)
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": err.message || "서버 오류입니다."
            }
        });
    }
}
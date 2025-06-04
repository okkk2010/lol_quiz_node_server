const e = require("express");
const recordService = require("../services/recordServices");

exports.getUserRecords = async (req, res) => {
    try {
        const { id } = req.body;
        const records = await userService.getUserRecords(id);

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
            "content": records
        });
    } catch (err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류입니다."
            }
        });
    }
}

exports.getRanking = async (req, res) => {
    try {
        const ranking = await recordService.getRanking();

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
            "content": ranking
        });
    } catch (err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류입니다."
            }
        });
    }
}
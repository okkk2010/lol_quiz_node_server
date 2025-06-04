const quizService = require("../services/quizServices");
const imgDb = require("../servers/ImgServer");

exports.createQuizBasic = async (req, res) => {
    try {
        const { title, quiz_name, answer, mime_type } = req.body;
        const result = await quizService.createQuizBasic(title, quiz_name, answer);
        if (result.affectedRows === 0) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "CREATE_QUIZ_FAILED",
                    "message": "퀴즈 생성에 실패했습니다."
                }
            });
            return;
        }

        const quiz_id = result[0].insertId.toString();
        // s3 pre-signed URL 생성
        const s3_url = await imgDb.getPresignUrl(quiz_id, mime_type);
        res.status(201).json({
            "success": true,
            "content": JSON.stringify({
                "id": quiz_id,
                "s3_url": s3_url
            })
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

exports.setImageUrl = async (req, res) => {
    try {
        const { id } = req.body;
        const imgUrl = await imgDb.getImageUrl(id);
        const result = await quizService.setImageUrl(id, imgUrl);

        if (result.affectedRows === 0) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_QUIZ",
                    "message": `해당 quiz_id: ${quiz_id}에 대한 정보가 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true
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

exports.getQuizs = async (req, res) => {
    try {
        const { title } = req.body;
        const quizs = await quizService.getQuizs(title);
        
        res.status(200).json({
            "success": true,
            "content": JSON.stringify(quizs[0])
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
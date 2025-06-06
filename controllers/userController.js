const e = require("express");
const userService = require("../services/userServices");
const bcrypt = require("bcrypt");

exports.signUpUser = async (req, res) => {
    try {
        const { id, nickname, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await userService.signUpUser(id, nickname, hashPassword);

        res.status(200).json({
            "success": true
        });
    } catch(err) {
        if(err.code === "ER_DUP_ENTRY") {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "DUPLICATE_ID",
                    "message": "이미 사용중인 아이디입니다."
                }
            })
        } else {
            res.status(500).json({
                "success": false,
                "error": {
                    "code": "SERVER_ERROR",
                    "message": "서버 오류입니다."
                }
            })
        }
    }
};

exports.signInUser = async (req, res) => {
    try {
        const { id, password } = req.body;
        const [ rows ] = await userService.checkPassword(id);

        if(rows.length === 0) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_ID",
                    "message": "해당 아이디는 없습니다."
                }
            });
            return;
        }

        const curPw = rows[0].password;
        const isMatch = await bcrypt.compare(password, curPw);
        if (!(isMatch)) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_MATCH_PASSWORD",
                    "message": "비밀번호가 일치하지 않습니다."
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류입니다."
            }
        });
    }
};

exports.userInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const [ curUserInfo ] = await userService.userInfo(id);

        if(curUserInfo.length === 0) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_ID",
                    "message": `해당 id: ${id}에 대한 정보가 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": `${JSON.stringify(curUserInfo[0])}`
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류입니다."
            }
        });
    }
};

exports.passwordReset = async (req, res) => {
    try {
        const { id, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.passwordChange(id, hashedPassword);

        res.status(200).json({
            "success": true,
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류입니다."
            }
        });        
    }
};

exports.passwordChange = async (req, res) => {
    try {
        const { id, password , new_password } = req.body;
        const [ beforPw ] = await userService.checkPassword(id);
        
        const isMatch = await bcrypt.compare(password, beforPw[0].password);
        if(!isMatch) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_MATCH_PASSWORD",
                    "message": "비밀번호 불일치"
                }
            });
            return;
        }

        const hashedPw = await bcrypt.hash(new_password, 10);
        await userService.passwordChange(id, hashedPw);

        res.status(200).json({
            "success": true
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
}

exports.nicknameChange = async (req, res) => {
    try {
        const { id, nickname } = req.body;
        await userService.nicknameChange(id, nickname);

        res.status(200).json({
            "success": true
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
};

exports.userDelete = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await userService.userDelete(id);

        if(result.affectedRows === 0) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_ID",
                    "message": `해당 id: ${id}에 대한 정보가 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
};

exports.userTierUpdate = async (req, res) => {
    try {
        const { id } = req.body;
        await userService.userTierUpdate(id, answer_quiz);

        res.status(200).json({
            "success": true
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
};

exports.userTierAllUpdate = async (req, res) => {
    try {
        const [ users ] = await userService.getAllUsers();
        
        for(const user of users) {
            await userService.userTierUpdate(user.id);
        }

        res.status(200).json({
            "success": true
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
}

exports.getUserRanking = async (req, res) => {
    try {
        const { id } = req.body;
        const userRanking = await userService.getUserRanking(id);

        if (!userRanking) {
            res.status(400).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_RANKING",
                    "message": `해당 id: ${id}에 대한 랭킹 정보가 없습니다.`
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": userRanking
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const [users] = await userService.getAllUsers();

        if (users.length === 0) {
            res.status(404).json({
                "success": false,
                "error": {
                    "code": "NOT_FOUND_USER",
                    "message": "사용자 정보가 없습니다."
                }
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "content": JSON.stringify(users)
        });
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error": {
                "code": "SERVER_ERROR",
                "message": "서버 오류"
            }
        });
    }
}
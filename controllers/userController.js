const userService = require("../services/userServices");
const bcrypt = require("bcrypt");

exports.signUpUser = async (req, res) => {
    try {
        const { id, nickname, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await userService.signUpUser(id, nickname, hashPassword);

        res.status(200).json({
            "success": true,
            "content": `${id}로 회원가입에 성공했습니다!`
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
            res.status(400).send("아이디 없음");
            return;
        }

        const curPw = rows[0].password;
        const isMatch = await bcrypt.compare(password, curPw);
        if (!(isMatch)) {
            res.status(400).send("비밀번호가 일치하지 않습니다.");
            return;
        }

        res.status(200).send("로그인 성공!");
    } catch(err) {
        console.log(err.message);
        res.status(500).send("서버 실행 오류 : " + err.code);
    }
};

exports.userInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const [ curUserInfo ] = await userService.userInfo(id);

        if(curUserInfo.length === 0) {
            res.status(400).send(`해당 id: ${id}에 대한 정보가 없습니다.`);
            return;
        }

        res.status(200).send(curUserInfo);
    } catch(err) {
        res.status(500).send("서버 실행 오류 : " + err.code);
    }
};

exports.passwordChange = async (req, res) => {
    try {
        const { id, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.passwordChange(id, hashedPassword);

        res.status(200).send(`해당 id: ${id}의 비밀번호를 변경했습니다!`);
    } catch(err) {
        res.status(500).send("서버 실행 오류 : " + err.code);
    }
};

exports.passwordReset = async (req, res) => {
    try {
        const { id, inputPw , afterPw } = req.body;
        const [ beforPw ] = await userService.checkPassword(id);
        
        const isMatch = await bcrypt.compare(inputPw, beforPw[0].password);
        if(!isMatch) {
            res.status(400).send("비밀번호가 일치하지 않습니다.");
            return;
        }

        const hashedPw = await bcrypt.hash(afterPw, 10);
        await userService.passwordChange(id, hashedPw);

        res.status(200).send("비밀번호가 변경되었습니다!");
    } catch(err) {
        res.status(500).send("서버 실행 오류 : " + err.code);
    }
}

exports.nicknameChange = async (req, res) => {
    try {
        const { id, nickname } = req.body;
        await userService.nicknameChange(id, nickname);

        res.status(200).send(`해당 id: ${id}의 닉네임을 ${nickname}으로 변경했습니다!`);
    } catch(err) {
        res.status(500).send("서버 실행 오류 : " + err.code);
    }
};
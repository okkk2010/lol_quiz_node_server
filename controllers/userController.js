const userService = require("../services/userServices");

exports.signUpUser = async (req, res) => {
    try {
        const { id, nickname, password} = req.body;
        await userService.signUpUser(id, nickname, password);

        res.status(200).send({message : "회원가입 완료!"});
    } catch(err) {
        res.status(500).send(err.message);
    }
};
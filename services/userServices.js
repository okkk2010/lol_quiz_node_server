const db = require('../servers/DBServer');

exports.signUpUser = async (id, nickname, password) => {
    try {
        await db.query("INSERT INTO user(id, nickname, password) VALUES (?,?,?)", [id, nickname, password]);
    } catch(err) {
        throw err;
    }
};

exports.checkPassword = async (id) => {
    try {
        return await db.query("SELECT password FROM user WHERE id = ?", [id]);
    } catch(err) {
        throw  err;
    }
}

exports.userInfo = async (id) => {
    try {
        return await db.query("SELECT id, nickname, create_at, tier FROM user WHERE id = ?", [id]);
    } catch(err) {
        throw err;
    }
}

exports.passwordChange = async (id, password) => {
    try {
        await db.query("UPDATE user SET password = ? WHERE id = ?", [password, id]);
    } catch(err) {
        throw err;
    }
}

exports.nicknameChange = async (id, nickname) => {
    try {
        await db.query("UPDATE user SET nickname = ? WHERE id = ?", [nickname, id]);
    } catch(err) {
        throw err;
    }
}

exports.userDelete = async (id) => {
    try {
        return await db.query("DELETE FROM user WHERE id = ?", [id]);
    } catch(err) {
        throw err;
    }
}

exports.userTierUpdate = async (id, answer_quiz) => {
    try {
        //tier table에 tier 기준이 있고 이 내용을 answer_quiz와 비교해 tier를 결정하고
        //user table에 해당 id의 tier를 업데이트
        //tier table에 standard_score와 비교하고, answer_quiz가 해당 score 이상인 tier를 찾는다.
        const tier = await db.query("SELECT tier FROM tier WHERE standard_score <= ? ORDER BY standard_score DESC LIMIT 1", [answer_quiz]);
        if (tier.length === 0) {
            throw new Error("Invalid answer_quiz provided.");
        }
        // tier는 배열로 반환되므로 첫 번째 요소의 tier 값을 사용
        // user 테이블의 tier 업데이트
        await db.query("UPDATE user SET tier = ? WHERE id = ?", [tier, id]);
    } catch(err) {
        throw err;
    }
}
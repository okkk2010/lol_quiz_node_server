const db = require('../servers/DBServer');
const recordService = require('./recordServices');

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

exports.userTierUpdate = async (id) => {
    try {
        const [recordRanking] = await recordService.getRanking();

        const userRanking = recordRanking.find(r => r.user_id === id);
        if (!userRanking) {
            console.error(`User with id ${id} not found in ranking.`);
            return;
        }

        let tier;
        if( userRanking.rank_num <= 30) {
            [tier] = await db.query("SELECT name FROM tier WHERE standard_ranking >= ? ORDER BY standard_ranking ASC LIMIT 1", [userRanking.rank_num]);
        } else {
            [tier] = await db.query("SELECT name FROM tier WHERE standard_score <= ? ORDER BY standard_score DESC LIMIT 1", [userRanking.answer_quiz]);
        }

        if (tier.length === 0) {
            throw new Error("Invalid answer_quiz provided.");
        }
        // tier는 배열로 반환되므로 첫 번째 요소의 tier 값을 사용
        // user 테이블의 tier 업데이트
        await db.query("UPDATE user SET tier = ? WHERE id = ?", [tier[0].name, id]);
    } catch(err) {
        throw err;
    }
}

exports.getUserRanking = async (id) => {
    try {
        const [ranking] = await recordService.getAllRanking();
        const userRanking = ranking.find(r => r.user_id === id);

        if (!userRanking) {
            throw new Error("User not found in ranking.");
        }

        return userRanking.rank_num;
    } catch(err) {
        throw err;
    }
}

exports.getAllUsers = async () => {
    try {
        return await db.query("SELECT id, nickname, create_at, tier FROM user");
    } catch(err) {
        throw err;
    }
}
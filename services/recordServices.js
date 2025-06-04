const db = require('../servers/DBServer');

exports.getUserRecords = async (id) => {
    try {
        return await db.query("SELECT * FROM record WHERE user_id = ?", [id]);
    } catch (err) {
        throw err;
    }
}

exports.getRanking = async () => {
    try {
        return await db.query("SELECT user.nickname, user.tier, record.answer_quiz from user JOIN record ON user.id == record.user_id ORDER BY record.answer_quiz DESC");
    } catch (err) {
        throw err;
    }
}
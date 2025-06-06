const db = require('../servers/DBServer');

exports.getUserRecords = async (id) => {
    try {
        return await db.query("SELECT id, title, user_id, answer_quiz, DATE_FORMAT(play_date, '%Y-%m-%d') AS play_date FROM record WHERE user_id = ?", [id]);
    } catch (err) {
        throw err;
    }
}

exports.recordGameHistory = async (user_id, title, answer_quiz, play_date) => {
    try {
        return await db.query("INSERT INTO record (user_id, title, answer_quiz, play_date) VALUES (?, ?, ?, ?)", [user_id, title, answer_quiz, play_date]);
    } catch (err) {
        throw err;
    }
}

exports.getHighAnswerQuiz = async (id) => {
    try {
        const [result] = await db.query("SELECT MAX(answer_quiz) AS answer_quiz FROM record WHERE user_id = ?", [id]);
        return result[0].answer_quiz;
    } catch (err) {
        throw err;
    }
}

exports.getRanking = async () => {
    try {
        //select user.id, max(answer_quiz) as answer_quiz from user right join record on user.id = record.user_id group by user.id;

        return await db.query("SELECT ROW_NUMBER() OVER (ORDER BY MAX(record.answer_quiz) DESC) AS rank_num," +
	                            "user.id AS user_id, user.nickname AS nickname, MAX(record.answer_quiz) AS answer_quiz " +
	                            "FROM user JOIN record ON user.id = record.user_id GROUP BY user.id ORDER BY 1 ASC LIMIT 30");
    } catch (err) {
        throw err;
    }
}

exports.getRecordStats = async (id) => {
    try {
        const [result] = await db.query("SELECT user_id, COUNT(*) AS total_quiz, AVG(answer_quiz) AS avg_answer_quiz FROM record WHERE user_id = ?", [id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

//
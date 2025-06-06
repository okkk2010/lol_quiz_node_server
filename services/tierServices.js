const db = require('../servers/DBServer');

exports.getTierByScore = async (answer_quiz) => {
    try {
        return await db.query("SELECT name FROM tier WHERE standard_score <= ? ORDER BY standard_score DESC LIMIT 1 ", [answer_quiz, answer_quiz]);
    } catch (err) {
        throw err;
    }
}
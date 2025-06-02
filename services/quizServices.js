const db = require('../servers/DBServer');

exports.createQuizBasic = async (title, quiz_name, answer) => {
    try {
        return await db.query("INSERT INTO quiz (title, quiz_name, answer) VALUES (?, ?, ?)", [title, quiz_name, answer]);
    } catch (err) {
        throw err;
    }
}

exports.setImageUrl = async (id, image_url) => {
    try {
        return await db.query("UPDATE quiz SET img_url = ? WHERE id = ?", [image_url, id]);
    } catch (err) {
        throw err;
    }
}

exports.getQuizs = async (title) => {
    try {
        const quizs = await db.query("SELECT * FROM quiz WHERE title = ?", [title]);
        return quizs;
    } catch (err) {
        throw err;
    }
}
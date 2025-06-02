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
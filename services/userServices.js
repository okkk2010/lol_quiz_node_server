const db = require('../servers/DBServer');

exports.signUpUser = async (id, nickname, password) => {
    db.query("INSERT INTO user(id, nickname, password) VALUES (?,?,?)", [id, nickname, password]);
};
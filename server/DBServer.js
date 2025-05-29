require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) { 
        console.error("MySQL 연결 실패 : ", err);
    } else {
        console.log("MySQL 연결 성공!");
        connection.release();
    }
});

module.exports = pool.promise();
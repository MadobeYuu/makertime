const mysql = require('mysql2');
const path = require('path');

// Загружаем переменные из .env (поднимаемся на уровень выше, так как .env в корне)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Экспортируем промис-версию для удобного использования с async/await
const promisePool = pool.promise();

module.exports = promisePool;
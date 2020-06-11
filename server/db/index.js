const mysql = require('mysql');

const db = mysql.createPool({
    host: '49.234.68.90',
    user: 'root',
    password: '123456',
    database: 'zwgo'
});

module.exports = {
    db
};
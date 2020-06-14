const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root001',
    database: 'uui'
});
console.log('mysql--->creqte');

module.exports = {
    db
};
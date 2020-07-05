const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root001',
    database: 'uui'
});
console.log('mysql--->creqte');

db.getErrMessage = err => {
    return {code:err.errno,message:err.sqlState+' '+err.sqlState+' '+err.sqlMessage}
}

db.queryBySql = sql=>{
    return new Promise((resolve,reject)=>{
        db.query(sql, (err, data) => {
            if (err) {
                console.log(sql);
                console.log(err);
                reject(db.getErrMessage(err));
            } else {
                console.log(sql);
                console.log(data);
                if(sql.toLowerCase().includes('insert')){
                    data = {id:data.insertId};
                }
                resolve({code:200,data:data});
            }
        });
    });
}

module.exports = 
    db
;
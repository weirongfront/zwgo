const db = require('../index');

const selectList = ()=>{
    return new Promise((resolve, reject)=>{
        const selectListSql = `SELECT * FROM log ORDER BY endtime DESC`;
        db.query(selectListSql, (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}


module.exports = {
   
}
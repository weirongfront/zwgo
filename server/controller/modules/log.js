const common = require('../../libs/common');
module.exports = (route,db) => {
    route.get('/log/list', (req, res) => {
        const selectUserList = `SELECT * FROM log ORDER BY endtime DESC`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
};
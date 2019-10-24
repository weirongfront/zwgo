const common = require('../libs/common');
module.exports = (route,db) => {
    route.get('/log/list', (req, res) => {
        const selectUserList = `SELECT * FROM log`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                res.send(common.result(500,'服务器出错')).end();
            } else {
                res.send(common.success(data)).end();
            }
        });
    });
};
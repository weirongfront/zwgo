const common = require('../../libs/common');
const logDb = require('../../db/modules/log');
module.exports = (route,common) => {
    route.get('/log/list',  (req, res) => {
        logDb.selectList();
        common.send(req,res,db,500,err.sqlMessage);
           
    });
};
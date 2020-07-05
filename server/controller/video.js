const common = require('../libs/common');
module.exports = (route,db) => {
    route.get('/video/list', (req, res) => {
        console.log(req.session,1);
        req.session.user={a:2}
        console.log(req.session,2);
        const selectUserList = `SELECT * FROM video ORDER BY createtime DESC`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
    route.get('/video/homeList', (req, res) => {
        const selectUserList = `SELECT * FROM video where Id < 5 ORDER BY createtime DESC`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
    route.get('/video/getById', (req, res) => {
        let query = req.query,
        sql = `SELECT * FROM video where id = ${query.id} `,
        result = {
            code:0,
            msg:'',
            data:{}
        };
        db.query(sql, (err, video) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                if(video.length){
                    result.data = video[0];
                    sql = `SELECT * FROM video_child WHERE video_id = ${query.id} ORDER BY short ASC`;
                    db.query(sql, (err, videoChilds) => {
                        if (err) {
                            common.send(req,res,db,500,err.sqlMessage);
                        } else {
                            result.data.list = videoChilds;
                            common.sendSuccess(req,res,db,result);
                        }
                    });
                }else{
                    result.code = 1;
                    result.msg = '无此视频！';
                    common.sendSuccess(req,res,db,result);
                }
            }
        });
    });
};
const db = require('../index.js');

const dbModel = {
    getByWhere:async (where)=>{
        let sql = `SELECT id,name,nickname,birthday,icon,gender,phone,password FROM user ${(where || 'where 1=1')};`;
        let result = await db.queryBySql(sql);
        if(result.code === 200){
            return {code:200,data:result.data[0]}
        }else{
            return result;
        }
    }
};

module.exports = {
    getUserByOpenId:async id => {
        let res = dbModel.getByWhere(`where openid='${id}'`);
        return res;
    },
    /*
     *user reg func
     */
    register:(data) => {
        let keys = ['name','nickname','password','birthday','gender','icon','openid','phone'];
        let names = [[],[]];
        keys.map(key=>{
            if(typeof data[key] !== 'undefined'){
                names[0].push(key);
                names[1].push("'"+data[key]+"'");
            }
        });
        sql = `INSERT INTO user(${names[0].join(',')},createtime) VALUES(${names[1].join(',')},NOW())`;
        return db.queryBySql(sql);
    },
    getUserList:(pageNo, pageSize) => {
        const selectUserList = `SELECT * FROM user WHERE user.role = 1`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,'服务器出错');
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    },
    // 获取用户信息
    getUserById:(id) => {
        let name = req.query.name;
        const sql = `SELECT name,nickname,birthday,icon,gender FROM user where name='${name}'`;
        db.query(sql, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                if (data.length == 0) {
                    common.sendSuccess(req,res,db,{status:1,tip:'该用户不存在'});
                } else {
                    common.sendSuccess(req,res,db,{status:0,data:data[0]});
                }
            }
        });
    },
    // 修改密码
    setUserPwd:(pwd) => {
        const {name,oldPassword,password} = req.body;
        let sql = `SELECT name,password FROM user where name='${name}'`;
        db.query(sql, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                if (data.length == 0) {
                    common.sendSuccess(req,res,db,{status:1,tip:'该用户不存在'});
                } else {
                    let user = data[0];
                    if(user.password === oldPassword){
                        sql = `update user set password = '${password}' where name = '${name}'`;
                        db.query(sql, (err) => {
                            if (err) {
                                common.send(req, res, db, 500, err.sqlMessage);
                            } else {
                                common.sendSuccess(req,res,db,{status:0,tip:'修改成功'});
                            }
                        });
                    }else{
                        common.sendSuccess(req,res,db,{status:2,tip:'原密码不正确'});
                    }
                }
            }
        });
    }
}
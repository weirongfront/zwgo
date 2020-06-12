module.exports = (route,db,common) => {
    /*
     *user reg func
     */
    route.post('/user/register', (req, res) => {
        let {name,nickname,password,birthday,gender,icon} = req.body;
        //regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE);

        let sql = `SELECT name FROM user where name='${name}'`;
        db.query(sql, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                if (data.length === 0) {
                    sql = `INSERT INTO user(name,nickname,password,birthday,gender,icon,createtime) VALUES('${name}','${nickname}','${password}','${birthday}','${gender}','${icon}',NOW())`;
                    db.query(sql, (err) => {
                        if (err) {
                            common.send(req,res,db,500,err.sqlMessage);
                        } else {
                            common.sendSuccess(req,res,db,{status:0,data:{}});
                        }
                    })
                } else {
                    common.sendSuccess(req,res,db,{status:1,tip:'该登录名已存在'});
                }
            }
        });
    });

    route.post('/user/login', (req, res) => {
        let mObj = req.body;
        let username = mObj.username;
        let password = common.md5(mObj.password + common.MD5_SUFFXIE);
        password = mObj.password;
        const selectUser = `SELECT * FROM user where name='${username}'`;
        db.query(selectUser, (err, data) => {
            if (err) {
                common.send(req,res,db,500,'服务器出错');
            } else {
                if (data.length == 0) {
                    common.sendSuccess(req,res,db,{status:2,tip:'该用户不存在'});
                } else {
                    let dataw = data[0];
                    if(dataw.status === 1){
                        common.sendSuccess(req,res,db,{status:3,tip:'该账户已被冻结'});
                        return false;
                    }
                    //login sucess
                    if (dataw.password !== password) {
                        common.sendSuccess(req,res,db,{status:1,tip:'密码不正确'});
                        return false;
                    }
                    //save the session
                    req.session.user = dataw;
                    common.sendSuccess(req,res,db,{status:0,data:dataw});
                }
            }
        });
    });
    // 登出
    route.post('/user/logout', (req, res) => {
        common.sendSuccess(req,res,db);
    });
    route.get('/user/list', (req, res) => {
        const selectUserList = `SELECT * FROM user WHERE user.role = 1`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,'服务器出错');
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
    // 获取用户信息
    route.get('/user/info', (req, res) => {
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
    });
    // 修改密码
    route.post('/user/updatePwd', (req, res) => {
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
    });
    // 通过id设置用户状态
    route.post('/user/setStatusById', (req, res) => {
        let {id,status} = req.body;
        let sql = `update user set status = ${status},updatetime = NOW() where Id = ${id}`;
        db.query(sql, (err) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db);
            }
        });
    });
}
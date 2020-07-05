//处理node request请求
const request = require('request');
const {wx} = require('../config');
const userDb = require('../db/modules/user');
const response = require('../libs/response');

const userHandler = {
    wxLogin(code){
        return new Promise((resolve,reject)=>{
            let options = {
                method: 'GET',
                url: 'https://api.weixin.qq.com/sns/jscode2session?',
                qs: {
                    appid: wx.appid,
                    secret: wx.secret,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            };
            request(options, (error, response, body) => {
                if(error) { //请求异常时，返回错误信息
                    reject({
                        code: 500,
                        message: JSON.stringify(error)
                    })
                } else {
                    //返回值的字符串转JSON
                    let _data = JSON.parse(body);
                    if(_data.errcode){
                        reject({code:_data.errcode,message:_data.errmsg});
                    }else if(_data.openid){
                        resolve({code:200,data:_data});
                    }
                }
            });
        });
    }
};
module.exports = {
    register:(req, res) => {
        let {name,nickname,password,birthday,gender,icon} = req.body;
      
    },
    login: async (req, res) => {
        let info = req.paramter,result = {};
        // 微信登录
        if(info.code){
            result = await userHandler.wxLogin(info.code);
            if(result.code === 200){
                let userInfo = await userDb.getUserByOpenId(result.data.openid);
                if(userInfo.code === 200){
                    userInfo = userInfo.data;
                    // 是否为已注册用户
                    if(userInfo && userInfo.password && userInfo.phone){
                        res.success({result:0,userInfo,token:response.getToken({id:userInfo.id},7*24*60*60)});
                        return true;
                    }
                    // 非注册过的用户
                    else{
                        if(!userInfo){
                            let registerResult = await userDb.register({openid:result.data.openid});
                            if(registerResult.code === 200){
                                userInfo = registerResult.data;
                            }else{
                                res.fail(registerResult);
                                return false;
                            }
                        }
                    }
                    if(!userInfo.nickname){
                        res.success({result:1,message:'请完善用户信息'});
                    }else if(!userInfo.password){
                        res.success({result:2,message:'请完善密码'});
                    }else if(!userInfo.phone){
                        res.success({result:3,message:'请完善手机号'});
                    }else{
                        res.success({result:4,message:'未知情况'});
                    }
                }
                else{
                    res.fail(userInfo);
                }
            }else{
                res.fail(result);
            }
        }
        // 非微信登录  
        else{
            let username = info.username;
            let password = common.md5(info.password + common.MD5_SUFFXIE);
            password = info.password;
        }
        
    },
    // 登出
    logout: (req, res) => {
        common.sendSuccess(req,res,db);
    },
    list: (req, res) => {
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
    info:(req, res) => {
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
    updatePwd:(req, res) => {
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
    },
    // 通过id设置用户状态
    setStatusById: (req, res) => {
        let {id,status} = req.body;
        let sql = `update user set status = ${status},updatetime = NOW() where Id = ${id}`;
        db.query(sql, (err) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db);
            }
        });
    }
}
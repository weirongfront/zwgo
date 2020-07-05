"use strict"
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const response = {
    log(req,res,db,data){
        let url = req.url,
            user = req.headers.authorization,
            method = req.method,
            params = req.method.toLowerCase() === 'post'?req.body:req.query,
            result = JSON.stringify(data),
            begintime = common.parseTime(req.beginTime),
            ip = req.ip;
        params = JSON.stringify(params);
        //db.query(sql);
    },
    // 返回结果为成功时，可以直接调用
    success(data){
        this.send({code: 200, msg: '操作成功', data}).end();
    },
    fail(code,msg){
        if(typeof code === 'object'){
            console.log('code----------',code);
            this.send(code).end();
        }else{
            this.send({code,msg}).end();
        }
    },
    /**
    *@filename:generateToken
    *@Description:
    * data:用户唯一标识
    * time:保存时间
    * cert:密钥
    */
    getToken(data, time){
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_private_key.pem'));//私钥
        let token = jwt.sign({
            data,
            exp: created + time
        }, cert, {algorithm: 'RS256'});
        return token;
    },
    verifyToken(token) {
        let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_public_key.pem'));//公钥
        let res = ''
        try {
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp, iat} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            console.log(e);
        }
        return res;
    }
}
module.exports = response;
"use strict"
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const common = {
    MD5_SUFFXIE: "HUNCSCDMM@#@$^%&^*%#$GFbggnCDSccxczvdsdhagbnfghvZfsdv",
    md5(str){
        let md5Obj = crypto.createHash('md5');
        md5Obj.update(str);
        return md5Obj.digest('hex');
    },
    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                time = parseInt(time)
            }
            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000
            }
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    },
    log(req,res,db,data){
        let url = req.url,
            user = req.headers.authorization,
            method = req.method,
            params = req.method.toLowerCase() === 'post'?req.body:req.query,
            result = JSON.stringify(data),
            begintime = common.parseTime(req.beginTime),
            ip = req.ip;
        params = JSON.stringify(params);
        const sql = `INSERT INTO log(user,url,method,params,result,ip,begintime,endtime) VALUES('${user}','${url}','${method}','${params}','${result}','${ip}','${begintime}',NOW())`;
        //db.query(sql);
    },
    // 返回结果为成功时，可以直接调用
    success(data){
        res.send({code: 200, msg: '操作成功', data}).end();
    },
    send(res,code,msg){
        console.log(this);
        res.send({code,msg}).end();
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
common.async = require("async");

module.exports = common;
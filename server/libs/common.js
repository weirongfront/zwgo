"use strict"
const crypto = require('crypto');
const common = {
    MD5_SUFFXIE: "HUNCSCDMM@#@$^%&^*%#$GFbggnCDSccxczvdsdhagbnfghvZfsdv",
    md5(str){
        let md5Obj = crypto.createHash('md5');
        md5Obj.update(str);
        return md5Obj.digest('hex');
    },
    // 返回结果为成功时，可以直接调用
    success(data){
        return {code: 200, msg: '操作成功', data};
    },
    // 封装返回结果
    result(code,msg,data){
        return {code, msg, data};
    },
    log(db,req,data){
        let url = req.url,
            user = req.session['user_name'],
            method = req.method,
            params = req.method.toLowerCase() === 'post'?req.body:req.query,
            ip = req.hostname;
        params = JSON.stringify(params);
        const sql = `INSERT INTO log(user,url,method,params,result,ip,usetime,createtime) VALUES('${user}','${url}','${method}','${params}','${data}','${ip}','',NOW())`;
        db.query(sql);
    },
    sendSuccess(req,res,db,data){
        res.send(common.success(data)).end();
        common.log(db,req,{code:200,data});
    },
    send(req,res,db,code,msg){
        res.send({code,msg}).end();
        common.log(db,req,{code,msg});
    }
}
module.exports = common;
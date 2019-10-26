module.exports = (route,db,common) => {
    route.post('/ques/add', (req, res) => {
        db.getConnection(function (err, connection) {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
                return false;
            }
            connection.beginTransaction(function (err) {
                if (err) {
                    connection.release();
                    common.send(req,res,db,500,err.sqlMessage);
                    return false;
                }
                // 开始插入问卷
                req.body.name = req.headers.authorization;
                let {title,name,activeTime,quesList} = req.body;
                const sqlQues = `INSERT INTO questionnaires(user_name,title,active_time,createtime) VALUES('${name}','${title}','${activeTime}',NOW());`;
                connection.query(sqlQues, (err,data) => {
                    if (err) {
                        connection.rollback(function () {
                            connection.release();
                            common.send(req,res,db,500,err.sqlMessage);
                        });
                    } else {
                        // 开始插入试题
                        let questionnaireId = data.insertId;
                        let total = quesList.length;
                        quesList.map((ques,index)=>{
                            let answer = ques.type === 2?ques.answer.join(','):ques.answer;
                            const sqlSubject = `INSERT INTO subjects(questionnaire_id,user_name,\`index\`,title,type,answer,createtime,updatetime) VALUES(${questionnaireId},'${name}',${index},'${ques.title}',${ques.type},'${answer}',NOW(),NOW());`;
                            connection.query(sqlSubject, (err,data) => {
                                if (err) {
                                    connection.rollback(() => {
                                        connection.release();
                                        common.send(req,res,db,500,err.sqlMessage);
                                    });
                                } else {
                                    total--;
                                    // 开始插入选项
                                    if(ques.type === 1 || ques.type === 2){
                                        let quesId = data.insertId;
                                        total += ques.options.length;
                                        ques.options.map((option,optionIndex)=>{
                                            const sqlOption = `INSERT INTO options(subject_id,user_name,\`index\`,title,type,createtime,updatetime) VALUES(${quesId},'${name}',${optionIndex},'${option.title}',${ques.type},NOW(),NOW());`;
                                            connection.query(sqlOption, (err) => {
                                                if (err) {
                                                    connection.rollback(() => {
                                                        connection.release();
                                                        common.send(req,res,db,500,err.sqlMessage);
                                                    });
                                                } else {
                                                    total--;
                                                    if(total === 0){
                                                        total--;
                                                        tranCommit(connection,(result,msg)=>{
                                                            if(result){
                                                                common.sendSuccess(req,res,db,{id:questionnaireId});
                                                            }else{
                                                                common.send(req,res,db,500,msg);
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        });
                                    }
                                }
                                if(total === 0){
                                    total--;
                                    tranCommit(connection,(result,msg)=>{
                                        if(result){
                                            common.sendSuccess(req,res,db,{id:questionnaireId});
                                        }else{
                                            common.send(req,res,db,500,msg);
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
    });
    route.get('/ques/list', (req, res) => {
        const selectUserList = `SELECT Id,user_name,title,active_time,createtime,\`status\` FROM questionnaires WHERE status = 0 ORDER BY createtime DESC`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
    route.get('/ques/mylist', (req, res) => {
        const name = req.headers.authorization;
        const selectUserList = `SELECT Id,title,active_time,createtime,\`status\` FROM questionnaires WHERE status = 0 and user_name='${name}' ORDER BY createtime DESC`;
        db.query(selectUserList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
    route.get('/ques/getById', (req, res) => {
        let id = req.query.id;
        let sql = `SELECT * FROM questionnaires where Id = ${id}`;
        db.query(sql, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                if(data.length === 0){
                    common.sendSuccess(req,res,db,{status:1,tip:'无此问卷'});
                }else{
                    const result = data[0];
                    const quesList = {};
                    sql = `SELECT Id,questionnaire_id,user_name,\`index\`,title,type,\`status\` FROM subjects where questionnaire_id = ${id}`;
                    db.query(sql, (err, sdata) => {
                        if (err) {
                            common.send(req,res,db,500,err.sqlMessage);
                        } else {
                            if(sdata.length === 0){
                                common.sendSuccess(req,res,db,{status:2,tip:'问卷：'+id+'，无题目'});
                            }else{
                                result.quesList = sdata;
                                let count = 0;
                                sdata.map((ques)=>{
                                    quesList[ques.Id] = ques;
                                    if(ques.type === 1 || ques.type === 2){
                                        count++;
                                        let sql = `SELECT * FROM options where subject_id = ${ques.Id}`;
                                        db.query(sql, (err, odata) => {
                                            if (err) {
                                                common.send(req,res,db,500,err.sqlMessage);
                                            } else {
                                                if(odata.length === 0){
                                                    common.sendSuccess(req,res,db,{status:3,tip:'试题；'+ques.Id+'，无选项'});
                                                }else{
                                                    odata.sort(function (a,b) {
                                                        return a.index - b.index;
                                                    });
                                                    quesList[odata[0].subject_id+''].options = odata;
                                                    count--;
                                                    if(count === 0){
                                                        result.quesList = formateData(quesList);
                                                        common.sendSuccess(req,res,db,{status:0,data:result});
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });
    route.post('/ques/saveAnswer', (req, res) => {
        db.getConnection(function (err, connection) {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
                return false;
            }
            connection.beginTransaction(function (err) {
                if (err) {
                    connection.release();
                    common.send(req,res,db,500,err.sqlMessage);
                    return false;
                }
                // 开始插入答案
                let {questionnaireId,answers} = req.body,
                    name = req.headers.authorization,
                    ip = req.hostname,
                    total = 0;
                let sql = `INSERT INTO answer_user(user_name,ip,questionnaire_id,createtime,updatetime) VALUES('${name}','${ip}',${questionnaireId},NOW(),NOW());`;
                connection.query(sql, (err,data) => {
                    if (err) {
                        connection.rollback(function () {
                            connection.release();
                            common.send(req,res,db,500,err.sqlMessage);
                        });
                    } else {
                        Object.keys(answers).map(key=>{
                            total++;
                            let answer = answers[key];
                            const sqlQues = `INSERT INTO answers_options(subject_id,answer_user_id,answer,createtime,updatetime) VALUES(${key},${data.insertId},'${answer}',NOW(),NOW());`;
                            connection.query(sqlQues, (err) => {
                                if (err) {
                                    connection.rollback(function () {
                                        connection.release();
                                        common.send(req,res,db,500,err.sqlMessage);
                                    });
                                } else {
                                    total--;
                                    if(total === 0){
                                        total--;
                                        tranCommit(connection,(result,msg)=>{
                                            if(result){
                                                common.sendSuccess(req,res,db,{id:data.insertId});
                                            }else{
                                                common.send(req,res,db,500,msg);
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                });
            });
        });
    });
    route.get('/ques/getAnswList', (req, res) => {
        const questionnaireId = req.query.questionnaireId,
        sqlList = `SELECT Id as id,user_name as name,ip,createtime FROM answer_user WHERE questionnaire_id = ${questionnaireId}`;
        db.query(sqlList, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                common.sendSuccess(req,res,db,data);
            }
        });
    });
    route.get('/ques/getReportByAnswId', (req, res) => {
        let answerId = req.query.id,
            sql = `SELECT questionnaire_id,createtime FROM answer_user WHERE Id = ${answerId}`;
        db.query(sql, (err, data) => {
            if (err) {
                common.send(req,res,db,500,err.sqlMessage);
            } else {
                if(data.length === 0){
                    return common.sendSuccess(req,res,db,{status:5,tip:'无此答案记录'});
                }
                const answer = data[0];
                sql = `SELECT title FROM questionnaires where Id = ${answer.questionnaire_id}`;
                db.query(sql, (err, quesdata) => {
                    if (err) {
                        common.send(req,res,db,500,err.sqlMessage);
                    } else {
                        if(quesdata.length === 0){
                            common.sendSuccess(req,res,db,{status:1,tip:'无此问卷'});
                        }else{
                            let result = quesdata[0];
                            result.createtime = answer.createtime;
                            const quesList = {};
                            sql = `SELECT Id,user_name,\`index\`,title,answer,type FROM subjects where questionnaire_id = ${answer.questionnaire_id}`;
                            db.query(sql, (err, sdata) => {
                                if (err) {
                                    common.send(req,res,db,500,err.sqlMessage);
                                } else {
                                    if(sdata.length === 0){
                                        common.sendSuccess(req,res,db,{status:2,tip:'问卷：'+answer.questionnaire_id+'，无题目'});
                                    }else{
                                        result.quesList = sdata;
                                        let count = 0;
                                        sdata.map((ques)=>{
                                            quesList[ques.Id] = ques;
                                            if(ques.type === 1 || ques.type === 2){
                                                count++;
                                                let optionSql = `SELECT * FROM options where subject_id = ${ques.Id}`;
                                                db.query(optionSql, (err, odata) => {
                                                    if (err) {
                                                        common.send(req,res,db,500,err.sqlMessage);
                                                    } else {
                                                        if(odata.length === 0){
                                                            common.sendSuccess(req,res,db,{status:3,tip:'试题；'+ques.Id+'，无选项'});
                                                        }else{
                                                            odata.sort(function (a,b) {
                                                                return a.index - b.index;
                                                            });
                                                            quesList[odata[0].subject_id+''].options = odata;
                                                            count--;
                                                            if(count === 0){
                                                                result.quesList = formateData(quesList);
                                                                common.sendSuccess(req,res,db,{status:0,data:result});
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            count++;
                                            let optionAnswSql = `select answer from answers_options where subject_id = ${ques.Id} and answer_user_id = ${answerId}`;
                                            db.query(optionAnswSql, (err, odata) => {
                                                if (err) {
                                                    common.send(req,res,db,500,err.sqlMessage);
                                                } else {
                                                    if(odata.length === 0){
                                                        common.sendSuccess(req,res,db,{status:4,tip:'试题；'+ques.Id+'，用户无选项'});
                                                    }else{
                                                        ques.userAnswer = odata[0].answer;
                                                        count--;
                                                        if(count === 0){
                                                            result.quesList = formateData(quesList);
                                                            common.sendSuccess(req,res,db,{status:0,data:result});
                                                        }
                                                    }
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    });
};
// 事务提交
function tranCommit(connection,callback){
    connection.commit(function (err, info) {
        if (err) {
            connection.rollback(function () {
                connection.release();
                return callback(false,err);
            });
        } else {
            connection.release();
            return callback(true,info);
        }
    })
}

// 组装查询的返回值
function formateData(quesList){
    let list = [];
    Object.keys(quesList).map(key=>{
        list.push(quesList[key]);
    });
    return list.sort(function (a,b) {
        return a.index - b.index;
    });
}
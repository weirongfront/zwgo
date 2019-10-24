const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const common = require('./libs/common');
common.async = require("async");
const server = express();
const mysql = require('mysql');
const fs = require('fs');

const db = mysql.createPool({
    host: '49.234.68.90',
    user: 'root',
    password: '123456',
    database: 'zwgo'
});

//deal (cookie,session)
server.use(cookieParser('somesecretzwgo'));

server.use(session({
    secret: 'somesecretzwgo',
    resave: true,
    saveUninitialized: true
}));

server.use(bodyParser.json());
//the cores config
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
server.listen(8888, () => {
    console.log("服务已启动\n端口：8888");
});

// 动态分模块挂载各部分接口
const route = express.Router();
const modules = fs.readdirSync("./modules/");
modules.map((modulePath) => {
    require('./modules/'+modulePath)(route,db,common);
});

//deal router
server.use('/api/', route);
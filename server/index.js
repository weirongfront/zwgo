const express = require('express');
const bodyParser = require('body-parser');
const common = require('./libs/common');
common.async = require("async");
const server = express();
const fs = require('fs');
const https = require("https");

const db = require('./db/index');

const redis = require('./index');


// 动态分模块挂载各部分接口
const route = express.Router();
const modules = fs.readdirSync("./controller/");
modules.map((modulePath) => {
    require('./controller/'+modulePath)(route,db,common,redis);
});
/* route.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
})); */
//deal router
server.use('/api/', route);

server.use(bodyParser.json());
//the cores config
server.all('*', function (req, res, next) {
    req.beginTime = new Date();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200).end();
    } else {
        redis.get("str1", function(err, reply){
            console.log(err,reply)
        })
        next();
    }
});

server.listen(8888, () => {
    console.log("服务已启动\n端口：8888");
});

// Configuare https
/* const httpsOption = {
    key : fs.readFileSync("./https/2_zwgo.xyz.key"),
    cert: fs.readFileSync("./https/1_zwgo.xyz_bundle.crt")
}; */
// Create service
/* https.createServer(httpsOption, server).listen(8888,() => {
    console.log("服务已启动\n端口：8888");
}); */

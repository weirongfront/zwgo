const express = require('express');
const server = express();

console.log("==========================《《《当我醒来，太阳已喝醉》》》==========================");

const router = require('./router');
router(express,server);

server.listen(8888, () => {
    console.log("服务已启动\n端口：8888");
});


// HTTPS 部分
// const https = require("https");
// Configuare https
/* const httpsOption = {
    key : fs.readFileSync("./https/2_zwgo.xyz.key"),
    cert: fs.readFileSync("./https/1_zwgo.xyz_bundle.crt")
}; */
// Create service
/* https.createServer(httpsOption, server).listen(8888,() => {
    console.log("服务已启动\n端口：8888");
}); */

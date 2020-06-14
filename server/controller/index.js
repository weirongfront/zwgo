// 动态分模块挂载各部分接口
const fs = require('fs');
module.exports = {
    create(express){
        const route = express.Router();
        const modules = fs.readdirSync("./controller/");
        modules.map((modulePath) => {
            require('./controller/'+modulePath)(route,common,redis);
        });
    }
};
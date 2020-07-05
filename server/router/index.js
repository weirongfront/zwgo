const fs = require('fs');
const redis = require('../redis');
const bodyParser = require('body-parser');
const response = require('../libs/response');

module.exports = (express,server)=>{
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
            if(req.method === 'GET'){
                req.paramter = req.query;
            }else if(req.method === 'POST'){
                req.paramter = req.body;
            }
            //req.paramter = 
            redis.get("str1", function(err, reply){
                
            })
            res.fail  = response.fail;
            res.success = response.success;
            next();
        }
    });

    // 动态分模块挂载各部分接口
    const route = express.Router();
    const modules = fs.readdirSync(process.cwd()+"/router/modules/");
    modules.map((modulePath) => {
        require('./modules/'+modulePath)(route);
    });
    
    //deal router
    server.use('/api/', route);
};

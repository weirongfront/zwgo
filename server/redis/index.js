const redis = require('redis'),
    RDS_PORT = 6379,
    RDS_HOST = '127.0.0.1',
    RDS_OPTS = {},
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
 
client.on('ready', function(res){
	console.log('redis--->ready',res)
})
client.on('error', function(res){
	console.log('redis--->error',res)
})
 

module.exports = {
    client
};
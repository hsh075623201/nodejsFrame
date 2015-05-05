/** 
* @fileOverview redis 数据库连接  
* @date: 2015/05/05 
* @author hsh创建文件
*/
var config = require("../../config/config.json");
var redis = require("redis");
var redisClient = redis.createClient(config.redisPort, config.redisHost);
redisClient.on("error", function (err) {
    console.log("[redis.js] Redis Error :" + err);
});
module.exports = redisClient;
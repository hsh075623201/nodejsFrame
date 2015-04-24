/**
 * Created by HSH on 2014/11/3.
 * redis连接配置
 */
var config = require("../../config/config.json");
var redis = require("redis");
var redisClient = redis.createClient(config.redisPort, config.redisHost);
redisClient.on("error", function (err) {
    console.log("[redis.js] Redis Error :" + err);
});
module.exports = redisClient;
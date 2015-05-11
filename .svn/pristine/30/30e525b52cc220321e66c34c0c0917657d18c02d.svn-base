/** 
* @fileOverview mongo 数据库连接  
* @date: 2015/05/05 
* @author hsh创建文件
*/

var mongoose = require('mongoose');
var config = require('../../config/config.json');
var url = "mongodb://"+config.dbHost+"/"+config.dbName;
//var url="mongodb://127.0.0.1:19999,127.0.0.1:20000,127.0.0.1:20001/"+config.dbName;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('db connect to mongoDB ' + url);
});
module.exports = mongoose;
var mongoose = require('mongoose');
var config = require('../../config/config.json');
var url = "mongodb://"+config.dbHost+"/"+config.dbName;
//var url="mongodb://127.0.0.1:19999,127.0.0.1:20000,127.0.0.1:20001/"+config.dbName;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('SEC server connect to mongoDB ' + url);
});
module.exports = mongoose;
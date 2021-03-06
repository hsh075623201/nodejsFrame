/**
* 角色模型
*/
var mongoose = require('mongoose');

exports.RoleSchema = new mongoose.Schema({
    name: String,
    code: String,
    desc: String,
    createUsername:String,
    menus:[],
    urls:[],
    components:[],
    DateTime:{ type: Date, default: Date.now }
});
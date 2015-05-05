/**
* 菜单模型
*/
var mongoose = require('mongoose');

exports.MenuSchema = new mongoose.Schema({
   
    name: String,
    pCode:String,
    code:String,
    desc:String,
    url:String,
    pic:String,
    status:{ type: Number, default: 1 },
    isParent:{type:String,default:false},
    createUsername:String,
    app:String,
    sortNum:Number,
    DateTime:{ type: Date, default: Date.now }
});
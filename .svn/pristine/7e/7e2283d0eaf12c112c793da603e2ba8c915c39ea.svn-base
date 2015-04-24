
var mongoose = require('mongoose');

exports.UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email:{ type: String, default: "" },
    displayName:String,
    gender:{ type: String, default: "male" },
    interesting:String,
    birthday:Date,
    createTime:{ type: Date, default: Date.now },
    updateTime:{ type: Date, default: Date.now },
    status:{ type: String, default: "normal" },
    birthProvince:String,
    birthCity:String,
    liveProvince:String,
    liveCity:String,
    photo:String,
    hidden:Boolean,
    roleArr:[{ type: mongoose.Schema.Types.ObjectId, ref: 'role' }],
    deptArr:[{ type: mongoose.Schema.Types.ObjectId, ref: 'dept' }],
});

